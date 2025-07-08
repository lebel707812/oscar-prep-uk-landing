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
  generatePatient, 
  chatWithPatient, 
  evaluateInterview,
  type PatientProfile,
  type ChatMessage,
  type InterviewEvaluation
} from "@/lib/openai";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const PacientAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<PatientProfile | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [summary, setSummary] = useState<InterviewEvaluation | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startNewInterview = async () => {
    const newPatient = await generatePatient();
    setCurrentPatient(newPatient);
    setMessages([]);
    setInterviewStarted(true);
    setInterviewEnded(false);
    setSummary(null);
    setSessionStartTime(new Date());
    
    // Initial patient introduction
    const introMessage: Message = {
      id: Date.now().toString(),
      content: `Hello, I'm ${newPatient.name}. I'm ${newPatient.age} years old and I'm here because I've been having ${newPatient.chief_complaint.toLowerCase()}. I'm quite worried about it.`,
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
      // Prepare conversation history for backend API
      const conversationHistory: ChatMessage[] = messages.map(msg => ({
        sender: msg.isUser ? 'user' : 'patient',
        message: msg.content,
        timestamp: msg.timestamp,
      }));

      // Add current user message to history
      conversationHistory.push({
        sender: 'user',
        message: inputMessage,
        timestamp: new Date(),
      });

      const response = await chatWithPatient(inputMessage, currentPatient, conversationHistory);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get patient response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const endInterview = async () => {
    if (!currentPatient || !sessionStartTime) return;

    setInterviewEnded(true);
    setIsTyping(true);

    try {
      // Prepare conversation history for evaluation
      const conversationHistory: ChatMessage[] = messages.map(msg => ({
        sender: msg.isUser ? 'user' : 'patient',
        message: msg.content,
        timestamp: msg.timestamp,
      }));

      const evaluation = await evaluateInterview(conversationHistory, currentPatient);
      setSummary(evaluation);

      toast({
        title: "Interview Completed",
        description: `Performance Score: ${evaluation.score}%`,
      });
    } catch (error) {
      console.error("Error evaluating interview:", error);
      toast({
        title: "Error",
        description: "Failed to evaluate interview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatDuration = (startTime: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              PacientAI - Virtual Patient Simulator
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Practice your clinical interview skills with AI-powered virtual patients. 
              Each patient has unique symptoms, personality, and medical history.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Information Panel */}
            <div className="lg:col-span-1">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentPatient ? (
                    <>
                      <div>
                        <h3 className="font-semibold text-lg">{currentPatient.name}</h3>
                        <p className="text-gray-600">
                          {currentPatient.age} years old, {currentPatient.gender}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Chief Complaint</h4>
                        <Badge variant="outline" className="text-sm">
                          {currentPatient.chief_complaint}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Current Symptoms</h4>
                        <div className="flex flex-wrap gap-1">
                          {currentPatient.symptoms.map((symptom, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-2">Vital Signs</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>BP: {currentPatient.vital_signs.bp}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="h-4 w-4 text-blue-500" />
                            <span>HR: {currentPatient.vital_signs.hr}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Thermometer className="h-4 w-4 text-orange-500" />
                            <span>Temp: {currentPatient.vital_signs.temp}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="h-4 w-4 text-green-500" />
                            <span>RR: {currentPatient.vital_signs.rr}</span>
                          </div>
                        </div>
                      </div>

                      {sessionStartTime && (
                        <>
                          <Separator />
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">
                              Duration: {formatDuration(sessionStartTime)}
                            </span>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No patient selected</p>
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
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Performance Score</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${summary.score}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold">{summary.score}%</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Areas Covered</h4>
                      <div className="flex flex-wrap gap-1">
                        {summary.areas_covered.map((area, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Feedback</h4>
                      <p className="text-sm text-gray-600">{summary.feedback}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Symptoms Reported</h4>
                      <div className="flex flex-wrap gap-1">
                        {summary.symptoms_reported.map((symptom, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Possible Diagnosis</h4>
                      <p className="text-sm text-gray-600">{summary.possible_diagnosis}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      Patient Interview
                    </CardTitle>
                    <div className="flex gap-2">
                      {!interviewStarted && (
                        <Button onClick={startNewInterview}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Start New Interview
                        </Button>
                      )}
                      {interviewStarted && !interviewEnded && (
                        <Button onClick={endInterview} variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          End Interview
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {!interviewStarted ? (
                      <div className="text-center py-12">
                        <Bot className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Ready to Start?
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Click "Start New Interview" to begin practicing with a virtual patient.
                        </p>
                      </div>
                    ) : (
                      <>
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                message.isUser
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-900'
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
                            <div className="bg-gray-100 rounded-lg px-4 py-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Input Area */}
                  {interviewStarted && !interviewEnded && (
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your question or response..."
                          disabled={isTyping}
                          className="flex-1"
                        />
                        <Button 
                          onClick={handleSendMessage} 
                          disabled={!inputMessage.trim() || isTyping}
                          size="icon"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PacientAI;

