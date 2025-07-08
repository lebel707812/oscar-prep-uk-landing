import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTopicsWithCounts, fetchTopicLevelInsights } from "@/integrations/supabase/client";
import { CheckCircle, Circle, Trophy, Target } from "lucide-react";

interface TopicLevelCompletion {
  level: number;
  completed: boolean;
  score: number | null;
  attempts: number;
  bestScore: number | null;
}

interface TopicProgress {
  id: string;
  name: string;
  totalQuestions: number;
  completedSessions: number;
  progressPercentage: number;
  levelCompletions: TopicLevelCompletion[];
  overallBestScore: number | null;
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
      
      // Fetch user exam sessions with level insights
      const levelInsights = await fetchTopicLevelInsights();
      
      // Calculate progress for each topic
      const progressData: TopicProgress[] = topics.map((topic: any) => {
        const totalQuestions = topic.questions[0]?.count || 0;
        const topicSessions = levelInsights.filter(
          (session: any) => session.topic_id === topic.id
        );
        
        // Calculate level completions (assuming levels 1-5)
        const levelCompletions: TopicLevelCompletion[] = [];
        for (let level = 1; level <= 5; level++) {
          const levelSessions = topicSessions.filter((s: any) => s.level === level);
          const bestScore = levelSessions.length > 0 
            ? Math.max(...levelSessions.map((s: any) => s.score || 0))
            : null;
          
          levelCompletions.push({
            level,
            completed: levelSessions.length > 0,
            score: bestScore,
            attempts: levelSessions.length,
            bestScore,
          });
        }
        
        const completedSessions = topicSessions.length;
        const progressPercentage = totalQuestions > 0 
          ? Math.min((completedSessions / totalQuestions) * 100, 100)
          : 0;
        
        const overallBestScore = topicSessions.length > 0
          ? Math.max(...topicSessions.map((s: any) => s.score || 0))
          : null;
        
        return {
          id: topic.id,
          name: topic.name,
          totalQuestions,
          completedSessions,
          progressPercentage,
          levelCompletions,
          overallBestScore,
        };
      });
      
      setTopicProgress(progressData);
    } catch (error) {
      console.error("Error loading topic progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLevelBadgeColor = (completion: TopicLevelCompletion) => {
    if (!completion.completed) return "bg-gray-200 text-gray-600";
    if (completion.bestScore && completion.bestScore >= 80) return "bg-green-500 text-white";
    if (completion.bestScore && completion.bestScore >= 60) return "bg-yellow-500 text-white";
    return "bg-red-500 text-white";
  };

  const getLevelIcon = (completion: TopicLevelCompletion) => {
    if (!completion.completed) return <Circle className="h-4 w-4" />;
    if (completion.bestScore && completion.bestScore >= 80) return <Trophy className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Topic Progress</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-2 bg-muted rounded mb-3"></div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="h-6 w-12 bg-muted rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (topicProgress.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Topic Progress</h2>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No topics available yet.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Topic Progress</h2>
      <div className="space-y-4">
        {topicProgress.map((topic) => (
          <Card key={topic.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{topic.name}</CardTitle>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>
                      {Math.round(topic.progressPercentage)}% complete
                    </span>
                    <span>
                      {topic.completedSessions} sessions
                    </span>
                    {topic.overallBestScore && (
                      <span className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        Best: {topic.overallBestScore}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Progress 
                value={topic.progressPercentage} 
                className="h-2 mt-2"
              />
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Level Completion
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {topic.levelCompletions.filter(l => l.completed).length} of 5 levels completed
                  </span>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {topic.levelCompletions.map((completion) => (
                    <div key={completion.level} className="flex flex-col items-center gap-1">
                      <Badge 
                        className={`${getLevelBadgeColor(completion)} flex items-center gap-1 px-2 py-1`}
                        variant="secondary"
                      >
                        {getLevelIcon(completion)}
                        L{completion.level}
                      </Badge>
                      {completion.completed && (
                        <div className="text-xs text-center">
                          <div className="font-medium">
                            {completion.bestScore}%
                          </div>
                          {completion.attempts > 1 && (
                            <div className="text-muted-foreground">
                              {completion.attempts} tries
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {topic.levelCompletions.some(l => l.completed) && (
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Performance Legend:</span>
                      <div className="flex gap-3">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded"></div>
                          Excellent (80%+)
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded"></div>
                          Good (60-79%)
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded"></div>
                          Needs Work (&lt;60%)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopicProgressSection;

