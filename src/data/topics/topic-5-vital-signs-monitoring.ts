import { LearningTopic } from "../learning-content";
import { HeartPulse } from "lucide-react";

export const topic5: LearningTopic = {
  id: "topic-5",
  title: "Vital Signs & Monitoring",
  description: "Understanding and accurately assessing vital signs for effective patient monitoring.",
  icon: HeartPulse,
  slug: "vital-signs-monitoring",
  totalEstimatedTime: 105, // Will update after adding content
  sessions: [
    {
      id: "vital-signs-1",
      title: "Session 1: Core Vital Signs Assessment",
      description: "Learn the fundamentals of measuring and interpreting key vital signs.",
      sections: [
        {
          id: "vital-signs-1-1",
          title: "1.1 Temperature, Pulse, and Respiration",
          type: "content",
          content: `# 1.1 Temperature, Pulse, and Respiration\n\nThis section covers the fundamental principles and techniques for assessing body temperature, pulse rate, and respiratory rate. Understanding these core vital signs is crucial for any healthcare professional to monitor a patient\"s physiological status and detect early signs of deterioration.\n\n## Temperature\n\nBody temperature is a measure of the body\"s ability to generate and dissipate heat. Normal body temperature is typically around 37°C (98.6°F), but it can vary depending on the individual, time of day, and measurement site.\n\n### Measurement Sites:\n\n*   **Oral:** Convenient and common, but can be affected by recent food/drink.\n*   **Axillary:** Less accurate, often used for infants or uncooperative patients.\n*   **Rectal:** Most accurate, but invasive.\n*   **Tympanic (Ear):** Quick and easy, but technique-dependent.\n*   **Temporal (Forehead):** Non-invasive, good for screening.\n\n### Clinical Significance:\n\n*   **Fever (Pyrexia):** Elevated temperature, often indicates infection or inflammation.\n*   **Hypothermia:** Abnormally low temperature, can be caused by exposure to cold or certain medical conditions.\n\n## Pulse\n\nThe pulse is the rhythmic throbbing of arteries produced by the regular contractions of the heart. It reflects the heart rate and rhythm.\n\n### Common Pulse Sites:\n\n*   **Radial:** Most common site, located on the thumb side of the wrist.\n*   **Carotid:** Used in emergencies to assess circulation to the brain.\n*   **Brachial:** Used for blood pressure measurement and in infants.\n*   **Femoral:** Located in the groin, used in emergencies.\n\n### Assessment:\n\n*   **Rate:** Number of beats per minute (normal adult range: 60-100 bpm).\n*   **Rhythm:** Regular or irregular.\n*   **Strength:** Bounding, strong, weak, or thready.\n\n## Respiration\n\nRespiration is the process of taking in oxygen and expelling carbon dioxide. It involves both inspiration (inhalation) and expiration (exhalation).\n\n### Assessment:\n\n*   **Rate:** Number of breaths per minute (normal adult range: 12-20 breaths/min).\n*   **Rhythm:** Regular or irregular.\n*   **Depth:** Shallow, normal, or deep.\n*   **Character:** Effortless or labored.`,
          estimatedTime: 15,
        },
        {
          id: "vital-signs-1-2",
          title: "1.2 Blood Pressure Measurement",
          type: "content",
          content: `# 1.2 Blood Pressure Measurement\n\nBlood pressure is the force exerted by circulating blood against the walls of the body\"s arteries. It is a crucial indicator of cardiovascular health and is measured as systolic pressure (when the heart beats) over diastolic pressure (when the heart rests between beats).\n\n## Measurement Techniques:\n\n*   **Auscultatory Method:** Using a sphygmomanometer and stethoscope. This is the most common and accurate method.\n*   **Palpatory Method:** Used to estimate systolic pressure, especially in noisy environments or when a stethoscope is unavailable.\n*   **Automated Devices:** Electronic devices that provide quick and easy measurements, but may require calibration.\n\n## Factors Affecting Blood Pressure:\n\n*   **Age:** Blood pressure tends to increase with age.\n*   **Stress/Anxiety:** Can temporarily elevate blood pressure.\n*   **Physical Activity:** Increases blood pressure during exertion.\n*   **Medications:** Various drugs can affect blood pressure.\n*   **Diet:** High sodium intake can contribute to hypertension.\n\n## Clinical Significance:\n\n*   **Hypertension (High Blood Pressure):** A persistent elevation in blood pressure, increasing the risk of heart disease, stroke, and kidney disease.\n*   **Hypotension (Low Blood Pressure):** Abnormally low blood pressure, which can lead to dizziness, fainting, and shock.`,
          estimatedTime: 20,
        },
        {
          id: "vital-signs-1-3",
          title: "1.3 Quiz: Basic Vital Signs",
          type: "quiz",
          content: "Test your knowledge on core vital signs assessment.",
          estimatedTime: 10,
          quizQuestions: [
            {
              id: "q-vs-1-1",
              question: "What is the normal range for adult oral temperature in Celsius?",
              options: [
                "35.0-36.0°C",
                "36.5-37.5°C",
                "37.0-38.0°C",
                "38.0-39.0°C",
              ],
              correctAnswer: 1,
              explanation: "The normal range for adult oral temperature is typically 36.5-37.5°C.",
            },
            {
              id: "q-vs-1-2",
              question: "Which artery is most commonly used for pulse assessment in adults?",
              options: [
                "Brachial artery",
                "Femoral artery",
                "Radial artery",
                "Carotid artery",
              ],
              correctAnswer: 2,
              explanation: "The radial artery is most commonly used for routine pulse assessment in adults due to its accessibility.",
            },
          ],
        },
      ],
    },
    {
      id: "vital-signs-2",
      title: "Session 2: Advanced Monitoring & Interpretation",
      description: "Delve deeper into advanced vital sign monitoring techniques and clinical interpretation.",
      sections: [
        {
          id: "vital-signs-2-1",
          title: "2.1 Oxygen Saturation (SpO2) and Pain Assessment",
          type: "content",
          content: `# 2.1 Oxygen Saturation (SpO2) and Pain Assessment\n\nOxygen saturation (SpO2) measures the percentage of hemoglobin binding sites in the bloodstream occupied by oxygen. Pain assessment is a subjective but critical vital sign that helps in managing patient comfort and identifying underlying issues.\n\n## Oxygen Saturation (SpO2):\n\n*   **Pulse Oximetry:** Non-invasive method using a probe on a finger or earlobe to estimate SpO2.\n*   **Normal Range:** Typically 95-100% on room air.\n*   **Clinical Significance:**\n    *   **Hypoxemia:** Low SpO2, indicating insufficient oxygen in the blood, can be caused by respiratory or cardiac issues.\n    *   **Factors Affecting Readings:** Nail polish, poor circulation, carbon monoxide poisoning.\n\n## Pain Assessment:\n\n*   **Subjectivity:** Pain is a personal experience; always believe the patient\"s report.\n*   **Pain Scales:**\n    *   **Numeric Rating Scale (NRS):** 0-10, where 0 is no pain and 10 is the worst possible pain.\n    *   **Wong-Baker Faces Pain Rating Scale:** Used for children or patients with communication barriers.\n    *   **FLACC Scale:** Used for non-verbal patients (Face, Legs, Activity, Cry, Consolability).\n*   **PQRST Mnemonic:** A systematic approach to pain assessment:\n    *   **P**rovokes: What causes or worsens the pain?\n    *   **Q**uality: What does the pain feel like (sharp, dull, throbbing)?\n    *   **R**adiates: Does the pain spread anywhere?\n    *   **S**everity: How severe is the pain (using a scale)?\n    *   **T**ime: When did the pain start? How long does it last?`,
          estimatedTime: 15,
        },
        {
          id: "vital-signs-2-2",
          title: "2.2 Recognizing Abnormal Vital Signs and Escalation",
          type: "content",
          content: `# 2.2 Recognizing Abnormal Vital Signs and Escalation\n\nRecognizing abnormal vital signs is crucial for early detection of patient deterioration. Prompt and appropriate escalation of care can prevent adverse outcomes.\n\n## Abnormal Vital Signs:\n\n*   **Temperature:** Fever (>38°C) or Hypothermia (<35°C).\n*   **Heart Rate:** Tachycardia (>100 bpm) or Bradycardia (<60 bpm).\n*   **Respiratory Rate:** Tachypnea (>20 breaths/min) or Bradypnea (<12 breaths/min).\n*   **Blood Pressure:** Hypertension (e.g., >140/90 mmHg) or Hypotension (e.g., <90/60 mmHg).\n*   **Oxygen Saturation:** Hypoxemia (<95% on room air).\n\n## Escalation of Care:\n\n*   **Early Warning Scores (EWS/NEWS):** Standardized tools that assign scores based on vital signs, indicating the severity of illness and guiding escalation.\n*   **Communication:** Use structured communication tools like SBAR (Situation, Background, Assessment, Recommendation) when reporting to medical staff.\n*   **Immediate Actions:**\n    *   Reassess vital signs frequently.\n    *   Administer oxygen if SpO2 is low.\n    *   Position the patient for comfort and optimal breathing.\n    *   Ensure IV access and fluid resuscitation if indicated.\n    *   Prepare for potential interventions (e.g., medications, further diagnostics).`,
          estimatedTime: 20,
        },
        {
          id: "vital-signs-2-3",
          title: "2.3 Case Study: Deteriorating Patient",
          type: "case-study",
          content: `\n# Case Study: 78-year-old with Deteriorating Vital Signs\n\n## Clinical Scenario\nA 78-year-old male, admitted for pneumonia, shows the following vital signs during your shift: Temp 38.8°C, HR 110 bpm, RR 28 breaths/min, BP 90/50 mmHg, SpO2 88% on room air. He is lethargic and disoriented.\n\n## Your Role\nAs the nurse, you need to interpret these vital signs, identify the urgency, and decide on the appropriate course of action.\n\n## Patient Background\n- History of COPD and heart failure\n- Admitted 3 days ago with community-acquired pneumonia\n- On IV antibiotics\n\n## Questions\n          `,
          estimatedTime: 25,
          caseQuestions: [
            {
              id: "case-vs-2-3-1",
              question: "Identify all abnormal vital signs and explain their potential significance in this patient.",
              sampleAnswer:
                "Temperature (38.8°C): Elevated, indicating fever, likely due to ongoing infection (pneumonia) or sepsis.\nHeart Rate (110 bpm): Tachycardia, could be a compensatory mechanism for hypoxemia, fever, or early shock.\nRespiratory Rate (28 breaths/min): Tachypnea, indicates respiratory distress, increased work of breathing due to pneumonia and hypoxemia.\nBlood Pressure (90/50 mmHg): Hypotension, concerning for hypovolemia, sepsis, or cardiogenic shock.\nOxygen Saturation (88% on room air): Hypoxemia, indicates inadequate oxygenation, consistent with severe pneumonia and COPD.",
              keyPoints: [
                "Systematic review of all vital signs.",
                "Relate each abnormal finding to the patient\"s underlying conditions.",
                "Consider compensatory mechanisms and signs of deterioration.",
              ],
            },
            {
              id: "case-vs-2-3-2",
              question: "What immediate actions would you take based on these findings?",
              sampleAnswer:
                "1. Administer supplemental oxygen to improve SpO2, aiming for target saturation.\n2. Elevate the head of the bed to ease breathing.\n3. Notify the medical team immediately (doctor/registrar) about the critical changes.\n4. Prepare for potential interventions (e.g., IV fluids for hypotension, further diagnostic tests).\n5. Continue close monitoring of vital signs and patient\"s consciousness level.",
              keyPoints: [
                "Prioritize ABCs (Airway, Breathing, Circulation).",
                "Prompt escalation to medical staff.",
                "Anticipate potential medical orders and prepare accordingly.",
                "Continuous reassessment.",
              ],
            },
          ],
        },
      ],
    },
  ],
};


