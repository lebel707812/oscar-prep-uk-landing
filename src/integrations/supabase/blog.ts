import { supabase } from "./client";

// Tipos para o blog (simplificados para o exemplo, idealmente viriam de um gerador de tipos Supabase)
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url?: string;
  author_id?: string;
  category_id?: string;
  status: 'draft' | 'published' | 'archived';
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  reading_time?: number;
  view_count?: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
  blog_categories?: { name: string; slug: string; color: string };
  author?: { email: string };
}

interface BlogPostCreate {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image_url?: string;
  category_id?: string;
  status?: 'draft' | 'published' | 'archived';
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  reading_time?: number;
  published_at?: string;
}

interface BlogPostUpdate {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featured_image_url?: string;
  category_id?: string;
  status?: 'draft' | 'published' | 'archived';
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  reading_time?: number;
  published_at?: string;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  created_at: string;
}

// Funções para Posts
export const fetchBlogPosts = async (page = 1, limit = 10, categorySlug?: string) => {
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

  if (categorySlug) {
    const { data: categoryData, error: categoryError } = await supabase
      .from('blog_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();

    if (categoryError || !categoryData) {
      console.error('Error fetching category by slug:', categoryError);
      return { data: [], error: categoryError };
    }
    query = query.eq('category_id', categoryData.id);
  }

  const { data, error } = await query;
  return { data, error };
};

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

export const incrementPostViews = async (postId: string) => {
  // Esta função RPC precisaria ser criada no Supabase
  // Exemplo de SQL para a função RPC:
  // CREATE OR REPLACE FUNCTION increment_post_views(post_id uuid)
  // RETURNS void AS $$
  // BEGIN
  //   UPDATE public.blog_posts
  //   SET view_count = view_count + 1
  //   WHERE id = post_id;
  // END;
  // $$ LANGUAGE plpgsql;
  const { error } = await supabase.rpc('increment_post_views', {
    post_id: postId
  });
  return { error };
};

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

// Funções para Categorias
export const fetchBlogCategories = async () => {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name');

  return { data, error };
};

export const fetchCategoryBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  return { data, error };
};

// Funções Administrativas (requer autenticação)
const checkUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const createBlogPost = async (post: BlogPostCreate) => {
  const user = await checkUser();
  if (!user) return { data: null, error: { message: "Not authenticated", code: "401", details: "", hint: "" } };

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{ ...post, author_id: user.id }])
    .select()
    .single();

  return { data, error };
};

export const updateBlogPost = async (id: string, updates: BlogPostUpdate) => {
  const user = await checkUser();
  if (!user) return { data: null, error: { message: "Not authenticated", code: "401", details: "", hint: "" } };

  const { data, error } = await supabase
    .from('blog_posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};

export const deleteBlogPost = async (id: string) => {
  const user = await checkUser();
  if (!user) return { error: { message: "Not authenticated", code: "401", details: "", hint: "" } };

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  return { error };
};

// Funções para Tags (exemplo, requer função RPC get_popular_tags no Supabase)
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

export const fetchPopularTags = async (limit = 20) => {
  // Esta função RPC precisaria ser criada no Supabase
  // Exemplo de SQL para a função RPC:
  // CREATE OR REPLACE FUNCTION get_popular_tags(tag_limit integer)
  // RETURNS TABLE (tag text, count bigint) AS $$
  // BEGIN
  //   RETURN QUERY
  //   SELECT unnest(tags) as tag, count(*)
  //   FROM public.blog_posts
  //   WHERE status = 'published'
  //   GROUP BY tag
  //   ORDER BY count DESC
  //   LIMIT tag_limit;
  // END;
  // $$ LANGUAGE plpgsql;
  const { data, error } = await supabase.rpc('get_popular_tags', {
    tag_limit: limit
  });

  return { data, error };
};

// Função para upload de imagens (requer bucket 'blog-images' no Supabase Storage)
export const uploadBlogImage = async (file: File, postId?: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${postId || 'temp'}-${Date.now()}.${fileExt}`;
  const filePath = `blog-images/${fileName}`;

  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file);

  if (error) return { data: null, error };

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath);

  return { data: { url: publicUrl }, error: null };
};


