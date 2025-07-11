import { LucideIcon } from "lucide-react";

// Define types locally since they're not in Supabase types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CaseQuestion {
  id: string;
  question: string;
  sampleAnswer: string;
  keyPoints: string[];
}

export interface LearningSection {
  id: string;
  title: string;
  type: 'content' | 'quiz' | 'case-study' | 'video';
  content: string;
  estimatedTime: number;
  quizQuestions?: QuizQuestion[];
  caseQuestions?: CaseQuestion[];
  caseStudyContent?: string;
  videoUrl?: string;
}

export interface LearningSession {
  id: string;
  title: string;
  description: string;
  sections: LearningSection[];
}

export interface LearningTopic {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
  totalEstimatedTime: number;
  sessions: LearningSession[];
}

import { topic1 } from "./topics/topic-1-history-taking";
import { topic2 } from "./topics/topic-2-physical-examination";
import { topic3 } from "./topics/topic-3-medication-management";

export const learningContent: LearningTopic[] = [
  topic1,
  topic2,
  topic3,
  // Add more topics here
];
