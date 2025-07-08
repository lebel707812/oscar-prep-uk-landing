-- Blog Schema for OSCE Prep UK
-- This file contains the SQL schema for the blog functionality

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: blog_categories
CREATE TABLE public.blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#3B82F6',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: blog_posts
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    author_id UUID REFERENCES auth.users(id),
    category_id UUID REFERENCES public.blog_categories(id),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    meta_title TEXT,
    meta_description TEXT,
    tags TEXT[],
    reading_time INTEGER,
    view_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies for blog_categories
CREATE POLICY "Enable read access for all categories" ON public.blog_categories
  FOR SELECT USING (TRUE);

CREATE POLICY "Enable insert for authenticated users on categories" ON public.blog_categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users on categories" ON public.blog_categories
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users on categories" ON public.blog_categories
  FOR DELETE USING (auth.role() = 'authenticated');

-- Policies for blog_posts
CREATE POLICY "Enable read access for published posts" ON public.blog_posts
  FOR SELECT USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Enable insert for authenticated users on posts" ON public.blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for post authors" ON public.blog_posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Enable delete for post authors" ON public.blog_posts
  FOR DELETE USING (auth.uid() = author_id);

-- Function to increment post views
CREATE OR REPLACE FUNCTION increment_post_views(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.blog_posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get popular tags
CREATE OR REPLACE FUNCTION get_popular_tags(tag_limit integer)
RETURNS TABLE (tag text, count bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT unnest(tags) as tag, count(*)
  FROM public.blog_posts
  WHERE status = 'published'
  GROUP BY tag
  ORDER BY count DESC
  LIMIT tag_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert initial categories
INSERT INTO public.blog_categories (name, slug, description, color) VALUES
('Preparação para o Exame OSCE', 'preparacao-exame-osce', 'Artigos sobre como se preparar efetivamente para o exame OSCE', '#3B82F6'),
('Habilidades de Comunicação no OSCE', 'habilidades-comunicacao-osce', 'Dicas e técnicas para melhorar a comunicação durante o OSCE', '#10B981'),
('Dicas de Estudo e Recursos', 'dicas-estudo-recursos', 'Metodologias de estudo e recursos úteis para a preparação', '#F59E0B'),
('Atualizações e Cultura do NHS', 'atualizacoes-cultura-nhs', 'Informações sobre o NHS e cultura britânica para enfermeiros internacionais', '#EF4444'),
('Histórias de Sucesso e Inspiração', 'historias-sucesso-inspiracao', 'Relatos inspiradores de enfermeiros que passaram no OSCE', '#8B5CF6');

-- Create storage bucket for blog images (if using Supabase Storage)
-- This needs to be run in the Supabase dashboard or via the API
-- INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Storage policy for blog images
-- CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
-- CREATE POLICY "Authenticated users can upload blog images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
-- CREATE POLICY "Users can update their own blog images" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images' AND auth.uid()::text = (storage.foldername(name))[1]);
-- CREATE POLICY "Users can delete their own blog images" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images' AND auth.uid()::text = (storage.foldername(name))[1]);

