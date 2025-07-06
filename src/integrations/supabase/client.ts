import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lnfonzpwstsxetmznlsy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZm9uenB3c3RzeGV0bXpubHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MTI2OTUsImV4cCI6MjA2NzM4ODY5NX0.88ANEI_0jkeDdZ9PvcWHTdFEHzfb6GfPYeTH7_5QCcc";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Função para verificar a sessão atual
export const checkSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Erro ao verificar sessão:', error);
    return null;
  }
  
  return session;
};

// Função para verificar o usuário atual
export const checkUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Erro ao verificar usuário:', error);
    return null;
  }
  
  return user;
};
