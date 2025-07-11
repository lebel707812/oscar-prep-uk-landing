import { LearningTopic } from "@/integrations/supabase/types";
import { Stethoscope } from "lucide-react";

import content1_1 from "@/content/learning/history-taking-1-1.md?raw";
import content1_2 from "@/content/learning/history-taking-1-2.md?raw";
import content2_1 from "@/content/learning/history-taking-2-1.md?raw";
import content2_2 from "@/content/learning/history-taking-2-2.md?raw";
import content3_1 from "@/content/learning/history-taking-3-1.md?raw";
import content3_2 from "@/content/learning/history-taking-3-2.md?raw";

export const topic1: LearningTopic = {
  id: "topic-1",
  title: "History Taking & Communication",
  description: "Mastering the art of effective patient communication and comprehensive history taking.",
  icon: Stethoscope,
  slug: "history-taking-communication",
  totalEstimatedTime: 70, // atualize conforme soma dos tempos
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
        },
        {
          id: "history-taking-1-3",
          title: "1.3 Practice Quiz: Basic Communication",
          type: "quiz",
          content: "Test your understanding of the basic principles of communication and history taking.",
          estimatedTime: 15,
          quizQuestions: [
            {
              id: "q-hist-1-1",
              question: "What is the most important aspect of building rapport with a patient?",
              options: [
                "Speaking quickly to save time",
                "Active listening and showing empathy",
                "Taking detailed notes",
                "Asking only closed questions",
              ],
              correctAnswer: 1,
              explanation:
                "Active listening and showing empathy are fundamental to building trust and rapport with patients.",
            },
            {
              id: "q-hist-1-2",
              question: "When should you interrupt a patient during their initial story?",
              options: [
                "Immediately if they're going off-topic",
                "After 30 seconds",
                "Only if there's an emergency",
                "Never, let them finish first",
              ],
              correctAnswer: 2,
              explanation:
                "Allow patients to tell their story initially, only interrupting for genuine emergencies.",
            },
            {
              id: "q-hist-1-3",
              question: "Which of these demonstrates good non-verbal communication?",
              options: [
                "Looking at your notes constantly",
                "Sitting at the same level as the patient",
                "Checking your phone",
                "Standing with arms crossed",
              ],
              correctAnswer: 1,
              explanation:
                "Positioning yourself at the same level shows respect and makes the interaction more comfortable.",
            },
          ],
        },
      ],
    },
    {
      id: "history-taking-2",
      title: "Session 2: Advanced Communication Techniques (Intermediate)",
      description:
        "Developing skills for challenging situations and complex history taking.",
      sections: [
        {
          id: "history-taking-2-1",
          title: "2.1 SOCRATES Framework for Pain Assessment",
          type: "content",
          content: content2_1,
          estimatedTime: 15,
        },
        {
          id: "history-taking-2-2",
          title: "Handling Difficult Conversations",
          type: "content",
          content: content2_2,
          estimatedTime: 15,
        },
        {
          id: "history-taking-2-3",
          title: "Interactive Case Study: Chest Pain Assessment",
          type: "case-study",
          content: `
# Case Study: 55-year-old with Chest Pain

## Clinical Scenario
A 55-year-old male presents to the emergency department with chest pain that started 2 hours ago. He appears anxious and is sweating. His wife accompanied him and is also worried.

## Your Role
You are the triage nurse responsible for taking his initial history. Use the SOCRATES framework and appropriate communication techniques to gather comprehensive information.

## Patient Background
- Works as an office manager (sedentary job)
- Has a history of high blood pressure
- Smokes 15 cigarettes per day
- Father had a heart attack at age 60

## Initial Presentation
The patient clutches his chest and says: "It feels like an elephant is sitting on my chest. I've never felt anything like this before."
          `,
          estimatedTime: 25,
          caseQuestions: [
            {
              id: "case-hist-2-3-1",
              question:
                "Using the SOCRATES framework, what are the key questions you would ask about the chest pain?",
              sampleAnswer:
                "Site: Can you show me exactly where the pain is? Is it in one specific area?\nOnset: When exactly did it start? What were you doing at the time?\nCharacter: You mentioned it feels like an elephant - can you describe it more? Is it crushing, sharp, burning?\nRadiation: Does the pain travel anywhere? To your arms, neck, or back?\nAssociations: Any other symptoms? Shortness of breath, nausea, sweating?\nTime: Has it been constant since it started? Any changes?\nExacerbating/Relieving: Does anything make it better or worse? Rest, movement?\nSeverity: On a scale of 1-10, how would you rate the pain?",
              keyPoints: [
                "Use all components of SOCRATES systematically",
                "Ask open-ended questions initially",
                "Listen for red flag symptoms",
                "Note the patient's exact words",
                "Consider cardiac risk factors",
              ],
            },
            {
              id: "case-hist-2-3-2",
              question:
                "How would you address the patient's anxiety while gathering the history?",
              sampleAnswer:
                "I would acknowledge his distress: 'I can see you're worried about this pain, and that's completely understandable.' I'd explain what I'm doing: 'I'm going to ask you some questions to help us understand what's happening and get you the right care.' I'd reassure him about the process: 'The team is experienced with chest pain, and we'll take good care of you.' I'd also involve his wife appropriately: 'Is it helpful for your wife to stay with you while we talk?'",
              keyPoints: [
                "Acknowledge and validate emotions",
                "Explain the process",
                "Provide appropriate reassurance",
                "Include family members when appropriate",
                "Maintain professional calm",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "history-taking-3",
      title: "Session 3: Patient-centred History Taking (Advanced)",
      description:
        "Refining history taking techniques with patient-centred approaches and complex scenarios.",
      sections: [
        {
          id: "history-taking-3-1",
          title: "3.1 Effective Patient-centred History Taking",
          type: "content",
          content: content3_1,
          estimatedTime: 20,
        },
        {
          id: "history-taking-3-2",
          title: "3.2 Addressing Communication Barriers",
          type: "content",
          content: content3_2,
          estimatedTime: 15,
        },

{
  id: "history-taking-3-3",
  title: "3.3 Comprehensive Assessment Quiz",
  type: "quiz",
  content: "Test your mastery of advanced communication and history-taking skills with these challenging questions.",
  estimatedTime: 15,
  quizQuestions: [
    {
      id: "q-adv-1",
      question: "When a patient presents with multiple complaints, what is the best way to prioritise during history taking?",
      options: [
        "Ask about all complaints at once",
        "Focus only on the first complaint mentioned",
        "Ask which concern worries them most and prioritise accordingly",
        "Ignore the less severe complaints"
      ],
      correctAnswer: 2,
      explanation: "Prioritising based on the patient's main concern ensures patient-centred care and effective time management."
    },
    {
      id: "q-adv-2",
      question: "How should you approach sensitive topics like substance use or sexual history?",
      options: [
        "Avoid them to respect patient privacy",
        "Ask directly but non-judgmentally, explaining the importance",
        "Assume the patient will volunteer if relevant",
        "Ask only if the patient appears suspicious"
      ],
      correctAnswer: 1,
      explanation: "Direct, respectful questioning with explanation helps gather accurate information while maintaining trust."
    },
    {
      id: "q-adv-3",
      question: "Which technique best supports motivational interviewing?",
      options: [
        "Giving advice immediately",
        "Exploring patient ambivalence and supporting self-efficacy",
        "Ignoring patient hesitations",
        "Pressuring the patient to change"
      ],
      correctAnswer: 1,
      explanation: "Motivational interviewing respects patient autonomy and encourages behaviour change through support."
    },
    {
      id: "q-adv-4",
      question: "When working with a professional interpreter, you should:",
      options: [
        "Speak to the interpreter, not the patient",
        "Speak slowly and clearly directly to the patient",
        "Use family members if an interpreter is unavailable",
        "Avoid confirming understanding"
      ],
      correctAnswer: 1,
      explanation: "Always address the patient directly, speak clearly, and confirm understanding to ensure effective communication."
    },
    {
      id: "q-adv-5",
      question: "How can you demonstrate cultural competence during a clinical encounter?",
      options: [
        "Assume all patients prefer the same approach",
        "Ask open questions about cultural beliefs and preferences",
        "Avoid discussing culture",
        "Stick strictly to medical questions only"
      ],
      correctAnswer: 1,
      explanation: "Open questions about culture show respect and help tailor care to individual needs."
    }
  ]
}


      ],
    },
  ],
};
