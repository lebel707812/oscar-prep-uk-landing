import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, HelpCircle, RotateCcw } from "lucide-react";
import { useProgress } from "../../contexts/ProgressContext";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface InteractiveQuizProps {
  title: string;
  questions: QuizQuestion[];
  onComplete: () => void; // This is now primarily for navigating to next section
  isCompleted: boolean;
  topicId: string;
  sessionId: string;
  sectionId: string;
}

const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  title,
  questions,
  onComplete,
  isCompleted,
  topicId,
  sessionId,
  sectionId,
}) => {
  const { markSectionComplete, markSessionComplete } = useProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizAttempted, setQuizAttempted] = useState(false); // To track if quiz was attempted

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizAttempted(true);
      const score = calculateScore();
      let sessionStatus: 'good' | 'mastered' | 'needs-work' = 'needs-work';
      if (score >= 80) {
        sessionStatus = 'mastered';
      } else if (score >= 60) {
        sessionStatus = 'good';
      }
      markSectionComplete(topicId, sessionId, sectionId);
      markSessionComplete(topicId, sessionId, sessionStatus);
      onComplete(); // Call parent's onComplete to potentially navigate
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizAttempted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  if (showResults || isCompleted) {
    const score = calculateScore(); // Recalculate score if already completed or showing results
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">{title} - Results</h2>
          </div>
          <Badge className={getScoreColor(score)} variant={getScoreBadgeVariant(score)}>
            Score: {score}%
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold">
                <span className={getScoreColor(score)}>{score}%</span>
              </div>
              <p className="text-gray-600">
                You answered {questions.filter((question, index) => selectedAnswers[index] === question.correctAnswer).length} out of {questions.length} questions correctly.
              </p>
              
              {score >= 80 ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">Excellent work! You've mastered this topic.</p>
                </div>
              ) : score >= 60 ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 font-medium">Good effort! Consider reviewing the material again.</p>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-medium">You may want to review the content before proceeding.</p>
                </div>
              )}

              <Button onClick={resetQuiz} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium mb-2">{question.question}</p>
                        <p className="text-sm text-gray-600 mb-2">
                          Your answer: {question.options[userAnswer]} 
                          {!isCorrect && (
                            <span className="text-red-600"> (Incorrect)</span>
                          )}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-600 mb-2">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <Badge variant="outline">
          Question {currentQuestion + 1} of {questions.length}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => handleAnswerSelect(currentQuestion, parseInt(value))}
          >
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        
        <div className="text-sm text-gray-500">
          Progress: {Object.keys(selectedAnswers).length} of {questions.length} answered
        </div>
        
        <Button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === undefined}
        >
          {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default InteractiveQuiz;


