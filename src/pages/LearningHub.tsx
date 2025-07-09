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

const topics = [
  {
    id: 1,
    title: "History Taking & Communication",
    description: "Master patient interviews and communication skills",
    icon: Stethoscope,
    progress: 75,
    totalQuestions: 12,
    completedQuestions: 9,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Physical Examination Techniques",
    description: "Learn systematic examination approaches",
    icon: Heart,
    progress: 60,
    totalQuestions: 15,
    completedQuestions: 9,
    color: "bg-red-500"
  },
  {
    id: 3,
    title: "Medication Management & Calculations",
    description: "Drug calculations and administration safety",
    icon: Pill,
    progress: 85,
    totalQuestions: 10,
    completedQuestions: 8,
    color: "bg-green-500"
  },
  {
    id: 4,
    title: "Wound Care & Infection Control",
    description: "Sterile techniques and wound management",
    icon: Shield,
    progress: 40,
    totalQuestions: 8,
    completedQuestions: 3,
    color: "bg-purple-500"
  },
  {
    id: 5,
    title: "Vital Signs & Monitoring",
    description: "Accurate measurement and interpretation",
    icon: Activity,
    progress: 90,
    totalQuestions: 6,
    completedQuestions: 5,
    color: "bg-orange-500"
  },
  {
    id: 6,
    title: "Emergency Procedures & CPR",
    description: "Life-saving interventions and protocols",
    icon: Zap,
    progress: 30,
    totalQuestions: 12,
    completedQuestions: 4,
    color: "bg-yellow-500"
  },
  {
    id: 7,
    title: "Patient Safety & Risk Assessment",
    description: "Identify and mitigate clinical risks",
    icon: UserCheck,
    progress: 55,
    totalQuestions: 9,
    completedQuestions: 5,
    color: "bg-indigo-500"
  },
  {
    id: 8,
    title: "Documentation & Record Keeping",
    description: "Accurate and legal documentation practices",
    icon: FileText,
    progress: 70,
    totalQuestions: 7,
    completedQuestions: 5,
    color: "bg-pink-500"
  },
  {
    id: 9,
    title: "Professional Boundaries & Ethics",
    description: "Ethical decision-making and professional conduct",
    icon: Scale,
    progress: 45,
    totalQuestions: 8,
    completedQuestions: 4,
    color: "bg-teal-500"
  },
  {
    id: 10,
    title: "Cultural Competency & Diversity",
    description: "Culturally sensitive care approaches",
    icon: Globe,
    progress: 65,
    totalQuestions: 6,
    completedQuestions: 4,
    color: "bg-cyan-500"
  },
  {
    id: 11,
    title: "Mental Health Assessment",
    description: "Mental health screening and support",
    icon: Brain,
    progress: 35,
    totalQuestions: 10,
    completedQuestions: 4,
    color: "bg-violet-500"
  },
  {
    id: 12,
    title: "Pediatric & Elderly Care",
    description: "Age-specific care considerations",
    icon: Users,
    progress: 50,
    totalQuestions: 11,
    completedQuestions: 6,
    color: "bg-emerald-500"
  },
  {
    id: 13,
    title: "Discharge Planning & Education",
    description: "Patient education and transition planning",
    icon: ClipboardList,
    progress: 80,
    totalQuestions: 5,
    completedQuestions: 4,
    color: "bg-amber-500"
  },
  {
    id: 14,
    title: "Quality Improvement & Evidence-Based Practice",
    description: "Research application and quality metrics",
    icon: TrendingUp,
    progress: 25,
    totalQuestions: 9,
    completedQuestions: 2,
    color: "bg-rose-500"
  }
];

const LearningHub = () => {
  const navigate = useNavigate();
  const [overallProgress, setOverallProgress] = useState(0);
  const [totalTopicsCompleted, setTotalTopicsCompleted] = useState(0);

  useEffect(() => {
    const totalQuestions = topics.reduce((sum, topic) => sum + topic.totalQuestions, 0);
    const totalCompleted = topics.reduce((sum, topic) => sum + topic.completedQuestions, 0);
    const completed = topics.filter(topic => topic.progress >= 80).length;
    
    setOverallProgress(Math.round((totalCompleted / totalQuestions) * 100));
    setTotalTopicsCompleted(completed);
  }, []);

  const handleTopicClick = (topicId: number) => {
    // Navegar para a página específica do tópico (implementar futuramente)
    console.log(`Navigating to topic ${topicId}`);
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
            <Progress value={overallProgress} className="h-3 mb-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{overallProgress}% Complete</span>
              <span>{totalTopicsCompleted}/14 Topics Mastered</span>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map((topic) => {
            const IconComponent = topic.icon;
            return (
              <Card 
                key={topic.id} 
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-l-4 hover:border-l-blue-500"
                onClick={() => handleTopicClick(topic.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${topic.color} bg-opacity-10`}>
                      <IconComponent className={`h-6 w-6 ${topic.color.replace('bg-', 'text-')}`} />
                    </div>
                    <Badge variant={getProgressBadgeVariant(topic.progress)}>
                      {topic.progress}%
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{topic.title}</CardTitle>
                  <CardDescription className="text-sm">{topic.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <Progress value={topic.progress} className="h-2" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        {topic.completedQuestions}/{topic.totalQuestions} Questions
                      </span>
                      <span className={`font-medium ${getProgressColor(topic.progress)}`}>
                        {topic.progress >= 80 ? "Mastered" : topic.progress >= 60 ? "Good" : "Needs Work"}
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
                {topics.reduce((sum, topic) => sum + topic.completedQuestions, 0)}
              </CardTitle>
              <CardDescription>Questions Completed</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-green-600">
                {totalTopicsCompleted}
              </CardTitle>
              <CardDescription>Topics Mastered</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-purple-600">
                {Math.round(topics.reduce((sum, topic) => sum + topic.progress, 0) / topics.length)}%
              </CardTitle>
              <CardDescription>Average Score</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LearningHub;