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
  Brain,
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

  // Encontrar próxima sessão recomendada
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

  // Encontrar sessões que precisam de revisão
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
    return needsReview.slice(0, 3); // Máximo 3 sessões
  };

  const nextSession = getNextRecommendedSession();
  const reviewSessions = getSessionsNeedingReview();

  const quickActions = [
    {
      title: 'Continuar Estudando',
      description: nextSession 
        ? `${nextSession.topicTitle} - ${nextSession.sessionTitle}`
        : 'Todas as sessões concluídas!',
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
      badge: nextSession ? 'Recomendado' : null
    },
    {
      title: 'Mock Exam',
      description: 'Teste seus conhecimentos com um exame simulado',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      action: () => navigate('/dashboard/mock-exams'),
      badge: 'Prática'
    },
    {
      title: 'PacientAI',
      description: 'Pratique com pacientes virtuais inteligentes',
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      action: () => navigate('/dashboard/pacient-ai'),
      badge: 'IA'
    },
    {
      title: 'Biblioteca de Cenários',
      description: 'Explore cenários clínicos diversos',
      icon: Library,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      action: () => navigate('/dashboard/scenario-library'),
      badge: 'Cenários'
    },
    {
      title: 'Conquistas',
      description: 'Veja seu progresso e conquistas desbloqueadas',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      action: () => navigate('/dashboard/gamification'),
      badge: 'Gamificação'
    },
    {
      title: 'Fórum',
      description: 'Conecte-se com outros estudantes',
      icon: MessageCircle,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      action: () => navigate('/forum'),
      badge: 'Comunidade'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Ações Rápidas Principais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Ações Rápidas
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

      {/* Sessões que Precisam de Revisão */}
      {reviewSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sessões para Revisar
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
                    Revisar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dica do Dia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Dica do Dia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <h3 className="font-medium text-sm mb-2 text-blue-900">
              💡 Técnica de Estudo: Revisão Espaçada
            </h3>
            <p className="text-xs text-blue-700 leading-relaxed">
              Revise o material em intervalos crescentes (1 dia, 3 dias, 1 semana, 2 semanas). 
              Esta técnica melhora significativamente a retenção de longo prazo e é especialmente 
              eficaz para memorizar procedimentos médicos e protocolos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;

