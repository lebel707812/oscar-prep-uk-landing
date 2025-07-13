import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useProgress } from '@/contexts/ProgressContext';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';
import { learningContent } from '@/data/learning-content';

interface DashboardStatsProps {
  className?: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ className }) => {
  const { progress, getOverallProgress, earnedAchievements } = useProgress();
  const [studyStreak, setStudyStreak] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState({ completed: 0, target: 5 });
  const [recentActivity, setRecentActivity] = useState<Array<{ date: string; sessions: number }>>([]);

  const overallProgress = getOverallProgress();

  useEffect(() => {
    // Calcular streak de estudo (simulado)
    const calculateStreak = () => {
      // Aqui você implementaria a lógica real baseada nas datas de conclusão
      const completedSessions = Object.values(progress).reduce((total, topicSessions) => {
        return total + Object.values(topicSessions).filter(session => session.status !== 'not-started').length;
      }, 0);
      setStudyStreak(Math.min(completedSessions, 7)); // Máximo de 7 dias
    };

    // Calcular meta semanal
    const calculateWeeklyGoal = () => {
      const completedThisWeek = Object.values(progress).reduce((total, topicSessions) => {
        return total + Object.values(topicSessions).filter(session => session.status !== 'not-started').length;
      }, 0);
      setWeeklyGoal({ completed: Math.min(completedThisWeek, 5), target: 5 });
    };

    // Simular atividade recente
    const generateRecentActivity = () => {
      const activity = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const sessions = Math.floor(Math.random() * 3); // 0-2 sessões por dia
        activity.push({
          date: date.toISOString().split('T')[0],
          sessions
        });
      }
      setRecentActivity(activity);
    };

    calculateStreak();
    calculateWeeklyGoal();
    generateRecentActivity();
  }, [progress]);

  const totalTopics = learningContent.length;
  const completedTopics = learningContent.filter(topic => {
    const topicSessions = progress[topic.id] || {};
    const totalSessions = topic.sessions.length;
    const completedSessions = Object.values(topicSessions).filter(session => session.status !== 'not-started').length;
    return completedSessions === totalSessions && totalSessions > 0;
  }).length;

  const totalSessions = learningContent.reduce((total, topic) => total + topic.sessions.length, 0);
  const completedSessions = Object.values(progress).reduce((total, topicSessions) => {
    return total + Object.values(topicSessions).filter(session => session.status !== 'not-started').length;
  }, 0);

  const masteredSessions = Object.values(progress).reduce((total, topicSessions) => {
    return total + Object.values(topicSessions).filter(session => session.status === 'mastered').length;
  }, 0);

  const needsWorkSessions = Object.values(progress).reduce((total, topicSessions) => {
    return total + Object.values(topicSessions).filter(session => session.status === 'needs-work').length;
  }, 0);

  const stats = [
    {
      title: 'Overall Progress',
      value: `${overallProgress.percentage}%`,
      description: `${completedSessions} of ${totalSessions} sessions`,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      progress: overallProgress.percentage
    },
    {
      title: 'Topics Completed',
      value: `${completedTopics}/${totalTopics}`,
      description: `${Math.round((completedTopics / totalTopics) * 100)}% complete`,
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      progress: (completedTopics / totalTopics) * 100
    },
    {
      title: 'Achievements',
      value: earnedAchievements.length.toString(),
      description: "Achievements unlocked",
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Study Streak',
      value: `${studyStreak} days`,
      description: "Consecutive study days",
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const performanceStats = [
    {
      label: 'Mastered',
      value: masteredSessions,
      color: 'bg-green-500',
      icon: Star
    },
    {
      label: 'Good',
      value: completedSessions - masteredSessions - needsWorkSessions,
      color: 'bg-blue-500',
      icon: CheckCircle
    },
    {
      label: 'Needs Work',
      value: needsWorkSessions,
      color: 'bg-orange-500',
      icon: AlertCircle
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              {stat.progress !== undefined && (
                <div className="mt-4">
                  <Progress value={stat.progress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance and Weekly Goal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance das Sessões */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Session Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${stat.color} bg-opacity-10`}>
                      <stat.icon className={`h-4 w-4 ${stat.color.replace('bg-', 'text-')}`} />
                    </div>
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <Badge variant="secondary">{stat.value}</Badge>
                </div>
              ))}
            </div>
            {completedSessions > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Mastery Rate:</span>
                  <span className="font-medium">
                    {Math.round((masteredSessions / completedSessions) * 100)}%
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Meta Semanal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Weekly Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sessions Completed</span>
                <span className="text-2xl font-bold">
                  {weeklyGoal.completed}/{weeklyGoal.target}
                </span>
              </div>
              <Progress 
                value={(weeklyGoal.completed / weeklyGoal.target) * 100} 
                className="h-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {weeklyGoal.target - weeklyGoal.completed > 0 
                    ? `${weeklyGoal.target - weeklyGoal.completed} remaining` 
                    : 'Goal achieved!'}
                </span>
                <span>
                  {Math.round((weeklyGoal.completed / weeklyGoal.target) * 100)}%
                </span>
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Last 7 Days Activity</h4>
              <div className="flex gap-1">
                {recentActivity.map((day, index) => (
                  <div key={index} className="flex-1 text-center">
                    <div 
                      className={`h-8 rounded-sm ${
                        day.sessions === 0 ? 'bg-gray-100' :
                        day.sessions === 1 ? 'bg-green-200' :
                        day.sessions === 2 ? 'bg-green-400' :
                        'bg-green-600'
                      }`}
                      title={`${day.sessions} sessions on ${new Date(day.date).toLocaleDateString("en-GB", { weekday: "short" })}`}
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(day.date).toLocaleDateString("en-GB", { weekday: "short" })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;

