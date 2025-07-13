import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { learningContent } from "@/data/learning-content";
import { useToast } from "@/components/ui/use-toast";
import { AchievementDefinition } from '@/integrations/supabase/gamification';

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
  id: string; // This will now be the UUID from Supabase
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
  const [allAchievements, setAllAchievements] = useState<AchievementDefinition[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch achievement definitions from Supabase
  useEffect(() => {
    const fetchAchievementDefs = async () => {
      const { data, error } = await supabase
        .from('achievement_definitions')
        .select('*')
        .eq('is_active', true);
      if (error) {
        console.error('Error fetching achievement definitions:', error);
      } else {
        setAllAchievements(data);
      }
    };
    fetchAchievementDefs();
  }, []);

  // Função para verificar e conceder conquistas
  const checkAchievements = useCallback((currentProgress: ProgressState, currentAllAchievements: AchievementDefinition[]) => {
    const newlyEarned: EarnedAchievement[] = [];

    currentAllAchievements.forEach(achievementDef => {
      // Check if already earned
      if (earnedAchievements.some(ea => ea.id === achievementDef.id)) {
        return; // Already earned, skip
      }

      let criteriaMet = false;
      // Implement criteria checking based on achievementDef.requirements
      // This part needs to be adapted based on your actual achievement requirements structure
      // For now, let's use some placeholder logic based on the old achievements.ts criteria

      switch (achievementDef.slug) {
        case 'first-topic-complete':
          criteriaMet = learningContent.some(topic => {
            const tp = getTopicProgress(topic.id);
            return tp.completedSections === tp.totalSections && tp.totalSections > 0;
          });
          break;
        case 'knowledge-explorer':
          criteriaMet = learningContent.filter(topic => {
            const tp = getTopicProgress(topic.id);
            return tp.completedSections === tp.totalSections && tp.totalSections > 0;
          }).length >= 5;
          break;
        case 'learning-master':
          criteriaMet = learningContent.every(topic => {
            const tp = getTopicProgress(topic.id);
            return tp.completedSections === tp.totalSections && tp.totalSections > 0;
          });
          break;
        case 'first-mastered-quiz':
          criteriaMet = Object.values(currentProgress).some(topicProgress =>
            Object.values(topicProgress).some(sessionProgress =>
              sessionProgress.status === 'mastered'
            )
          );
          break;
        case 'quiz-master':
          criteriaMet = learningContent.every(topic => {
            const topicQuizzes = topic.sessions.filter(s => s.sections.some(sec => sec.type === 'quiz'));
            return topicQuizzes.every(session => {
              const sessionStatus = currentProgress[topic.id]?.[session.id]?.status;
              return sessionStatus === 'mastered';
            });
          });
          break;
        case 'first-case-study':
          criteriaMet = learningContent.some(topic =>
            topic.sessions.some(session =>
              session.sections.some(section =>
                section.type === 'case-study' &&
                currentProgress[topic.id]?.[session.id]?.completedSections.includes(section.id)
              )
            )
          );
          break;
        case 'experienced-analyst':
          criteriaMet = learningContent.every(topic =>
            topic.sessions.every(session =>
              session.sections.every(section =>
                section.type === 'case-study' ?
                currentProgress[topic.id]?.[session.id]?.completedSections.includes(section.id) : true
              )
            )
          );
          break;
        // Add more cases for other achievement slugs as needed
        default:
          // If achievementDef.requirements is a JSON object, you'd parse and check it here
          // For example, if requirements.min_topics_completed exists:
          // if (achievementDef.requirements.min_topics_completed) {
          //   const completedTopicsCount = learningContent.filter(topic => {
          //     const tp = getTopicProgress(topic.id);
          //     return tp.completedSections === tp.totalSections && tp.totalSections > 0;
          //   }).length;
          //   criteriaMet = completedTopicsCount >= achievementDef.requirements.min_topics_completed;
          // }
          break;
      }

      if (criteriaMet) {
        const newAchievement = { id: achievementDef.id, earnedAt: new Date().toISOString() };
        newlyEarned.push(newAchievement);
        toast({
          title: "Conquista Desbloqueada!",
          description: `Você ganhou a conquista: ${achievementDef.name}`,
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
  }, [earnedAchievements, userId, toast, getTopicProgress]);

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
          // checkAchievements(newProgress); // Check achievements after loading progress and definitions
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
          // checkAchievements(parsedProgress); // Check achievements after loading progress and definitions
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
  }, []); // Removed checkAchievements from dependencies to avoid infinite loop

  // Effect to run checkAchievements after progress and allAchievements are loaded
  useEffect(() => {
    if (Object.keys(progress).length > 0 && allAchievements.length > 0) {
      checkAchievements(progress, allAchievements);
    }
  }, [progress, allAchievements, checkAchievements]);

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

    // checkAchievements(updatedProgress); // Moved to separate useEffect

    if (userId) {
      const { error } = await supabase
        .from('user_learning_progress')
        .insert({ user_id: userId, topic_id: topicId, session_id: sessionId, section_id: sectionId, status: 'completed' });

      if (error && error.code !== '23505') {
        console.error('Error saving section progress to Supabase:', error);
      }
    }
  }, [userId]); // Removed checkAchievements from dependencies

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

    // checkAchievements(updatedProgress); // Moved to separate useEffect

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
  }, [userId]); // Removed checkAchievements from dependencies

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

