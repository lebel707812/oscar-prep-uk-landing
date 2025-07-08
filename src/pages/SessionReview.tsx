import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Layout from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  BookOpen,
  Target,
  AlertCircle
} from "lucide-react";

interface SessionDetails {
  id: string;
  topic_name: string;
  level: number;
  score: number | null;
  time_spent: number | null;
  started_at: string;
  finished_at: string | null;
}

interface QuestionReview {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string | null;
  user_answer: string;
  is_correct: boolean;
}

const SessionReview = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
  const [questions, setQuestions] = useState<QuestionReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetails();
    }
  }, [sessionId]);

  const fetchSessionDetails = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to view session details",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Fetch session details
      const { data: sessionData, error: sessionError } = await supabase
        .from("exam_sessions")
        .select(`
          id,
          level,
          score,
          time_spent,
          started_at,
          finished_at,
          topics (
            name
          )
        `)
        .eq("id", sessionId)
        .eq("user_id", user.id)
        .single();

      if (sessionError) {
        console.error("Error fetching session:", sessionError);
        toast({
          title: "Error",
          description: "Session not found or access denied",
          variant: "destructive",
        });
        navigate("/dashboard/session-history");
        return;
      }

      setSessionDetails({
        id: sessionData.id,
        topic_name: sessionData.topics?.name || "Unknown Topic",
        level: sessionData.level,
        score: sessionData.score,
        time_spent: sessionData.time_spent,
        started_at: sessionData.started_at,
        finished_at: sessionData.finished_at,
      });

      // Fetch questions and answers
      const { data: answersData, error: answersError } = await supabase
        .from("exam_answers")
        .select(`
          question_id,
          selected_option,
          is_correct,
          questions (
            id,
            question_text,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            explanation
          )
        `)
        .eq("exam_session_id", sessionId);

      if (answersError) {
        console.error("Error fetching answers:", answersError);
        toast({
          title: "Error",
          description: "Failed to load question details",
          variant: "destructive",
        });
        return;
      }

      const formattedQuestions = answersData?.map((answer: any) => ({
        id: answer.questions.id,
        question_text: answer.questions.question_text,
        option_a: answer.questions.option_a,
        option_b: answer.questions.option_b,
        option_c: answer.questions.option_c,
        option_d: answer.questions.option_d,
        correct_option: answer.questions.correct_option,
        explanation: answer.questions.explanation,
        user_answer: answer.selected_option,
        is_correct: answer.is_correct,
      })) || [];

      setQuestions(formattedQuestions);
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

  const getOptionText = (option: string, question: QuestionReview) => {
    switch (option.toLowerCase()) {
      case 'a': return question.option_a;
      case 'b': return question.option_b;
      case 'c': return question.option_c;
      case 'd': return question.option_d;
      default: return 'Unknown';
    }
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "bg-gray-500";
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading session details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!sessionDetails) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Session Not Found</h3>
              <p className="text-muted-foreground text-center mb-6">
                The session you're looking for doesn't exist or you don't have access to it.
              </p>
              <Button onClick={() => navigate("/dashboard/session-history")}>
                Back to History
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const correctAnswers = questions.filter(q => q.is_correct).length;
  const totalQuestions = questions.length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/session-history")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to History
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Session Review</h1>
          <p className="text-muted-foreground">
            Detailed review of your {sessionDetails.topic_name} Level {sessionDetails.level} session
          </p>
        </div>

        {/* Session Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Session Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Final Score</p>
                <Badge className={`${getScoreColor(sessionDetails.score)} text-white text-lg px-3 py-1`}>
                  {sessionDetails.score ? `${sessionDetails.score}%` : "N/A"}
                </Badge>
              </div>
              
              <div className="text-center">
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Correct Answers</p>
                <p className="text-2xl font-bold">{correctAnswers}/{totalQuestions}</p>
              </div>
              
              <div className="text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Time Spent</p>
                <p className="text-2xl font-bold">{formatTime(sessionDetails.time_spent)}</p>
              </div>
              
              <div className="text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-lg font-semibold">
                  {sessionDetails.finished_at ? 
                    format(new Date(sessionDetails.finished_at), "MMM dd, yyyy HH:mm") : 
                    "N/A"
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions Review */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Question Review</h2>
          
          {questions.map((question, index) => (
            <Card key={question.id} className="overflow-hidden">
              <CardHeader className={`${question.is_correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    Question {index + 1}
                    {question.is_correct ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </span>
                  <Badge variant={question.is_correct ? "default" : "destructive"}>
                    {question.is_correct ? "Correct" : "Incorrect"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Question:</h4>
                    <p className="text-gray-700">{question.question_text}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['a', 'b', 'c', 'd'].map((option) => (
                      <div
                        key={option}
                        className={`p-3 rounded-lg border ${
                          option.toLowerCase() === question.correct_option.toLowerCase()
                            ? 'bg-green-100 border-green-300'
                            : option.toLowerCase() === question.user_answer.toLowerCase() && !question.is_correct
                            ? 'bg-red-100 border-red-300'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{option.toUpperCase()}.</span>
                          <span>{getOptionText(option, question)}</span>
                          {option.toLowerCase() === question.correct_option.toLowerCase() && (
                            <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                          )}
                          {option.toLowerCase() === question.user_answer.toLowerCase() && !question.is_correct && (
                            <XCircle className="h-4 w-4 text-red-600 ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Your Answer: </span>
                      <span className={question.is_correct ? "text-green-600" : "text-red-600"}>
                        {question.user_answer.toUpperCase()}. {getOptionText(question.user_answer, question)}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Correct Answer: </span>
                      <span className="text-green-600">
                        {question.correct_option.toUpperCase()}. {getOptionText(question.correct_option, question)}
                      </span>
                    </div>
                  </div>
                  
                  {question.explanation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h5 className="font-semibold text-blue-800 mb-2">Explanation:</h5>
                      <p className="text-blue-700">{question.explanation}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SessionReview;

