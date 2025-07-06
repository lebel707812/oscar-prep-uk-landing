-- Enable RLS on existing tables
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users_meta ENABLE ROW LEVEL SECURITY;

-- Create policies for sessions table
CREATE POLICY "Users can view own sessions" 
ON public.sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions" 
ON public.sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" 
ON public.sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" 
ON public.sessions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for users_meta table
CREATE POLICY "Users can view own metadata" 
ON public.users_meta 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own metadata" 
ON public.users_meta 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own metadata" 
ON public.users_meta 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users_meta (user_id, full_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();