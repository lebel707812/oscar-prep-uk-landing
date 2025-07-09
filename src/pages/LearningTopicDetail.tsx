import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/ui/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  PlayCircle, 
  FileText, 
  Quiz,
  Users,
  Trophy,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import ContentSection from "@/components/learning/ContentSection";
import InteractiveQuiz from "@/components/learning/InteractiveQuiz";
import CaseStudy from "@/components/learning/CaseStudy";
import VideoEmbed from "@/components/learning/VideoEmbed";
import ProgressTracker from "@/components/learning/ProgressTracker";
import { learningContent } from "@/data/learning-content";

const LearningTopicDetail = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  console.log("topicSlug from URL params:", topicSlug);
  const navigate = useNavigate();
  const [currentSession, setCurrentSession] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  // Find the topic based on the slug
  const topic = learningContent.find(t => t.slug === topicSlug);
  console.log("Found topic:", topic);
  console.log("Full learningContent array:", learningContent);

  useEffect(() => {
    if (!topic) {
      navigate('/learning-hub');
      return;
    }
    
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem(`learning-progress-${topicSlug}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentSession(progress.currentSession || 0);
      setCurrentSection(progress.currentSection || 0);
      setCompletedSections(new Set(progress.completedSections || []));
    }
  }, [topicSlug, topic, navigate]);

  if (!topic) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Topic not found</h1>
          <Button onClick={() => navigate('/learning-hub')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Hub
          </Button>
        </div>
      </Layout>
    );
  }

  const currentSessionData = topic.sessions[currentSession];
  const currentSectionData = currentSessionData?.sections[currentSection];

  const handleSectionComplete = () => {
    const sectionId = `${currentSession}-${currentSection}`;
    const newCompleted = new Set(completedSections);
    newCompleted.add(sectionId);
    setCompletedSections(newCompleted);

    // Save progress
    const progress = {
      currentSession,
      currentSection,
      completedSections: Array.from(newCompleted)
    };
    localStorage.setItem(`learning-progress-${topicSlug}`, JSON.stringify(progress));
  };

  const navigateToNextSection = () => {
    if (currentSection < currentSessionData.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else if (currentSession < topic.sessions.length - 1) {
      setCurrentSession(currentSession + 1);
      setCurrentSection(0);
    }
  };

  const navigateToPreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else if (currentSession > 0) {
      setCurrentSession(currentSession - 1);
      setCurrentSection(topic.sessions[currentSession - 1].sections.length - 1);
    }
  };

  const calculateProgress = () => {
    const totalSections = topic.sessions.reduce((sum, session) => sum + session.sections.length, 0);
    return Math.round((completedSections.size / totalSections) * 100);
  };

  const renderSectionContent = () => {
    if (!currentSectionData) return null;

    switch (currentSectionData.type) {
      case 'content':
        return (
          <ContentSection
            title={currentSectionData.title}
            content={currentSectionData.content}
            onComplete={handleSectionComplete}
            isCompleted={completedSections.has(`${currentSession}-${currentSection}`)}
          />
        );
      case 'quiz':
        return (
          <InteractiveQuiz
            title={currentSectionData.title}
            questions={currentSectionData.quizQuestions || []}
            onComplete={handleSectionComplete}
            isCompleted={completedSections.has(`${currentSession}-${currentSection}`)}
          />
        );
      case 'case-study':
        return (
          <CaseStudy
            title={currentSectionData.title}
            scenario={currentSectionData.caseStudyContent || currentSectionData.content}
            questions={currentSectionData.quizQuestions || []}
            onComplete={handleSectionComplete}
            isCompleted={completedSections.has(`${currentSession}-${currentSection}`)}
          />
        );
      case 'video':
        return (
          <VideoEmbed
            title={currentSectionData.title}
            videoUrl={currentSectionData.videoUrl || ''}
            description={currentSectionData.content || ''}
            onComplete={handleSectionComplete}
            isCompleted={completedSections.has(`${currentSession}-${currentSection}`)}
          />
        );
      default:
        return <div>Content type not supported</div>;
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/learning-hub')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Hub
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-blue-500 bg-opacity-10">
              <topic.icon className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{topic.title}</h1>
              <p className="text-lg text-gray-600">{topic.description}</p>
            </div>
          </div>

          <ProgressTracker 
            progress={calculateProgress()}
            currentSession={currentSession + 1}
            totalSessions={topic.sessions.length}
            currentSection={currentSection + 1}
            totalSections={currentSessionData?.sections.length || 0}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Session Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sessions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {topic.sessions.map((session, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentSession(index);
                        setCurrentSection(0);
                      }}
                      className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                        currentSession === index ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{session.title}</div>
                          <div className="text-xs text-gray-500">
                            {session.sections.length} sections
                          </div>
                        </div>
                        {currentSession === index && (
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion</span>
                      <span>{calculateProgress()}%</span>
                    </div>
                    <Progress value={calculateProgress()} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    {completedSections.size} of {topic.sessions.reduce((sum, session) => sum + session.sections.length, 0)} sections completed
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{currentSessionData?.title}</CardTitle>
                    <CardDescription>
                      Section {currentSection + 1} of {currentSessionData?.sections.length}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    {currentSectionData?.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {renderSectionContent()}
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={navigateToPreviousSection}
                    disabled={currentSession === 0 && currentSection === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="text-sm text-gray-500">
                    Session {currentSession + 1}.{currentSection + 1}
                  </div>
                  
                  <Button
                    onClick={navigateToNextSection}
                    disabled={
                      currentSession === topic.sessions.length - 1 && 
                      currentSection === currentSessionData.sections.length - 1
                    }
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LearningTopicDetail;

