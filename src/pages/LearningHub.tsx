import React, { useState, useEffect } from "react";
import Layout from "@/components/ui/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  Heart,
  Pill,
  Shield,
  Activity,
  Zap,
  UserCheck,
  FileText,
  Scale,
  Globe,
  Brain,
  Users,
  ClipboardList,
  TrendingUp,
  BookOpen,
  Trophy
} from "lucide-react";
import { learningContent } from "../data/learning-content";
import { useProgress } from "../contexts/ProgressContext";

const LearningHub = () => {
  const navigate = useNavigate();
  const { getOverallProgress, getTopicProgress } = useProgress();

  const { completedTopics, totalTopics, completedSections: overallCompletedSections, totalSections: overallTotalSections } = getOverallProgress();

  const handleTopicClick = (slug: string) => {
    navigate(`/learning-hub/topic/${slug}`);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressBadgeVariant = (progress: number) => {
    if (progress >= 80) return "default";
    if (progress >= 60) return "secondary";
    return "destructive";
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">OSCE Learning Hub</h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            Master the 14 Core OSCE Topics with Interactive Learning
          </p>
          
          {/* Overall Progress Tracker */}
          <div className="max-w-md mx-auto bg-white rounded-lg border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
            <Progress value={overallTotalSections > 0 ? (overallCompletedSections / overallTotalSections) * 100 : 0} className="h-3 mb-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{overallTotalSections > 0 ? Math.round((overallCompletedSections / overallTotalSections) * 100) : 0}% Complete</span>
              <span>{completedTopics}/{totalTopics} Topics Mastered</span>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {learningContent.map((topic) => {
            const IconComponent = topic.icon;
            const topicProgress = getTopicProgress(topic.id);
            const progressPercentage = topicProgress.totalSections > 0 ? Math.round((topicProgress.completedSections / topicProgress.totalSections) * 100) : 0;
            const totalQuestions = topicProgress.totalQuizzes + topicProgress.totalCaseStudies;
            const completedQuestions = topicProgress.completedQuizzes + topicProgress.completedCaseStudies;

            let statusText = "Needs Work";
            if (progressPercentage >= 80) {
              statusText = "Mastered";
            } else if (progressPercentage >= 60) {
              statusText = "Good";
            }

            return (
              <Card 
                key={topic.id} 
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-l-4 hover:border-l-blue-500"
                onClick={() => handleTopicClick(topic.slug)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg bg-blue-500 bg-opacity-10`}>
                      <IconComponent className={`h-6 w-6 text-blue-500`} />
                    </div>
                    <Badge variant={getProgressBadgeVariant(progressPercentage)}>
                      {progressPercentage}%
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{topic.title}</CardTitle>
                  <CardDescription className="text-sm">{topic.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        {completedQuestions}/{totalQuestions} Questions
                      </span>
                      <span className={`font-medium ${getProgressColor(progressPercentage)}`}>
                        {statusText}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-blue-600">
                {overallCompletedSections}
              </CardTitle>
              <CardDescription>Sections Completed</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-green-600">
                {completedTopics}
              </CardTitle>
              <CardDescription>Topics Mastered</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-purple-600">
                {overallTotalSections > 0 ? Math.round((overallCompletedSections / overallTotalSections) * 100) : 0}%
              </CardTitle>
              <CardDescription>Overall Progress</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LearningHub;

