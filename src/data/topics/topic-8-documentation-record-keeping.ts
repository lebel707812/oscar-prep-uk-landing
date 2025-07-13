import { LearningTopic } from "../learning-content";
import { HeartPulse } from "lucide-react";

export const topic8: LearningTopic = {
  id: "topic-8-documentation",
  title: "Documentation & Record Keeping",
  description: "Essential principles and practices for accurate and legal documentation in healthcare.",
  icon: HeartPulse,
  slug: "documentation-record-keeping",
  totalEstimatedTime: 90,
  sessions: [
    {
      id: "documentation-1",
      title: "Session 1: Fundamentals of Healthcare Documentation",
      description: "Core principles, legal aspects, and standard formats for effective record keeping.",
      sections: [
        {
          id: "documentation-1-1",
          title: "1.1 Principles of Good Documentation",
          type: "content",
          content: `# Principles of Good Documentation\n\n## Learning Objectives\n- Understand the core principles of high-quality clinical documentation.\n- Recognize the legal and professional importance of accurate records.\n- Apply the principles of clarity, accuracy, and timeliness.\n\n## The Purpose of Healthcare Records\nHealthcare records serve multiple critical functions:\n\n- **Continuity of Care**: Ensures all members of the healthcare team have access to the same information.\n- **Legal Document**: Provides a legal record of the care provided.\n- **Communication**: Facilitates communication between healthcare professionals.\n- **Quality Assurance**: Used for audits, research, and improving patient care.\n- **Reimbursement**: Justifies billing for services.\n- **Patient Engagement**: Allows patients to be informed about their own care.\n\n## The 10 Cs of Good Documentation\n\n1.  **Clear**: Use legible handwriting or clear, unambiguous typed text. Avoid jargon and use standardized abbreviations only.\n2.  **Concise**: Be brief but complete. Avoid unnecessary words and repetition.\n3.  **Correct**: Ensure all information is accurate and factual. Distinguish between objective findings and subjective patient statements.\n4.  **Complete**: Include all relevant information. If it wasn\'t documented, it wasn\'t done.\n5.  **Contemporaneous**: Document as soon as possible after the event or observation. Include date and time for all entries.\n6.  **Chronological**: Record events in the order they occurred.\n7.  **Confidential**: Protect patient privacy and adhere to data protection regulations (e.g., GDPR).\n8.  **Collaborative**: Reflect the care provided by the entire multidisciplinary team.\n9.  **Client-Centred**: Focus on the patient\'s journey, needs, and outcomes.\n10. **Comprehensive**: Provide a full picture of the patient\'s condition, the care provided, and the patient\'s response.\n\n## Legal & Professional Accountability\n- **Accountability**: You are professionally and legally responsible for the care you document.\n- **Signature**: Every entry must be signed with your full name and professional designation.\n- **Corrections**: Never use correction fluid or obliterate an entry. Draw a single line through the error, write \"error,\" and initial it.\n- **Objectivity**: Document what you see, hear, and do. Avoid personal opinions or assumptions.\n\nRemember: Your documentation is a reflection of your professional practice. Strive for excellence in every entry.`,
          estimatedTime: 20,
        },
        {
          id: "documentation-1-2",
          title: "1.2 Common Documentation Formats (SOAP, SBAR)",
          type: "content",
          content: `# Common Documentation Formats\n\n## Learning Objectives\n- Understand and apply the SOAP and SBAR documentation formats.\n- Structure clinical notes for clarity and effective communication.\n- Adapt documentation style to different clinical contexts.\n\n## SOAP Notes\nSOAP is a structured method for documenting patient encounters. It is widely used in progress notes.\n\n### S - Subjective\n- The patient\'s main complaint or reason for the visit.\n- What the patient tells you (e.g., symptoms, feelings, concerns).\n- Often includes direct quotes.\n- **Example**: *\"Patient states, \'I have a sharp pain in my chest and I feel short of breath.\'\"*\n\n### O - Objective\n- Factual, measurable, and observable data.\n- Vital signs, physical exam findings, laboratory results, imaging reports.\n- **Example**: *\"BP 150/95, HR 110, RR 24, SpO2 92% on room air. Wheezing heard in both lungs on auscultation.\"*\n\n### A - Assessment\n- Your professional judgment or diagnosis of the patient\'s problem.\n- Can be a definitive diagnosis, a differential diagnosis, or a problem list.\n- **Example**: *\"Acute exacerbation of asthma secondary to respiratory infection.\"*\n\n### P - Plan\n- The course of action to address the patient\'s problem.\n- Includes treatments, medications, further tests, patient education, and follow-up.\n- **Example**: *\"1. Administer nebulized salbutamol. 2. Obtain chest X-ray. 3. Start course of oral antibiotics. 4. Educate patient on inhaler technique. 5. Review in 24 hours.\"*\n\n## SBAR Framework\nSBAR is a communication tool used to frame conversations, especially during handovers or when escalating concerns.\n\n### S - Situation\n- A concise statement of the problem.\n- **Example**: *\"Dr. Jones, this is Nurse Smith on Ward 5. I am calling about Mr. John Doe in Room 201, who has become acutely short of breath.\"*\n\n### B - Background\n- Relevant background information related to the situation.\n- **Example**: *\"Mr. Doe is a 68-year-old male admitted yesterday for pneumonia. He has a history of COPD.\"*\n\n### A - Assessment\n- Your assessment of the situation.\n- **Example**: *\"His vital signs are unstable: BP has dropped to 90/50, HR is 120, RR is 30, and SpO2 is 88% on 4L of oxygen. I think he is developing septic shock.\"*\n\n### R - Recommendation\n- What you recommend or what you need from the other person.\n- **Example**: *\"I recommend you come to see the patient immediately. Do you want me to start a fluid bolus while I wait for you?\"*\n\n## Choosing the Right Format\n- **SOAP**: Ideal for structuring progress notes and documenting individual patient encounters.\n- **SBAR**: Best for verbal communication, handovers, and urgent escalations to ensure critical information is conveyed clearly and concisely.\n\nRemember: Using structured formats improves communication, reduces errors, and enhances patient safety.`,
          estimatedTime: 25,
        },
        {
          id: "documentation-1-3",
          title: "1.3 Assessment Quiz: Documentation Fundamentals",
          type: "quiz",
          content: "Test your knowledge of fundamental documentation principles and formats.",
          estimatedTime: 15,
          quizQuestions: [
            {
              id: "q-doc-1-1",
              question: "Which of the following is a key principle of good documentation?",
              options: [
                "Using as much medical jargon as possible",
                "Documenting at the end of your shift to save time",
                "Ensuring entries are contemporaneous and accurate",
                "Sharing your password with colleagues for efficiency"
              ],
              correctAnswer: 2,
              explanation: "Good documentation must be contemporaneous (recorded at the time of the event) and accurate to ensure a reliable legal and clinical record."
            },
            {
              id: "q-doc-1-2",
              question: "In the SOAP format, where would you document a patient\'s vital signs?",
              options: [
                "Subjective",
                "Objective",
                "Assessment",
                "Plan"
              ],
              correctAnswer: 1,
              explanation: "Vital signs are measurable, factual data, so they belong in the \'Objective\' section of a SOAP note."
            },
            {
              id: "q-doc-1-3",
              question: "What is the correct way to fix an error in handwritten notes?",
              options: [
                "Use correction fluid to cover the mistake",
                "Scribble over the error so it is unreadable",
                "Draw a single line through the error, write \'error\', and initial it",
                "Tear out the page and start again"
              ],
              correctAnswer: 2,
              explanation: "The legally accepted method is to draw a single line through the error, write \'error\' or \'mistaken entry,\' and add your initials and the date. This maintains the integrity of the record."
            }
          ]
        }
      ]
    }
  ]
};

