import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/ui/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Clock, 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  Target,
  BookOpen,
  Stethoscope,
  ClipboardList
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CaseStep {
  id: string;
  title: string;
  description: string;
  type: 'assessment' | 'history' | 'examination' | 'investigation' | 'management';
  timeLimit: number; // in seconds
  completed: boolean;
  feedback?: string;
}

interface ClinicalCaseData {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  estimatedTime: string;
  learningObjectives: string[];
  scenario: string;
  patientInfo: {
    age: number;
    gender: string;
    presentingComplaint: string;
    background: string;
  };
  steps: CaseStep[];
}

const ClinicalCaseDetail = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [caseData, setCaseData] = useState<ClinicalCaseData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [caseStarted, setCaseStarted] = useState(false);
  const [caseCompleted, setCaseCompleted] = useState(false);

  // Mock data for demonstration - in real app, this would come from API
  const mockCaseData: { [key: string]: ClinicalCaseData } = {
    'case-1': {
      id: 'case-1',
      title: 'Acute Abdominal Pain Assessment',
      description: 'A 45-year-old male presents with sudden onset severe abdominal pain.',
      difficulty: 'Intermediate',
      category: 'Emergency Medicine',
      estimatedTime: '8-10 minutes',
      learningObjectives: [
        'Perform systematic abdominal examination',
        'Identify red flag symptoms',
        'Develop differential diagnosis',
        'Communicate findings effectively'
      ],
      scenario: 'You are working in the Emergency Department when a 45-year-old male presents with sudden onset severe abdominal pain that started 2 hours ago. He appears distressed and is holding his abdomen.',
      patientInfo: {
        age: 45,
        gender: 'Male',
        presentingComplaint: 'Sudden onset severe abdominal pain',
        background: 'Previously fit and well, no significant medical history'
      },
      steps: [
        {
          id: 'step-1',
          title: 'Initial Assessment',
          description: 'Introduce yourself and perform initial assessment of the patient',
          type: 'assessment',
          timeLimit: 120,
          completed: false
        },
        {
          id: 'step-2',
          title: 'History Taking',
          description: 'Take a focused history of the presenting complaint',
          type: 'history',
          timeLimit: 180,
          completed: false
        },
        {
          id: 'step-3',
          title: 'Physical Examination',
          description: 'Perform a systematic abdominal examination',
          type: 'examination',
          timeLimit: 240,
          completed: false
        },
        {
          id: 'step-4',
          title: 'Investigations',
          description: 'Order appropriate investigations and interpret results',
          type: 'investigation',
          timeLimit: 120,
          completed: false
        },
        {
          id: 'step-5',
          title: 'Management Plan',
          description: 'Develop and communicate management plan',
          type: 'management',
          timeLimit: 120,
          completed: false
        }
      ]
    },
    'case-2': {
      id: 'case-2',
      title: 'Diabetic Ketoacidosis Management',
      description: 'A 22-year-old female with Type 1 Diabetes presents with nausea, vomiting, and altered mental status.',
      difficulty: 'Advanced',
      category: 'Endocrinology',
      estimatedTime: '10-12 minutes',
      learningObjectives: [
        'Recognise signs and symptoms of DKA',
        'Perform appropriate investigations',
        'Initiate emergency management',
        'Monitor treatment response'
      ],
      scenario: 'A 22-year-old female with known Type 1 Diabetes is brought to A&E by her flatmate who found her confused and vomiting. She has been unwell for 2 days with flu-like symptoms.',
      patientInfo: {
        age: 22,
        gender: 'Female',
        presentingComplaint: 'Nausea, vomiting, and confusion',
        background: 'Type 1 Diabetes diagnosed age 12, usually well controlled'
      },
      steps: [
        {
          id: 'step-1',
          title: 'Initial Assessment',
          description: 'Assess airway, breathing, circulation and consciousness level',
          type: 'assessment',
          timeLimit: 90,
          completed: false
        },
        {
          id: 'step-2',
          title: 'History Taking',
          description: 'Take focused history from patient and collateral history',
          type: 'history',
          timeLimit: 150,
          completed: false
        },
        {
          id: 'step-3',
          title: 'Physical Examination',
          description: 'Perform targeted examination focusing on DKA signs',
          type: 'examination',
          timeLimit: 180,
          completed: false
        },
        {
          id: 'step-4',
          title: 'Urgent Investigations',
          description: 'Order and interpret urgent blood tests and investigations',
          type: 'investigation',
          timeLimit: 120,
          completed: false
        },
        {
          id: 'step-5',
          title: 'Emergency Management',
          description: 'Initiate appropriate emergency treatment for DKA',
          type: 'management',
          timeLimit: 180,
          completed: false
        }
      ]
    }
  };

  useEffect(() => {
    if (caseId && mockCaseData[caseId]) {
      setCaseData(mockCaseData[caseId]);
      setTimeRemaining(mockCaseData[caseId].steps[0]?.timeLimit || 0);
    } else {
      toast({
        title: "Case not found",
        description: "The requested clinical case could not be found.",
        variant: "destructive",
      });
      navigate('/dashboard/clinical-cases');
    }
  }, [caseId, navigate, toast]);

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
  };

  const pauseTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetCase = () => {
    setCaseStarted(false);
    setIsTimerRunning(false);
    setCurrentStep(0);
    setCaseCompleted(false);
    if (caseData) {
      setTimeRemaining(caseData.steps[0]?.timeLimit || 0);
      const resetSteps = caseData.steps.map(step => ({ ...step, completed: false }));
      setCaseData({ ...caseData, steps: resetSteps });
    }
  };

  const completeStep = () => {
    if (!caseData) return;

    const updatedSteps = [...caseData.steps];
    updatedSteps[currentStep].completed = true;
    setCaseData({ ...caseData, steps: updatedSteps });

    if (currentStep < caseData.steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setTimeRemaining(caseData.steps[nextStep].timeLimit);
      setIsTimerRunning(true);
    } else {
      setCaseCompleted(true);
      setIsTimerRunning(false);
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

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'assessment':
        return <Stethoscope className="h-4 w-4" />;
      case 'history':
        return <ClipboardList className="h-4 w-4" />;
      case 'examination':
        return <Stethoscope className="h-4 w-4" />;
      case 'investigation':
        return <BookOpen className="h-4 w-4" />;
      case 'management':
        return <Target className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!caseData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading case...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard/clinical-cases')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clinical Cases
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{caseData.title}</h1>
            <Badge variant="outline" className={getDifficultyColor(caseData.difficulty)}>
              {caseData.difficulty}
            </Badge>
          </div>
          
          <p className="text-lg text-gray-600 mb-4">{caseData.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Category: {caseData.category}</span>
            <span>Duration: {caseData.estimatedTime}</span>
          </div>
        </div>

        {!caseStarted ? (
          /* Case Overview */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scenario</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{caseData.scenario}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Age:</span>
                      <span>{caseData.patientInfo.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Gender:</span>
                      <span>{caseData.patientInfo.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Presenting Complaint:</span>
                      <span>{caseData.patientInfo.presentingComplaint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Background:</span>
                      <span>{caseData.patientInfo.background}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Learning Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {caseData.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Case Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {caseData.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getStepIcon(step.type)}
                            <span className="font-medium text-sm">{step.title}</span>
                          </div>
                          <p className="text-xs text-gray-600">{step.description}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatTime(step.timeLimit)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button onClick={startCase} size="lg" className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Start Case
              </Button>
            </div>
          </div>
        ) : (
          /* Case in Progress */
          <div className="space-y-6">
            {/* Timer and Progress */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-2xl font-mono font-bold">
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={pauseTimer}>
                        {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={resetCase}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Step {currentStep + 1} of {caseData.steps.length}
                    </p>
                    <Progress 
                      value={(currentStep / caseData.steps.length) * 100} 
                      className="w-32"
                    />
                  </div>
                </div>

                {timeRemaining <= 30 && timeRemaining > 0 && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      Warning: Only {timeRemaining} seconds remaining for this step!
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Current Step */}
            {!caseCompleted && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {getStepIcon(caseData.steps[currentStep].type)}
                    <CardTitle>{caseData.steps[currentStep].title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">
                    {caseData.steps[currentStep].description}
                  </CardDescription>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium mb-2">Instructions:</h4>
                    <p className="text-sm text-gray-700">
                      Complete this step within the time limit. Click "Complete Step" when you have 
                      finished this part of the examination. You can pause the timer if needed.
                    </p>
                  </div>

                  <Button onClick={completeStep} className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Step
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Case Completed */}
            {caseCompleted && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Case Completed!</h2>
                    <p className="text-gray-600 mb-6">
                      Congratulations! You have successfully completed this clinical case.
                    </p>
                    
                    <div className="flex gap-4 justify-center">
                      <Button variant="outline" onClick={resetCase}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restart Case
                      </Button>
                      <Button onClick={() => navigate('/dashboard/clinical-cases')}>
                        Back to Cases
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Steps Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {caseData.steps.map((step, index) => (
                    <div 
                      key={step.id} 
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        index === currentStep ? 'bg-blue-50 border border-blue-200' :
                        step.completed ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        step.completed ? 'bg-green-100' :
                        index === currentStep ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className={`text-sm font-medium ${
                            index === currentStep ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {getStepIcon(step.type)}
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
      </div>
    </Layout>
  );
};

export default ClinicalCaseDetail;

