import React, { useEffect, useState, useRef, useCallback } from "react";
import Layout from "@/components/ui/Layout";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { fetchTopicName, finishExamSession } from "@/integrations/supabase/client";

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
}

interface Answer {
  questionId: string;
  selectedLetter: string;
  selectedText: string;
  correctText: string;
  isCorrect: boolean;
}

const TIME_PER_QUESTION = 120; // 2 minutes in seconds

const MockExamRunner = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const topicId = searchParams.get("topicId");
  const level = parseInt(searchParams.get("level") || "1");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [topicName, setTopicName] = useState<string>("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [examSessionId, setExamSessionId] = useState<string | null>(null);
  const examStartTime = useRef<Date | null>(null);

  // Initialize exam session and fetch topic name
  useEffect(() => {
    if (topicId) {
      createExamSession();
      loadTopicName();
    }
  }, [topicId]);

  const loadTopicName = async () => {
    if (topicId) {
      const name = await fetchTopicName(topicId);
      setTopicName(name || "");
    }
  };

  // Timer for current question
  useEffect(() => {
    if (isExamFinished || questions.length === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    setTimeLeft(TIME_PER_QUESTION);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          handleNextQuestion(true); // Auto-advance when time runs out
          return TIME_PER_QUESTION;
        }
        return time - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex, isExamFinished, questions.length]);

  const createExamSession = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || !topicId) {
        toast({
          title: "Authentication Error",
          description: "Please log in to take the exam.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("exam_sessions")
        .insert({
          user_id: user.id,
          topic_id: topicId,
          level: level,
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating exam session:", error);
        toast({
          title: "Error",
          description: "Failed to start exam session. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setExamSessionId(data.id);
      examStartTime.current = new Date();
      await fetchQuestions();
    } catch (err) {
      console.error("Unexpected error creating exam session:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      const start = (level - 1) * 10;
      const end = start + 9;
      
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("topic_id", topicId)
        .range(start, end);

      if (error) {
        console.error("Error fetching questions:", error);
        toast({
          title: "Error",
          description: "Failed to load questions. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (!data || data.length === 0) {
        toast({
          title: "No Questions Available",
          description: "No questions found for this topic and level.",
          variant: "destructive",
        });
        navigate("/dashboard/mock-exams");
        return;
      }

      setQuestions(data);
    } catch (err) {
      console.error("Unexpected error fetching questions:", err);
    }
  };

  const saveAnswer = async (
    questionId: string,
    selectedOptionLetter: string,
    isCorrect: boolean
  ) => {
    if (!examSessionId) return;

    try {
      const { error } = await supabase.from("exam_answers").insert({
        exam_session_id: examSessionId,
        question_id: questionId,
        selected_option: selectedOptionLetter,
        is_correct: isCorrect,
      });

      if (error) {
        console.error("Error saving answer:", error);
      }
    } catch (err) {
      console.error("Unexpected error saving answer:", err);
    }
  };

  const finishExam = async (finalScore: number, timeSpent: number) => {
    if (!examSessionId) return;

    try {
      await finishExamSession(examSessionId, finalScore, timeSpent);
    } catch (err) {
      console.error("Unexpected error finishing exam session:", err);
    }
  };

  const handleNextQuestion = useCallback(async (autoAdvance = false) => {
    // Prevent advancing without selection unless auto-advance
    if (!selectedOption && !autoAdvance) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const correctText = currentQuestion.correct_option;
    const selectedOptionText = selectedOption
      ? (currentQuestion[`option_${selectedOption}` as keyof Question] as string)
      : "";

    const isCorrect = selectedOptionText === correctText;
    const timeSpentOnQuestion = TIME_PER_QUESTION - timeLeft;

    // Update score
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Save answer to state
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedLetter: selectedOption || "",
      selectedText: selectedOptionText,
      correctText: correctText,
      isCorrect: isCorrect,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    // Save answer to database
    if (selectedOption) {
      await saveAnswer(currentQuestion.id, selectedOption, isCorrect);
    }

    // Update total time spent
    setTotalTimeSpent((prev) => prev + timeSpentOnQuestion);

    // Reset selection for next question
    setSelectedOption(null);

    // Check if this is the last question
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Finish exam
      const finalScore = score + (isCorrect ? 1 : 0);
      const finalTimeSpent = totalTimeSpent + timeSpentOnQuestion;
      
      setIsExamFinished(true);
      await finishExam(finalScore, finalTimeSpent);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      toast({
        title: "Exam Completed!",
        description: `You scored ${finalScore} out of ${questions.length}`,
      });
    }
  }, [
    selectedOption,
    questions,
    currentQuestionIndex,
    timeLeft,
    score,
    totalTimeSpent,
    examSessionId,
  ]);

  const restartExam = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsExamFinished(false);
    setAnswers([]);
    setTotalTimeSpent(0);
    setExamSessionId(null);
    examStartTime.current = null;
    createExamSession();
  };

  const handleGoBack = () => {
    navigate("/dashboard/mock-exams");
  };

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  // Calculate progress percentage
  const progressPercentage = questions.length > 0 
    ? ((currentQuestionIndex / questions.length) * 100) 
    : 0;

  if (!topicId) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <p className="text-destructive">Missing topic ID parameter.</p>
          <Button onClick={handleGoBack} variant="outline" className="mt-4">
            &larr; Back to Mock Exams
          </Button>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading Exam...</h1>
            <p>Please wait while we prepare your mock exam.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Mock Exam</h1>
          {topicName && (
            <p className="text-lg text-muted-foreground">Topic: {topicName}</p>
          )}
        </div>

        {/* Back button - only show when exam is finished */}
        {isExamFinished && (
          <div className="mb-4">
            <Button onClick={handleGoBack} variant="outline">
              &larr; Back to Mock Exams
            </Button>
          </div>
        )}

        {/* Progress bar and timer - only show during exam */}
        {!isExamFinished && questions.length > 0 && (
          <div className="mb-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="text-right">
              <div className={`font-mono text-lg ${timeLeft <= 30 ? 'text-destructive font-bold' : ''}`}>
                Time Left: {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        )}

        {/* Exam Results */}
        {isExamFinished ? (
          <div className="space-y-6">
            <div className="text-center p-6 bg-muted rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Exam Complete!</h2>
              <p className="text-xl mb-2">
                Your Score: <span className="font-bold">{score}</span> / {questions.length}
              </p>
              <p className="text-lg text-muted-foreground">
                Percentage: {Math.round((score / questions.length) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Total time: {formatTime(totalTimeSpent)}
              </p>
            </div>

            {/* Answer Review */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Answer Review</h3>
              <div className="space-y-4">
                {questions.map((question, idx) => {
                  const answer = answers[idx];
                  return (
                    <div
                      key={question.id}
                      className={`border rounded-lg p-4 ${
                        answer?.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <p className="font-semibold mb-2">
                        Q{idx + 1}: {question.question_text}
                      </p>
                      
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Your answer:</span>{" "}
                          {answer?.selectedText || "No answer selected"}{" "}
                          {answer?.isCorrect ? "✅" : "❌"}
                        </p>
                        
                        {!answer?.isCorrect && (
                          <p className="text-sm text-green-700">
                            <span className="font-medium">Correct answer:</span> {question.correct_option}
                          </p>
                        )}
                      </div>

                      {question.explanation && (
                        <div className="mt-3 p-3 bg-background rounded border">
                          <p className="text-sm">
                            <span className="font-medium">Explanation:</span> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={restartExam} size="lg">
                Try Again
              </Button>
              <Button onClick={handleGoBack} variant="outline" size="lg">
                Back to Mock Exams
              </Button>
            </div>
          </div>
        ) : currentQuestion ? (
          /* Current Question */
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {currentQuestion.question_text}
              </h2>
            </div>

            <div className="space-y-3">
              {(["a", "b", "c", "d"] as const).map((optionKey) => (
                <div
                  key={optionKey}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary ${
                    selectedOption === optionKey
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedOption(optionKey)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                        selectedOption === optionKey
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border"
                      }`}
                    >
                      {optionKey.toUpperCase()}
                    </div>
                    <p className="flex-1">{currentQuestion[`option_${optionKey}`]}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => handleNextQuestion()}
                disabled={!selectedOption}
                size="lg"
              >
                {currentQuestionIndex + 1 === questions.length ? "Finish Exam" : "Next Question"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg">Loading questions...</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MockExamRunner;