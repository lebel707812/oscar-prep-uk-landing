import { LearningTopic } from "@/integrations/supabase/types";
import { Heart } from "lucide-react";

import content2_1 from "@/content/learning/physical-exam-2-1.md?raw";
import content2_2 from "@/content/learning/physical-exam-2-2.md?raw";

export const topic2: LearningTopic = {
  id: "topic-2",
  title: "Physical Examination",
  description: "Advanced techniques for physical examination and patient assessment.",
  icon: Heart,
  slug: "physical-examination",
  totalEstimatedTime: 30,
  sessions: [
    {
      id: "physical-exam-2-1",
      title: "Session 1: Comprehensive Physical Exam Basics",
      description: "Learn essential physical examination skills.",
      sections: [
        {
          id: "physical-exam-2-1-1",
          title: "2.1 Neurological Examination",
          type: "content",
          content: content2_1,
          estimatedTime: 15,
        },
        {
          id: "physical-exam-2-1-2",
          title: "2.2 Respiratory Examination",
          type: "content",
          content: content2_2,
          estimatedTime: 15,
        },
      ],
    },
  ],
};
