import { supabase } from "@/integrations/supabase/client"; // seu supabase client

// Cria a sessão de simulado no começo
async function createExamSession(userId: string, topicId: string, level: number) {
  const { data, error } = await supabase
    .from("exam_sessions")
    .insert({ user_id: userId, topic_id: topicId, level, started_at: new Date().toISOString() })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Salva a resposta da questão
async function saveAnswer(examSessionId: string, questionId: string, selectedOption: string, isCorrect: boolean) {
  const { error } = await supabase
    .from("exam_answers")
    .insert([{ exam_session_id: examSessionId, question_id: questionId, selected_option: selectedOption, is_correct: isCorrect }]);
  if (error) throw error;
}

// Finaliza o simulado e atualiza a pontuação
async function finishExamSession(examSessionId: string) {
  // calcular score somando respostas corretas
  const { data, error } = await supabase
    .from("exam_answers")
    .select("is_correct")
    .eq("exam_session_id", examSessionId);

  if (error) throw error;

  const score = data.filter((a) => a.is_correct).length;

  const { error: updateError } = await supabase
    .from("exam_sessions")
    .update({ finished_at: new Date().toISOString(), score })
    .eq("id", examSessionId);

  if (updateError) throw updateError;

  return score;
}
