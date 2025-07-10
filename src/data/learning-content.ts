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
  TrendingUp
} from "lucide-react";

export type LearningTopic = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  slug: string;
  totalEstimatedTime: number;
  sessions: LearningSession[];
};

export type LearningSession = {
  id: string;
  title: string;
  description: string;
  sections: LearningSection[];
};

export type LearningSection = {
  id: string;
  title: string;
  type: "content" | "quiz" | "case-study" | "video" | "external-link";
  content: string;
  estimatedTime: number;
  quizQuestions?: QuizQuestion[];
  caseQuestions?: CaseQuestion[];
  caseStudyContent?: string;
  videoUrl?: string;
  externalUrl?: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Changed from string to number to match InteractiveQuiz
  explanation: string;
};

export type CaseQuestion = {
  id: string;
  question: string;
  sampleAnswer: string;
  keyPoints: string[];
};

export const learningContent: LearningTopic[] = [
  {
    id: "topic-1",
    title: "History Taking & Communication",
    description: "Mastering the art of effective patient communication and comprehensive history taking.",
    icon: Stethoscope,
    slug: "history-taking-communication",
    totalEstimatedTime: 25, // Updated to reflect only 2 sessions
    sessions: [
      // SESSION 1 - INICIANTE (Beginner Level)
      {
        id: "history-taking-1",
        title: "Session 1: Basic Communication Principles (Beginner)",
        description: "Foundation skills for effective patient communication and basic history taking.",
        sections: [
          {
            id: "history-taking-1-1",
            title: "1.1 Principles of Effective Communication",
            type: "content",
            content: `CONTENT_FROM_MARKDOWN: history-taking-1-1.md`,
            estimatedTime: 10,
          },
          {
            id: "history-taking-1-2",
            title: "1.2 Basic History Taking Structure",
            type: "content",
            content: `CONTENT_FROM_MARKDOWN: history-taking-1-2.md`,
            estimatedTime: 15
          }
        ],
      },
    ],
  },
];


