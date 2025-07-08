import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  Trophy, 
  Calendar, 
  BookOpen, 
  Target,
  ChevronRight,
  History
} from "lucide-react";

interface ExamSession {
  id: string;
  topic_id: string;
  topic_name: string;
  level: number;
  score: number | null;
  time_spent: number | null;
  started_at: string;
  finished_at: string | null;
}

const SessionHistory = () => {
  const [sessions, setSessions] = useState<ExamSession[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchSessionHistory();
  }, []);

  const fetchSessionHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to view session history",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from("exam_sessions")
        .select(`
          id,
          topic_id,
          level,
          score,
          time_spent,
          started_at,
          finished_at,
          topics (
            name
          )
        `)
        .eq("user_id", user.id)
        .not("finished_at", "is", null)
        .order("finished_at", { ascending: false });

      if (error) {
        console.error("Error fetching session history:", error);
        toast({
          title: "Error",
          description: "Failed to load session history",
          variant: "destructive",
        });
        return;
      }

      const formattedSessions = data?.map((session: any) => ({
        id: session.id,
        topic_id: session.topic_id,
        topic_name: session.topics?.name || "Unknown Topic",
        level: session.level,
        score: session.score,
        time_spent: session.time_spent,
        started_at: session.started_at,
        finished_at: session.finished_at,
      })) || [];

      setSessions(formattedSessions);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number | null) => {
    if (!seconds) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "bg-gray-500";
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreText = (score: number | null) => {
    if (!score) return "N/A";
    return `${score}%`;
  };

  const handleViewDetails = (sessionId: string) => {
    navigate(`/session-review/${sessionId}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading session history...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <History className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Session History</h1>
          </div>
          <p className="text-muted-foreground">
            Review your completed mock exam sessions and track your progress over time.
          </p>
        </div>

        {sessions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <History className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Sessions Yet</h3>
              <p className="text-muted-foreground text-center mb-6">
                You haven't completed any mock exam sessions yet. Start practicing to see your history here!
              </p>
              <Button onClick={() => navigate("/dashboard/mock-exams")}>
                Start Mock Exam
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">{session.topic_name}</h3>
                        <Badge variant="outline">Level {session.level}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Score:</span>
                          <Badge className={`${getScoreColor(session.score)} text-white`}>
                            {getScoreText(session.score)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Time:</span>
                          <span className="font-medium">{formatTime(session.time_spent)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-medium">
                            {format(new Date(session.finished_at!), "MMM dd, yyyy")}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Time:</span>
                          <span className="font-medium">
                            {format(new Date(session.finished_at!), "HH:mm")}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(session.id)}
                      className="ml-4"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SessionHistory;

