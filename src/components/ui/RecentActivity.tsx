import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { 
  Clock, 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  CheckCircle2,
  Star,
  AlertCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { learningContent } from '@/data/learning-content';
import { useNavigate } from 'react-router-dom';

interface RecentActivityProps {
  className?: string;
}

interface ActivityItem {
  id: string;
  type: 'session_completed' | 'achievement_earned' | 'topic_completed' | 'milestone_reached';
  title: string;
  description: string;
  timestamp: Date;
  icon: React.ElementType;
  color: string;
  actionUrl?: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ className }) => {
  const { progress, earnedAchievements } = useProgress();
  const { notifications } = useNotifications();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    const generateActivities = () => {
      const activityList: ActivityItem[] = [];

      // Adicionar atividades de notificações recentes
      notifications.slice(0, 5).forEach(notification => {
        let icon = Clock;
        let color = 'text-blue-600';

        switch (notification.type) {
          case 'achievement':
            icon = Trophy;
            color = 'text-yellow-600';
            break;
          case 'milestone':
            icon = TrendingUp;
            color = 'text-green-600';
            break;
          case 'update':
            icon = BookOpen;
            color = 'text-blue-600';
            break;
          case 'reminder':
            icon = Clock;
            color = 'text-purple-600';
            break;
        }

        activityList.push({
          id: notification.id,
          type: notification.type === 'achievement' ? 'achievement_earned' : 'milestone_reached',
          title: notification.title,
          description: notification.message,
          timestamp: notification.timestamp,
          icon,
          color,
          actionUrl: notification.actionUrl
        });
      });

      // Adicionar atividades de sessões concluídas recentemente
      Object.entries(progress).forEach(([topicId, topicSessions]) => {
        const topic = learningContent.find(t => t.id === topicId);
        if (!topic) return;

        Object.entries(topicSessions).forEach(([sessionId, sessionData]) => {
          if (sessionData.status !== 'not-started') {
            const session = topic.sessions.find(s => s.id === sessionId);
            if (session) {
              let icon = CheckCircle2;
              let color = 'text-green-600';
              let statusText = 'Concluída';

              if (sessionData.status === 'mastered') {
                icon = Star;
                color = 'text-yellow-600';
                statusText = 'Dominada';
              } else if (sessionData.status === 'needs-work') {
                icon = AlertCircle;
                color = 'text-orange-600';
                statusText = 'Precisa Melhorar';
              }

              activityList.push({
                id: `${topicId}-${sessionId}`,
                type: 'session_completed',
                title: `Sessão ${statusText}`,
                description: `${topic.title} - ${session.title}`,
                timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Últimos 7 dias
                icon,
                color,
                actionUrl: `/learning-hub/${topicId}/${sessionId}`
              });
            }
          }
        });
      });

      // Ordenar por timestamp (mais recente primeiro) e limitar a 10 itens
      activityList.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      setActivities(activityList.slice(0, 10));
    };

    generateActivities();
  }, [progress, notifications]);

  const handleActivityClick = (activity: ActivityItem) => {
    if (activity.actionUrl) {
      navigate(activity.actionUrl);
    }
  };

  const getActivityTypeLabel = (type: ActivityItem['type']) => {
    switch (type) {
      case 'session_completed':
        return 'Sessão';
      case 'achievement_earned':
        return 'Conquista';
      case 'topic_completed':
        return 'Tópico';
      case 'milestone_reached':
        return 'Marco';
      default:
        return 'Atividade';
    }
  };

  const getActivityTypeBadgeColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'session_completed':
        return 'bg-green-100 text-green-800';
      case 'achievement_earned':
        return 'bg-yellow-100 text-yellow-800';
      case 'topic_completed':
        return 'bg-blue-100 text-blue-800';
      case 'milestone_reached':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (activities.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Nenhuma atividade recente encontrada.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Complete algumas sessões para ver sua atividade aqui.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Atividade Recente
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard/session-history')}
            className="text-sm"
          >
            Ver Tudo
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                activity.actionUrl 
                  ? 'hover:bg-muted/50 cursor-pointer' 
                  : ''
              }`}
              onClick={() => handleActivityClick(activity)}
            >
              <div className={`p-2 rounded-full bg-muted/20`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-1">
                      {activity.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {activity.description}
                    </p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getActivityTypeBadgeColor(activity.type)} flex-shrink-0`}
                  >
                    {getActivityTypeLabel(activity.type)}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(activity.timestamp, { 
                      addSuffix: true, 
                      locale: ptBR 
                    })}
                  </span>
                  {activity.actionUrl && (
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {activities.length >= 10 && (
          <div className="mt-4 pt-4 border-t text-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/dashboard/session-history')}
              className="w-full"
            >
              Ver Histórico Completo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

