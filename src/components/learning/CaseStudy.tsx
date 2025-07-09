import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Users, FileText, Lightbulb } from "lucide-react";

interface CaseQuestion {
  id: string;
  question: string;
  sampleAnswer: string;
  keyPoints: string[];
}

interface CaseStudyProps {
  title: string;
  scenario: string;
  questions: CaseQuestion[];
  onComplete: () => void;
  isCompleted: boolean;
}

const CaseStudy: React.FC<CaseStudyProps> = ({
  title,
  scenario,
  questions,
  onComplete,
  isCompleted
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showSampleAnswers, setShowSampleAnswers] = useState<{ [key: number]: boolean }>({});
  const [caseCompleted, setCaseCompleted] = useState(isCompleted);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const toggleSampleAnswer = (questionIndex: number) => {
    setShowSampleAnswers(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (!caseCompleted) {
        setCaseCompleted(true);
        onComplete();
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQ = questions[currentQuestion];
  const userAnswer = userAnswers[currentQuestion] || '';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          {caseCompleted && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </div>

      {/* Case Scenario */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Clinical Scenario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-blue-800 whitespace-pre-line">
            {scenario}
          </div>
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type your answer here..."
            value={userAnswer}
            onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
            className="min-h-[120px]"
          />
          
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => toggleSampleAnswer(currentQuestion)}
              className="text-sm"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showSampleAnswers[currentQuestion] ? "Hide" : "Show"} Sample Answer
            </Button>
            
            <div className="text-sm text-gray-500">
              {userAnswer.length} characters
            </div>
          </div>

          {/* Sample Answer */}
          {showSampleAnswers[currentQuestion] && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-900">Sample Answer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-green-800 whitespace-pre-line mb-4">
                  {currentQ.sampleAnswer}
                </div>
                
                {currentQ.keyPoints.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-900 mb-2">Key Points to Include:</h4>
                    <ul className="list-disc list-inside space-y-1 text-green-800">
                      {currentQ.keyPoints.map((point, index) => (
                        <li key={index} className="text-sm">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          Previous Question
        </Button>
        
        <div className="text-sm text-gray-500">
          Progress: {Object.keys(userAnswers).filter(key => userAnswers[parseInt(key)].trim().length > 0).length} of {questions.length} answered
        </div>
        
        <Button
          onClick={handleNextQuestion}
          disabled={userAnswer.trim().length === 0}
        >
          {currentQuestion === questions.length - 1 ? "Complete Case Study" : "Next Question"}
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="flex space-x-2">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded ${
              index < currentQuestion
                ? "bg-green-500"
                : index === currentQuestion
                ? "bg-blue-500"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CaseStudy;

