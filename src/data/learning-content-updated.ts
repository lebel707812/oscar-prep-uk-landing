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

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CaseStudyQuestion {
  id: string;
  question: string;
  sampleAnswer: string;
  keyPoints: string[];
}

export interface LearningSection {
  id: string;
  title: string;
  type: "content" | "quiz" | "case-study" | "video";
  content?: string;
  questions?: QuizQuestion[] | CaseStudyQuestion[];
  scenario?: string;
  videoUrl?: string;
  estimatedTime: number;
}

export interface LearningSession {
  id: string;
  title: string;
  description: string;
  sections: LearningSection[];
}

export interface LearningTopic {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: any;
  color: string;
  totalEstimatedTime: number;
  sessions: LearningSession[];
}

export const learningContent: LearningTopic[] = [
  {
    id: 1,
    title: "History Taking & Communication",
    slug: "history-taking-communication",
    description: "Master patient interviews and communication skills",
    icon: Stethoscope,
    color: "bg-blue-500",
    totalEstimatedTime: 145,
    sessions: [
      {
        id: "ht-1",
        title: "Introduction to History Taking",
        description: "Fundamental principles of effective patient communication",
        sections: [
          {
            id: "ht-1-1",
            title: "Principles of Effective Communication",
            type: "content",
            content: `**Effective communication is the cornerstone of excellent patient care.** In the OSCE setting, your ability to gather accurate information whilst building rapport with patients will be critically assessed.`,
            estimatedTime: 8
          },
          {
            id: "ht-1-2",
            title: "The SOCRATES Framework",
            type: "content",
            content: `**SOCRATES is a systematic approach to pain assessment** that ensures comprehensive evaluation of any symptom, particularly pain. This mnemonic is essential for OSCE examinations and clinical practice.`,
            estimatedTime: 10
          },
          {
            id: "ht-1-3",
            title: "Communication Skills Quiz",
            type: "quiz",
            questions: [
              {
                id: "ht-q1",
                question: "Which of the following is the most appropriate opening question when taking a history from a patient presenting with chest pain?",
                options: [
                  "Do you have heart problems?",
                  "Can you tell me about the chest pain you've been experiencing?",
                  "Is the pain sharp or dull?",
                  "Have you had a heart attack before?"
                ],
                correctAnswer: 1,
                explanation: "Open-ended questions allow patients to describe their symptoms in their own words, providing more comprehensive information than closed questions."
              }
            ],
            estimatedTime: 5
          }
        ]
      },
      {
        id: "ht-2",
        title: "Advanced Communication Techniques",
        description: "Handling difficult conversations and breaking bad news",
        sections: [
          {
            id: "ht-2-1",
            title: "Breaking Bad News",
            type: "content",
            content: `**Breaking bad news is a challenging but essential communication skill.** The SPIKES protocol provides a structured approach to delivering difficult news with empathy and clarity.`,
            estimatedTime: 12
          }
        ]
      }
    ]
  }
];


