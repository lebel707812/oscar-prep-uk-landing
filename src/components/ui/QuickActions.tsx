import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProgress } from '@/contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Play, 
  Trophy, 
  MessageCircle, 
  Library,
  Target,
  Clock,
  TrendingUp
} from 'lucide-react';
import { learningContent } from '@/data/learning-content';

interface QuickActionsProps {
  className?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ className }) => {
  const { progress } = useProgress();
  const navigate = useNavigate();

  // Find next recommended session
  const getNextRecommendedSession = () => {
    for (const topic of learningContent) {
      const topicProgress = progress[topic.id] || {};
      for (const session of topic.sessions) {
        const sessionProgress = topicProgress[session.id];
        if (!sessionProgress || sessionProgress.status === 'not-started') {
          return {
            topicId: topic.id,
            sessionId: session.id,
            topicTitle: topic.title,
            sessionTitle: session.title,
            sessionType: session.sections[0]?.type || 'content'
          };
        }
      }
    }
    return null;
  };

  // Find sessions that need review
  const getSessionsNeedingReview = () => {
    const needsReview = [];
    for (const topic of learningContent) {
      const topicProgress = progress[topic.id] || {};
      for (const session of topic.sessions) {
        const sessionProgress = topicProgress[session.id];
        if (sessionProgress?.status === 'needs-work') {
          needsReview.push({
            topicId: topic.id,
            sessionId: session.id,
            topicTitle: topic.title,
            sessionTitle: session.title
          });
        }
      }
    }
    return needsReview.slice(0, 3); // Max 3 sessions
  };

  const nextSession = getNextRecommendedSession();
  const reviewSessions = getSessionsNeedingReview();

  const quickActions = [
    {
      title: 'Continue Studying',
      description: nextSession 
        ? `${nextSession.topicTitle} - ${nextSession.sessionTitle}`
        : "All sessions completed!",
      icon: Play,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      action: () => {
        if (nextSession) {
          navigate(`/learning-hub/${nextSession.topicId}/${nextSession.sessionId}`);
        } else {
          navigate('/learning-hub');
        }
      },
      disabled: !nextSession,
      badge: nextSession ? "Recommended" : null
    },
    {
      title: 'Mock Exam',
      description: "Test your knowledge with a simulated exam",
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',      action: () => navigate("/dashboard/mock-exams"),      badge: "Practice"\'
    },
    {
      title: "Interactive Clinical Cases",
      description: "Practice with interactive clinical scenarios and get feedback",
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      action: () => navigate('/dashboard/clinical-cases'),
      badge: "New"
    },

    {
      title: "Scenario Library",
      description: "Explore diverse clinical scenarios",
      icon: Library,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      action: () => navigate('/dashboard/scenario-library'),
      badge: "Scenarios"
    },
s",
      description: "View your progress and unlocked achievements",
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      action: () => navigate('/dashboard/gamification'),      badge: "Gamification"'
    },
    {
      title: "Forum",
      description: "Connect with other students",
      icon: MessageCircle,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      action: () => navigate('/forum'),
      badge: "Community"
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-start gap-3 ${action.borderColor} hover:${action.bgColor} transition-colors`}
                onClick={action.action}
                disabled={action.disabled}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2 rounded-lg ${action.bgColor}`}>
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  {action.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <div className="text-left w-full">
                  <h3 className="font-medium text-sm mb-1">{action.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {action.description}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sessions Needing Review */}
      {reviewSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sessions to Review
              <Badge variant="destructive" className="ml-2">
                {reviewSessions.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reviewSessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-orange-200 bg-orange-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-orange-100">
                      <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{session.sessionTitle}</h4>
                      <p className="text-xs text-muted-foreground">{session.topicTitle}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/learning-hub/${session.topicId}/${session.sessionId}`)}
                    className="border-orange-300 text-orange-700 hover:bg-orange-100"
                  >
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tip of the Day */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Tip of the Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <h3 className="font-medium text-sm mb-2 text-blue-900">
              💡 Study Technique: Spaced Repetition
            </h3>
            <p className="text-xs text-blue-700 leading-relaxed">
              Review material at increasing intervals (1 day, 3 days, 1 week, 2 weeks). 
              This technique significantly improves long-term retention and is especially effective for memorizing medical procedures and protocols.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;

