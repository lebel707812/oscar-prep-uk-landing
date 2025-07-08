# Design Técnico para o Blog OSCE Prep UK

## 1. Arquitetura Geral

O blog será integrado ao sistema existente da OSCE Prep UK, utilizando a mesma infraestrutura Supabase e React. Isso garantirá consistência na experiência do usuário e aproveitará a autenticação e o sistema de dados já implementados.

## 2. Estrutura do Banco de Dados

### 2.1. Tabela `blog_posts`

```sql
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    author_id UUID REFERENCES auth.users(id),
    category_id UUID REFERENCES blog_categories(id),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    meta_title TEXT,
    meta_description TEXT,
    tags TEXT[],
    reading_time INTEGER, -- em minutos
    view_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.2. Tabela `blog_categories`

```sql
CREATE TABLE public.blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#3B82F6', -- cor para identificação visual
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.3. Tabela `blog_comments` (opcional para futuro)

```sql
CREATE TABLE public.blog_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    content TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.4. Políticas RLS (Row Level Security)

```sql
-- Permitir leitura pública de posts publicados
CREATE POLICY "Enable read access for published posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

-- Permitir leitura de todas as categorias
CREATE POLICY "Enable read access for all categories" ON public.blog_categories
  FOR SELECT USING (TRUE);

-- Permitir inserção/edição apenas para usuários autenticados (admins)
CREATE POLICY "Enable insert for authenticated users" ON public.blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for post authors" ON public.blog_posts
  FOR UPDATE USING (auth.uid() = author_id);
```

## 3. Estrutura de Rotas Frontend

### 3.1. Rotas Principais

```typescript
// Adicionar ao routes.tsx
{
  path: '/blog',
  element: <BlogIndex />,
},
{
  path: '/blog/category/:categorySlug',
  element: <BlogCategory />,
},
{
  path: '/blog/:slug',
  element: <BlogPost />,
},
{
  path: '/dashboard/blog',
  element: <BlogDashboard />, // Para administração
},
{
  path: '/dashboard/blog/new',
  element: <BlogEditor />,
},
{
  path: '/dashboard/blog/edit/:id',
  element: <BlogEditor />,
}
```

### 3.2. Componentes Frontend

#### 3.2.1. Componentes Públicos

*   **`BlogIndex`**: Página principal do blog com lista de posts, filtros por categoria, busca
*   **`BlogPost`**: Página individual do post com conteúdo completo, navegação entre posts
*   **`BlogCategory`**: Página de categoria com posts filtrados
*   **`BlogSidebar`**: Sidebar com categorias, posts populares, tags
*   **`BlogCard`**: Card de preview do post para listas
*   **`BlogSearch`**: Componente de busca

#### 3.2.2. Componentes Administrativos

*   **`BlogDashboard`**: Dashboard para gerenciar posts (lista, estatísticas)
*   **`BlogEditor`**: Editor de posts com preview, upload de imagens
*   **`CategoryManager`**: Gerenciamento de categorias
*   **`BlogAnalytics`**: Estatísticas de visualizações, posts populares

## 4. APIs e Funções Supabase

### 4.1. Funções para Posts

```typescript
// Buscar posts publicados com paginação
export const fetchBlogPosts = async (page = 1, limit = 10, categoryId?: string) => {
  let query = supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image_url,
      published_at,
      reading_time,
      view_count,
      blog_categories(name, slug, color),
      author:auth.users(email)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;
  return { data, error };
};

// Buscar post individual por slug
export const fetchBlogPostBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_categories(name, slug, color),
      author:auth.users(email)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  return { data, error };
};

// Incrementar contador de visualizações
export const incrementPostViews = async (postId: string) => {
  const { error } = await supabase.rpc('increment_post_views', {
    post_id: postId
  });
  return { error };
};

// Buscar posts relacionados
export const fetchRelatedPosts = async (categoryId: string, currentPostId: string, limit = 3) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image_url,
      published_at,
      reading_time
    `)
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .neq('id', currentPostId)
    .order('published_at', { ascending: false })
    .limit(limit);

  return { data, error };
};
```

### 4.2. Funções para Categorias

```typescript
// Buscar todas as categorias
export const fetchBlogCategories = async () => {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name');

  return { data, error };
};

// Buscar categoria por slug
export const fetchCategoryBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  return { data, error };
};
```

### 4.3. Funções Administrativas

```typescript
// Criar novo post
export const createBlogPost = async (post: BlogPostCreate) => {
  const user = await checkUser();
  if (!user) return { error: "Not authenticated" };

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{ ...post, author_id: user.id }])
    .select()
    .single();

  return { data, error };
};

// Atualizar post
export const updateBlogPost = async (id: string, updates: BlogPostUpdate) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};

// Deletar post
export const deleteBlogPost = async (id: string) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  return { error };
};
```

## 5. Funcionalidades Especiais

### 5.1. Sistema de Busca

Implementar busca full-text usando PostgreSQL:

```sql
-- Adicionar índice de busca full-text
CREATE INDEX blog_posts_search_idx ON blog_posts 
USING gin(to_tsvector('english', title || ' ' || content || ' ' || excerpt));

-- Função para busca
CREATE OR REPLACE FUNCTION search_blog_posts(search_query text)
RETURNS TABLE (
  id uuid,
  title text,
  slug text,
  excerpt text,
  rank real
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    bp.id,
    bp.title,
    bp.slug,
    bp.excerpt,
    ts_rank(to_tsvector('english', bp.title || ' ' || bp.content || ' ' || bp.excerpt), 
            plainto_tsquery('english', search_query)) as rank
  FROM blog_posts bp
  WHERE bp.status = 'published'
    AND to_tsvector('english', bp.title || ' ' || bp.content || ' ' || bp.excerpt) 
        @@ plainto_tsquery('english', search_query)
  ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql;
```

### 5.2. Sistema de Tags

```typescript
// Buscar posts por tag
export const fetchPostsByTag = async (tag: string) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image_url,
      published_at,
      reading_time,
      blog_categories(name, slug, color)
    `)
    .contains('tags', [tag])
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return { data, error };
};

// Buscar todas as tags populares
export const fetchPopularTags = async (limit = 20) => {
  const { data, error } = await supabase.rpc('get_popular_tags', {
    tag_limit: limit
  });

  return { data, error };
};
```

### 5.3. Editor de Conteúdo

Utilizar um editor rich text como TinyMCE ou Quill.js para permitir formatação avançada, inserção de imagens, links, etc.

### 5.4. Upload de Imagens

Integrar com Supabase Storage para upload de imagens:

```typescript
export const uploadBlogImage = async (file: File, postId?: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${postId || 'temp'}-${Date.now()}.${fileExt}`;
  const filePath = `blog-images/${fileName}`;

  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file);

  if (error) return { error };

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath);

  return { data: { url: publicUrl }, error: null };
};
```

## 6. SEO e Performance

### 6.1. Meta Tags Dinâmicas

Cada página do blog terá meta tags dinâmicas baseadas no conteúdo:

```typescript
// Hook para meta tags
export const useBlogSEO = (post?: BlogPost, category?: BlogCategory) => {
  useEffect(() => {
    if (post) {
      document.title = post.meta_title || post.title;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.meta_description || post.excerpt);
      }
      
      // Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', post.title);
      }
      
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage && post.featured_image_url) {
        ogImage.setAttribute('content', post.featured_image_url);
      }
    }
  }, [post, category]);
};
```

### 6.2. Sitemap Dinâmico

Gerar sitemap automaticamente incluindo todas as páginas do blog:

```typescript
export const generateBlogSitemap = async () => {
  const { data: posts } = await fetchBlogPosts(1, 1000); // Todos os posts
  const { data: categories } = await fetchBlogCategories();
  
  const urls = [
    { url: '/blog', priority: 0.8 },
    ...posts.map(post => ({
      url: `/blog/${post.slug}`,
      lastmod: post.updated_at,
      priority: 0.6
    })),
    ...categories.map(category => ({
      url: `/blog/category/${category.slug}`,
      priority: 0.5
    }))
  ];
  
  return urls;
};
```

## 7. Integração com o Sistema Existente

### 7.1. Navegação

Adicionar link para o blog no header principal:

```typescript
// No Header.tsx
const navItems = [
  { path: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { path: '/dashboard/mock-exams', label: 'Mock Exams', Icon: FileText },
  { path: '/dashboard/scenario-library', label: 'Scenario Library', Icon: Library },
  { path: '/blog', label: 'Blog', Icon: BookOpen }, // Novo item
  { path: '/dashboard/session-history', label: 'Session History', Icon: History },
  { path: '/dashboard/pacient-ai', label: 'PacientAI', Icon: User },
];
```

### 7.2. Dashboard Administrativo

Adicionar seção de blog no dashboard para usuários administradores:

```typescript
// Verificar se usuário é admin
export const isUserAdmin = async () => {
  const user = await checkUser();
  if (!user) return false;
  
  // Verificar role ou email específico
  return user.email === 'admin@osceprep.uk' || user.user_metadata?.role === 'admin';
};
```

Esta estrutura técnica fornece uma base sólida para implementar um blog completo e profissional integrado ao sistema existente da OSCE Prep UK.

