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
            content: `Para se comunicar bem com pacientes, você precisa:

• Cumprimentar o paciente com educação
• Olhar nos olhos enquanto conversa  
• Escutar sem interromper
• Mostrar que você se importa
• Falar de forma clara e simples
• Dar tempo para o paciente falar

Lembre-se: o paciente está nervoso e precisa se sentir seguro com você.`,
            estimatedTime: 10,
          },
          {
            id: "history-taking-1-2",
            title: "1.2 Basic History Taking Structure",
            type: "content",
            content: `Siga esta ordem sempre:

1. **Apresente-se**: "Olá, eu sou [nome], sou enfermeiro(a)"
2. **Pergunte o motivo**: "O que te trouxe aqui hoje?"
3. **Deixe falar**: Não interrompa no início
4. **Faça perguntas**: Quando, onde, como começou?
5. **Anote tudo**: Escreva as informações importantes
6. **Confirme**: "Entendi certo que...?"

É simples: ouvir, perguntar, anotar e confirmar.`,
            estimatedTime: 10,
          },
          {
            id: "history-taking-1-3",
            title: "1.3 Practice Quiz: Basic Communication",
            type: "quiz",
            content: "Test your understanding of basic communication principles.",
            estimatedTime: 10,
            quizQuestions: [
              {
                id: "q-hist-1-1",
                question: "What is the most important aspect of building rapport with a patient?",
                options: ["Speaking quickly to save time", "Active listening and showing empathy", "Taking detailed notes", "Asking only closed questions"],
                correctAnswer: 1,
                explanation: "Active listening and showing empathy are fundamental to building trust and rapport with patients."
              },
              {
                id: "q-hist-1-2",
                question: "When should you interrupt a patient during their initial story?",
                options: ["Immediately if they're going off-topic", "After 30 seconds", "Only if there's an emergency", "Never, let them finish first"],
                correctAnswer: 2,
                explanation: "Allow patients to tell their story initially, only interrupting for genuine emergencies."
              },
              {
                id: "q-hist-1-3",
                question: "Which of these demonstrates good non-verbal communication?",
                options: ["Looking at your notes constantly", "Sitting at the same level as the patient", "Checking your phone", "Standing with arms crossed"],
                correctAnswer: 1,
                explanation: "Positioning yourself at the same level shows respect and makes the interaction more comfortable."
              }
            ]
          },
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
            content: `SOCRATES é um método para avaliar dor de forma completa:

**S** - Site: Onde é a dor?
**O** - Onset: Quando começou?
**C** - Character: Como é a dor? (pontada, queimação, etc)
**R** - Radiation: A dor irradia para outro lugar?
**A** - Associations: Tem outros sintomas junto?
**T** - Time: Quanto tempo dura?
**E** - Exacerbating/Relieving: O que piora/melhora?
**S** - Severity: Numa escala de 1-10, qual a intensidade?

Use sempre que o paciente reclamar de dor.`,
            estimatedTime: 15,
          },
          {
            id: "history-taking-2-2",
            title: "2.2 Handling Difficult Conversations",
            type: "content",
            content: `Às vezes é difícil conversar com pacientes. Aqui estão dicas:

**Paciente nervoso/chorando:**
• Diga: "Vejo que está preocupado"
• Ofereça lenços
• Dê tempo para se acalmar

**Paciente bravo:**
• Mantenha a calma
• Escute sem interromper
• Não leve para o lado pessoal

**Barreira de idioma:**
• Use tradutor profissional
• Fale devagar e claro
• Confirme se entendeu

Lembre-se: paciência é fundamental.`,
            estimatedTime: 15,
          },
          {
            id: "history-taking-2-3",
            title: "2.3 Interactive Case Study: Chest Pain Assessment",
            type: "case-study",
            content: `# Case Study: 55-year-old with Chest Pain

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
The patient clutches his chest and says: "It feels like an elephant is sitting on my chest. I've never felt anything like this before."`,
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
          },
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
            content: `Situações complexas exigem habilidades avançadas:

**Múltiplas queixas:**
• Pergunte: "Qual sua maior preocupação hoje?"
• Organize por prioridade
• Conecte sintomas relacionados

**Tópicos sensíveis:**
• História sexual, drogas, violência
• Seja profissional e sem julgamento
• Explique por que precisa perguntar

**Entrevista motivacional:**
• Explore a ambivalência do paciente
• "Como você se sente sobre parar de fumar?"
• Apoie a autoeficácia

Lembre-se: casos complexos precisam de paciência e técnica.`,
            estimatedTime: 20,
          },
          {
            id: "history-taking-3-2",
            title: "3.2 Cultural Competency and Communication",
            type: "content", 
            content: `Cuidar de pessoas de diferentes culturas:

**Diferenças culturais:**
• Contato visual (pode ser desrespeitoso em algumas culturas)
• Espaço pessoal e toque
• Papel da família nas decisões
• Crenças sobre doença e cura

**Com intérpretes:**
• Fale diretamente com o paciente
• Use intérpretes profissionais, não família
• Confirme o entendimento

**Populações especiais:**
• LGBTQ+, refugiados, idosos
• Pessoas com deficiência
• Diferentes religiões

Seja respeitoso, humilde e curioso sobre outras culturas.`,
            estimatedTime: 20,
          },
          {
            id: "history-taking-3-3",
            title: "3.3 Comprehensive Assessment Quiz",
            type: "quiz",
            content: "Test your mastery of advanced communication and history-taking skills.",
            estimatedTime: 15,
            quizQuestions: [
              {
                id: "q-hist-3-1",
                question: "When taking a history from a patient with multiple complaints, what is the best initial approach?",
                options: ["Address each complaint in detail sequentially", "Focus only on the most serious complaint", "Ask the patient to prioritize their concerns", "Use a systematic review of systems first"],
                correctAnswer: 2,
                explanation: "Asking patients to prioritize their concerns respects their autonomy and helps focus the consultation on what matters most to them."
              },
              {
                id: "q-hist-3-2",
                question: "When working with an interpreter, you should:",
                options: ["Speak directly to the interpreter", "Speak to the patient and maintain eye contact", "Ask the interpreter to summarize", "Use family members when possible"],
                correctAnswer: 1,
                explanation: "Always speak directly to the patient and maintain eye contact, treating them as the primary person in the interaction."
              },
              {
                id: "q-hist-3-3",
                question: "In motivational interviewing, the most effective way to address patient ambivalence is to:",
                options: ["Tell them what they should do", "Explore both sides of their ambivalence", "Ignore their resistance", "Provide more information"],
                correctAnswer: 1,
                explanation: "Exploring both sides of ambivalence helps patients work through their conflicted feelings and find their own motivation for change."
              },
              {
                id: "q-hist-3-4",
                question: "What is the key principle of shared decision-making?",
                options: ["The doctor makes the final decision", "The patient chooses without input", "Both patient and provider contribute to decisions", "Decisions are made by committee"],
                correctAnswer: 2,
                explanation: "Shared decision-making involves both patient and provider contributing their expertise - clinical knowledge and personal values respectively."
              }
            ]
          },
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
            content: `The IPPA method is fundamental to physical examination. For the cardiovascular system, this involves observing for signs of distress, palpating pulses and precordium, and auscultating heart sounds.`, 
            estimatedTime: 10,
          },
          {
            id: "physical-examination-1-2",
            title: "Heart Sounds and Murmurs",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/example_heart_sounds",
            content: `A video demonstration of normal and abnormal heart sounds, including common murmurs and their characteristics.`, 
            estimatedTime: 10,
          },
          {
            id: "physical-examination-1-3",
            title: "Quiz: Cardiovascular Findings",
            type: "quiz",
            quizQuestions: [
              {
                id: "q-cv-1",
                question: "Which heart sound is associated with the closure of the mitral and tricuspid valves?",
                options: ["S1", "S2", "S3", "S4"],
                correctAnswer: 0, // S1 is the first option
                explanation: "S1 (lub) is caused by the closure of the atrioventricular valves (mitral and tricuspid) at the beginning of systole.",
              },
            ],
            content: `Test your knowledge on cardiovascular examination findings.`, 
            estimatedTime: 10,
          },
        ],
      },
      {
        id: "physical-examination-2",
        title: "Advanced Physical Examination Techniques",
        description: "Delving deeper into physical examination for comprehensive understanding.",
        sections: [
          {
            id: "physical-examination-2-1",
            title: "In-depth Physical Examination Analysis",
            type: "content",
            content: `This session covers advanced examination techniques for specific body systems, including neurological, respiratory, and abdominal assessments. It emphasizes the correlation of physical findings with patient history and diagnostic reasoning.`, 
            estimatedTime: 15,
          },
        ],
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
    id: "topic-6",
    title: "Emergency Procedures & CPR",
    description: "Responding effectively to medical emergencies and performing life-saving interventions.",
    icon: Zap,
    slug: "emergency-procedures-cpr",
    totalEstimatedTime: 30,
    sessions: [
      {
        id: "emergency-1",
        title: "Basic Life Support (BLS) and Choking Management",
        description: "Learning the essential steps of CPR and how to manage choking in adults and children.",
        sections: [
          {
            id: "emergency-1-1",
            title: "Adult Basic Life Support Algorithm",
            type: "content",
            content: `Follow the DRSABC (Danger, Response, Shout for help, Airway, Breathing, Circulation) algorithm for adult BLS. This section provides a step-by-step guide.`, 
            estimatedTime: 10,
          },
          {
            id: "emergency-1-2",
            title: "Choking Management in Adults and Infants",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/example_choking",
            content: `Video demonstration of back blows and abdominal thrusts for adults, and back blows and chest thrusts for infants.`, 
            estimatedTime: 10,
          },
          {
            id: "emergency-1-3",
            title: "Quiz: Emergency Scenarios",
            type: "quiz",
            quizQuestions: [
              {
                id: "q-em-1",
                question: "What is the correct compression-to-ventilation ratio for adult CPR with a single rescuer?",
                options: ["15:2", "30:2", "5:1", "Continuous compressions"],
                correctAnswer: 1, // "30:2" is the second option
                explanation: "For adult CPR with a single rescuer, the recommended compression-to-ventilation ratio is 30 compressions to 2 ventilations.",
              },
            ],
            content: `Test your response to various emergency scenarios.`, 
            estimatedTime: 10,
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

