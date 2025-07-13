import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { learningContent } from "@/data/learning-content";
import { achievements, Achievement } from "@/data/achievements";
import { useToast } from "@/components/ui/use-toast";

// Defina suas variáveis de ambiente do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ProgressState {
  [topicId: string]: {
    [sessionId: string]: {
      completedSections: string[];
      status: 'not-started' | 'good' | 'mastered' | 'needs-work';
    };
  };
}

interface EarnedAchievement {
  id: string;
  earnedAt: string;
}

interface ProgressContextType {
  progress: ProgressState;
  earnedAchievements: EarnedAchievement[];
  markSectionComplete: (topicId: string, sessionId: string, sectionId: string) => void;
  markSessionComplete: (topicId: string, sessionId: string, status: 'good' | 'mastered' | 'needs-work') => void;
  getTopicProgress: (topicId: string) => {
    completedSections: number;
    totalSections: number;
    completedQuizzes: number;
    totalQuizzes: number;
    completedCaseStudies: number;
    totalCaseStudies: number;
  };
  getSessionProgress: (topicId: string, sessionId: string) => {
    completed: number;
    total: number;
    status: 'not-started' | 'good' | 'mastered' | 'needs-work';
  };
  getOverallProgress: () => {
    completedTopics: number;
    totalTopics: number;
    percentage: number;
  };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<ProgressState>({});
  const [earnedAchievements, setEarnedAchievements] = useState<EarnedAchievement[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  // Função para verificar e conceder conquistas
  const checkAchievements = useCallback((currentProgress: ProgressState) => {
    const newlyEarned: EarnedAchievement[] = [];
    achievements.forEach(achievement => {
      if (!earnedAchievements.some(ea => ea.id === achievement.id) && achievement.criteria(currentProgress)) {
        const newAchievement = { id: achievement.id, earnedAt: new Date().toISOString() };
        newlyEarned.push(newAchievement);
        toast({
          title: "Conquista Desbloqueada!",
          description: `Você ganhou a conquista: ${achievement.name}`,
        });
      }
    });

    if (newlyEarned.length > 0) {
      setEarnedAchievements(prev => [...prev, ...newlyEarned]);
      // Salvar no Supabase
      if (userId) {
        const achievementsToSave = newlyEarned.map(ach => ({ user_id: userId, achievement_id: ach.id, earned_at: ach.earnedAt }));
        supabase.from('user_achievements').insert(achievementsToSave).then(({ error }) => {
          if (error) console.error('Error saving achievements to Supabase:', error);
        });
      }
    }
  }, [earnedAchievements, userId, toast]);

  // Efeito para carregar o progresso e conquistas do Supabase
  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // Carregar progresso
        const { data: progressData, error: progressError } = await supabase
          .from('user_learning_progress')
          .select('topic_id, session_id, section_id, status');

        if (progressError) {
          console.error('Error fetching progress from Supabase:', progressError);
        } else {
          const newProgress: ProgressState = {};
          progressData.forEach(item => {
            if (!newProgress[item.topic_id]) newProgress[item.topic_id] = {};
            if (!newProgress[item.topic_id][item.session_id]) {
              newProgress[item.topic_id][item.session_id] = { completedSections: [], status: 'not-started' };
            }
            newProgress[item.topic_id][item.session_id].completedSections.push(item.section_id);
            if (item.status) {
              newProgress[item.topic_id][item.session_id].status = item.status as 'good' | 'mastered' | 'needs-work';
            }
          });
          setProgress(newProgress);
          checkAchievements(newProgress); // Verificar conquistas após carregar o progresso
        }

        // Carregar conquistas
        const { data: achievementsData, error: achievementsError } = await supabase
          .from('user_achievements')
          .select('achievement_id, earned_at');

        if (achievementsError) {
          console.error('Error fetching achievements from Supabase:', achievementsError);
        } else {
          setEarnedAchievements(achievementsData.map(ach => ({ id: ach.achievement_id, earnedAt: ach.earned_at })));
        }
      } else {
        // Fallback para localStorage se não houver usuário logado
        const savedProgress = localStorage.getItem('learningProgress');
        if (savedProgress) {
          const parsedProgress = JSON.parse(savedProgress);
          setProgress(parsedProgress);
          checkAchievements(parsedProgress);
        }
        const savedAchievements = localStorage.getItem('earnedAchievements');
        if (savedAchievements) {
          setEarnedAchievements(JSON.parse(savedAchievements));
        }
      }
    };

    fetchUserAndData();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        fetchUserAndData();
      } else {
        setUserId(null);
        setProgress({});
        setEarnedAchievements([]);
        localStorage.removeItem('learningProgress');
        localStorage.removeItem('earnedAchievements');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [checkAchievements]);

  const markSectionComplete = useCallback(async (topicId: string, sessionId: string, sectionId: string) => {
    let updatedProgress: ProgressState = {};
    setProgress(prevProgress => {
      const newProgress = { ...prevProgress };
      if (!newProgress[topicId]) newProgress[topicId] = {};
      if (!newProgress[topicId][sessionId]) {
        newProgress[topicId][sessionId] = { completedSections: [], status: 'not-started' };
      }
      if (!newProgress[topicId][sessionId].completedSections.includes(sectionId)) {
        newProgress[topicId][sessionId].completedSections.push(sectionId);
      }
      localStorage.setItem('learningProgress', JSON.stringify(newProgress));
      updatedProgress = newProgress;
      return newProgress;
    });

    checkAchievements(updatedProgress);

    if (userId) {
      const { error } = await supabase
        .from('user_learning_progress')
        .insert({ user_id: userId, topic_id: topicId, session_id: sessionId, section_id: sectionId, status: 'completed' });

      if (error && error.code !== '23505') {
        console.error('Error saving section progress to Supabase:', error);
      }
    }
  }, [userId, checkAchievements]);

  const markSessionComplete = useCallback(async (topicId: string, sessionId: string, status: 'good' | 'mastered' | 'needs-work') => {
    let updatedProgress: ProgressState = {};
    setProgress(prevProgress => {
      const newProgress = { ...prevProgress };
      if (!newProgress[topicId]) newProgress[topicId] = {};
      if (!newProgress[topicId][sessionId]) {
        newProgress[topicId][sessionId] = { completedSections: [], status: 'not-started' };
      }
      newProgress[topicId][sessionId].status = status;
      localStorage.setItem('learningProgress', JSON.stringify(newProgress));
      updatedProgress = newProgress;
      return newProgress;
    });

    checkAchievements(updatedProgress);

    if (userId) {
      const { error } = await supabase
        .from('user_learning_progress')
        .update({ status: status })
        .eq('user_id', userId)
        .eq('topic_id', topicId)
        .eq('session_id', sessionId);

      if (error) {
        console.error('Error updating session status in Supabase:', error);
      }
    }
  }, [userId, checkAchievements]);

  const getTopicProgress = useCallback((topicId: string) => {
    const topic = learningContent.find(t => t.id === topicId);
    if (!topic) return { completedSections: 0, totalSections: 0, completedQuizzes: 0, totalQuizzes: 0, completedCaseStudies: 0, totalCaseStudies: 0 };

    let completedSections = 0;
    let totalSections = 0;
    let completedQuizzes = 0;
    let totalQuizzes = 0;
    let completedCaseStudies = 0;
    let totalCaseStudies = 0;

    topic.sessions.forEach(session => {
      session.sections.forEach(section => {
        totalSections++;
        if (progress[topicId]?.[session.id]?.completedSections.includes(section.id)) {
          completedSections++;
        }
        if (section.type === 'quiz') {
          totalQuizzes++;
          if (progress[topicId]?.[session.id]?.completedSections.includes(section.id)) {
            completedQuizzes++;
          }
        }
        if (section.type === 'case-study') {
          totalCaseStudies++;
          if (progress[topicId]?.[session.id]?.completedSections.includes(section.id)) {
            completedCaseStudies++;
          }
        }
      });
    });

    return { completedSections, totalSections, completedQuizzes, totalQuizzes, completedCaseStudies, totalCaseStudies };
  }, [progress]);

  const getSessionProgress = useCallback((topicId: string, sessionId: string) => {
    const topic = learningContent.find(t => t.id === topicId);
    const session = topic?.sessions.find(s => s.id === sessionId);

    if (!session) return { completed: 0, total: 0, status: 'not-started' };

    const completed = progress[topicId]?.[sessionId]?.completedSections.length || 0;
    const total = session.sections.length;
    const status = (progress[topicId]?.[sessionId]?.status || 'not-started') as 'not-started' | 'good' | 'mastered' | 'needs-work';

    return { completed, total, status };
  }, [progress]);

  const getOverallProgress = useCallback(() => {
    let totalCompletedSectionsAcrossAllTopics = 0;
    let totalSectionsAcrossAllTopics = 0;

    learningContent.forEach(topic => {
      const topicProgress = getTopicProgress(topic.id);
      totalCompletedSectionsAcrossAllTopics += topicProgress.completedSections;
      totalSectionsAcrossAllTopics += topicProgress.totalSections;
    });

    const percentage = totalSectionsAcrossAllTopics > 0 ? Math.round((totalCompletedSectionsAcrossAllTopics / totalSectionsAcrossAllTopics) * 100) : 0;

    return { 
      completedTopics: learningContent.filter(topic => {
        const tp = getTopicProgress(topic.id);
        return tp.completedSections === tp.totalSections && tp.totalSections > 0;
      }).length,
      totalTopics: learningContent.length,
      percentage 
    };
  }, [getTopicProgress]);

  return (
    <ProgressContext.Provider value={{
      progress,
      earnedAchievements,
      markSectionComplete,
      markSessionComplete,
      getTopicProgress,
      getSessionProgress,
      getOverallProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};


