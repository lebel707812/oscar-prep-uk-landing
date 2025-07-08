import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  User, 
  Bot, 
  RefreshCw, 
  FileText, 
  Clock,
  Heart,
  Thermometer,
  Activity
} from "lucide-react";
import { 
  generateRandomPatient, 
  createPatientSystemPrompt, 
  generateAIResponse, 
  generateInterviewSummary,
  type PatientProfile 
} from "@/lib/openai";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface InterviewSummary {
  symptomsReported: string[];
  possibleDiagnosis: string[];
  performanceAssessment: string;
  completenessScore: number;
}

const PacientAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<PatientProfile | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [summary, setSummary] = useState<InterviewSummary | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startNewInterview = () => {
    const newPatient = generateRandomPatient();
    setCurrentPatient(newPatient);
    setMessages([]);
    setInterviewStarted(true);
    setInterviewEnded(false);
    setSummary(null);
    setSessionStartTime(new Date());
    
    // Initial patient introduction
    const introMessage: Message = {
      id: Date.now().toString(),
      content: `Hello, I'm ${newPatient.name}. I'm ${newPatient.age} years old and I'm here because I've been having ${newPatient.chiefComplaint.toLowerCase()}. I'm quite worried about it.`,
      isUser: false,
      timestamp: new Date(),
    };
    
    setMessages([introMessage]);
    
    toast({
      title: "New Patient Interview Started",
      description: `You are now interviewing ${newPatient.name}`,
    });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentPatient || interviewEnded) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Prepare conversation history for AI
      const conversationHistory = [
        { role: 'system' as const, content: createPatientSystemPrompt(currentPatient) },
        ...messages.map(msg => ({
          role: msg.isUser ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        { role: 'user' as const, content: inputMessage }
      ];

      const aiResponse = await generateAIResponse(conversationHistory, currentPatient);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast({
        title: "Error",
        description: "Failed to get patient response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const endInterview = () => {
    if (!currentPatient) return;
    
    const interviewSummary = generateInterviewSummary(messages, currentPatient);
    setSummary(interviewSummary);
    setInterviewEnded(true);
    
    toast({
      title: "Interview Completed",
      description: `Performance Score: ${interviewSummary.completenessScore}%`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatDuration = () => {
    if (!sessionStartTime) return "0:00";
    const now = new Date();
    const diff = Math.floor((now.getTime() - sessionStartTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            PacientAI – Virtual Patient Simulation
          </h1>
          <p className="text-lg text-muted-foreground">
            Practice your clinical interview skills with AI-powered virtual patients
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Information Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentPatient ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">{currentPatient.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentPatient.age} years old, {currentPatient.gender}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Chief Complaint</h4>
                      <Badge variant="outline">{currentPatient.chiefComplaint}</Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Vital Signs</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-3 w-3" />
                          <span>Temp: {currentPatient.vitalSigns.temperature}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="h-3 w-3" />
                          <span>BP: {currentPatient.vitalSigns.bloodPressure}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-3 w-3" />
                          <span>HR: {currentPatient.vitalSigns.heartRate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-3 w-3" />
                          <span>RR: {currentPatient.vitalSigns.respiratoryRate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-3 w-3" />
                          <span>O2 Sat: {currentPatient.vitalSigns.oxygenSaturation}</span>
                        </div>
                      </div>
                    </div>
                    
                    {interviewStarted && (
                      <div className="pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Duration: {formatDuration()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">
                      No patient assigned yet
                    </p>
                    <Button onClick={startNewInterview} className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Start New Interview
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Interview Summary */}
            {summary && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Interview Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Performance Score</h4>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={`${
                            summary.completenessScore >= 80 ? 'bg-green-500' :
                            summary.completenessScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          } text-white`}
                        >
                          {summary.completenessScore}%
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Assessment</h4>
                      <p className="text-sm text-muted-foreground">
                        {summary.performanceAssessment}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Symptoms Reported</h4>
                      <div className="flex flex-wrap gap-1">
                        {summary.symptomsReported.map((symptom, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Possible Diagnoses</h4>
                      <div className="flex flex-wrap gap-1">
                        {summary.possibleDiagnosis.map((diagnosis, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {diagnosis}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[700px] flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Virtual Patient Interview
                  </CardTitle>
                  <div className="flex gap-2">
                    {interviewStarted && !interviewEnded && (
                      <Button onClick={endInterview} variant="outline" size="sm">
                        End Interview
                      </Button>
                    )}
                    <Button onClick={startNewInterview} size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      New Patient
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Messages area */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg">
                  {!interviewStarted ? (
                    <div className="text-center py-12">
                      <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Ready to Start</h3>
                      <p className="text-muted-foreground mb-6">
                        Click "Start New Interview" to begin practicing with a virtual patient
                      </p>
                      <Button onClick={startNewInterview}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Start New Interview
                      </Button>
                    </div>
                  ) : (
                    <>
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.isUser
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border text-card-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-card border text-card-foreground p-3 rounded-lg">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {interviewEnded && (
                        <div className="text-center py-6 border-t">
                          <h3 className="font-semibold mb-2">Interview Completed</h3>
                          <p className="text-sm text-muted-foreground">
                            Check the summary panel for your performance assessment
                          </p>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Input area */}
                {interviewStarted && !interviewEnded && (
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask the patient about their symptoms, history, or concerns..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!inputMessage.trim() || isTyping}
                      size="icon"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2 text-foreground">About PacientAI</h3>
          <p className="text-sm text-muted-foreground">
            PacientAI uses advanced AI to simulate realistic patient interactions. Each virtual patient has unique symptoms, 
            medical history, and personality. Practice your clinical interview skills and receive detailed performance feedback.
            {!process.env.REACT_APP_OPENAI_API_KEY && (
              <span className="block mt-2 text-yellow-600">
                Note: Currently running in demo mode with simulated responses. Configure OpenAI API key for full AI integration.
              </span>
            )}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PacientAI;

