import { LearningTopic } from "../learning-content";
import { Heart } from "lucide-react";

export const topic2: LearningTopic = {
  id: "topic-2",
  title: "Physical Examination",
  description: "Master systematic physical examination techniques and clinical assessment skills.",
  icon: Heart,
  slug: "physical-examination-techniques",
  totalEstimatedTime: 110,
  sessions: [
    {
      id: "physical-exam-1",
      title: "Session 1: Basic Physical Examination Techniques (Beginner)",
      description: "Foundation skills for systematic physical examination and clinical assessment.",
      sections: [
        {
          id: "physical-exam-1-1",
          title: "1.1 General Examination Principles",
          type: "content",
          content: `# General Examination Principles

## Introduction to Physical Examination
Physical examination is a fundamental clinical skill that involves systematic assessment of a patient's body to identify signs of disease or health. It follows history taking and guides further investigations and treatment decisions.

## The Four Pillars of Physical Examination
**Inspection**: Visual examination and observation of the patient
**Palpation**: Using hands to feel for abnormalities
**Percussion**: Tapping to assess underlying structures
**Auscultation**: Listening with a stethoscope

## General Approach
Always introduce yourself and explain what you will be doing. Ensure patient comfort, dignity, and obtain consent. Wash your hands before and after examination. Use appropriate lighting and positioning.

## Systematic Approach
Follow a head-to-toe approach or system-by-system examination. Be thorough but efficient. Compare left and right sides. Document findings accurately and objectively.`,
          estimatedTime: 10,
        },
        {
          id: "physical-exam-1-2",
          title: "1.2 Vital Signs Assessment",
          type: "content",
          content: `# Vital Signs Assessment

## Core Vital Signs
The four essential vital signs are temperature, pulse, blood pressure, and respiratory rate. These provide crucial information about a patient's physiological status.

## Temperature
Normal range: 36.1-37.2°C (97-99°F). Check route used (oral, axillary, tympanic). Note factors affecting temperature: time of day, activity, environment.

## Pulse Assessment
Normal resting rate: 60-100 beats per minute. Assess rate, rhythm, and character. Check for regularity, strength, and any abnormal findings.

## Blood Pressure
Normal: <120/80 mmHg. Use appropriate cuff size. Position patient correctly. Take multiple readings if abnormal. Note differences between arms if indicated.

## Respiratory Rate
Normal: 12-20 breaths per minute in adults. Count for full minute. Observe depth, rhythm, and effort. Note use of accessory muscles or abnormal patterns.`,
          estimatedTime: 15,
        },
        {
          id: "physical-exam-1-3",
          title: "1.3 Practice Quiz: Basic Examination Skills",
          type: "quiz",
          content: "Test your understanding of basic physical examination principles and vital signs assessment.",
          estimatedTime: 15,
          quizQuestions: [
            {
              id: "q-phys-1-1",
              question: "What is the correct order of physical examination techniques?",
              options: [
                "Palpation, Inspection, Percussion, Auscultation",
                "Inspection, Palpation, Percussion, Auscultation",
                "Auscultation, Palpation, Inspection, Percussion",
                "Percussion, Auscultation, Inspection, Palpation"
              ],
              correctAnswer: 1,
              explanation: "The correct order is Inspection, Palpation, Percussion, Auscultation - remember 'IPPA' as a helpful mnemonic."
            },
            {
              id: "q-phys-1-2",
              question: "What is the normal resting heart rate range for adults?",
              options: [
                "50-80 beats per minute",
                "60-100 beats per minute",
                "70-110 beats per minute",
                "80-120 beats per minute"
              ],
              correctAnswer: 1,
              explanation: "The normal resting heart rate for adults is 60-100 beats per minute, though trained athletes may have lower rates."
            },
            {
              id: "q-phys-1-3",
              question: "Which blood pressure reading is considered normal?",
              options: [
                "140/90 mmHg",
                "130/85 mmHg",
                "115/75 mmHg",
                "125/80 mmHg"
              ],
              correctAnswer: 2,
              explanation: "115/75 mmHg is within the normal range. Normal blood pressure is typically below 120/80 mmHg."
            }
          ]
        }
      ]
    },
    {
      id: "physical-exam-2",
      title: "Session 2: System-Specific Examinations (Intermediate)",
      description: "Developing skills for examining specific body systems with confidence and accuracy.",
      sections: [
        {
          id: "physical-exam-2-1",
          title: "2.1 Cardiovascular Examination",
          type: "content",
          content: `# Cardiovascular Examination

## Systematic Approach
Position patient at 45 degrees. Expose chest appropriately whilst maintaining dignity. Ensure good lighting and quiet environment for auscultation.

## Inspection
Look for cyanosis, pallor, finger clubbing, splinter haemorrhages. Observe chest wall for scars, pulsations, or deformities. Check for signs of heart failure.

## Palpation
Feel for apex beat (normally 5th intercostal space, mid-clavicular line). Assess character and location. Palpate for thrills, heaves, or parasternal impulses.

## Auscultation Areas
Aortic area: 2nd intercostal space, right sternal edge
Pulmonary area: 2nd intercostal space, left sternal edge
Tricuspid area: Lower left sternal edge
Mitral area: Apex beat

## Heart Sounds
S1 ('lub'): Closure of mitral and tricuspid valves
S2 ('dub'): Closure of aortic and pulmonary valves
Listen for murmurs, extra sounds, and rhythm irregularities`,
          estimatedTime: 20,
        },
        {
          id: "physical-exam-2-2",
          title: "2.2 Respiratory Examination",
          type: "content",
          content: `# Respiratory Examination

## Patient Positioning
Position patient sitting upright or at 45 degrees. Ensure adequate exposure of chest whilst maintaining dignity and warmth.

## Inspection
Observe respiratory rate, rhythm, and depth. Look for use of accessory muscles, chest wall deformities, scars, or asymmetrical movement.

## Palpation
Check chest expansion by placing hands on lower chest. Feel for tracheal position, tactile fremitus, and any masses or tenderness.

## Percussion
Percuss systematically across chest comparing both sides. Normal lung gives resonant note. Dullness suggests consolidation or effusion.

## Auscultation
Listen to breath sounds using diaphragm of stethoscope. Normal breath sounds are vesicular. Note any added sounds: wheeze, crackles, or pleural rub.

## Additional Assessments
Check for lymphadenopathy, clubbing, and peripheral oedema. Assess oxygen saturation if indicated.`,
          estimatedTime: 20,
        },
        {
          id: "physical-exam-2-3",
          title: "2.3 Interactive Case Study: Chest Pain Assessment",
          type: "case-study",
          content: `
# Case Study: 45-year-old with Chest Discomfort

## Clinical Scenario
A 45-year-old teacher presents to the clinic with chest discomfort that has been present for the past week. She describes it as a 'tight' feeling that occurs mainly when climbing stairs. She has a history of high cholesterol and her father had a heart attack at age 50.

## Your Role
You are the nurse practitioner conducting the physical examination. You need to perform a systematic cardiovascular and respiratory examination to assess her symptoms.

## Initial Observations
The patient appears comfortable at rest but mentions feeling slightly short of breath when walking up two flights of stairs. Vital signs: BP 145/92, HR 78, RR 16, Temp 36.8°C.

## Physical Examination Findings
On inspection, no obvious distress at rest. No finger clubbing or peripheral cyanosis noted.
          `,
          estimatedTime: 25,
          caseQuestions: [
            {
              id: "case-phys-2-3-1",
              question: "What specific cardiovascular examination techniques would you prioritise given this presentation?",
              sampleAnswer: "I would focus on: Palpation of the apex beat to assess position and character. Auscultation of all four heart areas listening for murmurs, extra sounds, or gallops. Assessment for signs of heart failure including pedal oedema, elevated JVP, and lung bases for crackles. Peripheral pulse examination including carotid, radial, and pedal pulses. Blood pressure measurement in both arms if indicated.",
              keyPoints: [
                "Systematic approach to cardiac auscultation",
                "Assessment for heart failure signs",
                "Peripheral pulse examination",
                "Appropriate positioning for examination",
                "Consider cardiac risk factors"
              ]
            },
            {
              id: "case-phys-2-3-2",
              question: "How would you assess for exercise-related symptoms during the examination?",
              sampleAnswer: "I would ask the patient to demonstrate what brings on her symptoms by having her walk around the room or climb a few steps if safe to do so. Monitor her vital signs before, during, and after light exertion. Look for signs of distress, changes in respiratory rate, or colour changes. Assess if symptoms are reproducible and note recovery time.",
              keyPoints: [
                "Safe exercise provocation testing",
                "Monitoring vital signs during exertion",
                "Observing for physical signs of distress",
                "Assessing symptom reproducibility",
                "Patient safety throughout assessment"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "physical-exam-3",
      title: "Session 3: Advanced Examination Skills (Advanced)",
      description: "Mastering complex examination techniques and integrating findings for clinical decision-making.",
      sections: [
        {
          id: "physical-exam-3-1",
          title: "3.1 Neurological Examination",
          type: "content",
          content: `# Neurological Examination

## Mental State Assessment
Assess consciousness level using AVPU or Glasgow Coma Scale. Evaluate orientation to time, place, and person. Test attention, memory, and higher cognitive functions as appropriate.

## Cranial Nerve Examination
Systematically examine all 12 cranial nerves:
CN I (Olfactory): Rarely tested clinically
CN II (Optic): Visual acuity, visual fields, pupillary reflexes
CN III, IV, VI (Oculomotor, Trochlear, Abducens): Eye movements, ptosis
CN V (Trigeminal): Facial sensation, jaw muscles
CN VII (Facial): Facial muscles, taste
CN VIII (Vestibulocochlear): Hearing, balance

## Motor Examination
Inspect for muscle wasting, fasciculations, or involuntary movements. Test muscle tone, power (0-5 scale), and coordination. Assess gait and balance.

## Sensory Examination
Test light touch, pain, vibration, and proprioception. Compare both sides and test in dermatomal distribution if indicated.

## Reflexes
Test deep tendon reflexes: biceps, triceps, supinator, knee, ankle. Grade 0-4+. Check plantar reflexes (Babinski sign).`,
          estimatedTime: 25,
        },
        {
          id: "physical-exam-3-2",
          title: "3.2 Abdominal Examination",
          type: "content",
          content: `# Abdominal Examination

## Patient Preparation
Position patient supine with head slightly elevated. Expose abdomen from xiphisternum to symphysis pubis. Ensure warmth and privacy.

## Inspection
Look at shape, symmetry, distension, visible peristalsis, scars, or skin changes. Note any masses, hernias, or pulsations.

## Auscultation
Listen to bowel sounds in all four quadrants before palpation. Normal sounds occur every 5-10 seconds. Note absent, increased, or abnormal sounds.

## Palpation Technique
Start with light palpation in all quadrants, watching patient's face for discomfort. Progress to deeper palpation to assess for masses, organomegaly, or tenderness.

## Specific Techniques
Palpate for liver edge, spleen, kidneys, and aortic pulsation. Test for rebound tenderness if peritonism suspected. Examine hernial orifices.

## Special Tests
Murphy's sign for cholecystitis, McBurney's point for appendicitis, shifting dullness for ascites. Perform rectal examination if clinically indicated.`,
          estimatedTime: 20,
        },
        {
          id: "physical-exam-3-3",
          title: "3.3 Comprehensive Assessment Quiz",
          type: "quiz",
          content: "Test your mastery of advanced physical examination techniques and clinical reasoning skills.",
          estimatedTime: 20,
          quizQuestions: [
            {
              id: "q-adv-phys-1",
              question: "When examining the abdomen, what is the correct sequence of examination techniques?",
              options: [
                "Inspection, Palpation, Percussion, Auscultation",
                "Inspection, Auscultation, Percussion, Palpation",
                "Auscultation, Inspection, Palpation, Percussion",
                "Inspection, Auscultation, Palpation, Percussion"
              ],
              correctAnswer: 3,
              explanation: "For abdominal examination, auscultation should be performed before palpation to avoid altering bowel sounds."
            },
            {
              id: "q-adv-phys-2",
              question: "What does a positive Babinski sign indicate?",
              options: [
                "Normal plantar reflex",
                "Upper motor neurone lesion",
                "Lower motor neurone lesion",
                "Peripheral neuropathy"
              ],
              correctAnswer: 1,
              explanation: "A positive Babinski sign (upgoing plantar reflex) indicates an upper motor neurone lesion in adults."
            },
            {
              id: "q-adv-phys-3",
              question: "Which percussion note would you expect over a pleural effusion?",
              options: [
                "Resonant",
                "Hyperresonant",
                "Dull",
                "Tympanic"
              ],
              correctAnswer: 2,
              explanation: "Pleural effusion produces a dull percussion note due to fluid in the pleural space."
            },
            {
              id: "q-adv-phys-4",
              question: "What is the most appropriate action if you detect an irregular heart rhythm during examination?",
              options: [
                "Ignore it if patient feels well",
                "Count the pulse for 15 seconds and multiply by 4",
                "Count for a full minute and document findings",
                "Immediately call for emergency assistance"
              ],
              correctAnswer: 2,
              explanation: "Irregular rhythms require counting for a full minute for accuracy and proper documentation for further assessment."
            },
            {
              id: "q-adv-phys-5",
              question: "When should you avoid deep palpation during abdominal examination?",
              options: [
                "If patient is anxious",
                "In suspected appendicitis or abdominal aneurysm",
                "If patient has had recent surgery",
                "In elderly patients"
              ],
              correctAnswer: 1,
              explanation: "Deep palpation should be avoided in suspected appendicitis (risk of perforation) or abdominal aneurysm (risk of rupture)."
            }
          ]
        }
      ]
    }
  ]
};
