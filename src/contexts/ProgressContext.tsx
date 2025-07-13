import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { learningContent } from "@/data/learning-content";

// Defina suas variáveis de ambiente do Supabase
// Certifique-se de que elas estão configuradas no seu ambiente de desenvolvimento e produção
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

interface ProgressContextType {
  progress: ProgressState;
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
  const [userId, setUserId] = useState<string | null>(null);

  // Efeito para carregar o progresso do Supabase quando o usuário é autenticado
  useEffect(() => {
    const fetchUserAndProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data, error } = await supabase
          .from('user_learning_progress')
          .select('topic_id, session_id, section_id, status');

        if (error) {
          console.error('Error fetching progress from Supabase:', error);
          // Fallback para localStorage se houver erro ou não houver dados no Supabase
          const savedProgress = localStorage.getItem('learningProgress');
          if (savedProgress) {
            setProgress(JSON.parse(savedProgress));
          }
          return;
        }

        const newProgress: ProgressState = {};
        data.forEach(item => {
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
        localStorage.setItem('learningProgress', JSON.stringify(newProgress)); // Manter localStorage sincronizado
      } else {
        // Se não houver usuário logado, carregar do localStorage
        const savedProgress = localStorage.getItem('learningProgress');
        if (savedProgress) {
          setProgress(JSON.parse(savedProgress));
        }
      }
    };

    fetchUserAndProgress();

    // Listener para mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        fetchUserAndProgress(); // Recarregar progresso se o usuário logar
      } else {
        setUserId(null);
        setProgress({}); // Limpar progresso se o usuário deslogar
        localStorage.removeItem('learningProgress');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const markSectionComplete = useCallback(async (topicId: string, sessionId: string, sectionId: string) => {
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
      return newProgress;
    });

    if (userId) {
      const { error } = await supabase
        .from('user_learning_progress')
        .insert({
          user_id: userId,
          topic_id: topicId,
          session_id: sessionId,
          section_id: sectionId,
          status: 'completed' // Status padrão para seções de conteúdo
        })
        .select(); // Adicionado .select() para retornar os dados inseridos, útil para depuração

      if (error && error.code !== '23505') { // 23505 é erro de chave única duplicada, que é esperado se já estiver completo
        console.error('Error saving section progress to Supabase:', error);
      }
    }
  }, [userId]);

  const markSessionComplete = useCallback(async (topicId: string, sessionId: string, status: 'good' | 'mastered' | 'needs-work') => {
    setProgress(prevProgress => {
      const newProgress = { ...prevProgress };
      if (!newProgress[topicId]) newProgress[topicId] = {};
      if (!newProgress[topicId][sessionId]) {
        newProgress[topicId][sessionId] = { completedSections: [], status: 'not-started' };
      }
      newProgress[topicId][sessionId].status = status;
      localStorage.setItem('learningProgress', JSON.stringify(newProgress));
      return newProgress;
    });

    if (userId) {
      // Atualiza o status da sessão no Supabase. Como o status é por sessão, e não por seção individual,
      // você pode precisar de uma lógica mais sofisticada aqui se quiser rastrear o status de cada seção.
      // Para simplificar, vamos atualizar o status da última seção completada da sessão.
      // Ou, idealmente, ter um campo 'session_status' na tabela user_learning_progress ou uma tabela separada para sessões.
      // Por enquanto, vamos atualizar o status de qualquer seção dentro daquela sessão para refletir o status da sessão.
      const { error } = await supabase
        .from('user_learning_progress')
        .update({ status: status })
        .eq('user_id', userId)
        .eq('topic_id', topicId)
        .eq('session_id', sessionId);
        // .eq('section_id', /* ID da última seção completada da sessão, se aplicável */);

      if (error) {
        console.error('Error updating session status in Supabase:', error);
      }
    }
  }, [userId]);

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

    // Para o Overall Progress, vamos considerar a porcentagem de seções completadas
    // e não o número de tópicos completamente finalizados, que é mais granular.
    // Se o usuário quiser o número de tópicos completos, pode ser uma função separada.
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


