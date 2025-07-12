import { LearningTopic } from "../learning-content";
import { Cross } from "lucide-react";

export const topic6: LearningTopic = {
  id: "topic-6",
  title: "Emergency Procedures & CPR",
  description: "Mastering essential emergency procedures and CPR techniques for critical situations.",
  icon: Cross,
  slug: "emergency-procedures-cpr",
  totalEstimatedTime: 105, // Will update after adding content
  sessions: [
    {
      id: "emergency-cpr-1",
      title: "Session 1: Basic Life Support (BLS) Principles",
      description: "Understand the fundamental concepts of BLS and initial assessment.",
      sections: [
        {
          id: "emergency-cpr-1-1",
          title: "1.1 Recognizing Emergencies and Scene Safety",
          type: "content",
          content: `# 1.1 Recognizing Emergencies and Scene Safety

In any emergency situation, your first priority is to ensure safety – for yourself, the victim, and bystanders. Recognizing an emergency quickly and assessing the scene for potential hazards are critical steps before providing any aid.

## Recognizing an Emergency:

*   **Unresponsiveness:** Victim does not respond to verbal or tactile stimuli.
*   **Abnormal Breathing:** No breathing, gasping, or irregular breathing.
*   **Severe Bleeding:** Visible, profuse bleeding.
*   **Sudden Collapse:** Unexplained fall or loss of consciousness.
*   **Chest Pain:** Persistent chest discomfort, especially with other symptoms like shortness of breath.
*   **Choking:** Inability to speak, cough, or breathe.

## Scene Safety:

Before approaching a victim, always perform a quick scene assessment to identify and mitigate potential dangers. This includes:

*   **Traffic:** On roads, ensure traffic is stopped or diverted.
*   **Fire/Smoke:** Do not enter burning buildings or areas with heavy smoke.
*   **Electricity:** Avoid downed power lines or exposed electrical wires.
*   **Hazardous Materials:** Look for spills, fumes, or suspicious containers.
*   **Violence:** Be aware of potential threats from people or animals.
*   **Unstable Structures:** Avoid areas with risk of collapse.

If the scene is unsafe, do not enter. Call for professional help (e.g., emergency services, fire department) and wait for them to secure the area. Your safety is paramount.`,
          estimatedTime: 10,
        },
        {
          id: "emergency-cpr-1-2",
          title: "1.2 Adult CPR: Compressions, Airway, Breathing",
          type: "content",
          content: `# 1.2 Adult CPR: Compressions, Airway, Breathing

Cardiopulmonary Resuscitation (CPR) is a life-saving technique that combines chest compressions with artificial ventilation (rescue breaths) to maintain blood circulation and oxygenation in individuals experiencing cardiac arrest.

## Adult CPR Steps (DRSABCD):

*   **D - Danger:** Check for dangers to yourself, others, and the patient.
*   **R - Response:** Check for response (shout, tap shoulders). If no response, call for help.
*   **S - Send for Help:** Call emergency services immediately (e.g., 999 in the UK, 911 in the US).
*   **A - Airway:** Open the airway (head tilt, chin lift).
*   **B - Breathing:** Check for normal breathing (look, listen, feel for no more than 10 seconds). If not breathing normally, start CPR.
*   **C - Compressions:** Start chest compressions:
    *   **Hand Placement:** Center of the chest, lower half of the breastbone.
    *   **Depth:** At least 2 inches (5 cm) but no more than 2.4 inches (6 cm).
    *   **Rate:** 100-120 compressions per minute.
    *   **Recoil:** Allow complete chest recoil after each compression.
*   **D - Defibrillation:** Attach and follow prompts of an Automated External Defibrillator (AED) as soon as it is available.

## Compression-to-Ventilation Ratio:

*   **Single Rescuer:** 30 compressions to 2 breaths (30:2).
*   **Two Rescuers:** 30 compressions to 2 breaths (30:2) for adults.

## Rescue Breaths:

*   Ensure airway is open.
*   Pinch the nose shut.
*   Give a breath over 1 second, making the chest rise.
*   Give a second breath.`,
          estimatedTime: 25,
        },
        {
          id: "emergency-cpr-1-3",
          title: "1.3 Quiz: BLS Fundamentals",
          type: "quiz",
          content: "Test your knowledge on basic life support principles.",
          estimatedTime: 10,
          quizQuestions: [
            {
              id: "q-epc-1-1",
              question: "What is the first step when encountering an unconscious person?",
              options: [
                "Call for help",
                "Check for breathing",
                "Ensure scene safety",
                "Start chest compressions",
              ],
              correctAnswer: 2,
              explanation: "Ensuring scene safety is always the first priority to protect yourself and the victim.",
            },
            {
              id: "q-epc-1-2",
              question: "What is the recommended compression depth for adult CPR?",
              options: [
                "1-1.5 inches",
                "1.5-2 inches",
                "2-2.4 inches",
                "More than 2.4 inches",
              ],
              correctAnswer: 2,
              explanation: "The recommended compression depth for adult CPR is 2-2.4 inches (5-6 cm).",
            },
          ],
        },
      ],
    },
    {
      id: "emergency-cpr-2",
      title: "Session 2: Advanced Emergency Interventions",
      description: "Explore advanced techniques and considerations in emergency care.",
      sections: [
        {
          id: "emergency-cpr-2-1",
          title: "2.1 Child and Infant CPR",
          type: "content",
          content: `# 2.1 Child and Infant CPR

CPR techniques vary slightly for children and infants due to their anatomical and physiological differences. It's crucial to adapt your approach to ensure effective and safe resuscitation.

## Child CPR (1 year to puberty):

*   **Compression Depth:** Approximately 2 inches (5 cm).
*   **Compression Rate:** 100-120 compressions per minute.
*   **Hand Placement:** One or two hands on the lower half of the breastbone.
*   **Compression-to-Ventilation Ratio:** 30:2 for single rescuer; 15:2 for two rescuers.
*   **Rescue Breaths:** Give breaths that make the chest rise visibly.

## Infant CPR (Birth to 1 year):

*   **Compression Depth:** Approximately 1.5 inches (4 cm).
*   **Compression Rate:** 100-120 compressions per minute.
*   **Hand Placement:** Two fingers in the center of the chest, just below the nipple line.
*   **Compression-to-Ventilation Ratio:** 30:2 for single rescuer; 15:2 for two rescuers.
*   **Rescue Breaths:** Give gentle puffs of air, just enough to make the chest rise visibly.

## Key Differences from Adult CPR:

*   **Cause of Arrest:** Often respiratory arrest in children/infants, leading to cardiac arrest.
*   **Initial Action:** For children/infants, if you are alone and did not witness the collapse, perform 2 minutes of CPR before calling emergency services.
*   **Compression Technique:** Use less force and different hand placements.`,
          estimatedTime: 20,
        },
        {
          id: "emergency-cpr-2-2",
          title: "2.2 Choking Management for Adults, Children, and Infants",
          type: "content",
          content: `# 2.2 Choking Management for Adults, Children, and Infants

Choking occurs when a foreign object blocks the airway, preventing air from entering the lungs. Prompt and effective intervention is crucial to clear the obstruction.

## Recognizing Choking:

*   **Mild Choking:** Person can still cough, speak, or breathe. Encourage them to cough.
*   **Severe Choking:** Person cannot cough, speak, or breathe; may make high-pitched noises or grasp their throat.

## Choking Management (Conscious Adult/Child):

*   **Back Blows:** Give 5 sharp blows with the heel of your hand between the shoulder blades.
*   **Abdominal Thrusts (Heimlich Maneuver):** If back blows are ineffective, perform 5 abdominal thrusts.
    *   Stand behind the person, wrap your arms around their waist.
    *   Place a fist just above the navel, thumb side in.
    *   Grasp your fist with your other hand.
    *   Deliver quick, upward thrusts.
*   **Repeat:** Continue alternating 5 back blows and 5 abdominal thrusts until the object is expelled or the person becomes unconscious.

## Choking Management (Conscious Infant):

*   **Position:** Support the infant face down on your forearm, head lower than chest.
*   **Back Blows:** Deliver 5 back blows between the shoulder blades.
*   **Chest Thrusts:** Turn the infant face up on your other forearm, supporting the head. Deliver 5 chest thrusts (similar to CPR compressions, but sharper and quicker).
*   **Repeat:** Continue alternating 5 back blows and 5 chest thrusts.

## If Person Becomes Unconscious:

*   Lower them gently to the ground.
*   Begin CPR, starting with chest compressions.
*   Before giving rescue breaths, look inside the mouth for the object and remove it if visible.`,
          estimatedTime: 15,
        },
        {
          id: "emergency-cpr-2-3",
          title: "2.3 Case Study: Pediatric Emergency",
          type: "case-study",
          content: `
# Case Study: 2-year-old with Choking Episode

## Clinical Scenario
A 2-year-old child suddenly starts choking while eating grapes. The child is conscious but unable to cough or make any sounds.

## Your Role
As a first responder, you need to quickly assess the situation and perform appropriate choking management techniques.

## Patient Background
- Healthy 2-year-old
- No known allergies or medical conditions

## Questions
          `,
          estimatedTime: 25,
          caseQuestions: [
            {
              id: "case-epc-2-3-1",
              question: "What immediate actions would you take for this choking child?",
              sampleAnswer:
                "1. Confirm severe choking: inability to cough, speak, or breathe.\n2. Deliver 5 back blows between the shoulder blades.\n3. Deliver 5 abdominal thrusts (Heimlich maneuver).\n4. Repeat cycles of 5 back blows and 5 abdominal thrusts until the obstruction is cleared or the child becomes unconscious.",
              keyPoints: [
                "Recognize severe choking.",
                "Proper technique for back blows and abdominal thrusts.",
                "Continuous assessment and repetition of maneuvers.",
              ],
            },
            {
              id: "case-epc-2-3-2",
              question: "What would you do if the child becomes unconscious?",
              sampleAnswer:
                "1. Gently lower the child to the ground.\n2. Begin CPR, starting with chest compressions.\n3. Before delivering rescue breaths, look for the foreign object in the mouth and remove it if visible.\n4. Continue CPR until help arrives or the child recovers.",
              keyPoints: [
                "Initiate CPR immediately.",
                "Check for visible foreign body before breaths.",
                "Call for emergency medical services if not already done.",
              ],
            },
          ],
        },
      ],
    },
  ],
};


