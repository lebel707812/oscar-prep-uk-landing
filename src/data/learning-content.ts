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
    totalEstimatedTime: 120, // Updated to reflect all 3 sessions
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
            content: `Effective communication is the foundation of patient care. When a patient feels heard, safe and respected, they are more likely to share vital information.

### Key Communication Principles:

1. **Polite Greeting and Introduction**
   Always begin with a smile and clear introduction:
   > "Hello, my name is Sarah, I'm one of the nurses here today."

2. **Body Language Matters**
   - Sit at eye level with the patient
   - Avoid crossing arms or looking distracted
   - Maintain comfortable eye contact

3. **Active Listening**
   - Nod to show understanding
   - Use short verbal affirmations like "I see", "Go on"
   - Don’t interrupt — let the patient speak freely first

4. **Empathy and Reassurance**
   Patients may be anxious, scared, or frustrated. Acknowledge this:
   > "I can see you're feeling overwhelmed. You're in safe hands now."

5. **Simple and Clear Language**
   Avoid medical jargon. Use plain English and short sentences.
   > Say: "I’m going to take your blood pressure now"
   > Avoid: "I'll perform a sphygmomanometric reading"

6. **Check Understanding**
   Ask:
   > "Does that make sense?"  
   > "Would you like me to explain that again?"

### Bonus Tips:
- Use the patient's name during the interaction
- Pause and give them time to respond
- Avoid multitasking during conversations

### Why It Matters:
Poor communication is a common reason for complaints and misdiagnoses. Mastering these basics can improve patient outcomes and trust — and they’re often assessed during the OSCE.

> 🔍 Remember: In OSCE exams, communication counts as much as clinical knowledge.`,
            estimatedTime: 10,
          },
         {
  id: "history-taking-1-2",
  title: "1.2 Basic History Taking Structure",
  type: "content",
  content: `Taking a patient’s history is one of the most fundamental — and most frequently tested — skills in the OSCE. A structured and professional approach helps ensure no important detail is missed.

### 🧩 Standard History-Taking Framework

Follow this logical order to guide the conversation:

1. **Introduce Yourself and Gain Consent**
   > "Hello, I’m [Your Name], one of the nurses. I’d like to ask you a few questions to understand what’s brought you in today. Is that alright?"

2. **Chief Complaint**
   - Start with an open question:  
     > "Can you tell me what brought you here today?"
   - Let the patient speak freely at first. Don’t interrupt.

3. **History of Presenting Complaint (HPC)**
   - Use open and closed questions to explore:
     - Onset: "When did it start?"
     - Location: "Where exactly do you feel it?"
     - Duration: "Is it constant or does it come and go?"
     - Severity: "How bad is it, from 0 to 10?"
     - Aggravating/relieving factors: "What makes it better or worse?"
     - Associated symptoms: "Have you noticed anything else?"

4. **Past Medical History (PMH)**
   > "Have you had any medical problems in the past? Any surgeries or hospital stays?"

5. **Medication History**
   > "Are you currently taking any medications, including over-the-counter or herbal remedies?"

6. **Allergies**
   > "Do you have any known allergies or reactions to medication?"

7. **Family History**
   > "Are there any medical conditions that run in your family?"

8. **Social History**
   Ask about:
   - Smoking
   - Alcohol use
   - Occupation
   - Living situation
   - Support system

9. **Review of Systems**
   > "Have you had any other symptoms recently, such as headaches, weight loss, or fatigue?"

10. **Summarise and Confirm**
   Recap what the patient has told you:
   > "Just to confirm, you've been feeling chest pain for two days, especially when walking, and it improves with rest. Is that correct?"

### 🧠 Tips for Beginners

- **Use open-ended questions first**, then narrow down.
- Avoid medical jargon — always check for understanding.
- Take notes efficiently, but **maintain eye contact** regularly.
- Show empathy, even during structured questioning.

> 🩺 In OSCE exams, candidates often lose marks by missing key steps or failing to summarise. Practise saying it aloud in a real flow.

### 🔍 Practice Prompt:
> Imagine you're taking the history of a patient with a persistent cough. What open and closed questions could you ask to explore this complaint systematically?
`,
  estimatedTime: 15
}
,
          {
  id: "history-taking-1-3",
  title: "1.3 Practice Quiz: Basic Communication",
  type: "quiz",
  content: `Test your knowledge of basic communication principles in clinical interactions. Read each question carefully and think as if you were in a real OSCE station.`,
  estimatedTime: 15,
  quizQuestions: [
    {
      id: "q-hist-1-1",
      question: "A patient appears nervous and avoids eye contact. What is the most appropriate response?",
      options: [
        "Avoid eye contact as well to not make them uncomfortable",
        "Force eye contact to establish control",
        "Gently maintain soft eye contact and offer reassurance",
        "Ignore it and continue with the assessment"
      ],
      correctAnswer: 2,
      explanation: "Maintaining soft, non-threatening eye contact and offering calm reassurance helps build trust. Avoiding it completely may reinforce discomfort."
    },
    {
      id: "q-hist-1-2",
      question: "During the opening of your consultation, what should you say after introducing yourself?",
      options: [
        "Ask immediately about their symptoms",
        "Start taking notes in silence",
        "Explain your role and seek consent to proceed",
        "Begin physical examination to save time"
      ],
      correctAnswer: 2,
      explanation: "Always explain your role and ask for consent to ensure the patient feels involved and respected. This is a key OSCE expectation."
    },
    {
      id: "q-hist-1-3",
      question: "Which of the following best demonstrates active listening?",
      options: [
        "Nodding, paraphrasing the patient's words, and asking relevant follow-up questions",
        "Writing everything silently while the patient talks",
        "Waiting until they finish to ask about their history",
        "Repeating the same question if unsure"
      ],
      correctAnswer: 0,
      explanation: "Active listening includes showing verbal and non-verbal signs of engagement. Reflecting and paraphrasing confirm understanding and build rapport."
    },
    {
      id: "q-hist-1-4",
      question: "When is it appropriate to interrupt a patient during their initial explanation?",
      options: [
        "If they speak for more than 30 seconds",
        "Only if the patient becomes aggressive or it's an emergency",
        "To redirect them quickly to the point",
        "As soon as you identify the main symptom"
      ],
      correctAnswer: 1,
      explanation: "In general, let the patient speak freely at the beginning. Only interrupt in case of urgent safety concerns."
    },
    {
      id: "q-hist-1-5",
      question: "Which of the following phrases best shows empathy?",
      options: [
        "Okay, let’s move on to the next question.",
        "I can see this is difficult for you – take your time.",
        "We don’t have much time, please answer directly.",
        "It’s probably nothing serious."
      ],
      correctAnswer: 1,
      explanation: "Empathy involves acknowledging the patient’s emotions and creating a safe environment. 'Take your time' encourages openness and reduces anxiety."
    }
  ]
}
,
        ],
      },

      // SESSION 2 - INTERMEDIÁRIO (Intermediate Level)
      {
        id: "history-taking-2",
        title: "Session 2: Advanced Communication Techniques (Intermediate)",
        description: "Developing skills for challenging situations and complex history taking.",
        sections: [
          {
  id: "history-taking-2-1",
  title: "2.1 SOCRATES Framework for Pain Assessment",
  type: "content",
  content: `Pain is a common presenting complaint in clinical practice — and one you’ll often encounter in the OSCE. The **SOCRATES** framework provides a structured way to explore pain in detail, helping identify its cause and severity.

### 🧠 What is SOCRATES?

Each letter stands for a key aspect of pain assessment:

1. **S – Site**  
   > "Can you point to exactly where it hurts?"

   Identify the **location**. Is it localised or diffuse?

2. **O – Onset**  
   > "When did the pain start?"  
   > "Did it come on suddenly or gradually?"

   Determine **timing** and **context**.

3. **C – Character**  
   > "Can you describe what the pain feels like?"

   Is it:
   - Sharp
   - Dull
   - Burning
   - Throbbing
   - Crushing

4. **R – Radiation**  
   > "Does the pain spread anywhere else?"

   Important for conditions like **cardiac pain**, which may radiate to arm, jaw or back.

5. **A – Associated Symptoms**  
   > "Have you noticed any other symptoms with the pain?"

   For example:
   - Nausea
   - Sweating
   - Fever
   - Shortness of breath

6. **T – Time Course**  
   > "Has the pain been constant or does it come and go?"

   Understand **pattern** and **progression**.

7. **E – Exacerbating/Relieving Factors**  
   > "Is there anything that makes the pain better or worse?"

   Common examples:
   - Movement
   - Eating
   - Rest
   - Position

8. **S – Severity**  
   > "On a scale from 0 to 10, how bad is the pain?"

   This provides a **quantitative** assessment to monitor changes.

---

### 🎯 Example in Practice

**Scenario:**  
Patient says: “I’ve had a dull ache in my lower back for three days.”

**Your response using SOCRATES:**

- Site: "Is the pain limited to your lower back or does it move elsewhere?"
- Onset: "Did it start suddenly or gradually?"
- Character: "Is it a sharp stabbing pain or more like a dull ache?"
- Radiation: "Does it spread to your legs or buttocks?"
- Associations: "Any tingling, numbness, or weakness?"
- Time: "Is it constant or does it come and go?"
- Exacerbating/Relieving: "What makes it worse or better?"
- Severity: "How bad is it right now, from 0 to 10?"

---

### 🩺 Why This Matters in the OSCE

In the OSCE, you’ll be expected to **explore pain comprehensively**, especially in stations related to:
- Chest pain
- Abdominal pain
- Musculoskeletal injuries
- Post-operative care

You must **demonstrate structure, empathy and clinical reasoning** — not just ask questions robotically.

---

### 🔍 Quick Tip:
Always **summarise the pain** at the end:
> "So you’ve had a dull, constant pain in your lower back for 3 days, which worsens when walking and improves with rest, and you rate it as a 6 out of 10 — is that correct?"

This shows organisation and patient-centred care.`,
  estimatedTime: 15
}
,
          {
  id: "history-taking-2-2",
  title: "2.2 Handling Difficult Conversations",
  type: "content",
  content: `Communicating effectively in challenging situations is a vital skill for healthcare professionals. Difficult conversations may involve distressed, angry, or non-English speaking patients. Handling these well improves patient trust and outcomes.

### Common Difficult Scenarios and Strategies

#### 1. Nervous or Crying Patient  
- **What to do:**
  - Acknowledge their emotions:  
    > "I can see you’re feeling upset, that’s completely understandable."  
  - Offer tissues and give them a moment to compose themselves.  
  - Speak in a calm, gentle tone.  
  - Use comforting body language: sit close (if appropriate), lean slightly forward.

- **Why it helps:**  
  Validating feelings reduces anxiety and builds rapport.

#### 2. Angry or Frustrated Patient  
- **What to do:**
  - Stay calm and composed; keep your voice low and steady.  
  - Listen actively without interrupting.  
  - Don’t take the anger personally.  
  - Use phrases like:  
    > "I understand you’re upset, let’s see how I can help."  
  - Set boundaries respectfully if needed.

- **Why it helps:**  
  Defusing tension allows for more productive communication.

#### 3. Language Barriers  
- **What to do:**
  - Always use a **professional interpreter** when possible; avoid relying on family members.  
  - Speak slowly and clearly, using simple words.  
  - Use gestures or visual aids if helpful.  
  - Confirm understanding frequently:  
    > "Can you tell me in your own words what we just discussed?"

- **Why it helps:**  
  Ensures accurate communication and patient safety.

#### 4. Delivering Bad News (Brief Overview)  
- **Approach:**
  - Prepare yourself and the environment (privacy, time).  
  - Be clear, honest, and compassionate.  
  - Allow the patient time to process and ask questions.  
  - Offer support and follow-up plans.

- **Note:** This topic is often a dedicated OSCE station; practice the SPIKES protocol if possible.

---

### 🧠 Tips for Effective Difficult Conversations

- Maintain open body language; avoid crossing arms.  
- Use the patient’s name frequently.  
- Avoid medical jargon.  
- Manage your own emotions; pause and breathe if overwhelmed.  
- Document important points carefully after the conversation.

---

### 🎯 OSCE Relevance

During OSCEs, examiners look for your ability to:

- Show empathy and respect  
- Handle emotions sensitively  
- Communicate clearly despite barriers  
- Maintain professionalism under pressure

---

### 🔍 Reflective Question

> Think of a time you witnessed or experienced a difficult conversation in healthcare. What strategies helped or could have helped improve communication?

Use this reflection to guide your practice and personal development.`,
  estimatedTime: 15
}
,
          {
  id: "history-taking-2-3",
  title: "2.3 Interactive Case Study: Chest Pain Assessment",
  type: "case-study",
  content: `# Case Study: 55-year-old with Chest Pain

## Clinical Scenario
A 55-year-old male presents to the emergency department complaining of chest pain that started 2 hours ago. He appears anxious and is sweating. His wife is with him and also looks worried.

## Your Role
You are the triage nurse responsible for taking the patient's initial history. Use the SOCRATES framework and effective communication skills to gather comprehensive information.

## Patient Background
- Office manager (sedentary lifestyle)
- History of hypertension
- Smokes 15 cigarettes per day
- Father had a myocardial infarction at age 60

## Initial Presentation
The patient clutches his chest and says: "It feels like an elephant is sitting on my chest. I've never felt anything like this before."

---

### Tasks

1. Use the **SOCRATES** framework to ask detailed questions about the chest pain.

2. Apply effective communication skills to manage the patient’s anxiety and involve his wife appropriately.

---

### Case Questions

- **Q1:** Using the SOCRATES framework, what key questions would you ask about the chest pain?  
  *Sample answer:*  
  - Site: "Can you show me exactly where the pain is?"  
  - Onset: "When did the pain start?"  
  - Character: "You said it feels like an elephant is sitting on your chest — can you describe the sensation?"  
  - Radiation: "Does the pain move anywhere else?"  
  - Associations: "Have you noticed any other symptoms such as shortness of breath or nausea?"  
  - Time: "Has the pain been constant since it started?"  
  - Exacerbating/Relieving factors: "Does anything make it better or worse?"  
  - Severity: "On a scale of 1 to 10, how severe is the pain?"

- **Q2:** How would you address the patient’s anxiety while gathering the history?  
  *Sample answer:*  
  - Acknowledge his distress: "I can see you're worried, which is completely understandable."  
  - Explain your role and what you’re doing: "I’m going to ask you some questions to understand what's happening so we can provide the best care."  
  - Reassure him: "The team is experienced, and we’ll take good care of you."  
  - Involve his wife appropriately: "Would you like your wife to stay with you while we talk?"

---

### Key Learning Points

- Systematic use of SOCRATES to cover all pain aspects.  
- Maintaining calm, empathetic communication despite patient distress.  
- Importance of involving family members where appropriate.  
- Recognising red flags such as sweating and anxiety in chest pain.

---

### Estimated Time: 15 minutes

`,
  estimatedTime: 15,
  caseQuestions: [
    {
      id: "case-hist-2-1",
      question: "Using the SOCRATES framework, what are the key questions you would ask about the chest pain?",
      sampleAnswer: "Site: Can you show me exactly where the pain is? Is it in one specific area?\nOnset: When exactly did it start? What were you doing at the time?\nCharacter: You mentioned it feels like an elephant - can you describe it more? Is it crushing, sharp, burning?\nRadiation: Does the pain travel anywhere? To your arms, neck, or back?\nAssociations: Any other symptoms? Shortness of breath, nausea, sweating?\nTime: Has it been constant since it started? Any changes?\nExacerbating/Relieving: Does anything make it better or worse? Rest, movement?\nSeverity: On a scale of 1-10, how would you rate the pain?",
      keyPoints: [
        "Use all components of SOCRATES systematically",
        "Ask open-ended questions initially",
        "Listen for red flag symptoms",
        "Note the patient's exact words",
        "Consider cardiac risk factors"
      ]
    },
    {
      id: "case-hist-2-2",
      question: "How would you address the patient's anxiety while gathering the history?",
      sampleAnswer: "I would acknowledge his distress: 'I can see you're worried about this pain, and that's completely understandable.' I'd explain what I'm doing: 'I'm going to ask you some questions to help us understand what's happening and get you the right care.' I'd reassure him about the process: 'The team is experienced with chest pain, and we'll take good care of you.' I'd also involve his wife appropriately: 'Is it helpful for your wife to stay with you while we talk?'",
      keyPoints: [
        "Acknowledge and validate emotions",
        "Explain the process",
        "Provide appropriate reassurance",
        "Include family members when appropriate",
        "Maintain professional calm"
      ]
    }
  ]
}
,
        ],
      },

      // SESSION 3 - AVANÇADO (Advanced Level)
      {
        id: "history-taking-3",
        title: "Session 3: Expert-Level Communication (Advanced)",
        description: "Mastering complex consultations and specialized history-taking techniques.",
        sections: [
          {
  id: "history-taking-3-1",
  title: "3.1 Complex History Taking Strategies",
  type: "content",
  content: `In advanced clinical scenarios, patients often present with multiple issues, sensitive topics, or require motivational interviewing. Mastering these strategies is essential for expert-level communication in the OSCE.

### Managing Multiple Complaints  
- Start by asking:  
  > "What is your main concern today?"  
- Prioritise complaints based on urgency and patient distress.  
- Link related symptoms to understand underlying patterns.  
- Avoid rushing; manage time but ensure the patient feels heard.

### Addressing Sensitive Topics  
- Topics may include sexual history, substance use, domestic violence, or mental health.  
- Approach professionally and non-judgmentally:  
  > "I ask these questions because they help me understand your health better."  
- Maintain confidentiality and reassure the patient about privacy.  
- Use open-ended questions first, then specific ones.

### Motivational Interviewing  
- Useful for behaviour change (e.g., smoking cessation, diet).  
- Explore ambivalence:  
  > "How do you feel about stopping smoking?"  
- Support self-efficacy:  
  > "What changes do you think you could make?"  
- Use reflective listening and summarise progress.

---

### Practical Tips for OSCE Success

- Stay calm and patient, especially with complex or emotional cases.  
- Use empathetic statements frequently.  
- Take structured notes to organise information.  
- Always summarise and check patient understanding.  
- Practice role-playing sensitive discussions with peers.

---

### Why This Matters

Expert-level communication is not just about gathering facts — it’s about building trust, supporting patient autonomy, and providing holistic care. This is a key differentiator in OSCE exams and real clinical practice.

---

### Estimated Time: 20 minutes
`,
  estimatedTime: 20
}
,
          {
  id: "history-taking-3-2",
  title: "3.2 Cultural Competency and Communication",
  type: "content",
  content: `Providing culturally competent care means respecting and responding to the diverse beliefs, values, and practices of patients. It improves patient satisfaction, adherence, and health outcomes.

### Key Aspects of Cultural Competency

1. **Understanding Cultural Differences**  
   - Eye contact may be respectful in some cultures, but disrespectful in others.  
   - Personal space and physical touch vary widely; always ask permission.  
   - Family roles differ: some cultures expect family decision-making.  
   - Beliefs about illness and healing may include spiritual or traditional practices.

2. **Working with Interpreters**  
   - Always speak **directly to the patient**, not the interpreter.  
   - Use professional interpreters whenever possible; avoid family members for sensitive topics.  
   - Speak clearly, slowly, and avoid jargon.  
   - Confirm understanding frequently.

3. **Communicating with Special Populations**  
   - LGBTQ+ patients may have specific health needs and sensitivities.  
   - Refugees may face language, trauma, and trust issues.  
   - Elderly patients may have hearing or cognitive impairments.  
   - People with disabilities may require accommodations.  
   - Religious beliefs can influence decisions about treatment.

---

### Practical Tips for Culturally Competent Care

- Ask open, respectful questions about the patient’s background and preferences.  
- Avoid assumptions or stereotypes.  
- Be humble and curious: admit when you don’t know something.  
- Document any cultural considerations for the care team.  
- Provide written materials in the patient’s preferred language if possible.

---

### OSCE Relevance

Examiners look for evidence that you:

- Respect patient diversity  
- Communicate effectively despite language or cultural barriers  
- Adapt your approach to meet individual needs  
- Demonstrate empathy and cultural sensitivity

---

### Reflective Question

> Think about how cultural beliefs might influence a patient’s understanding of illness and treatment. How would you approach a patient with a different worldview than your own?

---

### Estimated Time: 20 minutes
`,
  estimatedTime: 20
}
,
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
,
        ],
      },
    ],
  },
  {
    id: "topic-2",
    title: "Physical Examination Techniques",
    description: "Developing proficiency in systematic physical examination of all body systems.",
    icon: Heart,
    slug: "physical-examination-techniques",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "physical-examination-1",
        title: "Cardiovascular Examination",
        description: "Learning the systematic approach to examining the cardiovascular system.",
        sections: [
          {
  id: "physical-examination-1-1",
  title: "Inspection, Palpation, Percussion, Auscultation (IPPA)",
  type: "content",
  content: `The IPPA method is the cornerstone of a thorough cardiovascular examination. Each step helps gather specific clinical information essential for diagnosis.

### 1. Inspection  
- Observe the patient's general appearance for signs of distress or cyanosis.  
- Look for visible pulsations on the chest wall (e.g., apex beat).  
- Check for jugular venous distention (JVD) on the neck as a sign of right heart failure.  
- Note any scars, deformities, or abnormal movements.

### 2. Palpation  
- Palpate the apex beat: location, size, amplitude, and duration.  
- Feel for any thrills (vibrations over the chest wall indicating turbulent blood flow).  
- Check peripheral pulses (radial, carotid, femoral) for volume and symmetry.  
- Assess for signs of oedema in the lower limbs.

### 3. Percussion  
- Less commonly used in cardiovascular exam but helpful for assessing heart borders and detecting cardiomegaly.  
- Percuss the left chest to estimate the size of the heart.

### 4. Auscultation  
- Use the diaphragm and bell of the stethoscope.  
- Listen to the four main areas:  
  - Aortic area (2nd right intercostal space)  
  - Pulmonary area (2nd left intercostal space)  
  - Tricuspid area (lower left sternal border)  
  - Mitral area/apex (5th left intercostal space, midclavicular line)  
- Identify heart sounds (S1, S2) and any extra sounds (S3, S4) or murmurs.  
- Assess timing (systolic, diastolic) and radiation of murmurs.

---

### Tips for Effective IPPA  
- Ensure good lighting and patient positioning (usually at 45 degrees).  
- Use proper stethoscope technique: warm the diaphragm before placing.  
- Compare symmetrical sites.  
- Explain each step to the patient to maintain comfort and cooperation.

---

### Why IPPA Matters  
A structured IPPA approach allows you to systematically detect abnormalities that may indicate heart failure, valve disease, or other cardiac pathology. It’s a fundamental skill tested in OSCEs and daily clinical practice.`,
  estimatedTime: 10,
}
,
          {
            id: "physical-examination-1-2",
            title: "Heart Sounds and Murmurs",
            type: "video",
            videoUrl: "https://www.youtube.com/watch?v=dBwr2GZCmQM",
            content: `Understanding heart sounds and murmurs is essential for effective cardiovascular assessment and OSCE performance.

### Heart Sounds

- **S1 ("lub")**: Produced by closure of the mitral and tricuspid valves at the start of systole.  
  - Best heard at the apex of the heart (5th intercostal space, midclavicular line).

- **S2 ("dub")**: Produced by closure of the aortic and pulmonary valves at the end of systole.  
  - Best heard at the base of the heart (2nd intercostal spaces, right and left sides).

- **Additional heart sounds**:  
  - **S3**: Early diastolic sound, can indicate heart failure or volume overload.  
  - **S4**: Late diastolic sound, associated with stiff or hypertrophic ventricles.

### Heart Murmurs

Murmurs are sounds caused by turbulent blood flow, often due to valve abnormalities.

- **Systolic murmurs** (occur between S1 and S2):  
  - *Ejection murmurs* (e.g., aortic stenosis): harsh, crescendo-decrescendo, best heard at the aortic area, radiates to carotids.  
  - *Regurgitant murmurs* (e.g., mitral regurgitation): blowing, best heard at the apex, radiates to the axilla.

- **Diastolic murmurs** (occur between S2 and S1):  
  - Usually pathological, e.g., aortic regurgitation, mitral stenosis.

### How to Assess Murmurs

- **Timing**: systolic vs diastolic  
- **Location**: where on the chest is it loudest  
- **Radiation**: where the sound spreads (e.g., carotids, axilla)  
- **Pitch and quality**: harsh, blowing, rumbling  
- **Changes with maneuvers**: posture, respiration

---

### Video Demonstration (external link)  
[Watch Heart Sounds and Murmurs on YouTube](https://www.youtube.com/watch?v=F1mm8qr6-t0)

---

### Tips for OSCE

- Use both diaphragm and bell of your stethoscope.  
- Familiarise yourself with common murmur sounds through audio resources.  
- Explain findings clearly to the examiner, demonstrating your knowledge.

---

### Estimated Time: 15 minutes`, 
            estimatedTime: 10,
          },
          {
  id: "physical-examination-1-3",
  title: "Quiz: Cardiovascular Findings",
  type: "quiz",
  content: "Test your understanding of heart sounds, murmurs, and physical examination findings with these questions.",
  estimatedTime: 15,
  quizQuestions: [
    {
      id: "q-cv-1",
      question: "Which heart sound corresponds to the closure of the mitral and tricuspid valves?",
      options: [
        "S1",
        "S2",
        "S3",
        "S4"
      ],
      correctAnswer: 0,
      explanation: "S1 is produced by the closure of the mitral and tricuspid valves at the start of systole."
    },
    {
      id: "q-cv-2",
      question: "Where is the aortic valve best auscultated?",
      options: [
        "5th intercostal space, midclavicular line",
        "2nd right intercostal space",
        "2nd left intercostal space",
        "Lower left sternal border"
      ],
      correctAnswer: 1,
      explanation: "The aortic valve is best heard at the 2nd right intercostal space."
    },
    {
      id: "q-cv-3",
      question: "A harsh crescendo-decrescendo murmur heard best at the right upper sternal border that radiates to the carotids suggests:",
      options: [
        "Mitral regurgitation",
        "Aortic stenosis",
        "Pulmonary stenosis",
        "Mitral stenosis"
      ],
      correctAnswer: 1,
      explanation: "This description is typical of aortic stenosis."
    },
    {
      id: "q-cv-4",
      question: "Which additional heart sound is often heard in patients with heart failure?",
      options: [
        "S1",
        "S2",
        "S3",
        "S4"
      ],
      correctAnswer: 2,
      explanation: "S3 is an early diastolic sound associated with volume overload and heart failure."
    },
    {
      id: "q-cv-5",
      question: "During cardiovascular examination, jugular venous distention indicates:",
      options: [
        "Left heart failure",
        "Right heart failure or fluid overload",
        "Normal venous pressure",
        "Aortic valve disease"
      ],
      correctAnswer: 1,
      explanation: "Jugular venous distention reflects increased right atrial pressure, commonly due to right heart failure or fluid overload."
    }
  ]
},
        ],
      },  {
        id: "physical-examination-2",
        title: "Advanced Physical Examination Techniques",
        description: "Delving deeper into physical examination for comprehensive understanding.",
        sections: [
          {
  id: "physical-examination-2-1",
  title: "In-depth Physical Examination Analysis",
  type: "content",
  content: `
This session focuses on advanced physical examination techniques across multiple body systems, emphasizing a holistic and integrative approach to clinical assessment.

### Neurological Examination
- Detailed cranial nerve testing, assessing sensory and motor function.
- Evaluation of reflexes and coordination tests.
- Cognitive screening and assessment of mental status.

### Respiratory Examination
- Inspection for accessory muscle use and chest shape abnormalities.
- Palpation for tactile fremitus and chest expansion.
- Percussion to identify areas of dullness or hyperresonance.
- Auscultation for breath sounds, added sounds (crackles, wheezes), and vocal resonance.

### Abdominal Examination
- Inspection of contour, scars, or distension.
- Palpation for tenderness, masses, and organomegaly.
- Percussion to assess liver and spleen size.
- Auscultation of bowel sounds and vascular bruits.

### Correlating Physical Findings with History
- Understanding how examination findings support or refute clinical hypotheses.
- Identifying red flags and urgent signs.
- Integrating data for comprehensive diagnostic reasoning.

---

This advanced physical examination analysis prepares you for complex clinical scenarios, improving diagnostic accuracy and patient management.

---
Estimated Time: 15 minutes
`,
  estimatedTime: 15,
}
,
{
  id: "physical-examination-2-2",
  title: "Advanced Techniques in Cardiovascular and Respiratory Examination",
  type: "content",
  content: `
This session dives deeper into specialized examination methods for the cardiovascular and respiratory systems, focusing on detecting subtle signs and improving diagnostic precision.

### Cardiovascular Examination
- **Advanced pulse assessment:**  
  - Assess pulse character, rate, and rhythm (regularity, pulse deficit).  
  - Evaluate for peripheral signs like clubbing, cyanosis, and capillary refill time.  
- **Jugular venous pressure (JVP):**  
  - Detailed technique to measure JVP accurately.  
  - Interpretation in heart failure and fluid overload.  
- **Auscultation nuances:**  
  - Detecting subtle murmurs and extra heart sounds (S3, S4).  
  - Use of maneuvers (e.g., Valsalva, inspiration) to differentiate murmurs.

### Respiratory Examination
- **Use of diaphragmatic excursion and tactile fremitus:**  
  - Techniques to identify consolidation or pleural effusion.  
- **Percussion nuances:**  
  - Differentiating between dullness from effusion versus consolidation.  
- **Auscultation subtleties:**  
  - Recognising fine versus coarse crackles.  
  - Identifying bronchial breath sounds and whispered pectoriloquy.

---

### Clinical Integration
- How these advanced findings correlate with patient symptoms and investigations.  
- Case examples highlighting diagnostic challenges and clinical reasoning.

---

Estimated Time: 15 minutes
`,
  estimatedTime: 15,
},{
  id: "history-taking-2-3",
  title: "Interactive Case Studies: Respiratory and Neurological Presentations",
  type: "case-study",
  content: `
# Case Study 1: 60-year-old man with chronic cough and weight loss

## Clinical Scenario
A 60-year-old man presents with a 3-month history of persistent cough, occasional hemoptysis, and unintended weight loss of 5 kg. He reports night sweats and fatigue.

## Your Role
You are the nurse conducting the initial assessment. Gather a detailed history to identify possible causes such as infection, malignancy, or chronic lung disease.

---

# Case Study 2: 35-year-old woman with new-onset weakness and dizziness

## Clinical Scenario
A 35-year-old woman attends the clinic complaining of progressive weakness in her right arm and intermittent dizziness over the last two weeks. She denies trauma or previous neurological problems.

## Your Role
You are responsible for taking a thorough neurological history and identifying red flags requiring urgent referral.

---

## Instructions
For each case:

- Identify key symptoms and red flags  
- Formulate focused questions to clarify diagnosis  
- Consider relevant social and medical history  
- Communicate empathetically with the patient

---

### Questions for Case 1

1. What further questions would you ask about the cough and systemic symptoms?  
2. Which risk factors should be explored?  
3. What are the urgent signs that need immediate action?  
4. How would you explain the importance of investigations to the patient?

### Questions for Case 2

1. What details about weakness and dizziness are important to clarify?  
2. What neurological symptoms would prompt urgent referral?  
3. How can you support the patient emotionally during the consultation?  
4. How would you summarise your initial impression to the patient?

---

### Estimated Time: 25 minutes
`,
  estimatedTime: 25,
  caseQuestions: [
    // Case 1
    {
      id: "case-2-3-1-1",
      question: "What further questions would you ask about the cough and systemic symptoms?",
      sampleAnswer: `Duration and progression of cough, nature (dry or productive), presence of blood, fever, night sweats, weight changes, smoking history, occupational exposure.`,
      keyPoints: ["Clarify symptom details", "Identify possible infection or malignancy"]
    },
    {
      id: "case-2-3-1-2",
      question: "Which risk factors should be explored?",
      sampleAnswer: `Smoking, exposure to tuberculosis, family history of cancer, previous lung disease, immunosuppression.`,
      keyPoints: ["Assess risk profile", "Inform differential diagnosis"]
    },
    {
      id: "case-2-3-1-3",
      question: "What are the urgent signs that need immediate action?",
      sampleAnswer: `Massive hemoptysis, severe breathlessness, signs of infection (high fever, sepsis), weight loss with cachexia.`,
      keyPoints: ["Recognise emergencies", "Prompt referral"]
    },
    {
      id: "case-2-3-1-4",
      question: "How would you explain the importance of investigations to the patient?",
      sampleAnswer: `Explain that tests like chest X-ray and sputum analysis help identify the cause, ensure timely treatment, and improve outcomes.`,
      keyPoints: ["Effective communication", "Patient education"]
    },
    // Case 2
    {
      id: "case-2-3-2-1",
      question: "What details about weakness and dizziness are important to clarify?",
      sampleAnswer: `Onset, duration, progression, distribution of weakness, associated symptoms like numbness, headache, visual changes, syncope.`,
      keyPoints: ["Detailed symptom assessment", "Identify neurological pattern"]
    },
    {
      id: "case-2-3-2-2",
      question: "What neurological symptoms would prompt urgent referral?",
      sampleAnswer: `Sudden severe weakness, facial droop, speech difficulty, loss of consciousness, worsening headache.`,
      keyPoints: ["Recognise stroke and emergencies"]
    },
    {
      id: "case-2-3-2-3",
      question: "How can you support the patient emotionally during the consultation?",
      sampleAnswer: `Listen actively, provide reassurance, acknowledge fears, explain the process clearly, involve family if appropriate.`,
      keyPoints: ["Empathy and communication skills"]
    },
    {
      id: "case-2-3-2-4",
      question: "How would you summarise your initial impression to the patient?",
      sampleAnswer: `Summarise symptoms, explain suspected causes, outline next steps like investigations and referrals, and reassure patient.`,
      keyPoints: ["Clear communication", "Patient-centred approach"]
    }
  ]
},    
        ],
{
  id: "history-taking-3",
  title: "Session 3: Expert-Level Communication (Advanced)",
  description: "Mastering complex consultations and specialised history-taking techniques.",
  sections: [
    {
      id: "history-taking-3-1",
      title: "3.1 Complex History Taking Strategies",
      type: "content",
      content: `
This session covers advanced communication techniques to effectively gather complex patient histories. You will learn how to manage multiple complaints, discuss sensitive topics with empathy, and use motivational interviewing to support behaviour change.

### Managing Multiple Complaints
- Prioritise the patient's concerns by asking: "What is your main problem today?"
- Organise symptoms by importance and chronology.
- Explore relationships between symptoms to identify patterns.

### Discussing Sensitive Topics
- Topics may include sexual health, substance use, domestic violence, and mental health.
- Use a non-judgemental and professional approach.
- Explain why questions are necessary: "I ask these questions to provide the best care for you."
- Ensure privacy and confidentiality.

### Motivational Interviewing Techniques
- Explore patient ambivalence about change.
- Use open-ended questions: "How do you feel about quitting smoking?"
- Reflective listening: "It sounds like you're worried about how smoking affects your health."
- Support self-efficacy by affirming patient strengths.

### Handling Emotional Responses
- Recognise distress and offer support.
- Use empathetic statements.
- Know when to pause or redirect the conversation.

---

### Tips for Effective Complex History Taking
- Prepare the patient for sensitive questions.
- Build rapport and trust.
- Summarise information regularly to ensure understanding.
- Be patient and flexible in your approach.
      `,
      estimatedTime: 20,
    }
  ]
},
        
      ],
    },
  {
    id: "topic-3",
    title: "Medication Management & Calculations",
    description: "Ensuring safe and accurate medication administration and dosage calculations.",
    icon: Pill,
    slug: "medication-management-calculations",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "medication-management-1",
        title: "Principles of Safe Medication Administration",
        description: "Understanding the 'Rights' of medication administration and common pitfalls.",
        sections: [
          {
            id: "medication-management-1-1",
            title: "The Five Rights of Medication Administration",
            type: "content",
            content: `The 'Five Rights' are: Right Patient, Right Drug, Right Dose, Right Route, Right Time. Adhering to these principles is critical for patient safety.`, 
            estimatedTime: 10,
          },
          {
            id: "medication-management-1-2",
            title: "Dosage Calculation Practice",
            type: "quiz",
            quizQuestions: [
              {
                id: "q-med-1",
                question: "A patient is prescribed 500mg of a drug. The available stock is 250mg tablets. How many tablets should be administered?",
                options: ["1", "2", "3", "4"],
                correctAnswer: 1, // "2" is the second option
                explanation: "500mg / 250mg per tablet = 2 tablets.",
              },
            ],
            content: `Practice various dosage calculations to ensure accuracy.`, 
            estimatedTime: 10,
          },
          {
            id: "medication-management-1-3",
            title: "Case Study: Medication Error",
            type: "case-study",
            content: `Analyze a scenario involving a medication error and identify the contributing factors and preventative measures.`, 
            estimatedTime: 10,
          },
        ],
      },
      {
        id: "medication-management-2",
        title: "Advanced Medication Management",
        description: "Delving deeper into medication management for comprehensive understanding.",
        sections: [
          {
            id: "medication-management-2-1",
            title: "In-depth Medication Management Analysis",
            type: "content",
            content: `This session explores complex medication calculations, intravenous fluid calculations, and the management of high-risk medications. It also covers pharmacokinetics and pharmacodynamics relevant to safe practice.`, 
            estimatedTime: 15,
          },
        ],
      },
    ],
  },
  {
    id: "topic-4",
    title: "Wound Care & Infection Control",
    description: "Implementing best practices in wound management and preventing healthcare-associated infections.",
    icon: Shield,
    slug: "wound-care-infection-control",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "wound-care-1",
        title: "Principles of Aseptic Technique",
        description: "Understanding and applying aseptic non-touch technique (ANTT) in wound care.",
        sections: [
          {
            id: "wound-care-1-1",
            title: "Hand Hygiene and PPE",
            type: "content",
            content: `Proper hand hygiene and the correct use of Personal Protective Equipment (PPE) are the cornerstones of infection control. This section details the steps for effective handwashing and donning/doffing PPE.`, 
            estimatedTime: 10,
          },
          {
            id: "wound-care-1-2",
            title: "Wound Assessment and Documentation",
            type: "content",
            content: `Learn to accurately assess different types of wounds, including pressure ulcers and surgical wounds, and document your findings comprehensively.`, 
            estimatedTime: 10,
          },
          {
            id: "wound-care-1-3",
            title: "Video: Wound Dressing Change",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/example_wound_dressing",
            content: `A step-by-step video guide on performing a sterile wound dressing change.`, 
            estimatedTime: 10,
          },
        ],
      },
      {
        id: "wound-care-2",
        title: "Advanced Wound Care and Infection Prevention",
        description: "Delving deeper into wound care and infection control for comprehensive understanding.",
        sections: [
          {
            id: "wound-care-2-1",
            title: "In-depth Wound Care and Infection Control Analysis",
            type: "content",
            content: `This session covers advanced wound care modalities, management of complex infections, and strategies for preventing antimicrobial resistance. It also delves into the role of surveillance and outbreak management.`, 
            estimatedTime: 15,
          },
        ],
      },
    ],
  },
  {
    id: "topic-5",
    title: "Vital Signs & Monitoring",
    description: "Accurate measurement and interpretation of vital signs for patient assessment.",
    icon: Activity,
    slug: "vital-signs-monitoring",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "vital-signs-1",
        title: "Measuring and Interpreting Vital Signs",
        description: "Understanding the significance of temperature, pulse, respiration, blood pressure, and oxygen saturation.",
        sections: [
          {
            id: "vital-signs-1-1",
            title: "Blood Pressure Measurement",
            type: "content",
            content: `Learn the correct technique for manual and automated blood pressure measurement, and understand factors influencing readings.`, 
            estimatedTime: 10,
          },
          {
            id: "vital-signs-1-2",
            title: "Recognizing Deterioration (NEWS2 Score)",
            type: "content",
            content: `The National Early Warning Score (NEWS2) is a tool used to identify and respond to acutely unwell patients. Understand how to calculate and interpret NEWS2 scores.`, 
            estimatedTime: 10,
          },
          {
            id: "vital-signs-1-3",
            title: "Quiz: Vital Signs Interpretation",
            type: "quiz",
            quizQuestions: [
              {
                id: "q-vs-1",
                question: "A patient has a blood pressure of 90/60 mmHg, heart rate of 110 bpm, and respiratory rate of 24 breaths/min. What is the most likely clinical state?",
                options: ["Normal", "Hypotension and Tachycardia", "Hypertension and Bradycardia", "Bradypnea"],
                correctAnswer: 1, // "Hypotension and Tachycardia" is the second option
                explanation: "The patient exhibits low blood pressure (hypotension) and a high heart rate (tachycardia), indicating potential instability.",
              },
            ],
            content: `Test your ability to interpret vital signs in clinical scenarios.`, 
            estimatedTime: 10,
          },
        ],
      },
      {
        id: "vital-signs-2",
        title: "Advanced Vital Signs and Monitoring",
        description: "Delving deeper into vital signs and monitoring for comprehensive understanding.",
        sections: [
          {
            id: "vital-signs-2-1",
            title: "In-depth Vital Signs and Monitoring Analysis",
            type: "content",
            content: `This session covers advanced physiological monitoring, including continuous cardiac monitoring, invasive blood pressure monitoring, and capnography. It also discusses the management of abnormal vital signs and rapid response protocols.`, 
            estimatedTime: 15,
          },
        ],
      },
        ],
      },
      {
        id: "emergency-2",
        title: "Advanced Emergency Procedures",
        description: "Delving deeper into emergency procedures for comprehensive understanding.",
        sections: [
          {
            id: "emergency-2-1",
            title: "In-depth Emergency Procedures Analysis",
            type: "content",
            content: `This session covers advanced cardiac life support (ACLS) algorithms, management of anaphylaxis, and initial assessment and management of trauma patients. It also includes discussions on ethical considerations in emergency care.`, 
            estimatedTime: 15,
          },
        ],
      },
    ],
  },
  {
    id: "topic-7",
    title: "Patient Safety & Risk Assessment",
    description: "Identifying and mitigating risks to ensure a safe healthcare environment.",
    icon: UserCheck,
    slug: "patient-safety-risk-assessment",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "patient-safety-1",
        title: "Understanding Patient Safety Incidents",
        description: "Learning about common patient safety risks and how to report and learn from incidents.",
        sections: [
          {
            id: "patient-safety-1-1",
            title: "Root Cause Analysis (RCA)",
            type: "content",
            content: `RCA is a systematic process for identifying the underlying causes of problems or incidents. This section explains how to conduct an RCA to prevent recurrence.`, 
            estimatedTime: 10,
          },
          {
            id: "patient-safety-1-2",
            title: "Incident Reporting and Learning",
            type: "content",
            content: `The importance of a 'no-blame' culture in incident reporting to foster learning and improve patient safety.`, 
            estimatedTime: 10,
          },
          {
            id: "patient-safety-1-3",
            title: "Case Study: Falls Prevention",
            type: "case-study",
            content: `Analyze a case of an elderly patient who experienced a fall in the hospital and develop a comprehensive falls prevention plan.`, 
            estimatedTime: 10,
          },
        ],
      },
      {
        id: "patient-safety-2",
        title: "Advanced Patient Safety and Risk Management",
        description: "Delving deeper into patient safety and risk assessment for comprehensive understanding.",
        sections: [
          {
            id: "patient-safety-2-1",
            title: "In-depth Patient Safety and Risk Assessment Analysis",
            type: "content",
            content: `This session covers advanced risk assessment tools, human factors in healthcare, and the implementation of safety culture initiatives. It also discusses the role of technology in enhancing patient safety.`, 
            estimatedTime: 15,
          },
        ],
      },
    ],
  },
  {
    id: "topic-8",
    title: "Documentation & Record Keeping",
    description: "Maintaining accurate, concise, and legally sound patient records.",
    icon: FileText,
    slug: "documentation-record-keeping",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "documentation-1",
        title: "Principles of Effective Documentation",
        description: "Understanding the importance of clear, concise, and timely patient record keeping.",
        sections: [
          {
            id: "documentation-1-1",
            title: "SOAP and SBAR Formats",
            type: "content",
            content: `Learn to use SOAP (Subjective, Objective, Assessment, Plan) for progress notes and SBAR (Situation, Background, Assessment, Recommendation) for handovers.`, 
            estimatedTime: 10,
          },
          {
            id: "documentation-1-2",
            title: "Legal and Ethical Aspects of Documentation",
            type: "content",
            content: `Understand the legal implications of poor documentation and ethical considerations regarding patient confidentiality and data protection.`, 
            estimatedTime: 10,
          },
          {
            id: "documentation-1-3",
            title: "Quiz: Documentation Scenarios",
            type: "quiz",
            quizQuestions: [
              {
                id: "q-doc-1",
                question: "Which part of the SOAP note includes the patient's chief complaint and symptoms?",
                options: ["Subjective", "Objective", "Assessment", "Plan"],
                correctAnswer: 0, // "Subjective" is the first option
                explanation: "The Subjective section of a SOAP note contains information reported by the patient, such as their chief complaint and symptoms.",
              },
            ],
            content: `Test your ability to apply documentation principles in various clinical scenarios.`, 
            estimatedTime: 10,
          },
        ],
      },
      {
        id: "documentation-2",
        title: "Advanced Documentation and Record Keeping",
        description: "Delving deeper into documentation and record keeping for comprehensive understanding.",
        sections: [
          {
            id: "documentation-2-1",
            title: "In-depth Documentation and Record Keeping Analysis",
            type: "content",
            content: `This session covers electronic health record (EHR) systems, interoperability, and advanced charting techniques. It also discusses auditing and quality improvement related to documentation.`, 
            estimatedTime: 15,
          },
        ],
      },
    ],
  },
  {
    id: "topic-9",
    title: "Professional Boundaries & Ethics",
    description: "Navigating complex ethical dilemmas and maintaining professional conduct.",
    icon: Scale,
    slug: "professional-boundaries-ethics",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "ethics-1",
        title: "Ethical Principles in Healthcare",
        description: "Exploring core ethical principles: autonomy, beneficence, non-maleficence, and justice.",
        sections: [
          {
            id: "ethics-1-1",
            title: "Autonomy and Informed Consent",
            type: "content",
            content: `Respecting patient autonomy means upholding their right to make decisions about their own care, which is closely linked to informed consent.`, 
            estimatedTime: 10,
          },
          {
            id: "ethics-1-2",
            title: "Confidentiality and Privacy",
            type: "content",
            content: `Maintaining patient confidentiality is a fundamental ethical and legal obligation. This section covers data protection regulations like GDPR.`, 
            estimatedTime: 10,
          },
          {
            id: "ethics-1-3",
            title: "Case Study: Ethical Dilemma",
            type: "case-study",
            content: `Analyze a scenario where a patient refuses life-saving treatment and discuss the ethical considerations involved.`, 
            estimatedTime: 10,
          },
        ],
      },
      {
        id: "ethics-2",
        title: "Advanced Professional Boundaries and Ethics",
        description: "Delving deeper into professional boundaries and ethics for comprehensive understanding.",
        sections: [
          {
            id: "ethics-2-1",
            title: "In-depth Professional Boundaries and Ethics Analysis",
            type: "content",
            content: `This session explores complex ethical dilemmas, professional accountability, and the management of conflicts of interest. It also discusses the role of professional bodies and regulatory frameworks.`, 
            estimatedTime: 15,
          },
        ],
      },
    ],
  },
  {
    id: "topic-10",
    title: "Cultural Competency & Diversity",
    description: "Providing culturally sensitive care to diverse patient populations.",
    icon: Globe,
    slug: "cultural-competency-diversity",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "cultural-competency-1",
        title: "Understanding Cultural Influences on Health",
        description: "Exploring how cultural beliefs and practices impact health and healthcare decisions.",
        sections: [
          {
            id: "cultural-competency-1-1",
            title: "Cultural Assessment Tools",
            type: "content",
            content: `Learn to use various tools and frameworks to conduct a comprehensive cultural assessment of patients.`, 
            estimatedTime: 10,
          },
          {
            id: "cultural-competency-1-2",
            title: "Addressing Health Disparities",
            type: "content",
            content: `Understanding the social determinants of health and strategies to reduce health disparities in diverse populations.`, 
            estimatedTime: 10,
          },
          {
            id: "cultural-competency-1-3",
            title: "Case Study: Cross-Cultural Communication",
            type: "case-study",
            content: `Analyze a scenario involving communication challenges with a patient from a different cultural background and develop strategies for effective communication.`, 
            estimatedTime: 10,
          },
        ],
      },
      {
        id: "cultural-competency-2",
        title: "Advanced Cultural Competency and Diversity",
        description: "Delving deeper into cultural competency and diversity for comprehensive understanding.",
        sections: [
          {
            id: "cultural-competency-2-1",
            title: "In-depth Cultural Competency and Diversity Analysis",
            type: "content",
            content: `This session explores advanced concepts in cultural humility, intersectionality, and addressing unconscious bias in healthcare. It also discusses policy and advocacy for culturally competent care.`, 
            estimatedTime: 15,
          },
        ],
      },
    ],
  },
  {
    id: "topic-11",
    title: "Mental Health Assessment",
    description: "Conducting thorough mental health assessments and providing appropriate support.",
    icon: Brain,
    slug: "mental-health-assessment",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "mental-health-1",
        title: "Principles of Mental Health Assessment",
        description: "Understanding the components of a comprehensive mental health assessment.",
        sections: [
          {
            id: "mental-health-1-1",
            title: "Mental State Examination (MSE)",
            type: "content",
            content: `Learn to conduct a systematic MSE, covering appearance, behavior, speech, mood, thought, perception, and cognition.`, 
            estimatedTime: 10,
          },
          {
            id: "mental-health-1-2",
            title: "Risk Assessment in Mental Health",
            type: "content",
            content: `Identifying and managing risks such as self-harm, suicide, and aggression in patients with mental health conditions.`, 
            estimatedTime: 10,
          },
          {
            id: "mental-health-1-3",
            title: "Case Study: Depression Assessment",
            type: "case-study",
            content: `Analyze a scenario of a patient presenting with symptoms of depression and conduct a mental health assessment.`, 
            estimatedTime: 10,
          },
        ],
      },
      {
        id: "mental-health-2",
        title: "Advanced Mental Health Assessment",
        description: "Delving deeper into mental health assessment for comprehensive understanding.",
        sections: [
          {
            id: "mental-health-2-1",
            title: "In-depth Mental Health Assessment Analysis",
            type: "content",
            content: `This session covers advanced assessment tools for specific mental health conditions, psychopharmacology, and therapeutic communication techniques. It also discusses legal frameworks like the Mental Health Act.`, 
            estimatedTime: 15,
          },
        ],
      },
    ],
  },
  {
    id: "topic-12",
    title: "Paediatric & Elderly Care",
    description: "Providing specialized care for vulnerable populations: children and the elderly.",
    icon: Users,
    slug: "paediatric-elderly-care",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "paediatric-elderly-1",
        title: "Paediatric Assessment and Care",
        description: "Understanding the unique considerations in assessing and caring for children.",
        sections: [
          {
            id: "paediatric-elderly-1-1",
            title: "Growth and Development Milestones",
            type: "content",
            content: `Familiarize yourself with normal growth and developmental milestones in children from infancy to adolescence.`, 
            estimatedTime: 10,
          },
          {
            id: "paediatric-elderly-1-2",
            title: "Common Paediatric Illnesses",
            type: "content",
            content: `Overview of common childhood illnesses, their presentation, and initial management.`, 
            estimatedTime: 10,
          },
          {
            id: "paediatric-elderly-1-3",
            title: "Case Study: Febrile Seizure in a Child",
            type: "case-study",
            content: `Analyze a scenario of a child presenting with a febrile seizure and discuss appropriate nursing interventions.`, 
            estimatedTime: 10,
          },
        ],
      },
      {
        id: "paediatric-elderly-2",
        title: "Advanced Paediatric and Elderly Care",
        description: "Delving deeper into paediatric and elderly care for comprehensive understanding.",
        sections: [
          {
            id: "paediatric-elderly-2-1",
            title: "In-depth Paediatric and Elderly Care Analysis",
            type: "content",
            content: `This session covers advanced assessment techniques for children and the elderly, polypharmacy management, and end-of-life care considerations. It also discusses safeguarding and elder abuse.`, 
            estimatedTime: 15,
          },
        ],
      },
    ],
  },
  {
    id: "topic-13",
    title: "Discharge Planning & Education",
    description: "Ensuring seamless transitions of care and empowering patients through education.",
    icon: ClipboardList,
    slug: "discharge-planning-education",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "discharge-planning-1",
        title: "Principles of Effective Discharge Planning",
        description: "Understanding the key components of a safe and effective discharge plan.",
        sections: [
          {
            id: "discharge-planning-1-1",
            title: "Medication Reconciliation",
            type: "content",
            content: `Ensuring an accurate and complete list of all medications a patient is taking upon admission, transfer, and discharge.`, 
            estimatedTime: 10,
          },
          {
            id: "discharge-planning-1-1",
            title: "Patient Education Strategies",
            type: "content",
            content: `Developing effective patient education plans, considering health literacy and diverse learning needs.`, 
            estimatedTime: 10,
          },
          {
            id: "discharge-planning-1-3",
            title: "Case Study: Complex Discharge",
            type: "case-study",
            content: `Analyze a scenario involving a patient with complex care needs requiring extensive discharge planning and coordination.`, 
            estimatedTime: 10,
          },
        ],
      },
      {
        id: "discharge-planning-2",
        title: "Advanced Discharge Planning and Education",
        description: "Delving deeper into discharge planning and education for comprehensive understanding.",
        sections: [
          {
            id: "discharge-planning-2-1",
            title: "In-depth Discharge Planning and Education Analysis",
            type: "content",
            content: `This session covers advanced discharge planning for complex cases, community resource navigation, and the role of telehealth in post-discharge care. It also discusses patient advocacy and shared decision-making.`, 
            estimatedTime: 15,
          },
        ],
      },
    ],
  },
  {
    id: "topic-14",
    title: "Quality Improvement & Evidence-Based Practice",
    description: "Utilizing evidence to enhance healthcare quality and patient outcomes.",
    icon: TrendingUp,
    slug: "quality-improvement-evidence-based-practice",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "quality-improvement-1",
        title: "Introduction to Quality Improvement",
        description: "Understanding the principles and methodologies of quality improvement in healthcare.",
        sections: [
          {
            id: "quality-improvement-1-1",
            title: "PDSA Cycle (Plan-Do-Study-Act)",
            type: "content",
            content: `The PDSA cycle is a widely used framework for testing changes in real-world settings. Learn how to apply each step.`, 
            estimatedTime: 10,
          },
          {
            id: "quality-improvement-1-2",
            title: "Finding and Appraising Evidence",
            type: "content",
            content: `Learn how to effectively search for and critically appraise research evidence to inform clinical practice.`, 
            estimatedTime: 10,
          },
          {
            id: "quality-improvement-1-3",
            title: "Quiz: Evidence-Based Practice",
            type: "quiz",
            quizQuestions: [
              {
                id: "q-qi-1",
                question: "Which of the following is the strongest level of evidence?",
                options: ["Expert opinion", "Case series", "Randomized Controlled Trial (RCT)", "Cohort study"],
                correctAnswer: 2, // "Randomized Controlled Trial (RCT)" is the third option
                explanation: "Randomized Controlled Trials (RCTs) are considered the gold standard for evaluating the effectiveness of interventions due to their rigorous design.",
              },
            ],
            content: `Test your understanding of evidence-based practice concepts.`, 
            estimatedTime: 10,
          },
        ],
      },
      {
        id: "quality-improvement-2",
        title: "Advanced Quality Improvement and Evidence-Based Practice",
        description: "Delving deeper into quality improvement and evidence-based practice for comprehensive understanding.",
        sections: [
          {
            id: "quality-improvement-2-1",
            title: "In-depth Quality Improvement and Evidence-Based Practice Analysis",
            type: "content",
            content: `This session covers advanced statistical process control, implementation science, and the translation of research into practice. It also discusses the role of leadership in fostering a culture of quality.`, 
            estimatedTime: 15,
          },
        ],
      },
    ],
  },
];
