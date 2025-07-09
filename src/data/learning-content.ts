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
  content?: string;
  questions?: QuizQuestion[];
  scenario?: string;
  videoUrl?: string;
  description?: string;
  estimatedTime?: number;
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
  sessions: LearningSession[];
  totalEstimatedTime: number;
}

export const learningContent: LearningTopic[] = [
  {
    id: 1,
    title: "History Taking & Communication",
    slug: "history-taking-communication",
    description: "Master patient interviews and communication skills",
    icon: Stethoscope,
    color: "bg-blue-500",
    totalEstimatedTime: 120,
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
            content: `**Effective communication is the cornerstone of excellent patient care.** In the OSCE setting, your ability to gather accurate information whilst building rapport with patients will be critically assessed.

**Key Communication Principles:**

**Active Listening:** Give your full attention to the patient. Maintain appropriate eye contact, use open body language, and avoid interrupting. Show that you're engaged through verbal and non-verbal cues such as nodding and saying "I see" or "Please continue."

**Empathy and Compassion:** Acknowledge the patient's feelings and concerns. Use phrases like "That must have been very worrying for you" or "I can understand why you're concerned about this."

**Clear and Simple Language:** Avoid medical jargon when speaking with patients. Use terms they can understand and check their comprehension regularly by asking "Does that make sense?" or "Do you have any questions about what I've explained?"

**Respect and Dignity:** Treat every patient with respect regardless of their background, condition, or circumstances. Maintain professional boundaries whilst being warm and approachable.

**Cultural Sensitivity:** Be aware of cultural differences that may affect communication styles, health beliefs, and treatment preferences. Ask open-ended questions about cultural considerations when appropriate.

**Non-Verbal Communication:** Your body language speaks volumes. Maintain an open posture, appropriate facial expressions, and respect personal space. Be mindful of your tone of voice and pace of speech.

**Confidentiality:** Always maintain patient confidentiality and explain how information will be used. This builds trust and encourages honest communication.

**Key Points:**
- Establish rapport early in the consultation
- Use open-ended questions to encourage detailed responses
- Summarise and reflect back what you've heard
- Address patient concerns and emotions
- Maintain professionalism throughout the interaction`,
            estimatedTime: 8
          },
          {
            id: "ht-1-2",
            title: "The SOCRATES Framework",
            type: "content",
            content: `**SOCRATES is a systematic approach to pain assessment** that ensures comprehensive evaluation of any symptom, particularly pain. This mnemonic is essential for OSCE examinations and clinical practice.

**S - Site:** Where is the pain located? Ask the patient to point to or describe the exact location. Consider whether the pain is localised or diffuse.

**O - Onset:** When did the pain start? Was it sudden or gradual? What was the patient doing when it began? Understanding onset helps determine potential causes.

**C - Character:** What does the pain feel like? Common descriptors include:
- Sharp, stabbing, or knife-like
- Dull, aching, or throbbing
- Burning or tingling
- Cramping or colicky
- Crushing or tight

**R - Radiation:** Does the pain spread anywhere else? Pain radiation patterns can provide diagnostic clues. For example, cardiac pain may radiate to the left arm, jaw, or back.

**A - Associated Symptoms:** What other symptoms accompany the pain? These might include:
- Nausea and vomiting
- Shortness of breath
- Sweating
- Dizziness
- Changes in bowel or bladder function

**T - Timing:** Is the pain constant or intermittent? Does it follow a pattern? When is it worse or better during the day?

**E - Exacerbating and Relieving Factors:** What makes the pain worse or better? Consider:
- Movement or rest
- Food or fasting
- Medications
- Position changes
- Environmental factors

**S - Severity:** How severe is the pain on a scale of 1-10? How does it affect daily activities? Has the severity changed over time?

**Clinical Application:**
Using SOCRATES systematically ensures you don't miss important details and demonstrates thorough clinical reasoning to examiners.`,
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
              },
              {
                id: "ht-q2",
                question: "When a patient becomes emotional during history taking, what is the most appropriate initial response?",
                options: [
                  "Continue with the medical questions to maintain focus",
                  "Acknowledge their emotions and offer support",
                  "Suggest they speak to a counsellor instead",
                  "Change the subject to something less upsetting"
                ],
                correctAnswer: 1,
                explanation: "Acknowledging emotions and offering support demonstrates empathy and helps build rapport, which is essential for effective communication."
              },
              {
                id: "ht-q3",
                question: "In the SOCRATES framework, what does the 'R' stand for?",
                options: [
                  "Relief factors",
                  "Radiation",
                  "Recurrence",
                  "Risk factors"
                ],
                correctAnswer: 1,
                explanation: "In SOCRATES, 'R' stands for Radiation - whether the pain spreads to other areas of the body."
              }
            ],
            estimatedTime: 5
          },
          {
            id: "ht-1-4",
            title: "Practice Case: Chest Pain History",
            type: "case-study",
            scenario: `You are a junior doctor in the Emergency Department. A 55-year-old man, Mr. Johnson, has presented with chest pain that started 2 hours ago. He appears anxious and is accompanied by his wife.

Patient Information:
- Name: Mr. Johnson
- Age: 55
- Presenting complaint: Chest pain
- Duration: 2 hours
- Appears anxious and sweaty

Your task is to take a focused history using appropriate communication skills and the SOCRATES framework.`,
            questions: [
              {
                id: "ht-case-q1",
                question: "How would you introduce yourself and begin the consultation?",
                sampleAnswer: "Good morning, Mr. Johnson. My name is Dr. Smith, and I'm one of the junior doctors here in the Emergency Department. I understand you've been experiencing some chest pain today. Before we begin, I'd like to make sure you're as comfortable as possible. Would you like your wife to stay with you during our discussion? I'm here to help you, and I'd like to hear about what's been happening in your own words. Can you tell me about the chest pain you've been experiencing?",
                keyPoints: [
                  "Clear introduction with name and role",
                  "Acknowledge the presenting complaint",
                  "Ensure patient comfort",
                  "Ask about companion's presence",
                  "Use open-ended question to begin"
                ]
              },
              {
                id: "ht-case-q2",
                question: "The patient says the pain is 'crushing' and rates it 8/10. How would you explore this further using SOCRATES?",
                sampleAnswer: "Thank you for describing the pain as crushing - that's very helpful. I can see this is quite severe for you. Let me ask you some more specific questions to better understand what's happening. Can you show me exactly where the pain is located? Does it stay in one place or does it spread anywhere else, perhaps to your arms, neck, or back? You mentioned it started about 2 hours ago - can you tell me what you were doing when it first began? Was it sudden or did it come on gradually?",
                keyPoints: [
                  "Acknowledge the severity and patient's distress",
                  "Systematic approach using SOCRATES",
                  "Ask about radiation patterns",
                  "Explore onset circumstances",
                  "Use clear, simple language"
                ]
              },
              {
                id: "ht-case-q3",
                question: "How would you explore associated symptoms and show empathy for the patient's anxiety?",
                sampleAnswer: "I can see that you're feeling quite anxious about this, Mr. Johnson, and that's completely understandable given what you're experiencing. Along with the chest pain, have you noticed any other symptoms? For example, have you felt short of breath, nauseous, or noticed any sweating? Have you felt dizzy or light-headed at all? I want to make sure we don't miss anything important. Your wife mentioned you seemed worried - can you tell me what concerns you most about this pain?",
                keyPoints: [
                  "Acknowledge and validate anxiety",
                  "Systematic exploration of associated symptoms",
                  "Include family member's observations",
                  "Address patient's specific concerns",
                  "Reassuring approach while gathering information"
                ]
              }
            ],
            estimatedTime: 15
          }
        ]
      },
      {
        id: "ht-2",
        title: "Advanced Communication Techniques",
        description: "Handling difficult conversations and complex scenarios",
        sections: [
          {
            id: "ht-2-1",
            title: "Breaking Bad News",
            type: "content",
            content: `**Breaking bad news is one of the most challenging aspects of medical practice.** The SPIKES protocol provides a structured approach to these difficult conversations.

**S - Setting:** Ensure privacy and comfort. Sit down, make eye contact, and eliminate distractions. Have tissues available and ensure adequate time.

**P - Perception:** Assess what the patient already knows or suspects. Ask questions like "What is your understanding of your condition?" or "What have you been told so far?"

**I - Invitation:** Ask permission to share information. "Would you like me to explain the test results?" Some patients may not be ready to hear certain information.

**K - Knowledge:** Share information clearly and simply. Avoid medical jargon. Give information in small chunks and check understanding frequently.

**E - Emotions:** Respond to emotional reactions with empathy. Acknowledge feelings and provide support. Use phrases like "I can see this is very difficult news."

**S - Strategy and Summary:** Discuss next steps and provide hope where appropriate. Summarise key points and ensure the patient knows what happens next.

**Key Principles:**
- Be honest but compassionate
- Allow time for emotional responses
- Provide written information when possible
- Offer ongoing support
- Respect cultural and individual differences in processing bad news

**Common Challenges:**
- Patients who don't want to know
- Family members who want to protect the patient
- Language barriers
- Emotional overwhelm
- Unrealistic expectations

**Remember:** Breaking bad news is a process, not a single conversation. Follow-up is essential.`,
            estimatedTime: 12
          },
          {
            id: "ht-2-2",
            title: "Dealing with Angry or Upset Patients",
            type: "content",
            content: `**Managing difficult emotions is a crucial clinical skill.** Patients may be angry, upset, or frustrated for various reasons, and your response can significantly impact the therapeutic relationship.

**Understanding the Source of Anger:**
- Fear about their condition
- Frustration with the healthcare system
- Pain or discomfort
- Feeling unheard or dismissed
- Previous negative experiences
- Loss of control or independence

**The LEAP Approach:**

**L - Listen:** Allow the patient to express their feelings without interruption. Active listening shows respect and often helps defuse tension.

**E - Empathise:** Acknowledge their emotions. "I can see you're really frustrated" or "This must be very difficult for you."

**A - Apologise:** When appropriate, apologise for their experience. "I'm sorry you've had to wait so long" or "I'm sorry this has been so stressful."

**P - Partner:** Work together to find solutions. "Let's see what we can do to address your concerns" or "How can we move forward together?"

**De-escalation Techniques:**
- Remain calm and speak slowly
- Use open body language
- Maintain appropriate eye contact
- Avoid defensive responses
- Set clear boundaries if behaviour becomes inappropriate
- Know when to seek help from colleagues

**What NOT to do:**
- Take it personally
- Argue or become defensive
- Dismiss their concerns
- Rush the conversation
- Make promises you can't keep

**Safety Considerations:**
Always prioritise safety. If you feel threatened, remove yourself from the situation and seek help immediately.`,
            estimatedTime: 10
          },
          {
            id: "ht-2-3",
            title: "Advanced Communication Quiz",
            type: "quiz",
            questions: [
              {
                id: "ht-adv-q1",
                question: "When breaking bad news, what should you do first according to the SPIKES protocol?",
                options: [
                  "Immediately share the diagnosis",
                  "Assess what the patient already knows",
                  "Ensure an appropriate setting",
                  "Discuss treatment options"
                ],
                correctAnswer: 2,
                explanation: "Setting (the 'S' in SPIKES) comes first - ensuring privacy, comfort, and an appropriate environment for the conversation."
              },
              {
                id: "ht-adv-q2",
                question: "A patient becomes very angry during consultation. What is your best initial response?",
                options: [
                  "Tell them to calm down",
                  "Listen without interrupting and acknowledge their feelings",
                  "End the consultation immediately",
                  "Explain why they shouldn't be angry"
                ],
                correctAnswer: 1,
                explanation: "The LEAP approach starts with listening. Allowing patients to express their emotions and acknowledging their feelings often helps defuse tension."
              },
              {
                id: "ht-adv-q3",
                question: "When a patient says 'I don't want to know' about their test results, you should:",
                options: [
                  "Insist they need to know for their own good",
                  "Respect their wishes and document this decision",
                  "Tell their family instead",
                  "Wait until they're feeling better"
                ],
                correctAnswer: 1,
                explanation: "Patient autonomy includes the right not to know. This decision should be respected and clearly documented, though you should explore their reasons and offer future opportunities to discuss."
              }
            ],
            estimatedTime: 5
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Physical Examination Techniques",
    slug: "physical-examination",
    description: "Learn systematic examination approaches",
    icon: Heart,
    color: "bg-red-500",
    totalEstimatedTime: 150,
    sessions: [
      {
        id: "pe-1",
        title: "General Examination Principles",
        description: "Systematic approach to physical examination",
        sections: [
          {
            id: "pe-1-1",
            title: "Introduction to Physical Examination",
            type: "content",
            content: `**Physical examination is a fundamental clinical skill** that requires systematic approach, technical competence, and professional behaviour. In OSCE examinations, your technique, professionalism, and ability to detect abnormalities will be assessed.

**General Principles:**

**Preparation:**
- Wash hands thoroughly before and after examination
- Introduce yourself and explain what you plan to do
- Obtain verbal consent before proceeding
- Ensure patient privacy and dignity
- Position patient appropriately for examination
- Have adequate lighting and necessary equipment

**Systematic Approach:**
Always follow a logical sequence to avoid missing important findings:
1. **Inspection** - Look before you touch
2. **Palpation** - Feel for abnormalities
3. **Percussion** - Assess underlying structures
4. **Auscultation** - Listen with stethoscope

**Professional Behaviour:**
- Maintain patient dignity throughout
- Explain each step as you proceed
- Be gentle and considerate
- Watch for signs of discomfort
- Adapt technique for patient's condition
- Communicate findings appropriately

**Documentation:**
- Record findings systematically
- Use appropriate medical terminology
- Note both normal and abnormal findings
- Include relevant negative findings

**Key Examination Skills:**
- Proper hand positioning for palpation
- Correct stethoscope placement
- Appropriate percussion technique
- Recognition of normal vs abnormal findings
- Integration of findings with history

**Safety Considerations:**
- Universal precautions for infection control
- Appropriate use of personal protective equipment
- Recognition of when to stop examination
- Emergency procedures if patient deteriorates

Remember: Practice makes perfect. Regular practice of examination techniques is essential for developing competence and confidence.`,
            estimatedTime: 10
          },
          {
            id: "pe-1-2",
            title: "Cardiovascular Examination",
            type: "content",
            content: `**Cardiovascular examination is a core OSCE station** that requires systematic technique and ability to recognise common abnormalities.

**Preparation and Positioning:**
- Patient positioned at 45 degrees
- Chest exposed appropriately (maintain dignity)
- Good lighting essential
- Stethoscope and other equipment ready

**Inspection:**
- General appearance and colour
- Respiratory distress or cyanosis
- Visible pulsations (carotid, JVP, apex beat)
- Chest wall deformities
- Scars from previous surgery
- Peripheral oedema

**Palpation:**
**Pulse Assessment:**
- Radial pulse: rate, rhythm, character
- Compare both radial pulses
- Assess for radio-femoral delay
- Carotid pulse character (avoid bilateral palpation)

**Precordial Palpation:**
- Apex beat: location, character, displacement
- Parasternal heave (right ventricular enlargement)
- Thrills (palpable murmurs)

**Percussion:**
- Cardiac borders (rarely performed in modern practice)
- More useful for detecting pleural effusion

**Auscultation:**
**Heart Sounds:**
- Use both bell and diaphragm
- Listen in all four areas: aortic, pulmonary, tricuspid, mitral
- Identify S1 and S2
- Listen for additional sounds (S3, S4, gallops)
- Assess for murmurs

**Murmur Assessment:**
- Timing (systolic/diastolic)
- Location and radiation
- Character and intensity (grade 1-6)
- Response to manoeuvres (inspiration, Valsalva)

**Additional Assessments:**
- Blood pressure measurement
- Jugular venous pressure
- Peripheral pulses
- Signs of heart failure (ankle oedema, hepatomegaly)
- Lung bases for crepitations

**Common Findings:**
- Innocent murmurs in young patients
- Aortic stenosis (ejection systolic murmur)
- Mitral regurgitation (pansystolic murmur)
- Signs of heart failure
- Atrial fibrillation (irregularly irregular pulse)`,
            estimatedTime: 15
          },
          {
            id: "pe-1-3",
            title: "Cardiovascular Examination Quiz",
            type: "quiz",
            questions: [
              {
                id: "pe-cv-q1",
                question: "What is the correct sequence for cardiovascular examination?",
                options: [
                  "Auscultation, Palpation, Percussion, Inspection",
                  "Inspection, Palpation, Percussion, Auscultation",
                  "Palpation, Inspection, Auscultation, Percussion",
                  "Percussion, Auscultation, Inspection, Palpation"
                ],
                correctAnswer: 1,
                explanation: "The correct sequence is Inspection, Palpation, Percussion, Auscultation (IPPA). This systematic approach ensures thorough examination and prevents missing important findings."
              },
              {
                id: "pe-cv-q2",
                question: "Where is the apex beat normally located?",
                options: [
                  "5th intercostal space, midclavicular line",
                  "4th intercostal space, parasternal line",
                  "6th intercostal space, anterior axillary line",
                  "3rd intercostal space, midclavicular line"
                ],
                correctAnswer: 0,
                explanation: "The apex beat is normally located in the 5th intercostal space at the midclavicular line. Displacement may indicate cardiac enlargement."
              },
              {
                id: "pe-cv-q3",
                question: "A pansystolic murmur heard best at the apex is most likely:",
                options: [
                  "Aortic stenosis",
                  "Mitral regurgitation",
                  "Pulmonary stenosis",
                  "Tricuspid regurgitation"
                ],
                correctAnswer: 1,
                explanation: "Mitral regurgitation typically presents as a pansystolic murmur heard best at the apex, often radiating to the axilla."
              }
            ],
            estimatedTime: 5
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Medication Management & Calculations",
    slug: "medication-management",
    description: "Drug calculations and administration safety",
    icon: Pill,
    color: "bg-green-500",
    totalEstimatedTime: 90,
    sessions: [
      {
        id: "mm-1",
        title: "Drug Calculation Fundamentals",
        description: "Essential mathematical skills for safe medication administration",
        sections: [
          {
            id: "mm-1-1",
            title: "Basic Drug Calculations",
            type: "content",
            content: `**Accurate drug calculations are essential for patient safety.** Mathematical errors in medication administration can have serious consequences, making this a critical skill for all healthcare professionals.

**Fundamental Calculation Types:**

**1. Dose Calculations:**
The basic formula: **Dose Required = (Dose Prescribed × Volume of Stock) ÷ Stock Strength**

Example: Prescribed 250mg, Stock is 500mg in 2ml
Dose Required = (250 × 2) ÷ 500 = 1ml

**2. Unit Conversions:**
- 1 gram (g) = 1000 milligrams (mg)
- 1 milligram (mg) = 1000 micrograms (mcg)
- 1 litre (L) = 1000 millilitres (ml)
- 1 kilogram (kg) = 1000 grams (g)

**3. Percentage Concentrations:**
- % w/v (weight/volume): grams of drug per 100ml of solution
- % w/w (weight/weight): grams of drug per 100g of preparation
- % v/v (volume/volume): ml of drug per 100ml of solution

**4. Ratio Concentrations:**
- 1:1000 = 1g in 1000ml = 1mg/ml
- 1:10,000 = 1g in 10,000ml = 0.1mg/ml

**5. Parts per Million (ppm):**
- 1 ppm = 1mg/L = 1 microgram/ml

**Weight-Based Dosing:**
Many medications are prescribed per kilogram of body weight.
Formula: **Total Dose = Dose per kg × Patient's weight in kg**

Example: Paracetamol 15mg/kg for a 70kg patient
Total Dose = 15 × 70 = 1050mg

**Infusion Rate Calculations:**
For IV infusions: **Rate (ml/hr) = Volume (ml) ÷ Time (hours)**

**Safety Checks:**
- Always double-check calculations
- Use the decimal point carefully
- Consider if the answer seems reasonable
- Have calculations checked by another professional when required
- Use calculators for complex calculations but understand the principles`,
            estimatedTime: 12
          },
          {
            id: "mm-1-2",
            title: "Medication Safety Principles",
            type: "content",
            content: `**Medication safety is paramount in healthcare.** The "Five Rights" provide a framework for safe medication administration, but modern practice recognises additional important considerations.

**The Five Rights Plus:**

**1. Right Patient:**
- Check patient identification using two identifiers
- Use patient ID bands, date of birth, hospital number
- Ask patient to state their name
- Be aware of patients with similar names

**2. Right Drug:**
- Check medication name carefully
- Be aware of look-alike, sound-alike drugs
- Check generic vs brand names
- Verify against prescription

**3. Right Dose:**
- Calculate doses carefully
- Double-check calculations
- Consider patient factors (age, weight, renal function)
- Use appropriate measuring devices

**4. Right Route:**
- Oral, IV, IM, topical, etc.
- Ensure route is appropriate for the drug
- Check patient's ability to take medication by prescribed route

**5. Right Time:**
- Check timing of administration
- Consider drug interactions with timing
- Account for patient's schedule and preferences

**Additional Rights:**

**6. Right Documentation:**
- Record administration immediately
- Include time, dose, route, and any observations
- Sign and date all entries

**7. Right to Refuse:**
- Patients have the right to refuse medication
- Document refusal and inform prescriber
- Explore reasons for refusal

**8. Right Reason:**
- Understand why the medication is prescribed
- Check indication matches patient's condition
- Question inappropriate prescriptions

**Common Medication Errors:**
- Calculation errors
- Wrong patient
- Wrong drug
- Wrong dose
- Wrong route
- Omitted doses
- Wrong time
- Poor documentation

**High-Risk Medications:**
- Insulin
- Anticoagulants (warfarin, heparin)
- Chemotherapy drugs
- Opioids
- Potassium solutions
- Concentrated electrolytes

**Error Prevention Strategies:**
- Use technology (electronic prescribing, barcode scanning)
- Standardise processes
- Improve communication
- Provide adequate training
- Create a culture of safety reporting
- Learn from errors and near misses`,
            estimatedTime: 10
          },
          {
            id: "mm-1-3",
            title: "Drug Calculations Practice Quiz",
            type: "quiz",
            questions: [
              {
                id: "mm-calc-q1",
                question: "A patient is prescribed 375mg of amoxicillin. The stock solution contains 250mg in 5ml. How much should you administer?",
                options: [
                  "5ml",
                  "7.5ml",
                  "6ml",
                  "10ml"
                ],
                correctAnswer: 1,
                explanation: "Using the formula: (375 × 5) ÷ 250 = 1875 ÷ 250 = 7.5ml"
              },
              {
                id: "mm-calc-q2",
                question: "How many milligrams are in 2.5 grams?",
                options: [
                  "25mg",
                  "250mg",
                  "2500mg",
                  "25000mg"
                ],
                correctAnswer: 2,
                explanation: "1 gram = 1000 milligrams, so 2.5 grams = 2.5 × 1000 = 2500mg"
              },
              {
                id: "mm-calc-q3",
                question: "A 1:1000 adrenaline solution contains how much adrenaline per ml?",
                options: [
                  "1mg/ml",
                  "0.1mg/ml",
                  "10mg/ml",
                  "0.01mg/ml"
                ],
                correctAnswer: 0,
                explanation: "1:1000 means 1g in 1000ml, which equals 1000mg in 1000ml = 1mg/ml"
              }
            ],
            estimatedTime: 8
          }
        ]
      }
    ]
  }
];

// Helper function to get topic by slug
export const getTopicBySlug = (slug: string): LearningTopic | undefined => {
  return learningContent.find(topic => topic.slug === slug);
};

// Helper function to calculate total progress for a topic
export const calculateTopicProgress = (topicSlug: string): number => {
  const savedProgress = localStorage.getItem(`learning-progress-${topicSlug}`);
  if (!savedProgress) return 0;
  
  const progress = JSON.parse(savedProgress);
  const topic = getTopicBySlug(topicSlug);
  
  if (!topic) return 0;
  
  const totalSections = topic.sessions.reduce((sum, session) => sum + session.sections.length, 0);
  const completedSections = progress.completedSections?.length || 0;
  
  return Math.round((completedSections / totalSections) * 100);
};

