import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { fetchTopicsWithCounts, fetchUserExamSessions } from "@/integrations/supabase/client";

interface TopicProgress {
  id: string;
  name: string;
  totalQuestions: number;
  completedSessions: number;
  progressPercentage: number;
}

const TopicProgressSection = () => {
  const [topicProgress, setTopicProgress] = useState<TopicProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTopicProgress();
  }, []);

  const loadTopicProgress = async () => {
    try {
      setIsLoading(true);
      
      // Fetch topics with question counts
      const topics = await fetchTopicsWithCounts();
      
      // Fetch user exam sessions
      const userSessions = await fetchUserExamSessions();
      
      // Calculate progress for each topic
      const progressData: TopicProgress[] = topics.map((topic: any) => {
        const totalQuestions = topic.questions[0]?.count || 0;
        const completedSessions = userSessions.filter(
          (session: any) => session.topic_id === topic.id
        ).length;
        
        const progressPercentage = totalQuestions > 0 
          ? Math.min((completedSessions / totalQuestions) * 100, 100)
          : 0;
        
        return {
          id: topic.id,
          name: topic.name,
          totalQuestions,
          completedSessions,
          progressPercentage,
        };
      });
      
      setTopicProgress(progressData);
    } catch (error) {
      console.error("Error loading topic progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Topic Progress</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-2 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (topicProgress.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Topic Progress</h2>
        <p className="text-muted-foreground">No topics available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Topic Progress</h2>
      <div className="space-y-4">
        {topicProgress.map((topic) => (
          <div key={topic.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-foreground">{topic.name}</h3>
              <span className="text-sm text-muted-foreground">
                {Math.round(topic.progressPercentage)}% 
                ({topic.completedSessions} of {topic.totalQuestions} completed)
              </span>
            </div>
            <Progress 
              value={topic.progressPercentage} 
              className="h-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicProgressSection;