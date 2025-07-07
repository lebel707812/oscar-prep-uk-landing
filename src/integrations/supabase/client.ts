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

// Corrigido: id como string (UUID)
export const deleteSession = async (id: string) => {
  const user = await checkUser();
  if (!user) {
    console.error("Usuário não autenticado");
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("sessions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // garante que usuário só delete suas sessões

  if (error) {
    console.error("Erro ao deletar sessão:", error);
    return { error };
  }

  return { success: true };
};

// Salvar sessão no Supabase
export const saveSession = async ({
  date,
  stationName,
  score,
  feedback,
}: {
  date: Date;
  stationName: string;
  score?: number;
  feedback?: string;
}) => {
  const user = await checkUser();
  if (!user) {
    console.error("Usuário não autenticado");
    return { error: "Not authenticated" };
  }

  const newSession: any = {
    user_id: user.id,
    date: date.toISOString().split("T")[0], // só data no formato yyyy-mm-dd
    station_name: stationName,
    score: score !== undefined ? score : 0,
  };

  if (feedback !== undefined) newSession.feedback = feedback;

  const { error } = await supabase.from("sessions").insert([newSession]);

  if (error) {
    console.error("Erro ao salvar sessão:", error);
    return { error };
  }

  return { success: true };
};

export const fetchUserSessions = async () => {
  const user = await checkUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: true });

  if (error) {
    console.error("Erro ao buscar sessões:", error);
    return [];
  }

  return data;
};

// Cria uma nova sessão de exame (exam_sessions)
export const createExamSession = async (topicId: string, level: number) => {
  const user = await checkUser();
  if (!user) return { error: "Not authenticated" };

  const { data, error } = await supabase
    .from("exam_sessions")
    .insert([{ user_id: user.id, topic_id: topicId, level }])
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar sessão de exame:", error);
    return { error };
  }

  return { data };
};

// Salva a resposta do usuário para uma pergunta (exam_answers)
export const saveExamAnswer = async (
  examSessionId: string,
  questionId: string,
  selectedOption: string,
  isCorrect: boolean
) => {
  const { error } = await supabase.from("exam_answers").insert([
    {
      exam_session_id: examSessionId,
      question_id: questionId,
      selected_option: selectedOption,
      is_correct: isCorrect,
    },
  ]);

  if (error) {
    console.error("Erro ao salvar resposta:", error);
    return { error };
  }

  return { success: true };
};

// Atualiza a sessão de exame ao finalizar com score e timestamp
export const finishExamSession = async (examSessionId: string, score: number) => {
  const { error } = await supabase
    .from("exam_sessions")
    .update({ finished_at: new Date().toISOString(), score })
    .eq("id", examSessionId);

  if (error) {
    console.error("Erro ao finalizar sessão de exame:", error);
    return { error };
  }

  return { success: true };
};
