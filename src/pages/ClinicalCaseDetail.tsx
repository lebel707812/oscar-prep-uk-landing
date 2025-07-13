import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/ui/Layout";
import FeedbackSystem from "@/components/ui/FeedbackSystem";
import "../styles/ui-improvements.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Play, Pause, RotateCcw, CheckCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClinicalStep {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in seconds
  completed: boolean;
}

interface ClinicalCaseData {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  totalTime: number;
  steps: ClinicalStep[];
}

const ClinicalCaseDetail: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [caseData, setCaseData] = useState<ClinicalCaseData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [caseStarted, setCaseStarted] = useState(false);
  const [caseCompleted, setCaseCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [stepPerformances, setStepPerformances] = useState<Array<{
    stepId: string;
    timeSpent: number;
    timeLimit: number;
    completed: boolean;
    efficiency: 'excellent' | 'good' | 'needs_improvement';
  }>>([]);
  const [stepStartTime, setStepStartTime] = useState<number>(0);

  // Mock data for demonstration - in real app, this would come from API
  const mockCaseData: { [key: string]: ClinicalCaseData } = {
    "case-1": {
      id: "case-1",
      title: "Acute Abdominal Pain Assessment",
      description: "A 45-year-old male presents with sudden onset severe abdominal pain. Practice your assessment skills and differential diagnosis.",
      difficulty: "Intermediate",
      category: "Emergency Medicine",
      totalTime: 600, // 10 minutes
      steps: [
        {
          id: "initial-assessment",
          title: "Initial Assessment",
          description: "Conduct primary survey and obtain vital signs",
          timeLimit: 120, // 2 minutes
          completed: false
        },
        {
          id: "history-taking",
          title: "History Taking",
          description: "Take a focused history including pain characteristics, associated symptoms, and relevant medical history",
          timeLimit: 180, // 3 minutes
          completed: false
        },
        {
          id: "physical-examination",
          title: "Physical Examination",
          description: "Perform systematic abdominal examination and relevant system examination",
          timeLimit: 180, // 3 minutes
          completed: false
        },
        {
          id: "differential-diagnosis",
          title: "Differential Diagnosis",
          description: "Formulate differential diagnosis and discuss most likely causes",
          timeLimit: 60, // 1 minute
          completed: false
        },
        {
          id: "management-plan",
          title: "Management Plan",
          description: "Outline immediate management and further investigations",
          timeLimit: 60, // 1 minute
          completed: false
        }
      ]
    },
    "case-2": {
      id: "case-2",
      title: "Diabetic Ketoacidosis Management",
      description: "A 22-year-old female with Type 1 Diabetes presents with nausea, vomiting, and altered mental status. Learn to recognise and manage DKA.",
      difficulty: "Advanced",
      category: "Endocrinology",
      totalTime: 720, // 12 minutes
      steps: [
        {
          id: "initial-assessment",
          title: "Initial Assessment",
          description: "Rapid assessment and stabilization",
          timeLimit: 120,
          completed: false
        },
        {
          id: "history-examination",
          title: "History & Examination",
          description: "Focused history and physical examination",
          timeLimit: 180,
          completed: false
        },
        {
          id: "investigations",
          title: "Investigations",
          description: "Order and interpret relevant investigations",
          timeLimit: 120,
          completed: false
        },
        {
          id: "diagnosis",
          title: "Diagnosis",
          description: "Confirm diagnosis of DKA",
          timeLimit: 60,
          completed: false
        },
        {
          id: "management",
          title: "Management",
          description: "Implement DKA management protocol",
          timeLimit: 180,
          completed: false
        },
        {
          id: "monitoring",
          title: "Monitoring",
          description: "Plan ongoing monitoring and care",
          timeLimit: 60,
          completed: false
        }
      ]
    }
  };

  useEffect(() => {
    if (caseId && mockCaseData[caseId]) {
      setCaseData(mockCaseData[caseId]);
      setTimeRemaining(mockCaseData[caseId].steps[0].timeLimit);
    } else {
      // Case not found, redirect to clinical cases page
      navigate('/clinical-cases');
    }
  }, [caseId, navigate]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            toast({
              title: "Time's up!",
              description: "Time limit for this step has been reached.",
              variant: "destructive",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, toast]);

  const startCase = () => {
    setCaseStarted(true);
    setIsTimerRunning(true);
    setStepStartTime(Date.now());
  };

  const pauseTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetCase = () => {
    if (caseData) {
      setCaseStarted(false);
      setIsTimerRunning(false);
      setCurrentStep(0);
      setTimeRemaining(caseData.steps[0].timeLimit);
      setCaseCompleted(false);
      setShowFeedback(false);
      setStepPerformances([]);
      
      const resetSteps = caseData.steps.map(step => ({ ...step, completed: false }));
      setCaseData({ ...caseData, steps: resetSteps });
    }
  };

  const completeStep = () => {
    if (!caseData) return;

    const currentStepData = caseData.steps[currentStep];
    const timeSpent = (Date.now() - stepStartTime) / 1000; // Convert to seconds
    const efficiency = timeSpent <= currentStepData.timeLimit * 0.8 ? 'excellent' : 
                      timeSpent <= currentStepData.timeLimit ? 'good' : 'needs_improvement';

    // Record step performance
    const stepPerformance = {
      stepId: currentStepData.id,
      timeSpent,
      timeLimit: currentStepData.timeLimit,
      completed: true,
      efficiency
    };

    setStepPerformances(prev => [...prev, stepPerformance]);

    const updatedSteps = [...caseData.steps];
    updatedSteps[currentStep].completed = true;
    setCaseData({ ...caseData, steps: updatedSteps });

    if (currentStep < caseData.steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setTimeRemaining(caseData.steps[nextStep].timeLimit);
      setIsTimerRunning(true);
      setStepStartTime(Date.now());
    } else {
      setCaseCompleted(true);
      setIsTimerRunning(false);
      setShowFeedback(true);
      toast({
        title: "Case completed!",
        description: "Well done! You have completed this clinical case.",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (!caseData) return 0;
    return ((currentStep + (caseCompleted ? 1 : 0)) / caseData.steps.length) * 100;
  };

  if (!caseData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Not Found</h1>
            <p className="text-gray-600 mb-6">The clinical case you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/clinical-cases')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Clinical Cases
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {showFeedback && caseId ? (
        <div className="container mx-auto px-4 py-8">
          <FeedbackSystem 
            caseId={caseId}
            stepPerformances={stepPerformances}
            onClose={() => setShowFeedback(false)}
          />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/clinical-cases')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Clinical Cases
            </Button>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{caseData.title}</h1>
                <p className="text-gray-600 mb-4">{caseData.description}</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">{caseData.difficulty}</Badge>
                  <Badge variant="outline">{caseData.category}</Badge>
                </div>
              </div>
              
              {/* Timer and Controls */}
              <div className="flex flex-col items-center lg:items-end gap-4">
                <div className="text-center lg:text-right">
                <div className="text-3xl font-mono font-bold text-blue-600 mb-1 timer-pulse">
                  {formatTime(timeRemaining)}
                </div>
                  <div className="text-sm text-gray-500">
                    Step {currentStep + 1} of {caseData.steps.length}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {!caseStarted ? (
                    <Button onClick={startCase} className="bg-green-600 hover:bg-green-700 btn-hover-effect focus-enhanced">
                      <Play className="w-4 h-4 mr-2" />
                      Start Case
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={pauseTimer} 
                        variant="outline"
                        disabled={caseCompleted}
                        className="btn-hover-effect focus-enhanced"
                      >
                        {isTimerRunning ? (
                          <Pause className="w-4 h-4 mr-2" />
                        ) : (
                          <Play className="w-4 h-4 mr-2" />
                        )}
                        {isTimerRunning ? 'Pause' : 'Resume'}
                      </Button>
                      <Button onClick={resetCase} variant="outline" className="btn-hover-effect focus-enhanced">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(getProgressPercentage())}% Complete</span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2 progress-animate" />
            </div>
          </div>

          {/* Current Step */}
          {caseStarted && !caseCompleted && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {caseData.steps[currentStep].title}
                  </CardTitle>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTime(caseData.steps[currentStep].timeLimit)}
                  </Badge>
                </div>
                <CardDescription>
                  {caseData.steps[currentStep].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Complete this step when you're ready to move on
                  </div>
                  <Button 
                    onClick={completeStep}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Case Completed */}
          {caseCompleted && (
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-xl text-green-800 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Case Completed!
                </CardTitle>
                <CardDescription className="text-green-700">
                  Congratulations! You have successfully completed this clinical case.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button onClick={() => setShowFeedback(true)}>
                    View Detailed Feedback
                  </Button>
                  <Button onClick={resetCase} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Button onClick={() => navigate('/clinical-cases')} variant="outline">
                    Back to Cases
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Steps Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Case Steps</CardTitle>
              <CardDescription>
                Overview of all steps in this clinical case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseData.steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      step.completed ? 'bg-green-50 border-green-200' :
                      index === currentStep && caseStarted ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.completed ? 'bg-green-600 text-white' :
                        index === currentStep && caseStarted ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {step.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <div>
                        <span className={`font-medium text-sm ${
                          step.completed ? 'text-green-800' :
                          index === currentStep ? 'text-blue-800' : 'text-gray-700'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTime(step.timeLimit)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default ClinicalCaseDetail;

