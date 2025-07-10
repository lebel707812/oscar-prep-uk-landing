import { LearningTopic } from "@/integrations/supabase/types";
import { Stethoscope } from "lucide-react";

import content1_1 from "@/content/history-taking-1-1.md?raw";
import content1_2 from "@/content/history-taking-1-2.md?raw";

export const topic1: LearningTopic = {
  id: "topic-1",
  title: "History Taking & Communication",
  description: "Mastering the art of effective patient communication and comprehensive history taking.",
  icon: Stethoscope,
  slug: "history-taking-communication",
  totalEstimatedTime: 25,
  sessions: [
    {
      id: "history-taking-1",
      title: "Session 1: Basic Communication Principles (Beginner)",
      description: "Foundation skills for effective patient communication and basic history taking.",
      sections: [
        {
          id: "history-taking-1-1",
          title: "1.1 Principles of Effective Communication",
          type: "content",
          content: content1_1,
          estimatedTime: 10,
        },
        {
          id: "history-taking-1-2",
          title: "1.2 Basic History Taking Structure",
          type: "content",
          content: content1_2,
          estimatedTime: 15,
        }
      ]
    }
  ]
};
