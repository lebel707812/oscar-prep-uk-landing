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
import { topic4 } from "./topics/topic-4-wound-care";
import { topic5 } from "./topics/topic-5-vital-signs-monitoring";
import { topic6 } from "./topics/topic-6-emergency-procedures-cpr";
import { topic7 } from "./topics/topic-7-patient-safety-risk-assessment";
import { topic8 } from "./topics/topic-8-documentation-record-keeping";

export const learningContent: LearningTopic[] = [
  topic1,
  topic2,
  topic3,
  topic4,
  topic5,
  topic6,
  topic7,
  topic8,
    topic9,
  // Add more topics here
];

import { topic9 } from "./topics/topic-9-professional-boundaries-ethics";

