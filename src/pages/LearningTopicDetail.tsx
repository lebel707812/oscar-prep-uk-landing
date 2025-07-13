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
  HelpCircle,
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
import { useProgress } from "../contexts/ProgressContext";

const LearningTopicDetail = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const navigate = useNavigate();
  const { progress, markSectionComplete, getSessionProgress, getTopicProgress } = useProgress();

  const topic = learningContent.find(t => t.slug === topicSlug);

  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    if (!topic) {
      navigate("/learning-hub");
      return;
    }

    // Try to find the first incomplete section/session
    let found = false;
    for (let sIdx = 0; sIdx < topic.sessions.length; sIdx++) {
      const session = topic.sessions[sIdx];
      for (let secIdx = 0; secIdx < session.sections.length; secIdx++) {
        const section = session.sections[secIdx];
        const sessionProgress = progress[topic.id]?.[session.id];
        if (!sessionProgress?.completedSections?.includes(section.id)) {
          setCurrentSessionIndex(sIdx);
          setCurrentSectionIndex(secIdx);
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (!found && topic.sessions.length > 0) { // If all completed, go to the last section of the last session
      setCurrentSessionIndex(topic.sessions.length - 1);
      setCurrentSectionIndex(topic.sessions[topic.sessions.length - 1].sections.length - 1);
    }

  }, [topicSlug, topic, navigate, progress]);

  if (!topic) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Topic not found</h1>
          <Button onClick={() => navigate("/learning-hub")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Hub
          </Button>
        </div>
      </Layout>
    );
  }

  const currentSessionData = topic.sessions[currentSessionIndex];
  const currentSectionData = currentSessionData?.sections[currentSectionIndex];

  const handleSectionComplete = (sectionId: string) => {
    markSectionComplete(topic.id, currentSessionData.id, sectionId);
  };

  const navigateToNextSection = () => {
    if (currentSectionIndex < currentSessionData.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else if (currentSessionIndex < topic.sessions.length - 1) {
      setCurrentSessionIndex(currentSessionIndex + 1);
      setCurrentSectionIndex(0);
    }
  };

  const navigateToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    } else if (currentSessionIndex > 0) {
      setCurrentSessionIndex(currentSessionIndex - 1);
      setCurrentSectionIndex(topic.sessions[currentSessionIndex - 1].sections.length - 1);
    }
  };

  const topicProgress = getTopicProgress(topic.id);
  const progressPercentage = topicProgress.totalSections > 0 ? Math.round((topicProgress.completedSections / topicProgress.totalSections) * 100) : 0;

  const renderSectionContent = () => {
    if (!currentSectionData) return null;

    const isCompleted = progress[topic.id]?.[currentSessionData.id]?.completedSections?.includes(currentSectionData.id) || false;

    switch (currentSectionData.type) {
      case "content":
        return (
          <ContentSection
            title={currentSectionData.title}
            content={currentSectionData.content}
            onComplete={() => handleSectionComplete(currentSectionData.id)}
            isCompleted={isCompleted}
          />
        );
      case "quiz":
        return (
          <InteractiveQuiz
            title={currentSectionData.title}
            questions={currentSectionData.quizQuestions || []}
            onComplete={() => handleSectionComplete(currentSectionData.id)}
            isCompleted={isCompleted}
          />
        );
      case "case-study":
        return (
          <CaseStudy
            title={currentSectionData.title}
            scenario={currentSectionData.caseStudyContent || currentSectionData.content}
            questions={currentSectionData.caseQuestions || []}
            onComplete={() => handleSectionComplete(currentSectionData.id)}
            isCompleted={isCompleted}
          />
        );
      case "video":
        return (
          <VideoEmbed
            title={currentSectionData.title}
            videoUrl={currentSectionData.videoUrl || ""}
            description={currentSectionData.content || ""}
            onComplete={() => handleSectionComplete(currentSectionData.id)}
            isCompleted={isCompleted}
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
            onClick={() => navigate("/learning-hub")}
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
            progress={progressPercentage}
            currentSession={currentSessionIndex + 1}
            totalSessions={topic.sessions.length}
            currentSection={currentSectionIndex + 1}
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
                  {topic.sessions.map((session, sIdx) => {
                    const sessionProgress = getSessionProgress(topic.id, session.id);
                    const isSessionCompleted = sessionProgress.completed === sessionProgress.total && sessionProgress.total > 0;
                    return (
                      <button
                        key={session.id}
                        onClick={() => {
                          setCurrentSessionIndex(sIdx);
                          setCurrentSectionIndex(0);
                        }}
                        className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                          currentSessionIndex === sIdx ? "bg-blue-50 border-r-2 border-blue-500" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{session.title}</div>
                            <div className="text-xs text-gray-500">
                              {sessionProgress.completed}/{sessionProgress.total} sections
                              {isSessionCompleted && <span className="ml-2 text-green-600"> (Completed)</span>}
                            </div>
                          </div>
                          {currentSessionIndex === sIdx && (
                            <ChevronRight className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                      </button>
                    );
                  })}
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
                      <span>{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    {topicProgress.completedSections} of {topicProgress.totalSections} sections completed
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
                      Section {currentSectionIndex + 1} of {currentSessionData?.sections.length}
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
                    disabled={currentSessionIndex === 0 && currentSectionIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="text-sm text-gray-500">
                    Session {currentSessionIndex + 1}.{currentSectionIndex + 1}
                  </div>
                  
                  <Button
                    onClick={navigateToNextSection}
                    disabled={
                      currentSessionIndex === topic.sessions.length - 1 && 
                      currentSectionIndex === currentSessionData.sections.length - 1
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


