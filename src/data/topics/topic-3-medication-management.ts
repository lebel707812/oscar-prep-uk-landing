import { LearningTopic } from "../learning-content";
import { Pill } from "lucide-react";

export const topic3: LearningTopic = {
  id: "topic-3",
  title: "Medication Management & Calculations",
  description: "Master drug calculations, administration safety, and medication management protocols.",
  icon: Pill,
  slug: "medication-management-calculations",
  totalEstimatedTime: 115,
  sessions: [
    {
      id: "medication-mgmt-1",
      title: "Session 1: Basic Medication Principles (Beginner)",
      description: "Foundation knowledge of drug types, routes, and basic safety principles.",
      sections: [
        {
          id: "medication-mgmt-1-1",
          title: "1.1 Medication Administration Rights",
          type: "content",
          content: `# The Six Rights of Medication Administration

## Core Safety Principles
The six rights form the foundation of safe medication practice: Right Patient, Right Drug, Right Dose, Right Route, Right Time, and Right Documentation.

## Right Patient
Always verify patient identity using two identifiers (name, date of birth, hospital number). Check patient wristband and ask patient to state their name. Never assume identity.

## Right Drug
Check medication name carefully - many drugs have similar names. Verify against prescription and medication administration record (MAR). Be aware of look-alike, sound-alike medications.

## Right Dose
Calculate doses accurately using appropriate formulas. Double-check calculations, especially for high-risk medications. Use calculators when necessary and have calculations verified by colleague when required.

## Right Route
Ensure correct administration route (oral, intravenous, intramuscular, topical). Some medications can only be given via specific routes. Never change route without prescriber authorization.

## Right Time
Administer medications at prescribed times. Understand acceptable time windows for different medication types. Consider medication interactions and timing requirements.

## Right Documentation
Document immediately after administration. Record time, dose, route, and any patient response. Never pre-document. Sign all entries clearly.`,
          estimatedTime: 15,
        },
        {
          id: "medication-mgmt-1-2",
          title: "1.2 Drug Classifications and Routes",
          type: "content",
          content: `# Drug Classifications and Administration Routes

## Major Drug Classifications
**Analgesics**: Pain relief medications (paracetamol, morphine, ibuprofen)
**Antibiotics**: Infection treatment (penicillin, amoxicillin, flucloxacillin)
**Cardiovascular**: Heart and circulation (digoxin, furosemide, atenolol)
**Respiratory**: Breathing support (salbutamol, prednisolone, oxygen)

## Common Administration Routes
**Oral (PO)**: Most common, safest route. Patient must be able to swallow safely.
**Intravenous (IV)**: Direct into bloodstream, fastest action, highest risk.
**Intramuscular (IM)**: Into muscle tissue, good absorption.
**Subcutaneous (SC)**: Under skin, slower absorption.
**Topical**: Applied to skin surface.

## Route Selection Factors
Consider patient condition, drug properties, onset time required, and patient preferences. Always follow prescription specifications exactly.

## Safety Considerations
Each route has specific risks and contraindications. IV medications require special precautions. Some drugs cannot be given via certain routes.`,
          estimatedTime: 15,
        },
        {
          id: "medication-mgmt-1-3",
          title: "1.3 Practice Quiz: Medication Basics",
          type: "quiz",
          content: "Test your understanding of fundamental medication administration principles and safety practices.",
          estimatedTime: 15,
          quizQuestions: [
            {
              id: "q-med-1-1",
              question: "What are the six rights of medication administration?",
              options: [
                "Patient, Drug, Dose, Route, Time, Documentation",
                "Patient, Drug, Dose, Doctor, Time, Documentation", 
                "Patient, Drug, Dose, Route, Temperature, Documentation",
                "Patient, Diagnosis, Dose, Route, Time, Documentation"
              ],
              correctAnswer: 0,
              explanation: "The six rights are: Right Patient, Right Drug, Right Dose, Right Route, Right Time, and Right Documentation."
            },
            {
              id: "q-med-1-2",
              question: "Which identifiers should be used to verify patient identity?",
              options: [
                "Name and room number",
                "Name and date of birth", 
                "Date of birth and diagnosis",
                "Name and consultant"
              ],
              correctAnswer: 1,
              explanation: "Two patient identifiers should be used: full name and date of birth (or hospital number). Room numbers can change."
            },
            {
              id: "q-med-1-3",
              question: "When should medication administration be documented?",
              options: [
                "Before giving the medication",
                "Immediately after administration",
                "At the end of the shift",
                "When convenient during the day"
              ],
              correctAnswer: 1,
              explanation: "Documentation should occur immediately after administration to ensure accuracy and prevent double-dosing."
            }
          ]
        }
      ]
    },
    {
      id: "medication-mgmt-2",
      title: "Session 2: Drug Calculations and Dosing (Intermediate)",
      description: "Developing skills in medication calculations, dosing principles, and high-risk medications.",
      sections: [
        {
          id: "medication-mgmt-2-1",
          title: "2.1 Basic Drug Calculations",
          type: "content",
          content: `# Medication Calculation Fundamentals

## Essential Formulas
**Basic Formula**: Dose Required ÷ Dose Available × Volume = Volume to Give
**Percentage Strength**: Grams of drug per 100ml of solution
**Parts per Million**: Micrograms per ml (1ppm = 1 microgram/ml)

## Unit Conversions
**Weight**: 1 gram = 1000 milligrams = 1,000,000 micrograms
**Volume**: 1 litre = 1000 millilitres
**Percentage to mg/ml**: 1% = 10mg/ml

## Worked Examples
If you have 250mg tablets and need to give 500mg:
500mg ÷ 250mg × 1 tablet = 2 tablets

For liquid medications with 125mg in 5ml, to give 250mg:
250mg ÷ 125mg × 5ml = 10ml

## Paediatric Calculations
Often based on body weight (mg/kg) or body surface area. Always double-check paediatric calculations with another qualified nurse.

## Safety Tips
Always show your working. Use a calculator for complex calculations. Have high-risk calculations checked by a colleague. Round sensibly for practical administration.`,
          estimatedTime: 20,
        },
        {
          id: "medication-mgmt-2-2",
          title: "2.2 Intravenous Infusion Calculations",
          type: "content",
          content: `# IV Infusion Rate Calculations

## Basic Infusion Formula
**Rate (ml/hr)** = Volume to be infused (ml) ÷ Time (hours)
**Drops per minute** = (Volume × Drop factor) ÷ (Time in minutes)

## Common Drop Factors
**Standard giving set**: 20 drops/ml
**Blood giving set**: 15 drops/ml  
**Paediatric giving set**: 60 drops/ml

## Calculating Infusion Times
To find infusion time: Volume ÷ Rate = Time (hours)
Example: 1000ml saline at 125ml/hr = 1000 ÷ 125 = 8 hours

## Drug Infusion Calculations
For continuous infusions, calculate concentration first:
Total drug amount ÷ Total volume = Concentration
Then: Desired dose ÷ Concentration = Required rate

## Pump Programming
Modern pumps use ml/hr rates. Always double-check pump settings. Understand your pump's alarm systems and safety features.

## Safety Considerations
Never guess at infusion rates. Always calculate and verify. Monitor patient response continuously during IV therapy.`,
          estimatedTime: 20,
        },
        {
          id: "medication-mgmt-2-3",
          title: "2.3 Interactive Case Study: Insulin Administration",
          type: "case-study",
          content: `
# Case Study: Diabetic Patient Requiring Insulin

## Clinical Scenario
Mrs. Johnson, a 65-year-old with Type 2 diabetes, has been admitted with poor glycaemic control. Her blood glucose is 18.5 mmol/L. The doctor has prescribed a sliding scale insulin regime using Actrapid insulin.

## Prescription Details
Blood glucose 10-15 mmol/L: Give 4 units Actrapid subcutaneously
Blood glucose 15.1-20 mmol/L: Give 6 units Actrapid subcutaneously  
Blood glucose >20 mmol/L: Give 8 units Actrapid subcutaneously
Check blood glucose in 1 hour

## Available Equipment
Actrapid insulin 100 units/ml in 10ml vial
1ml insulin syringes graduated in units
Blood glucose monitoring equipment

## Patient Information
Mrs. Johnson weighs 75kg, is alert and cooperative. She has been nil by mouth since midnight for a procedure this morning.
          `,
          estimatedTime: 25,
          caseQuestions: [
            {
              id: "case-med-2-3-1",
              question: "How many units of insulin should Mrs. Johnson receive, and what safety checks must you perform?",
              sampleAnswer: "Mrs. Johnson's blood glucose is 18.5 mmol/L, which falls in the 15.1-20 mmol/L range, so she needs 6 units of Actrapid. Safety checks: verify patient identity using two identifiers, check prescription against drug chart, check insulin type and strength (Actrapid 100 units/ml), check expiry date, draw up exactly 6 units using insulin syringe, have second nurse check calculation and drawn dose, choose appropriate injection site, document administration immediately.",
              keyPoints: [
                "Correct dose calculation based on blood glucose level",
                "Two-person checking for insulin administration",
                "Proper use of insulin syringe and concentration",
                "Appropriate injection site selection",
                "Complete documentation requirements"
              ]
            },
            {
              id: "case-med-2-3-2",
              question: "What monitoring and follow-up actions are required after insulin administration?",
              sampleAnswer: "After giving insulin: document time of administration and blood glucose level, set alarm to recheck blood glucose in 1 hour as prescribed, monitor patient for signs of hypoglycaemia (sweating, confusion, tremor, tachycardia), ensure patient understands to report any symptoms immediately, prepare for potential need for further insulin or glucose depending on next reading, document patient response and any side effects observed.",
              keyPoints: [
                "Timely blood glucose monitoring as prescribed",
                "Recognition of hypoglycaemia symptoms",
                "Patient education about symptoms to report",
                "Preparation for next intervention based on results",
                "Continuous monitoring and documentation"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "medication-mgmt-3",
      title: "Session 3: Advanced Medication Management (Advanced)",
      description: "Mastering complex medication scenarios, interactions, and high-risk drug management.",
      sections: [
        {
          id: "medication-mgmt-3-1",
          title: "3.1 High-Risk Medications",
          type: "content",
          content: `# High-Risk Medication Management

## High-Alert Medications
These drugs have heightened risk of significant patient harm if used incorrectly: insulin, anticoagulants, opioids, chemotherapy, concentrated electrolytes.

## Warfarin Management
Monitor INR levels regularly. Understand target INR ranges for different conditions. Be aware of drug and food interactions. Watch for bleeding signs: bruising, nosebleeds, blood in urine/stool.

## Opioid Safety
Start with lowest effective dose. Monitor respiratory rate, sedation level, and pain scores. Have naloxone available. Understand conversion ratios between different opioids.

## Chemotherapy Precautions
Requires specialized training. Follow strict protocols for handling and administration. Monitor for immediate and delayed reactions. Understand neutropenia precautions.

## Concentrated Electrolytes
Never give undiluted. Potassium chloride must always be diluted and given via controlled infusion. Monitor cardiac rhythm during administration.

## Safety Protocols
Double-checking requirements. Independent calculations by two qualified staff. Use of protocols and guidelines. Regular monitoring parameters. Documentation requirements.`,
          estimatedTime: 25,
        },
        {
          id: "medication-mgmt-3-2",
          title: "3.2 Drug Interactions and Contraindications",
          type: "content",
          content: `# Drug Interactions and Safety Considerations

## Types of Drug Interactions
**Pharmacokinetic**: Affects absorption, distribution, metabolism, or elimination
**Pharmacodynamic**: Affects drug action at receptor sites
**Pharmaceutical**: Physical or chemical incompatibility

## Common Serious Interactions
**Warfarin + Antibiotics**: Increased bleeding risk
**ACE inhibitors + Potassium**: Risk of hyperkalaemia  
**Digoxin + Diuretics**: Risk of toxicity from electrolyte imbalance
**MAOIs + Sympathomimetics**: Hypertensive crisis risk

## Drug Allergies vs. Adverse Reactions
True allergies involve immune system response. Adverse reactions are dose-related side effects. Both must be documented and considered in prescribing.

## Contraindications
**Absolute**: Never give under any circumstances
**Relative**: Benefits may outweigh risks in certain situations
Consider patient age, pregnancy, kidney/liver function, other medications.

## Monitoring Requirements
Regular blood tests for certain drugs. Observation for signs of toxicity. Patient education about what to report. Liaison with pharmacy and medical staff.`,
          estimatedTime: 20,
        },
        {
          id: "medication-mgmt-3-3",
          title: "3.3 Comprehensive Medication Quiz",
          type: "quiz",
          content: "Test your mastery of advanced medication management principles and complex drug calculations.",
          estimatedTime: 20,
          quizQuestions: [
            {
              id: "q-adv-med-1",
              question: "A patient needs 750mg of a drug. Tablets contain 250mg each. How many tablets should be given?",
              options: [
                "2 tablets",
                "2.5 tablets",
                "3 tablets", 
                "4 tablets"
              ],
              correctAnswer: 2,
              explanation: "750mg ÷ 250mg = 3 tablets. This is a straightforward calculation using the basic formula."
            },
            {
              id: "q-adv-med-2",
              question: "Which of these requires two-nurse checking before administration?",
              options: [
                "Paracetamol tablets",
                "Insulin injection",
                "Antibiotic tablets",
                "Antacid suspension"
              ],
              correctAnswer: 1,
              explanation: "Insulin is a high-alert medication requiring independent double-checking by two qualified nurses."
            },
            {
              id: "q-adv-med-3",
              question: "What is the most serious risk when giving IV potassium chloride?",
              options: [
                "Nausea and vomiting",
                "Cardiac arrhythmias",
                "Headache",
                "Skin irritation"
              ],
              correctAnswer: 1,
              explanation: "Rapid or concentrated IV potassium can cause fatal cardiac arrhythmias. It must always be diluted and given slowly."
            },
            {
              id: "q-adv-med-4",
              question: "A 1000ml bag of normal saline is to run over 8 hours. What is the infusion rate in ml/hr?",
              options: [
                "100 ml/hr",
                "125 ml/hr",
                "150 ml/hr",
                "200 ml/hr"
              ],
              correctAnswer: 1,
              explanation: "1000ml ÷ 8 hours = 125 ml/hr. Always use the formula: Volume ÷ Time = Rate."
            },
            {
              id: "q-adv-med-5",
              question: "What should you do if you make a medication error?",
              options: [
                "Don't tell anyone if the patient seems fine",
                "Report immediately to nurse in charge and doctor",
                "Wait until the end of shift to report",
                "Only document it in the notes"
              ],
              correctAnswer: 1,
              explanation: "Medication errors must be reported immediately to ensure patient safety and appropriate monitoring/treatment."
            }
          ]
        }
      ]
    }
  ]
};