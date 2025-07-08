import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const checkUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Fetch all topics with question counts
export const fetchTopicsWithCounts = async () => {
  const { data, error } = await supabase
    .from("topics")
    .select(`
      id,
      name,
      questions(count)
    `);

  if (error) {
    console.error("Error fetching topics with counts:", error);
    return [];
  }

  return data;
};

// Fetch user exam sessions for progress calculation
export const fetchUserExamSessions = async () => {
  const user = await checkUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("exam_sessions")
    .select(`
      id,
      topic_id,
      finished_at,
      score,
      topics(name)
    `)
    .eq("user_id", user.id)
    .not("finished_at", "is", null);

  if (error) {
    console.error("Error fetching user exam sessions:", error);
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

// Fetch topic name by ID
export const fetchTopicName = async (topicId: string) => {
  const { data, error } = await supabase
    .from("topics")
    .select("name")
    .eq("id", topicId)
    .single();

  if (error) {
    console.error("Error fetching topic name:", error);
    return null;
  }

  return data.name;
};

// Update the finishExamSession call in MockExamRunner
export const finishExamSession = async (examSessionId: string, score: number, timeSpent: number) => {
  const { error } = await supabase
    .from("exam_sessions")
    .update({ 
      finished_at: new Date().toISOString(), 
      score,
      time_spent: timeSpent 
    })
    .eq("id", examSessionId);

  if (error) {
    console.error("Error finishing exam session:", error);
    return { error };
  }

  return { success: true };
};

// Fetch topic level completion insights
export const fetchTopicLevelInsights = async () => {
  const user = await checkUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("exam_sessions")
    .select(`
      topic_id,
      level,
      score,
      finished_at,
      topics(name)
    `)
    .eq("user_id", user.id)
    .not("finished_at", "is", null)
    .order("finished_at", { ascending: false });

  if (error) {
    console.error("Error fetching topic level insights:", error);
    return [];
  }

  return data;
};

// Fetch user sessions (used in Dashboard)
export const fetchUserSessions = async () => {
  const user = await checkUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("exam_sessions")
    .select(`
      id,
      date: created_at,
      station_name: topic_id,
      score,
      feedback
    `)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching user sessions:", error);
    return [];
  }

  return data;
};

// Save session (used in Dashboard)
export const saveSession = async (session: any) => {
  const user = await checkUser();
  if (!user) return { error: "Not authenticated" };

  if (session.id) {
    // Update existing session
    const { data, error } = await supabase
      .from("exam_sessions")
      .update({
        topic_id: session.stationName,
        score: session.score,
        feedback: session.feedback,
        created_at: session.date.toISOString(),
      })
      .eq("id", session.id)
      .select();

    if (error) {
      console.error("Error updating session:", error);
      return { error };
    }
    return { data };
  } else {
    // Insert new session
    const { data, error } = await supabase
      .from("exam_sessions")
      .insert({
        user_id: user.id,
        topic_id: session.stationName,
        score: session.score,
        feedback: session.feedback,
        created_at: session.date.toISOString(),
      })
      .select();

    if (error) {
      console.error("Error inserting session:", error);
      return { error };
    }
    return { data };
  }
};

// Delete session (used in Dashboard)
export const deleteSession = async (sessionId: string) => {
  const { error } = await supabase
    .from("exam_sessions")
    .delete()
    .eq("id", sessionId);

  if (error) {
    console.error("Error deleting session:", error);
    return { error };
  }

  return { success: true };
};



// Fetch all scenarios
export const fetchScenarios = async () => {
  const { data, error } = await supabase
    .from("scenarios")
    .select(`
      id,
      title,
      description,
      learning_objectives,
      difficulty_level,
      created_at,
      topics(name)
    `);

  if (error) {
    console.error("Error fetching scenarios:", error);
    return [];
  }

  return data;
};

// Fetch a single scenario by ID
export const fetchScenarioById = async (scenarioId: string) => {
  const { data, error } = await supabase
    .from("scenarios")
    .select(`
      id,
      title,
      description,
      learning_objectives,
      difficulty_level,
      created_at,
      topics(name)
    `)
    .eq("id", scenarioId)
    .single();

  if (error) {
    console.error("Error fetching scenario by ID:", error);
    return null;
  }

  return data;
};

// Create a new scenario
export const createScenario = async (scenario: {
  title: string;
  description: string;
  learning_objectives: string[];
  difficulty_level: string;
  topic_id: string;
}) => {
  const { data, error } = await supabase
    .from("scenarios")
    .insert([scenario])
    .select()
    .single();

  if (error) {
    console.error("Error creating scenario:", error);
    return { error };
  }

  return { data };
};

// Update an existing scenario
export const updateScenario = async (
  scenarioId: string,
  updates: {
    title?: string;
    description?: string;
    learning_objectives?: string[];
    difficulty_level?: string;
    topic_id?: string;
  }
) => {
  const { data, error } = await supabase
    .from("scenarios")
    .update(updates)
    .eq("id", scenarioId)
    .select()
    .single();

  if (error) {
    console.error("Error updating scenario:", error);
    return { error };
  }

  return { data };
};

// Delete a scenario
export const deleteScenario = async (scenarioId: string) => {
  const { error } = await supabase
    .from("scenarios")
    .delete()
    .eq("id", scenarioId);

  if (error) {
    console.error("Error deleting scenario:", error);
    return { error };
  }

  return { success: true };
};


