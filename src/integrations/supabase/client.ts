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

