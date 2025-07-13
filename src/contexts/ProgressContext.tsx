import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LearningTopic, LearningSession, LearningSection, learningContent } from '../data/learning-content';

interface ProgressState {
  [topicId: string]: {
    [sessionId: string]: {
      status: 'not-started' | 'good' | 'mastered' | 'needs-work';
      completedSections: string[];
    };
  };
}

interface ProgressContextType {
  progress: ProgressState;
  markSessionComplete: (topicId: string, sessionId: string, status: 'good' | 'mastered' | 'needs-work') => void;
  markSectionComplete: (topicId: string, sessionId: string, sectionId: string) => void;
  getSessionProgress: (topicId: string, sessionId: string) => { completed: number; total: number; status: 'not-started' | 'good' | 'mastered' | 'needs-work' };
  getTopicProgress: (topicId: string) => { completedSessions: number; totalSessions: number; completedSections: number; totalSections: number; completedQuizzes: number; totalQuizzes: number; completedCaseStudies: number; totalCaseStudies: number };
  getOverallProgress: () => { completedTopics: number; totalTopics: number; completedSessions: number; totalSessions: number; completedSections: number; totalSections: number };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const savedProgress = localStorage.getItem('learningProgress');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(progress));
  }, [progress]);

  const markSessionComplete = (topicId: string, sessionId: string, status: 'good' | 'mastered' | 'needs-work') => {
    setProgress(prevProgress => {
      const newProgress = { ...prevProgress };
      if (!newProgress[topicId]) {
        newProgress[topicId] = {};
      }
      newProgress[topicId][sessionId] = { ...newProgress[topicId][sessionId], status };

      // Mark all sections in the session as complete when session is marked complete
      const topic = learningContent.find(t => t.id === topicId);
      const session = topic?.sessions.find(s => s.id === sessionId);
      if (session) {
        newProgress[topicId][sessionId].completedSections = session.sections.map(s => s.id);
      }

      return newProgress;
    });
  };

  const markSectionComplete = (topicId: string, sessionId: string, sectionId: string) => {
    setProgress(prevProgress => {
      const newProgress = { ...prevProgress };
      if (!newProgress[topicId]) {
        newProgress[topicId] = {};
      }
      if (!newProgress[topicId][sessionId]) {
        newProgress[topicId][sessionId] = { status: 'not-started', completedSections: [] };
      }

      const currentCompletedSections = newProgress[topicId][sessionId].completedSections || [];
      if (!currentCompletedSections.includes(sectionId)) {
        newProgress[topicId][sessionId].completedSections = [...currentCompletedSections, sectionId];
      }

      // Automatically set session status to 'good' if all sections are completed
      const topic = learningContent.find(t => t.id === topicId);
      const session = topic?.sessions.find(s => s.id === sessionId);
      if (session && newProgress[topicId][sessionId].completedSections.length === session.sections.length) {
        if (newProgress[topicId][sessionId].status === 'not-started') { // Only set to good if not already set to mastered/needs-work
          newProgress[topicId][sessionId].status = 'good';
        }
      }

      return newProgress;
    });
  };

  const getSessionProgress = (topicId: string, sessionId: string) => {
    const sessionProgress = progress[topicId]?.[sessionId];
    const topic = learningContent.find(t => t.id === topicId);
    const session = topic?.sessions.find(s => s.id === sessionId);

    const total = session?.sections.length || 0;
    const completed = sessionProgress?.completedSections?.length || 0;
    const status = sessionProgress?.status || 'not-started';

    return { completed, total, status };
  };

  const getTopicProgress = (topicId: string) => {
    const topic = learningContent.find(t => t.id === topicId);
    if (!topic) {
      return { completedSessions: 0, totalSessions: 0, completedSections: 0, totalSections: 0, completedQuizzes: 0, totalQuizzes: 0, completedCaseStudies: 0, totalCaseStudies: 0 };
    }

    let completedSessions = 0;
    let totalSections = 0;
    let completedSections = 0;
    let totalQuizzes = 0;
    let completedQuizzes = 0;
    let totalCaseStudies = 0;
    let completedCaseStudies = 0;

    topic.sessions.forEach(session => {
      totalSections += session.sections.length;
      const sessionProgress = progress[topicId]?.[session.id];
      if (sessionProgress && sessionProgress.completedSections.length === session.sections.length) {
        completedSessions++;
      }
      session.sections.forEach(section => {
        if (sessionProgress?.completedSections?.includes(section.id)) {
          completedSections++;
        }
        if (section.type === 'quiz') {
          totalQuizzes++;
          if (sessionProgress?.completedSections?.includes(section.id)) {
            completedQuizzes++;
          }
        }
        if (section.type === 'case-study') {
          totalCaseStudies++;
          if (sessionProgress?.completedSections?.includes(section.id)) {
            completedCaseStudies++;
          }
        }
      });
    });

    return {
      completedSessions,
      totalSessions: topic.sessions.length,
      completedSections,
      totalSections,
      completedQuizzes,
      totalQuizzes,
      completedCaseStudies,
      totalCaseStudies,
    };
  };

  const getOverallProgress = () => {
    let completedTopics = 0;
    let totalTopics = learningContent.length;
    let completedSessions = 0;
    let totalSessions = 0;
    let completedSections = 0;
    let totalSections = 0;

    learningContent.forEach(topic => {
      const topicProgress = getTopicProgress(topic.id);
      totalSessions += topicProgress.totalSessions;
      completedSessions += topicProgress.completedSessions;
      totalSections += topicProgress.totalSections;
      completedSections += topicProgress.completedSections;

      if (topicProgress.completedSessions === topicProgress.totalSessions && topicProgress.totalSessions > 0) {
        completedTopics++;
      }
    });

    return { completedTopics, totalTopics, completedSessions, totalSessions, completedSections, totalSections };
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      markSessionComplete,
      markSectionComplete,
      getSessionProgress,
      getTopicProgress,
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


