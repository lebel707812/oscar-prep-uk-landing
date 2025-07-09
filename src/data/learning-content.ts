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
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Wound Care & Infection Control",
    slug: "wound-care-infection-control",
    description: "Sterile techniques and wound management",
    icon: Shield,
    color: "bg-purple-500",
    totalEstimatedTime: 100,
    sessions: [
      {
        id: "wc-1",
        title: "Principles of Wound Care",
        description: "Understanding wound healing and assessment",
        sections: [
          {
            id: "wc-1-1",
            title: "Wound Assessment and Classification",
            type: "content",
            content: `**Proper wound assessment is fundamental to effective wound care.** Understanding different types of wounds and their characteristics guides appropriate treatment decisions.

**Wound Classification by Cause:**

**Surgical Wounds:**
- Clean: No contamination, closed primarily
- Clean-contaminated: Minor contamination
- Contaminated: Major contamination present
- Dirty/Infected: Established infection

**Traumatic Wounds:**
- Abrasions: Superficial skin loss
- Lacerations: Deep cuts through skin layers
- Puncture wounds: Deep, narrow wounds
- Avulsions: Tissue torn away

**Chronic Wounds:**
- Pressure ulcers: Prolonged pressure damage
- Venous ulcers: Poor venous circulation
- Arterial ulcers: Poor arterial circulation
- Diabetic ulcers: Diabetes-related complications

**Wound Assessment Framework:**

**Location and Size:**
- Anatomical location
- Length, width, and depth measurements
- Photographic documentation when appropriate

**Wound Bed:**
- Tissue types present (granulation, slough, necrotic)
- Percentage of each tissue type
- Signs of infection

**Exudate:**
- Amount (none, light, moderate, heavy)
- Colour (clear, yellow, green, brown)
- Consistency (thin, thick, purulent)
- Odour presence

**Wound Edges:**
- Well-defined or irregular
- Attached or undermined
- Signs of epithelialisation

**Surrounding Skin:**
- Colour and temperature
- Oedema or induration
- Maceration or excoriation

**Pain Assessment:**
- Pain level (0-10 scale)
- Pain characteristics
- Pain triggers and relief factors

**Healing Stages:**
1. **Haemostasis:** Blood clotting and platelet aggregation
2. **Inflammation:** Immune response and debris removal
3. **Proliferation:** New tissue formation
4. **Maturation:** Tissue remodelling and strengthening

**Factors Affecting Healing:**
- Age and general health
- Nutrition and hydration
- Circulation and oxygenation
- Medications
- Smoking and alcohol
- Underlying conditions (diabetes, immunosuppression)`,
            estimatedTime: 12
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Vital Signs & Monitoring",
    slug: "vital-signs-monitoring",
    description: "Accurate measurement and interpretation",
    icon: Activity,
    color: "bg-orange-500",
    totalEstimatedTime: 80,
    sessions: [
      {
        id: "vs-1",
        title: "Essential Vital Signs",
        description: "Temperature, pulse, respiration, and blood pressure",
        sections: [
          {
            id: "vs-1-1",
            title: "Temperature Measurement",
            type: "content",
            content: `**Body temperature is a crucial vital sign** that reflects the body's metabolic state and can indicate infection, inflammation, or other pathological processes.

**Normal Temperature Ranges:**
- Oral: 36.5-37.5°C (97.7-99.5°F)
- Rectal: 37.0-38.0°C (98.6-100.4°F)
- Axillary: 36.0-37.0°C (96.8-98.6°F)
- Tympanic: 36.8-37.8°C (98.2-100.0°F)

**Measurement Sites and Methods:**

**Oral Temperature:**
- Most common method for conscious, cooperative patients
- Place thermometer under tongue, posterior to frenulum
- Patient should not have consumed hot/cold substances for 15 minutes
- Contraindicated in unconscious patients or those with oral trauma

**Rectal Temperature:**
- Most accurate core temperature measurement
- Insert thermometer 2-3cm into rectum
- Used for infants and unconscious patients
- Contraindicated with rectal surgery or bleeding disorders

**Axillary Temperature:**
- Safest method but least accurate
- Place thermometer in centre of axilla
- Hold arm close to body for 3-5 minutes
- Suitable for all age groups

**Tympanic Temperature:**
- Quick and convenient
- Requires proper technique and positioning
- May be affected by earwax or ear infections
- Not suitable for infants under 6 months

**Factors Affecting Temperature:**
- Time of day (circadian rhythm)
- Age (elderly have lower baseline)
- Physical activity
- Environmental temperature
- Hormonal changes (menstrual cycle)
- Medications
- Illness and infection

**Temperature Abnormalities:**
- **Fever (Pyrexia):** >38°C (100.4°F)
- **Hyperthermia:** >40°C (104°F) - medical emergency
- **Hypothermia:** <35°C (95°F) - medical emergency
- **Hyperpyrexia:** >41°C (105.8°F) - life-threatening

**Clinical Significance:**
- Fever often indicates infection or inflammation
- Pattern of fever can provide diagnostic clues
- Hypothermia may indicate shock or exposure
- Temperature trends more important than single readings`,
            estimatedTime: 10
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Emergency Procedures & CPR",
    slug: "emergency-procedures-cpr",
    description: "Life-saving interventions and protocols",
    icon: Zap,
    color: "bg-yellow-500",
    totalEstimatedTime: 120,
    sessions: [
      {
        id: "ep-1",
        title: "Basic Life Support",
        description: "CPR and emergency response protocols",
        sections: [
          {
            id: "ep-1-1",
            title: "Adult Basic Life Support",
            type: "content",
            content: `**Basic Life Support (BLS) is a critical skill** that can mean the difference between life and death. The current guidelines emphasise high-quality chest compressions and early defibrillation.

**The Chain of Survival:**
1. Early recognition and call for help
2. Early CPR with emphasis on chest compressions
3. Early defibrillation
4. Early advanced life support
5. Post-resuscitation care

**Adult BLS Algorithm:**

**1. Check Responsiveness:**
- Shake shoulders gently and shout "Are you alright?"
- If unresponsive, shout for help
- Call 999 (or local emergency number)
- Request an AED if available

**2. Check Breathing:**
- Look for normal breathing for no more than 10 seconds
- Ignore occasional gasps (agonal breathing)
- If not breathing normally, start CPR

**3. Chest Compressions:**
- Place heel of one hand on centre of chest (lower half of breastbone)
- Place other hand on top, interlocking fingers
- Keep arms straight and shoulders over hands
- Compress at least 5cm but not more than 6cm
- Allow complete recoil between compressions
- Rate: 100-120 compressions per minute

**4. Rescue Breaths:**
- Tilt head back, lift chin
- Pinch nose closed
- Make seal over mouth
- Give 2 breaths, each lasting 1 second
- Watch for chest rise with each breath

**5. Continue CPR:**
- 30 compressions : 2 breaths
- Continue until emergency services arrive or patient recovers
- Minimise interruptions

**High-Quality CPR Characteristics:**
- Adequate compression depth (5-6cm)
- Adequate compression rate (100-120/min)
- Complete chest recoil
- Minimal interruptions
- Avoid excessive ventilation

**When to Stop CPR:**
- Emergency services take over
- Patient shows signs of life
- You become exhausted and unable to continue
- Environment becomes unsafe

**Special Considerations:**
- Pregnancy: Displace uterus to left
- Children: Adjust compression depth and technique
- Drowning: Start with rescue breaths
- Choking: Back blows and abdominal thrusts`,
            estimatedTime: 15
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Patient Safety & Risk Assessment",
    slug: "patient-safety-risk-assessment",
    description: "Identify and mitigate clinical risks",
    icon: UserCheck,
    color: "bg-indigo-500",
    totalEstimatedTime: 90,
    sessions: [
      {
        id: "ps-1",
        title: "Risk Assessment Fundamentals",
        description: "Identifying and managing patient safety risks",
        sections: [
          {
            id: "ps-1-1",
            title: "Falls Risk Assessment",
            type: "content",
            content: `**Falls are a major cause of injury and death** in healthcare settings, particularly among elderly patients. Systematic risk assessment and prevention strategies are essential for patient safety.

**Falls Risk Factors:**

**Intrinsic Factors:**
- Age >65 years
- Previous falls history
- Cognitive impairment or confusion
- Visual or hearing impairments
- Mobility problems or muscle weakness
- Medications (sedatives, antihypertensives, diuretics)
- Medical conditions (stroke, Parkinson's, diabetes)
- Incontinence or urgency

**Extrinsic Factors:**
- Environmental hazards (wet floors, poor lighting)
- Inappropriate footwear
- Ill-fitting clothing
- Lack of mobility aids
- Unfamiliar environment
- Inadequate staffing levels

**Falls Risk Assessment Tools:**

**STRATIFY Tool:**
- Recent falls history
- Agitation or confusion
- Visual impairment
- Frequent toileting needs
- Transfer/mobility problems

**Morse Fall Scale:**
- History of falling
- Secondary diagnosis
- Ambulatory aid
- IV therapy/heparin lock
- Gait/transferring ability
- Mental status

**Assessment Process:**
1. Complete initial assessment within 24 hours
2. Reassess after any change in condition
3. Document risk level and interventions
4. Communicate risks to all team members
5. Review and update regularly

**Prevention Strategies:**

**High-Risk Patients:**
- Bed/chair alarms
- Frequent observation
- Assistance with mobilisation
- Toileting schedules
- Appropriate footwear
- Clear pathways

**Environmental Modifications:**
- Adequate lighting
- Non-slip surfaces
- Handrails and grab bars
- Appropriate bed height
- Clear walkways
- Call bells within reach

**Medication Review:**
- Assess fall-risk medications
- Consider dose adjustments
- Monitor for side effects
- Time medications appropriately

**Education and Training:**
- Patient and family education
- Staff training on risk factors
- Proper use of mobility aids
- Safe transfer techniques

**Post-Fall Protocol:**
- Immediate assessment for injury
- Medical evaluation if indicated
- Incident reporting and analysis
- Review and update care plan
- Investigate contributing factors`,
            estimatedTime: 12
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Documentation & Record Keeping",
    slug: "documentation-record-keeping",
    description: "Accurate and legal documentation practices",
    icon: FileText,
    color: "bg-pink-500",
    totalEstimatedTime: 75,
    sessions: [
      {
        id: "dr-1",
        title: "Legal and Professional Documentation",
        description: "Standards for healthcare record keeping",
        sections: [
          {
            id: "dr-1-1",
            title: "Principles of Good Record Keeping",
            type: "content",
            content: `**Accurate documentation is both a legal requirement and professional responsibility.** Good record keeping protects patients, supports continuity of care, and provides legal protection for healthcare professionals.

**Legal Requirements:**

**Professional Standards:**
- Records must be accurate, legible, and contemporaneous
- All entries must be signed, dated, and timed
- Use black ink for handwritten records
- No alterations without clear indication
- Maintain confidentiality and security

**Data Protection:**
- Comply with GDPR and local data protection laws
- Secure storage and controlled access
- Patient consent for information sharing
- Right to access and correction
- Retention and disposal policies

**Documentation Principles:**

**Accuracy:**
- Record facts, not opinions
- Use objective, measurable terms
- Avoid subjective interpretations
- Include relevant negative findings
- Correct errors appropriately

**Completeness:**
- Document all significant events
- Include patient responses to treatment
- Record communications with patients/families
- Note any incidents or concerns
- Document discharge planning

**Timeliness:**
- Write notes as soon as possible after events
- Never backdate entries
- If delayed, note the reason
- Use correct date and time
- Sign immediately after writing

**Legibility:**
- Write clearly and legibly
- Use standard abbreviations only
- Avoid jargon or unclear terms
- Type when possible
- Ensure others can read and understand

**SOAP Documentation Format:**

**S - Subjective:**
- Patient's complaints and symptoms
- Patient's own words when relevant
- Family concerns or observations
- Pain scores and descriptions

**O - Objective:**
- Vital signs and measurements
- Physical examination findings
- Laboratory and test results
- Observations of behaviour

**A - Assessment:**
- Clinical impression or diagnosis
- Analysis of findings
- Risk assessment
- Progress evaluation

**P - Plan:**
- Treatment interventions
- Medications prescribed
- Follow-up arrangements
- Patient education provided

**Common Documentation Errors:**
- Illegible handwriting
- Missing signatures or dates
- Inappropriate abbreviations
- Subjective language
- Incomplete information
- Late or backdated entries

**Electronic Records:**
- Use secure login credentials
- Log out when finished
- Don't share passwords
- Follow system protocols
- Maintain same standards as paper records

**Incident Documentation:**
- Factual, objective reporting
- Include all relevant details
- Avoid blame or speculation
- Follow reporting procedures
- Support quality improvement`,
            estimatedTime: 10
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Professional Boundaries & Ethics",
    slug: "professional-boundaries-ethics",
    description: "Ethical decision-making and professional conduct",
    icon: Scale,
    color: "bg-teal-500",
    totalEstimatedTime: 85,
    sessions: [
      {
        id: "pb-1",
        title: "Ethical Principles in Healthcare",
        description: "Core ethical frameworks and decision-making",
        sections: [
          {
            id: "pb-1-1",
            title: "The Four Principles of Medical Ethics",
            type: "content",
            content: `**Ethical decision-making in healthcare** is guided by four fundamental principles that help navigate complex moral dilemmas and ensure patient-centred care.

**1. Autonomy:**
**Definition:** Respect for patient self-determination and decision-making capacity.

**Key Elements:**
- Informed consent for all treatments
- Right to refuse treatment
- Confidentiality and privacy
- Truth-telling and honest communication
- Respect for patient values and beliefs

**Clinical Applications:**
- Obtaining valid consent before procedures
- Respecting advance directives
- Supporting patient choice in treatment options
- Maintaining confidentiality
- Providing honest information about prognosis

**Challenges:**
- Patients with diminished capacity
- Cultural differences in decision-making
- Family involvement vs. patient autonomy
- Emergency situations
- Conflicting patient wishes

**2. Beneficence:**
**Definition:** The obligation to act in the patient's best interests and promote wellbeing.

**Key Elements:**
- Providing competent care
- Promoting health and healing
- Preventing harm when possible
- Acting with compassion
- Advocating for patients

**Clinical Applications:**
- Evidence-based treatment decisions
- Continuing professional development
- Patient advocacy
- Preventive care measures
- Holistic care approach

**3. Non-maleficence:**
**Definition:** "First, do no harm" - the duty to avoid causing harm to patients.

**Key Elements:**
- Risk-benefit analysis
- Competent practice within scope
- Recognising limitations
- Safe practice standards
- Error prevention and reporting

**Clinical Applications:**
- Careful medication administration
- Infection control measures
- Safe patient handling
- Appropriate referrals
- Quality improvement initiatives

**4. Justice:**
**Definition:** Fair distribution of benefits, risks, and costs in healthcare.

**Key Elements:**
- Equal access to care
- Fair allocation of resources
- Non-discrimination
- Respect for rights
- Social responsibility

**Clinical Applications:**
- Equitable treatment regardless of background
- Appropriate resource utilisation
- Fair waiting times and prioritisation
- Addressing health inequalities
- Professional integrity

**Ethical Decision-Making Framework:**
1. Identify the ethical issue
2. Gather relevant facts
3. Identify stakeholders
4. Consider ethical principles
5. Explore options
6. Choose course of action
7. Implement and evaluate

**Common Ethical Dilemmas:**
- End-of-life care decisions
- Resource allocation
- Confidentiality vs. duty to warn
- Informed consent challenges
- Professional boundaries
- Whistleblowing situations`,
            estimatedTime: 12
          }
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Cultural Competency & Diversity",
    slug: "cultural-competency-diversity",
    description: "Culturally sensitive care approaches",
    icon: Globe,
    color: "bg-cyan-500",
    totalEstimatedTime: 70,
    sessions: [
      {
        id: "cc-1",
        title: "Understanding Cultural Diversity",
        description: "Foundations of culturally competent care",
        sections: [
          {
            id: "cc-1-1",
            title: "Cultural Competency in Healthcare",
            type: "content",
            content: `**Cultural competency is essential for providing equitable healthcare** to diverse populations. Understanding and respecting cultural differences improves patient outcomes and satisfaction.

**Defining Culture:**
Culture encompasses:
- Ethnicity and race
- Religion and spirituality
- Language and communication styles
- Socioeconomic status
- Gender identity and sexual orientation
- Age and generational differences
- Disability status
- Geographic origin

**Cultural Competency Framework:**

**Cultural Awareness:**
- Recognise your own cultural background
- Understand how culture influences health beliefs
- Acknowledge unconscious bias
- Appreciate cultural diversity
- Recognise power dynamics

**Cultural Knowledge:**
- Learn about different cultural groups
- Understand health disparities
- Know cultural health practices
- Understand family structures
- Learn about religious considerations

**Cultural Skills:**
- Effective cross-cultural communication
- Cultural assessment techniques
- Use of interpreters
- Culturally appropriate interventions
- Conflict resolution across cultures

**Cultural Encounters:**
- Seek diverse patient interactions
- Engage with cultural communities
- Participate in cultural events
- Learn from patient experiences
- Build cultural relationships

**Cultural Desire:**
- Motivation to become culturally competent
- Commitment to lifelong learning
- Genuine interest in other cultures
- Willingness to examine biases
- Passion for equitable care

**Communication Considerations:**

**Language Barriers:**
- Use professional interpreters
- Avoid family members as interpreters
- Speak directly to the patient
- Use simple, clear language
- Check understanding frequently

**Non-Verbal Communication:**
- Eye contact preferences
- Personal space boundaries
- Touch and physical contact
- Facial expressions and gestures
- Silence and pauses

**Health Beliefs and Practices:**
- Traditional healing methods
- Religious dietary restrictions
- Prayer and spiritual practices
- Family decision-making roles
- Concepts of illness and wellness

**Specific Cultural Considerations:**

**Religious Practices:**
- Prayer times and requirements
- Dietary laws and restrictions
- Modesty and clothing requirements
- End-of-life rituals
- Holy days and observances

**Family Dynamics:**
- Decision-making hierarchies
- Gender roles and expectations
- Intergenerational relationships
- Extended family involvement
- Child-rearing practices

**Health Disparities:**
- Access to healthcare services
- Quality of care differences
- Health outcome inequalities
- Social determinants of health
- Systemic barriers

**Strategies for Culturally Competent Care:**
- Conduct cultural assessments
- Develop cultural care plans
- Use culturally appropriate materials
- Provide interpreter services
- Train diverse healthcare teams
- Address systemic barriers`,
            estimatedTime: 11
          }
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Mental Health Assessment",
    slug: "mental-health-assessment",
    description: "Mental health screening and support",
    icon: Brain,
    color: "bg-violet-500",
    totalEstimatedTime: 95,
    sessions: [
      {
        id: "mh-1",
        title: "Mental Health Screening",
        description: "Identifying mental health concerns and risk factors",
        sections: [
          {
            id: "mh-1-1",
            title: "Mental State Examination",
            type: "content",
            content: `**Mental state examination (MSE) is a systematic assessment** of a patient's psychological functioning at a specific point in time. It's essential for identifying mental health concerns and planning appropriate care.

**Components of Mental State Examination:**

**1. Appearance and Behaviour:**
- General appearance and grooming
- Dress and hygiene
- Posture and motor activity
- Facial expressions
- Eye contact and engagement
- Cooperation with examination

**Observations to Note:**
- Agitation or restlessness
- Psychomotor retardation
- Inappropriate dress for weather/situation
- Poor personal hygiene
- Unusual mannerisms or movements

**2. Speech and Language:**
- Rate of speech (fast, slow, normal)
- Volume (loud, quiet, whispered)
- Tone and inflection
- Fluency and articulation
- Amount of speech (talkative, monosyllabic)

**Abnormalities:**
- Pressure of speech (rapid, difficult to interrupt)
- Poverty of speech (minimal verbal output)
- Dysarthria (difficulty articulating)
- Aphasia (language impairment)

**3. Mood and Affect:**
**Mood:** Patient's sustained emotional state
**Affect:** Observable emotional expression

**Mood Assessment:**
- Ask directly: "How has your mood been?"
- Duration and severity
- Diurnal variation
- Triggers and relieving factors

**Affect Descriptors:**
- Euthymic (normal)
- Depressed or sad
- Elevated or euphoric
- Anxious or worried
- Irritable or angry
- Labile (rapidly changing)

**4. Thought Process and Content:**
**Thought Process:** How thoughts are organised
- Logical and goal-directed
- Circumstantial (excessive detail)
- Tangential (goes off-topic)
- Flight of ideas (rapid topic changes)
- Thought blocking (sudden stops)

**Thought Content:**
- Delusions (fixed false beliefs)
- Obsessions (intrusive thoughts)
- Phobias (irrational fears)
- Suicidal or homicidal ideation

**5. Perceptual Disturbances:**
- Hallucinations (false perceptions)
- Illusions (misinterpretations)
- Depersonalisation/derealisation

**Types of Hallucinations:**
- Auditory (most common)
- Visual
- Tactile
- Olfactory
- Gustatory

**6. Cognitive Function:**
**Orientation:**
- Person (name, age)
- Place (location, address)
- Time (date, day, year)

**Attention and Concentration:**
- Serial 7s (subtract 7 from 100)
- Spell "WORLD" backwards
- Digit span tests

**Memory:**
- Immediate (repeat words immediately)
- Short-term (recall after 5 minutes)
- Long-term (personal history, general knowledge)

**7. Insight and Judgement:**
**Insight:** Awareness of illness
- Complete insight
- Partial insight
- No insight

**Judgement:** Decision-making ability
- Test with hypothetical scenarios
- Assess real-life decisions
- Consider safety implications

**Risk Assessment:**
Always assess for:
- Suicide risk
- Self-harm behaviours
- Risk to others
- Vulnerability to exploitation
- Capacity for self-care

**Documentation:**
- Use objective, descriptive language
- Avoid diagnostic labels
- Include direct quotes when relevant
- Note any safety concerns
- Recommend appropriate follow-up`,
            estimatedTime: 14
          }
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Paediatric & Elderly Care",
    slug: "pediatric-elderly-care",
    description: "Age-specific care considerations",
    icon: Users,
    color: "bg-emerald-500",
    totalEstimatedTime: 110,
    sessions: [
      {
        id: "pe-1",
        title: "Paediatric Care Principles",
        description: "Child-centred care and development considerations",
        sections: [
          {
            id: "pe-1-1",
            title: "Child Development and Assessment",
            type: "content",
            content: `**Paediatric care requires understanding of child development** and age-appropriate assessment techniques. Children are not simply small adults - they have unique physiological, psychological, and social needs.

**Developmental Stages:**

**Infancy (0-12 months):**
- Rapid physical growth
- Basic trust development
- Attachment formation
- Sensory and motor development
- Stranger anxiety (6-12 months)

**Toddlerhood (1-3 years):**
- Autonomy development
- Language acquisition
- Toilet training
- Separation anxiety
- Temper tantrums normal

**Preschool (3-5 years):**
- Initiative and independence
- Imaginative play
- Basic social skills
- Magical thinking
- Fear of bodily harm

**School Age (6-12 years):**
- Industry and competence
- Peer relationships
- Concrete thinking
- Rule-oriented behaviour
- Body image awareness

**Adolescence (13-18 years):**
- Identity formation
- Abstract thinking
- Peer influence strong
- Risk-taking behaviours
- Body image concerns

**Age-Appropriate Communication:**

**Infants and Toddlers:**
- Speak to parents primarily
- Use calm, soothing voice
- Allow comfort items
- Maintain routines when possible
- Use distraction techniques

**Preschoolers:**
- Use simple, concrete language
- Explain procedures in basic terms
- Use play and storytelling
- Allow choices when possible
- Reassure about returning home

**School-Age Children:**
- Provide honest, age-appropriate information
- Use medical equipment for demonstration
- Encourage questions
- Respect modesty
- Include in decision-making

**Adolescents:**
- Respect privacy and confidentiality
- Communicate directly with teen
- Discuss consent and rights
- Address body image concerns
- Consider peer influence

**Paediatric Assessment Considerations:**

**Vital Signs - Normal Ranges:**

**Heart Rate (beats/min):**
- Newborn: 120-160
- 1-12 months: 80-140
- 1-2 years: 80-130
- 2-6 years: 75-120
- 6-12 years: 70-110
- >12 years: 60-100

**Respiratory Rate (breaths/min):**
- Newborn: 30-60
- 1-12 months: 30-60
- 1-2 years: 24-40
- 2-6 years: 22-34
- 6-12 years: 18-30
- >12 years: 12-16

**Blood Pressure:**
- Varies significantly with age and size
- Use appropriate cuff size
- Consider percentiles for age/height
- Multiple readings may be needed

**Physical Examination Adaptations:**
- Examine least threatening areas first
- Use parent's lap when appropriate
- Allow child to handle equipment
- Use games and distraction
- Respect child's pace
- Maintain warmth and comfort

**Pain Assessment:**
- Use age-appropriate pain scales
- FLACC scale (0-3 years)
- Wong-Baker FACES (3+ years)
- Numeric scale (8+ years)
- Consider behavioural indicators

**Family-Centred Care:**
- Include family in care decisions
- Respect family values and beliefs
- Provide family education
- Support family coping
- Encourage family presence

**Child Protection Considerations:**
- Mandatory reporting requirements
- Signs of abuse or neglect
- Safeguarding procedures
- Documentation requirements
- Multi-agency working

**Common Paediatric Conditions:**
- Respiratory infections
- Gastroenteritis
- Fever management
- Developmental delays
- Behavioural concerns
- Injury prevention`,
            estimatedTime: 15
          }
        ]
      }
    ]
  },
  {
    id: 13,
    title: "Discharge Planning & Education",
    slug: "discharge-planning-education",
    description: "Patient education and transition planning",
    icon: ClipboardList,
    color: "bg-amber-500",
    totalEstimatedTime: 65,
    sessions: [
      {
        id: "dp-1",
        title: "Effective Discharge Planning",
        description: "Ensuring safe transitions from hospital to home",
        sections: [
          {
            id: "dp-1-1",
            title: "Discharge Planning Process",
            type: "content",
            content: `**Effective discharge planning is crucial for patient safety** and successful transitions from hospital to home or other care settings. Poor discharge planning can lead to readmissions, complications, and patient dissatisfaction.

**Discharge Planning Principles:**

**Early Planning:**
- Begin planning on admission
- Assess discharge needs early
- Involve multidisciplinary team
- Consider social circumstances
- Identify potential barriers

**Patient-Centred Approach:**
- Include patient and family in planning
- Respect patient preferences
- Consider cultural factors
- Address individual needs
- Ensure understanding

**Comprehensive Assessment:**
- Medical stability for discharge
- Functional capacity
- Cognitive ability
- Social support systems
- Home environment safety
- Financial considerations

**Discharge Planning Process:**

**1. Initial Assessment:**
- Medical history and current condition
- Functional status and mobility
- Cognitive and mental health status
- Social support and living arrangements
- Previous hospital admissions
- Medication management ability

**2. Multidisciplinary Team Involvement:**
- Medical team (doctors, nurses)
- Allied health (physiotherapy, occupational therapy)
- Social workers
- Pharmacists
- Dietitians
- Discharge coordinators

**3. Discharge Criteria:**
- Medical stability achieved
- Pain adequately controlled
- Able to maintain nutrition/hydration
- Safe mobility level
- Appropriate support arranged
- Follow-up appointments scheduled

**4. Discharge Preparation:**
- Patient and family education
- Medication reconciliation
- Equipment and supplies arranged
- Home care services organised
- Transportation arranged
- Emergency contact information provided

**Patient Education Components:**

**Medication Management:**
- Purpose of each medication
- Dosage and timing instructions
- Side effects to watch for
- Drug interactions to avoid
- Storage requirements
- When to contact healthcare provider

**Self-Care Instructions:**
- Wound care procedures
- Activity restrictions and progression
- Diet and nutrition guidelines
- Signs and symptoms to monitor
- When to seek medical attention
- Follow-up appointment importance

**Safety Considerations:**
- Fall prevention measures
- Infection control practices
- Emergency procedures
- Contact information for help
- Equipment use and maintenance

**Discharge Documentation:**

**Discharge Summary:**
- Admission diagnosis and treatment
- Procedures performed
- Current medications
- Follow-up requirements
- Functional status at discharge
- Ongoing care needs

**Medication List:**
- Complete list of current medications
- Changes made during admission
- Discontinued medications
- New prescriptions
- Over-the-counter medications
- Allergies and adverse reactions

**Follow-up Arrangements:**
- Primary care appointments
- Specialist referrals
- Diagnostic tests scheduled
- Community services arranged
- Emergency contact information

**Special Populations:**

**Elderly Patients:**
- Increased risk of complications
- Multiple medications
- Cognitive considerations
- Social isolation risks
- Functional decline prevention

**Chronic Disease Patients:**
- Disease-specific education
- Self-monitoring techniques
- Lifestyle modifications
- Support group referrals
- Long-term care planning

**Mental Health Patients:**
- Crisis planning
- Medication compliance
- Support system activation
- Community mental health referrals
- Safety planning

**Quality Indicators:**
- Readmission rates
- Patient satisfaction scores
- Medication errors post-discharge
- Follow-up appointment attendance
- Emergency department visits

**Barriers to Effective Discharge:**
- Inadequate communication
- Insufficient patient education
- Lack of social support
- Financial constraints
- Transportation issues
- Language barriers
- Health literacy limitations`,
            estimatedTime: 13
          }
        ]
      }
    ]
  },
  {
    id: 14,
    title: "Quality Improvement & Evidence-Based Practice",
    slug: "quality-improvement-evidence-based-practice",
    description: "Research application and quality metrics",
    icon: TrendingUp,
    color: "bg-rose-500",
    totalEstimatedTime: 100,
    sessions: [
      {
        id: "qi-1",
        title: "Evidence-Based Practice Fundamentals",
        description: "Integrating research into clinical practice",
        sections: [
          {
            id: "qi-1-1",
            title: "Principles of Evidence-Based Practice",
            type: "content",
            content: `**Evidence-based practice (EBP) integrates the best research evidence** with clinical expertise and patient values to guide healthcare decisions. This approach improves patient outcomes and ensures high-quality care.

**The EBP Process:**

**1. Ask Clinical Questions:**
Use the PICO framework:
- **P**atient/Population: Who is the patient?
- **I**ntervention: What intervention are you considering?
- **C**omparison: What is the alternative?
- **O**utcome: What outcome are you hoping to achieve?

**Example PICO Question:**
"In elderly patients with hip fractures (P), does early mobilisation (I) compared to bed rest (C) reduce the risk of complications (O)?"

**2. Search for Evidence:**
- Use reliable databases (PubMed, CINAHL, Cochrane)
- Use appropriate search terms
- Apply filters for study type and quality
- Consider systematic reviews and meta-analyses
- Include recent and relevant studies

**3. Critically Appraise Evidence:**
- Assess study design and methodology
- Evaluate sample size and population
- Consider bias and confounding factors
- Review statistical significance and clinical significance
- Assess applicability to your patient population

**4. Integrate Evidence:**
- Combine research evidence with clinical expertise
- Consider patient preferences and values
- Assess feasibility and resources
- Develop evidence-based recommendations
- Create implementation plans

**5. Evaluate Outcomes:**
- Monitor patient outcomes
- Assess implementation success
- Identify barriers and facilitators
- Make necessary adjustments
- Share results with colleagues

**Hierarchy of Evidence:**

**Level 1 (Highest):**
- Systematic reviews and meta-analyses
- Randomised controlled trials (RCTs)

**Level 2:**
- Cohort studies
- Case-control studies

**Level 3:**
- Cross-sectional studies
- Case series

**Level 4:**
- Case reports
- Expert opinion

**Level 5 (Lowest):**
- Anecdotal evidence
- Personal experience

**Critical Appraisal Skills:**

**Quantitative Research:**
- Was the study design appropriate?
- Was randomisation adequate?
- Were groups comparable at baseline?
- Was blinding used appropriately?
- Were outcomes measured objectively?
- Was follow-up complete?
- Were results clinically significant?

**Qualitative Research:**
- Was the research question clear?
- Was the methodology appropriate?
- Was sampling strategy suitable?
- Was data collection rigorous?
- Was analysis systematic?
- Were findings credible?
- Are results transferable?

**Barriers to EBP Implementation:**

**Individual Barriers:**
- Lack of research skills
- Time constraints
- Resistance to change
- Insufficient knowledge
- Competing priorities

**Organisational Barriers:**
- Limited resources
- Lack of leadership support
- Inadequate infrastructure
- Poor communication
- Conflicting priorities

**Strategies for EBP Implementation:**

**Education and Training:**
- Research methodology courses
- Critical appraisal workshops
- Journal clubs
- Mentorship programmes
- Online resources

**Organisational Support:**
- Leadership commitment
- Dedicated time for EBP activities
- Access to databases and resources
- Multidisciplinary collaboration
- Recognition and rewards

**Tools and Resources:**
- Clinical practice guidelines
- Evidence summaries
- Decision support systems
- Mobile applications
- Professional networks

**Quality Improvement Integration:**
- Use evidence to identify improvement opportunities
- Implement evidence-based interventions
- Monitor outcomes using evidence-based metrics
- Share results to build evidence base
- Contribute to research when possible

**Ethical Considerations:**
- Ensure patient safety during implementation
- Obtain appropriate approvals
- Maintain patient confidentiality
- Consider equity and access issues
- Balance innovation with proven practices

**Measuring EBP Success:**
- Patient outcome improvements
- Reduced practice variation
- Increased guideline adherence
- Cost-effectiveness
- Staff satisfaction and engagement`,
            estimatedTime: 16
          }
        ]
      }
    ]
  }
];

