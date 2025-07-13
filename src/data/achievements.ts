import { learningContent } from "./learning-content";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // Nome do ícone ou caminho para a imagem
  criteria: (progress: any) => boolean; // Função para verificar se a conquista foi alcançada
  hidden?: boolean; // Se a conquista é oculta até ser alcançada
}

export const achievements: Achievement[] = [
  {
    id: "first-topic-complete",
    name: "Primeiro Tópico Concluído",
    description: "Complete seu primeiro tópico de aprendizado.",
    icon: "trophy",
    criteria: (progress) => {
      const completedTopics = learningContent.filter(topic => {
        const topicProgress = progress[topic.id];
        if (!topicProgress) return false;
        const totalSections = topic.sessions.reduce((acc, session) => acc + session.sections.length, 0);
        let currentCompletedSections = 0;
        for (const sessionId in topicProgress) {
          currentCompletedSections += topicProgress[sessionId].completedSections.length;
        }
        return currentCompletedSections === totalSections && totalSections > 0;
      }).length;
      return completedTopics >= 1;
    },
  },
  {
    id: "five-topics-complete",
    name: "Explorador do Conhecimento",
    description: "Complete 5 tópicos de aprendizado.",
    icon: "map",
    criteria: (progress) => {
      const completedTopics = learningContent.filter(topic => {
        const topicProgress = progress[topic.id];
        if (!topicProgress) return false;
        const totalSections = topic.sessions.reduce((acc, session) => acc + session.sections.length, 0);
        let currentCompletedSections = 0;
        for (const sessionId in topicProgress) {
          currentCompletedSections += topicProgress[sessionId].completedSections.length;
        }
        return currentCompletedSections === totalSections && totalSections > 0;
      }).length;
      return completedTopics >= 5;
    },
  },
  {
    id: "all-topics-complete",
    name: "Mestre do Aprendizado",
    description: "Complete todos os tópicos de aprendizado.",
    icon: "crown",
    criteria: (progress) => {
      const completedTopics = learningContent.filter(topic => {
        const topicProgress = progress[topic.id];
        if (!topicProgress) return false;
        const totalSections = topic.sessions.reduce((acc, session) => acc + session.sections.length, 0);
        let currentCompletedSections = 0;
        for (const sessionId in topicProgress) {
          currentCompletedSections += topicProgress[sessionId].completedSections.length;
        }
        return currentCompletedSections === totalSections && totalSections > 0;
      }).length;
      return completedTopics === learningContent.length && learningContent.length > 0;
    },
  },
  {
    id: "first-quiz-mastered",
    name: "Gabarito Inicial",
    description: "Obtenha o status 'Mastered' em seu primeiro quiz.",
    icon: "star",
    criteria: (progress) => {
      for (const topicId in progress) {
        for (const sessionId in progress[topicId]) {
          if (progress[topicId][sessionId].status === 'mastered') {
            // Precisa verificar se a sessão é de fato um quiz
            const topic = learningContent.find(t => t.id === topicId);
            const session = topic?.sessions.find(s => s.id === sessionId);
            if (session?.sections.some(sec => sec.type === 'quiz')) {
              return true;
            }
          }
        }
      }
      return false;
    },
  },
  {
    id: "all-quizzes-mastered",
    name: "Mestre dos Quizzes",
    description: "Obtenha o status 'Mastered' em todos os quizzes.",
    icon: "stars",
    criteria: (progress) => {
      let allQuizzesMastered = true;
      let totalQuizzes = 0;

      learningContent.forEach(topic => {
        topic.sessions.forEach(session => {
          session.sections.forEach(section => {
            if (section.type === 'quiz') {
              totalQuizzes++;
              const sessionProgress = progress[topic.id]?.[session.id];
              if (!sessionProgress || sessionProgress.status !== 'mastered') {
                allQuizzesMastered = false;
              }
            }
          });
        });
      });
      return allQuizzesMastered && totalQuizzes > 0;
    },
  },
  {
    id: "first-case-study-complete",
    name: "Primeiro Estudo de Caso",
    description: "Complete seu primeiro estudo de caso.",
    icon: "book",
    criteria: (progress) => {
      for (const topicId in progress) {
        for (const sessionId in progress[topicId]) {
          const topic = learningContent.find(t => t.id === topicId);
          const session = topic?.sessions.find(s => s.id === sessionId);
          if (session?.sections.some(sec => sec.type === 'case-study')) {
            // Verifica se alguma seção do tipo case-study foi completada na sessão
            if (progress[topicId][sessionId].completedSections.some(secId => 
                session.sections.find(s => s.id === secId)?.type === 'case-study')) {
              return true;
            }
          }
        }
      }
      return false;
    },
  },
  {
    id: "all-case-studies-complete",
    name: "Analista Experiente",
    description: "Complete todos os estudos de caso.",
    icon: "microscope",
    criteria: (progress) => {
      let allCaseStudiesComplete = true;
      let totalCaseStudies = 0;

      learningContent.forEach(topic => {
        topic.sessions.forEach(session => {
          session.sections.forEach(section => {
            if (section.type === 'case-study') {
              totalCaseStudies++;
              const sessionProgress = progress[topic.id]?.[session.id];
              if (!sessionProgress || !sessionProgress.completedSections.includes(section.id)) {
                allCaseStudiesComplete = false;
              }
            }
          });
        });
      });
      return allCaseStudiesComplete && totalCaseStudies > 0;
    },
  },
  // Adicione mais conquistas aqui
];


