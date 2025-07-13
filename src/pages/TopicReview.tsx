import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/ui/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle,
  Trophy,
  Target,
  BookOpen,
  TrendingUp,
  Star,
  AlertCircle,
  Lightbulb,
  RefreshCw
} from "lucide-react";
import { learningContent } from "@/data/learning-content";
import { useProgress } from "../contexts/ProgressContext";

const TopicReview = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const navigate = useNavigate();
  const { getTopicProgress, getSessionProgress } = useProgress();

  const topic = learningContent.find(t => t.slug === topicSlug);

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

  const topicProgress = getTopicProgress(topic.id);
  const progressPercentage = topicProgress.totalSections > 0 ? Math.round((topicProgress.completedSections / topicProgress.totalSections) * 100) : 0;

  // Calculate session statuses
  const sessionStatuses = topic.sessions.map(session => {
    const sessionProgress = getSessionProgress(topic.id, session.id);
    return {
      session,
      progress: sessionProgress,
      isCompleted: sessionProgress.completed === sessionProgress.total && sessionProgress.total > 0
    };
  });

  const completedSessions = sessionStatuses.filter(s => s.isCompleted).length;
  const masteredSessions = sessionStatuses.filter(s => s.progress.status === 'mastered').length;
  const goodSessions = sessionStatuses.filter(s => s.progress.status === 'good').length;
  const needsWorkSessions = sessionStatuses.filter(s => s.progress.status === 'needs-work').length;

  // Overall performance assessment
  const getOverallPerformance = () => {
    if (progressPercentage >= 90 && masteredSessions >= topic.sessions.length * 0.7) {
      return { level: "Excellent", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" };
    } else if (progressPercentage >= 80 && (masteredSessions + goodSessions) >= topic.sessions.length * 0.8) {
      return { level: "Good", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" };
    } else if (progressPercentage >= 60) {
      return { level: "Satisfactory", color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" };
    } else {
      return { level: "Needs Improvement", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" };
    }
  };

  const performance = getOverallPerformance();

  // Generate improvement recommendations
  const getRecommendations = () => {
    const recommendations = [];
    
    if (needsWorkSessions > 0) {
      recommendations.push({
        icon: RefreshCw,
        title: "Review Challenging Sessions",
        description: `You have ${needsWorkSessions} session(s) that need more work. Consider revisiting the content and retaking quizzes.`,
        priority: "high"
      });
    }

    if (topicProgress.completedQuizzes < topicProgress.totalQuizzes) {
      recommendations.push({
        icon: Target,
        title: "Complete Remaining Quizzes",
        description: `Complete ${topicProgress.totalQuizzes - topicProgress.completedQuizzes} more quiz(es) to test your knowledge.`,
        priority: "medium"
      });
    }

    if (topicProgress.completedCaseStudies < topicProgress.totalCaseStudies) {
      recommendations.push({
        icon: BookOpen,
        title: "Practice Case Studies",
        description: `Work through ${topicProgress.totalCaseStudies - topicProgress.completedCaseStudies} more case study(ies) to apply your knowledge.`,
        priority: "medium"
      });
    }

    if (masteredSessions < topic.sessions.length * 0.5) {
      recommendations.push({
        icon: TrendingUp,
        title: "Aim for Mastery",
        description: "Try to achieve 'Mastered' status in more sessions by scoring 80% or higher in quizzes.",
        priority: "low"
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

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
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-blue-500 bg-opacity-10">
              <topic.icon className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Topic Review: {topic.title}</h1>
              <p className="text-lg text-gray-600">Your learning progress and performance summary</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Performance */}
            <Card className={`${performance.bgColor} ${performance.borderColor}`}>
              <CardHeader>
                <CardTitle className={`text-xl flex items-center gap-2 ${performance.color}`}>
                  <Trophy className="h-6 w-6" />
                  Overall Performance: {performance.level}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Topic Completion</span>
                      <span className="font-medium">{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{masteredSessions}</div>
                      <div className="text-sm text-gray-600">Mastered</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{goodSessions}</div>
                      <div className="text-sm text-gray-600">Good</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{needsWorkSessions}</div>
                      <div className="text-sm text-gray-600">Needs Work</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-600">{completedSessions}</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Session Performance</CardTitle>
                <CardDescription>Detailed breakdown of your progress in each session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessionStatuses.map(({ session, progress, isCompleted }, index) => (
                    <div key={session.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{session.title}</h3>
                        <div className="flex items-center gap-2">
                          {isCompleted && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                          <Badge 
                            variant={
                              progress.status === 'mastered' ? 'default' :
                              progress.status === 'good' ? 'secondary' :
                              progress.status === 'needs-work' ? 'destructive' : 'outline'
                            }
                          >
                            {progress.status === 'not-started' ? 'Not Started' : 
                             progress.status === 'mastered' ? 'Mastered' :
                             progress.status === 'good' ? 'Good' : 'Needs Work'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{progress.completed}/{progress.total} sections completed</span>
                        <span>{progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0}%</span>
                      </div>
                      <Progress 
                        value={progress.total > 0 ? (progress.completed / progress.total) * 100 : 0} 
                        className="h-2 mt-2" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Key Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{topicProgress.completedSections}</div>
                    <div className="text-sm text-gray-600">Sections Completed</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{topicProgress.completedQuizzes}</div>
                    <div className="text-sm text-gray-600">Quizzes Completed</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{topicProgress.completedCaseStudies}</div>
                    <div className="text-sm text-gray-600">Case Studies Completed</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{topic.totalEstimatedTime}</div>
                    <div className="text-sm text-gray-600">Minutes of Content</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sessions</span>
                  <span className="font-medium">{completedSessions}/{topic.sessions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quizzes</span>
                  <span className="font-medium">{topicProgress.completedQuizzes}/{topicProgress.totalQuizzes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Case Studies</span>
                  <span className="font-medium">{topicProgress.completedCaseStudies}/{topicProgress.totalCaseStudies}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-start gap-2">
                          <rec.icon className="h-4 w-4 text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-sm">{rec.title}</h4>
                            <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate(`/learning-hub/topic/${topic.slug}`)}
                  className="w-full"
                  variant="outline"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Continue Learning
                </Button>
                <Button 
                  onClick={() => navigate("/learning-hub")}
                  className="w-full"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Choose Another Topic
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TopicReview;

