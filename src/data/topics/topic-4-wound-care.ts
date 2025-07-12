import { LearningTopic } from "../learning-content";
import { Shield } from "lucide-react";

export const topic4: LearningTopic = {
  id: "topic-4",
  title: "Wound Care & Infection Control",
  description: "Essential knowledge and skills for wound management and infection prevention in healthcare settings.",
  icon: Shield,
  slug: "wound-care-infection-control",
  totalEstimatedTime: 90,
  sessions: [
    {
      id: "wound-care-1",
      title: "Session 1: Fundamentals of Wound Care (Beginner)",
      description: "Basic principles of wound assessment, classification, and initial management.",
      sections: [
        {
          id: "wound-care-1-1",
          title: "1.1 Wound Assessment & Classification",
          type: "content",
          content: `# Wound Assessment & Classification

## Learning Objectives
- Understand different types of wounds and their characteristics
- Learn systematic wound assessment techniques
- Recognise signs of infection and complications

## Types of Wounds

### Acute Wounds
- **Surgical wounds**: Clean, planned incisions
- **Traumatic wounds**: Cuts, abrasions, lacerations
- **Burns**: Thermal, chemical, electrical

### Chronic Wounds
- **Pressure ulcers**: Due to prolonged pressure
- **Venous ulcers**: Poor venous circulation
- **Diabetic foot ulcers**: Complications of diabetes

## Wound Assessment Framework

### SIZE
- Length × Width × Depth (in centimetres)
- Use wound measuring tools
- Document any undermining or tunnelling

### APPEARANCE
- **Granulation tissue**: Pink/red, healthy healing
- **Slough**: Yellow, fibrinous material
- **Necrotic tissue**: Black/brown, dead tissue
- **Epithelialisation**: New skin formation at edges

### EXUDATE
- **Amount**: Minimal, moderate, heavy
- **Type**: Serous, sanguineous, purulent
- **Colour**: Clear, yellow, green, brown

### SURROUNDING SKIN
- Intact, macerated, excoriated
- Temperature and colour changes
- Signs of infection

## Red Flags - When to Escalate
- Spreading erythema or cellulitis
- Purulent discharge with offensive odour
- Systemic signs of infection (fever, malaise)
- Rapidly deteriorating wound condition
- Exposed bone, tendon, or muscle

## Documentation
Always document:
- Date and time of assessment
- Wound measurements
- Appearance and stage
- Treatment provided
- Patient's pain level
- Any concerns or changes

Remember: Accurate assessment is the foundation of effective wound management.`,
          estimatedTime: 15,
        },
        {
          id: "wound-care-1-2",
          title: "1.2 Basic Wound Cleaning & Dressing Principles",
          type: "content",
          content: `# Basic Wound Cleaning & Dressing Principles

## Learning Objectives
- Master the principles of wound cleansing
- Understand aseptic technique
- Learn about basic dressing types and selection

## Wound Cleansing Principles

### Preparation
1. **Hand hygiene**: Wash hands thoroughly
2. **PPE**: Gloves, apron, eye protection if needed
3. **Environment**: Clean, well-lit area
4. **Equipment**: Sterile saline, gauze, disposal bag

### Cleansing Technique
- Use **normal saline** (0.9% sodium chloride)
- **Pressure irrigation** for contaminated wounds
- Clean from **inside to outside**
- Use **separate gauge** for each wipe
- **Pat dry**, don't rub

### Avoid These Common Mistakes
❌ Using hydrogen peroxide or antiseptics on healing wounds
❌ Scrubbing granulation tissue
❌ Reusing contaminated materials
❌ Using cotton wool (fibres can remain in wound)

## Aseptic Technique

### Key Principles
- **Sterile field**: Keep sterile items sterile
- **Non-touch technique**: Avoid contaminating sterile surfaces
- **Waste management**: Dispose of materials safely
- **Hand hygiene**: Before, during, and after procedure

### Step-by-Step Process
1. Gather all equipment
2. Explain procedure to patient
3. Position patient comfortably
4. Perform hand hygiene
5. Put on appropriate PPE
6. Open sterile packages without contamination
7. Clean wound using aseptic technique
8. Apply appropriate dressing
9. Dispose of waste safely
10. Remove PPE and perform hand hygiene
11. Document procedure

## Basic Dressing Types

### Primary Dressings (Contact Layer)
- **Non-adherent**: Won't stick to wound bed
- **Hydrocolloid**: For light-moderate exudate
- **Hydrogel**: For dry wounds, provides moisture
- **Alginate**: For heavily exudating wounds

### Secondary Dressings (Protective Layer)
- **Gauze**: Traditional, absorbent
- **Transparent films**: Waterproof, allows observation
- **Foam**: High absorbency, cushioning
- **Bandages**: Securing and compression

## Dressing Selection Factors
- **Wound type** and stage of healing
- **Exudate level**
- **Location** on body
- **Patient lifestyle** and preferences
- **Cost-effectiveness**
- **Frequency of change** required

## Pain Management
- Administer analgesia before procedure if needed
- Use atraumatic removal techniques
- Consider topical anaesthetics for painful wounds
- Allow rest periods during lengthy procedures

Remember: The goal is to create an optimal healing environment whilst preventing infection.`,
          estimatedTime: 20,
        },
        {
          id: "wound-care-1-3",
          title: "1.3 Assessment Quiz: Basic Wound Care",
          type: "quiz",
          content: "Test your understanding of fundamental wound assessment and basic care principles.",
          estimatedTime: 15,
          quizQuestions: [
            {
              id: "q-wound-1-1",
              question: "When assessing a wound, which measurement should be documented first?",
              options: [
                "Depth only",
                "Length × Width × Depth",
                "Width and length only",
                "Circumference of the wound"
              ],
              correctAnswer: 1,
              explanation: "Complete wound measurements should include length × width × depth in centimetres to track healing progress accurately."
            },
            {
              id: "q-wound-1-2", 
              question: "What is the most appropriate cleansing solution for routine wound care?",
              options: [
                "Hydrogen peroxide",
                "Povidone iodine",
                "Normal saline (0.9% sodium chloride)",
                "Antiseptic solution"
              ],
              correctAnswer: 2,
              explanation: "Normal saline is isotonic, non-toxic to healing tissues, and effectively cleanses wounds without damaging granulation tissue."
            },
            {
              id: "q-wound-1-3",
              question: "Which type of tissue indicates healthy wound healing?",
              options: [
                "Black necrotic tissue",
                "Yellow sloughy tissue", 
                "Pink/red granulation tissue",
                "Grey fibrinous tissue"
              ],
              correctAnswer: 2,
              explanation: "Pink or red granulation tissue indicates healthy healing with good blood supply and new tissue formation."
            },
            {
              id: "q-wound-1-4",
              question: "What is the correct direction for wound cleansing?",
              options: [
                "From outside to inside",
                "In circular motions only",
                "From inside to outside",
                "Back and forth motion"
              ],
              correctAnswer: 2,
              explanation: "Cleansing from inside to outside prevents introducing bacteria from surrounding skin into the wound."
            },
            {
              id: "q-wound-1-5",
              question: "Which sign would indicate the need for immediate medical escalation?",
              options: [
                "Minimal clear exudate",
                "Pink granulation tissue",
                "Spreading erythema with purulent discharge",
                "Slight wound edge epithelialisation"
              ],
              correctAnswer: 2,
              explanation: "Spreading erythema with purulent discharge indicates infection requiring immediate medical attention and possible antibiotic therapy."
            }
          ]
        }
      ]
    },
    {
      id: "wound-care-2", 
      title: "Session 2: Advanced Wound Management (Intermediate)",
      description: "Complex wound types, advanced dressing selection, and specialised care techniques.",
      sections: [
        {
          id: "wound-care-2-1",
          title: "2.1 Complex Wound Types & Complications",
          type: "content",
          content: `# Complex Wound Types & Complications

## Learning Objectives
- Recognise complex wound presentations
- Understand complications and their management
- Learn about specialist referral criteria

## Pressure Ulcers

### Risk Factors
- **Immobility**: Prolonged bed rest, wheelchair use
- **Sensory impairment**: Reduced sensation
- **Moisture**: Incontinence, excessive sweating
- **Nutrition**: Poor protein intake, dehydration
- **Age**: Elderly patients at higher risk

### Staging System
- **Stage 1**: Non-blanchable erythema
- **Stage 2**: Partial thickness skin loss
- **Stage 3**: Full thickness skin loss
- **Stage 4**: Full thickness tissue loss
- **Unstageable**: Obscured by slough/eschar

### Prevention Strategies
- **Repositioning**: Every 2 hours minimum
- **Pressure-relieving devices**: Specialist mattresses, cushions
- **Skin care**: Keep clean and dry
- **Nutrition**: Adequate protein and calories
- **Risk assessment**: Use validated tools (Waterlow, Braden)

## Diabetic Foot Ulcers

### Pathophysiology
- **Neuropathy**: Loss of protective sensation
- **Vascular disease**: Poor circulation
- **Infection**: Higher susceptibility
- **Poor healing**: Elevated glucose levels

### Assessment
- **Neurological**: Monofilament testing
- **Vascular**: Pulse examination, ABPI
- **Infection**: Probe to bone test
- **Offloading**: Pressure assessment

### Management Principles
- **Debridement**: Remove necrotic tissue
- **Infection control**: Appropriate antibiotics
- **Offloading**: Specialist footwear, casts
- **Glycaemic control**: Optimise blood glucose
- **Multidisciplinary approach**: Podiatrist, diabetic nurse, vascular surgeon

## Venous Leg Ulcers

### Characteristics
- **Location**: Medial malleolus area
- **Appearance**: Shallow, irregular edges
- **Exudate**: Often heavily exudating
- **Surrounding skin**: Haemosiderin staining, eczema

### Management
- **Compression therapy**: Four-layer bandaging
- **Elevation**: When resting
- **Exercise**: Calf muscle pump
- **Skin care**: Emollients, treat eczema
- **Address underlying cause**: Venous insufficiency

## Surgical Site Infections

### Classification
- **Superficial incisional**: Skin and subcutaneous tissue
- **Deep incisional**: Fascia and muscle
- **Organ/space**: Any part of body excluding skin incision

### Risk Factors
- **Patient factors**: Diabetes, obesity, smoking
- **Surgical factors**: Duration, contamination level
- **Environmental factors**: Theatre ventilation, staff preparation

### Prevention
- **Preoperative**: Skin preparation, antibiotic prophylaxis
- **Intraoperative**: Sterile technique, appropriate closure
- **Postoperative**: Appropriate dressing, early mobilisation

## Wound Complications

### Infection
**Signs**: Increased pain, swelling, erythema, purulent discharge, fever
**Management**: Wound swabs, antibiotic therapy, enhanced wound care

### Dehiscence
**Definition**: Partial or complete separation of wound edges
**Causes**: Infection, tension, poor nutrition, coughing
**Management**: May require re-suturing or secondary intention healing

### Delayed Healing
**Factors**: Poor nutrition, infection, medications, underlying disease
**Assessment**: Review all contributing factors
**Management**: Address underlying causes, consider specialist referral

## When to Refer to Specialists

### Tissue Viability Nurse
- Complex or non-healing wounds
- Pressure ulcer prevention
- Specialised dressing requirements

### Plastic Surgeon
- Large wounds requiring reconstruction
- Complex traumatic injuries
- Non-healing surgical wounds

### Vascular Surgeon
- Arterial ulcers
- Poor circulation
- Suspected vascular compromise

### Infectious Diseases
- Recurrent infections
- Antibiotic-resistant organisms
- Systemic infection

Remember: Early recognition and appropriate referral can prevent complications and improve outcomes.`,
          estimatedTime: 20,
        },
        {
          id: "wound-care-2-2",
          title: "2.2 Advanced Dressing Technologies",
          type: "content", 
          content: `# Advanced Dressing Technologies

## Learning Objectives
- Understand modern wound dressing technologies
- Learn appropriate selection criteria for advanced dressings
- Recognise cost-effectiveness considerations

## Moisture Management Dressings

### Hydrocolloid Dressings
**Composition**: Gelatin, pectin, carboxymethylcellulose
**Mechanism**: Forms gel when in contact with exudate
**Indications**: 
- Light to moderate exudate
- Partial thickness wounds
- Pressure ulcers stages 1-2

**Advantages**:
- Waterproof
- Self-adherent 
- Promotes autolytic debridement
- Pain reduction

**Disadvantages**:
- May cause hypergranulation
- Not suitable for infected wounds
- Can be confused with pus when removed

### Hydrogel Dressings
**Composition**: 90% water in polymer matrix
**Mechanism**: Donates moisture to dry wounds
**Indications**:
- Dry/necrotic wounds
- Burns
- Painful wounds

**Advantages**:
- Cooling effect (pain relief)
- Rehydrates necrotic tissue
- Non-adherent
- Facilitates autolytic debridement

**Disadvantages**:
- May macerate surrounding skin
- Not suitable for heavily exudating wounds
- Requires secondary dressing

### Alginate Dressings
**Composition**: Calcium/sodium salts of alginic acid
**Mechanism**: Forms gel when absorbs exudate
**Indications**:
- Moderate to heavy exudate
- Cavitating wounds
- Bleeding wounds (haemostatic properties)

**Advantages**:
- High absorbency
- Haemostatic properties
- Conforms to wound shape
- Biodegradable

**Disadvantages**:
- Requires secondary dressing
- Not suitable for dry wounds
- May leave fibres in wound

## Advanced Technologies

### Foam Dressings
**Composition**: Polyurethane foam
**Mechanism**: Absorbs exudate whilst maintaining moist environment
**Indications**:
- Moderate to heavy exudate
- Pressure ulcers
- Leg ulcers
- Areas requiring cushioning

**Advantages**:
- High absorbency
- Thermal insulation
- Cushioning effect
- Available with adhesive borders

**Disadvantages**:
- May adhere to dry wounds
- Bulky appearance
- Can be expensive

### Silver Dressings
**Mechanism**: Sustained silver ion release for antimicrobial effect
**Indications**:
- Infected wounds
- Critically colonised wounds
- High infection risk

**Types**:
- Silver sulfadiazine cream
- Nanocrystalline silver dressings
- Silver-impregnated foams/alginates

**Considerations**:
- Not for routine use
- Review effectiveness regularly
- Consider resistance patterns
- Cost implications

### Honey Dressings
**Mechanism**: Medical grade honey provides antimicrobial and anti-inflammatory effects
**Types**: Manuka honey, Surgihoney
**Indications**:
- Infected wounds
- Malodorous wounds
- Sloughy wounds

**Advantages**:
- Broad spectrum antimicrobial
- Promotes autolytic debridement
- Anti-inflammatory properties
- Reduces odour

**Disadvantages**:
- May cause initial discomfort
- Allergic reactions possible
- Requires frequent changes initially

## Negative Pressure Wound Therapy (NPWT)

### Mechanism
- Continuous/intermittent negative pressure
- Removes excess exudate
- Promotes blood flow
- Reduces bacterial load
- Encourages granulation tissue formation

### Indications
- Acute wounds (post-surgical)
- Chronic wounds (pressure ulcers, leg ulcers)
- Traumatic wounds
- Flaps and grafts

### Contraindications
- Untreated osteomyelitis
- Necrotic tissue with eschar
- Malignancy in wound bed
- Exposed blood vessels/organs

### Advantages
- Accelerated healing
- Reduced frequency of dressing changes
- Improved patient mobility
- Enhanced graft take

### Disadvantages
- Expensive
- Requires training
- Patient compliance needed
- Potential complications (bleeding, pain)

## Skin Substitutes

### Biological Grafts
- **Autografts**: Patient's own skin
- **Allografts**: Cadaveric skin
- **Xenografts**: Animal-derived (usually porcine)

### Bioengineered Products
- **Dermal matrices**: Collagen-based scaffolds
- **Cellular products**: Living skin equivalents
- **Growth factors**: Platelet-derived growth factor

### Indications
- Large acute wounds
- Chronic non-healing wounds
- Burns
- Surgical reconstruction

## Dressing Selection Algorithm

### Step 1: Assess the Wound
- Size, depth, location
- Exudate level and type
- Tissue types present
- Signs of infection
- Surrounding skin condition

### Step 2: Consider Patient Factors
- Age and mobility
- Allergies
- Pain levels
- Lifestyle requirements
- Manual dexterity

### Step 3: Set Treatment Goals
- Healing by primary/secondary intention
- Symptom management
- Quality of life
- Cost considerations

### Step 4: Select Appropriate Dressing
- Match dressing properties to wound needs
- Consider frequency of changes
- Evaluate cost-effectiveness
- Plan review schedule

## Cost-Effectiveness Considerations

### Factors to Consider
- **Dressing cost** per unit
- **Frequency** of changes required
- **Nursing time** for application
- **Total treatment cost** over healing period
- **Quality of life** improvements
- **Complication rates**

### Economic Evaluation
- Simple dressings may be more cost-effective for straightforward wounds
- Advanced dressings may reduce total treatment costs for complex wounds
- Consider indirect costs (nursing time, patient comfort)

Remember: The most expensive dressing is not always the best choice - match the dressing to the wound needs and patient circumstances.`,
          estimatedTime: 25,
        },
        {
          id: "wound-care-2-3",
          title: "2.3 Case Study: Complex Pressure Ulcer Management",
          type: "case-study",
          content: "Apply your knowledge to manage a complex pressure ulcer case with multiple complications.",
          estimatedTime: 20,
          caseStudyContent: `# Case Study: Complex Pressure Ulcer Management

## Patient Presentation

**Patient**: Mrs. Dorothy Henderson, 78 years old  
**Setting**: Community nursing visit  
**History**: 
- Admitted to hospital 3 weeks ago following a stroke
- Left-sided weakness, reduced mobility
- Developed pressure ulcer on sacrum during hospital stay
- Recently discharged home with care package
- Lives alone, daughter visits daily

## Current Assessment

**Location**: Sacral area, 4cm left of midline  
**Size**: 6cm × 4cm × 2cm deep  
**Appearance**: 
- 60% yellow slough
- 30% red granulation tissue  
- 10% black necrotic tissue at edges
- Irregular wound edges
- No undermining detected

**Exudate**: Moderate amount, yellow-green in colour, slight offensive odour  
**Surrounding skin**: 
- Erythematous 2cm around wound
- Warm to touch
- Slightly oedematous
- Macerated at 6 o'clock position

**Current dressing**: Basic gauze with tape, changed daily  
**Pain**: 6/10 during dressing changes, 3/10at rest  
**Systemic signs**: Afebrile, no other signs of infection

## Risk Factors Present
- **Mobility**: Limited due to stroke, uses wheelchair
- **Continence**: Occasional incontinence of urine
- **Nutrition**: Poor appetite since stroke, recent weight loss
- **Skin condition**: Dry skin, previous pressure damage
- **Equipment**: Standard hospital mattress, no pressure relief

## Questions for Consideration

### 1. Wound Assessment
What stage pressure ulcer is this according to international classification? What additional assessments would you perform?

### 2. Infection Status  
Is this wound infected, critically colonised, or clean? What factors support your assessment?

### 3. Management Priorities
List the top 5 priorities for this patient's wound management plan.

### 4. Dressing Selection
What type of dressing would be most appropriate? Justify your choice considering the wound characteristics.

### 5. Risk Management
What pressure relief measures should be implemented? Consider equipment and repositioning strategies.

### 6. Multidisciplinary Approach
Which healthcare professionals should be involved in this patient's care?

### 7. Patient Education
What key points would you discuss with Mrs. Henderson and her daughter?

### 8. Monitoring Plan
How frequently should this wound be assessed and what parameters should be monitored?`,
          caseQuestions: [
            {
              id: "case-pressure-1",
              question: "Based on the wound description, what stage is this pressure ulcer?",
              sampleAnswer: "This is a Stage 3 pressure ulcer. The wound shows full-thickness skin loss (6cm × 4cm × 2cm deep) with visible granulation tissue and slough, but no exposed bone, tendon, or muscle. The presence of yellow slough and necrotic tissue confirms tissue loss extends into the subcutaneous layer.",
              keyPoints: [
                "Full-thickness skin loss present",
                "Wound depth of 2cm indicates subcutaneous involvement",
                "No exposed bone/tendon/muscle (would be Stage 4)",
                "Mixed tissue types consistent with Stage 3",
                "Size and irregular edges typical of pressure damage"
              ]
            },
            {
              id: "case-pressure-2", 
              question: "What evidence suggests this wound may be infected rather than just critically colonised?",
              sampleAnswer: "Several factors suggest infection: offensive odour, yellow-green exudate, surrounding erythema extending 2cm from wound edges, warmth, and slight oedema. The combination of these local signs indicates bacterial invasion rather than just surface colonisation. A wound swab should be taken for culture and sensitivity.",
              keyPoints: [
                "Offensive odour indicates bacterial overgrowth",
                "Yellow-green exudate suggests purulent discharge", 
                "Erythema extending 2cm beyond wound edges",
                "Warmth and oedema are inflammatory signs",
                "Need for wound swab culture",
                "Consider antibiotic therapy if systemic signs develop"
              ]
            },
            {
              id: "case-pressure-3",
              question: "What would be your immediate management priorities for this patient?",
              sampleAnswer: "1) Address infection - wound swab and consider antibiotics, 2) Pressure relief - appropriate mattress and repositioning schedule, 3) Debridement of necrotic tissue, 4) Appropriate dressing selection for infection and exudate management, 5) Nutritional assessment and support, 6) Continence management to prevent further contamination.",
              keyPoints: [
                "Infection control as immediate priority",
                "Pressure relief to prevent further damage", 
                "Debridement to remove necrotic tissue",
                "Moisture management with appropriate dressing",
                "Address underlying risk factors",
                "Pain management during procedures"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "wound-care-3",
      title: "Session 3: Specialist Techniques & Prevention (Advanced)",
      description: "Advanced wound care techniques, emerging therapies, and comprehensive prevention strategies.",
      sections: [
        {
          id: "wound-care-3-1", 
          title: "3.1 Debridement Techniques & Emerging Therapies",
          type: "content",
          content: `# Debridement Techniques & Emerging Therapies

## Learning Objectives
- Master different debridement methods
- Understand indications and contraindications
- Explore emerging wound care technologies

## Debridement Overview

**Definition**: Removal of devitalised, contaminated, or foreign material from wounds to promote healing

**Goals**:
- Remove barrier to healing
- Reduce bacterial load  
- Stimulate healing response
- Improve dressing effectiveness
- Reduce odour and exudate

## Types of Debridement

### 1. Autolytic Debridement
**Mechanism**: Body's own enzymes break down necrotic tissue
**Method**: Moist wound environment using hydrocolloids, hydrogels
**Advantages**:
- Selective (only removes necrotic tissue)
- Painless
- Cost-effective
- Suitable for most patients

**Disadvantages**:
- Slow process (days to weeks)
- Not suitable for infected wounds
- May macerate surrounding skin
- Requires patient compliance

**Indications**: 
- Stable necrotic tissue
- Non-infected wounds
- Palliative care situations
- Patients unfit for surgical debridement

### 2. Enzymatic Debridement
**Mechanism**: Topical enzymes (collagenase, papain-urea) break down specific tissue components
**Products**: Collagenase ointment, papain-urea preparations
**Advantages**:
- Selective debridement
- Suitable for fragile patients
- Can be used with some infections

**Disadvantages**:
- Expensive
- Slow action
- May cause local irritation
- Limited availability

**Application**:
- Apply thin layer to necrotic tissue only
- Avoid contact with healthy tissue
- Cover with appropriate dressing
- Review regularly for effectiveness

### 3. Mechanical Debridement
**Types**:
- **Wet-to-dry dressings**: Gauze applied wet, removed dry
- **Wound irrigation**: High-pressure saline irrigation
- **Whirlpool therapy**: Agitation of water for loosening debris

**Advantages**:
- Immediate effect
- Cost-effective
- Removes debris effectively

**Disadvantages**:
- Non-selective (removes healthy tissue)
- Painful
- Risk of trauma
- May drive bacteria deeper

**Technique for Irrigation**:
- Use 19-gauge needle with 35ml syringe
- Pressure: 8-15 psi
- Saline temperature: Body temperature
- Protect surrounding areas
- Consider analgesia

### 4. Sharp Debridement
**Definition**: Surgical removal using scalpel, scissors, curette
**Practitioners**: Surgeons, specialist nurses, podiatrists
**Advantages**:
- Rapid, selective
- Immediate results
- Can obtain tissue samples
- Controls bleeding

**Disadvantages**:
- Requires skill and training
- Risk of damage to healthy tissue
- Bleeding complications
- Pain
- May require anaesthesia

**Indications**:
- Thick, adherent eschar
- Infected necrotic tissue
- Urgent debridement needed
- Failed conservative methods

**Contraindications**:
- Coagulation disorders
- Arterial insufficiency
- Stable heel ulcers
- Palliative care situations

### 5. Biological Debridement (Maggot Therapy)
**Mechanism**: Sterile maggots (Lucilia sericata) consume necrotic tissue
**Advantages**:
- Highly selective
- Antimicrobial effects
- Stimulates healing
- Cost-effective for complex wounds

**Disadvantages**:
- Patient acceptance issues
- Contraindicated in certain conditions
- Requires specialist supervision
- Limited availability

**Indications**:
- Chronic, non-healing wounds
- MRSA or other resistant infections
- Diabetic foot ulcers
- Pressure ulcers

**Contraindications**:
- Bleeding disorders
- Immunocompromised patients
- Wounds near body cavities
- Patient refusal

## Emerging Therapies

### Platelet-Rich Plasma (PRP)
**Mechanism**: Concentrated platelets release growth factors
**Preparation**: Patient's blood centrifuged to concentrate platelets
**Applications**:
- Chronic non-healing wounds
- Diabetic ulcers
- Sports injuries
- Aesthetic procedures

**Evidence**: Growing research base, mixed results in chronic wounds

### Stem Cell Therapy
**Types**: 
- Mesenchymal stem cells
- Adipose-derived stem cells
- Bone marrow aspirate

**Mechanism**: Cell differentiation and paracrine signalling
**Applications**: Research stage for chronic wounds
**Challenges**: Cost, regulation, standardisation

### Hyperbaric Oxygen Therapy (HBOT)
**Mechanism**: 100% oxygen at increased pressure
**Indications**:
- Diabetic foot ulcers
- Radiation-induced wounds
- Compromised grafts/flaps
- Gas gangrene

**Protocol**: 90-120 minutes at 2-3 atmospheres
**Contraindications**: Pneumothorax, certain medications
**Evidence**: Established for specific indications

### Shockwave Therapy
**Mechanism**: Acoustic waves stimulate healing response
**Types**: Focused vs. radial waves
**Applications**:
- Chronic wounds
- Diabetic ulcers
- Pressure ulcers

**Advantages**: Non-invasive, outpatient procedure
**Evidence**: Emerging research, promising results

### Photobiomodulation (Low-Level Laser)
**Mechanism**: Light energy stimulates cellular metabolism
**Parameters**: Wavelength, power density, treatment time
**Applications**:
- Wound healing acceleration
- Pain reduction
- Inflammation control

**Advantages**: Non-invasive, minimal side effects
**Evidence**: Moderate support in literature

### Electrical Stimulation
**Types**:
- **HVPC**: High-voltage pulsed current
- **MENS**: Microcurrent electrical stimulation
- **PEMF**: Pulsed electromagnetic fields

**Mechanism**: Enhanced cellular activity and blood flow
**Indications**: Chronic, non-healing wounds
**Contraindications**: Pregnancy, pacemakers, malignancy

## Combination Therapies

### Sequential Debridement
- Start with autolytic for stable wounds
- Progress to enzymatic if needed
- Sharp debridement for urgent cases
- Maintenance with appropriate method

### Adjuvant Therapies
- NPWT following debridement
- Antimicrobial dressings with biological debridement
- Electrical stimulation with moisture management
- Compression therapy with debridement for venous ulcers

## Clinical Decision Making

### Assessment Factors
- **Wound characteristics**: Size, depth, tissue types
- **Patient factors**: Age, comorbidities, pain tolerance
- **Resources**: Available expertise, equipment, cost
- **Urgency**: Infection, systemic compromise
- **Goals of care**: Healing vs. palliation

### Monitoring Response
- **Weekly assessment** minimum for active debridement
- **Photograph** wound progression
- **Measure** wound dimensions
- **Document** tissue changes
- **Adjust** method based on response

### When to Stop Debridement
- Healthy tissue bed achieved
- Palliative care goals
- Patient wishes to discontinue
- Complications outweigh benefits
- No progress after appropriate trial

Remember: Debridement is not always necessary - stable, dry eschar on heels may be left undisturbed if no signs of infection.`,
          estimatedTime: 25,
        },
        {
          id: "wound-care-3-2",
          title: "3.2 Infection Prevention & Control Strategies",
          type: "content",
          content: `# Infection Prevention & Control Strategies

## Learning Objectives
- Implement comprehensive infection prevention protocols
- Understand antimicrobial stewardship in wound care
- Develop effective surveillance and monitoring systems

## Principles of Infection Prevention

### Chain of Infection
1. **Infectious agent**: Bacteria, viruses, fungi
2. **Reservoir**: Environment, equipment, people
3. **Portal of exit**: Wound exudate, respiratory droplets
4. **Mode of transmission**: Contact, droplet, airborne
5. **Portal of entry**: Broken skin, mucous membranes
6. **Susceptible host**: Immunocompromised, elderly

**Prevention Strategy**: Break any link in the chain

### Standard Precautions
**Apply to all patients regardless of diagnosis**:
- Hand hygiene before and after patient contact
- Appropriate PPE selection and use
- Safe injection practices
- Environmental cleaning and disinfection
- Proper waste management
- Respiratory hygiene and cough etiquette

## Hand Hygiene

### WHO 5 Moments
1. **Before** touching a patient
2. **Before** clean/aseptic procedures
3. **After** body fluid exposure risk
4. **After** touching a patient
5. **After** touching patient surroundings

### Technique
**Alcohol-based hand rub** (preferred):
- Apply to palm of one hand
- Rub hands together covering all surfaces
- Continue until hands are dry (20-30 seconds)

**Soap and water** (when visibly soiled):
- Wet hands, apply soap
- Rub for at least 20 seconds
- Rinse thoroughly, dry with single-use towel

### When Soap and Water Required
- Hands visibly soiled
- After caring for patients with C. difficile
- After bathroom use
- Before eating

## Personal Protective Equipment (PPE)

### Selection Principles
**Risk assessment based**:
- Type of patient interaction
- Anticipated exposure to body fluids
- Patient's infection status
- Environmental factors

### Types and Indications

**Gloves**:
- **Single use**: All patient contact
- **Sterile**: Surgical procedures, wound care
- **Non-sterile**: Routine care, environmental cleaning
- **Change between**: Different procedures, different patients

**Gowns/Aprons**:
- **Disposable aprons**: Standard patient care
- **Fluid-resistant gowns**: High splash risk
- **Sterile gowns**: Surgical procedures

**Eye Protection**:
- **Safety glasses**: Splash risk
- **Face shields**: High splash risk
- **Goggles**: Chemical exposure risk

**Respirators**:
- **Surgical masks**: Droplet precautions
- **N95/FFP2**: Airborne precautions
- **FFP3**: High-risk airborne procedures

### Donning and Doffing Sequence

**Donning (Putting On)**:
1. Hand hygiene
2. Gown/apron
3. Mask/respirator
4. Eye protection
5. Gloves

**Doffing (Removing)**:
1. Gloves (avoid contaminating hands)
2. Eye protection
3. Gown/apron (roll inside out)
4. Mask/respirator (touch only ties/bands)
5. Hand hygiene

## Environmental Controls

### Cleaning and Disinfection

**Cleaning**: Physical removal of dirt and organic matter
**Disinfection**: Reduction of pathogenic microorganisms

**Frequency**:
- **Between patients**: All surfaces in contact zone
- **Daily**: All patient care areas
- **Weekly**: Comprehensive deep cleaning
- **After incidents**: Blood/body fluid spills

**Products**:
- **Neutral detergent**: General cleaning
- **Chlorine-based**: Blood/body fluid spills (1000ppm)
- **Alcohol-based**: Small surfaces, equipment
- **Hydrogen peroxide**: Sporicidal activity

### Equipment Management

**Classification**:
- **Critical**: Enter sterile tissue (sterilisation required)
- **Semi-critical**: Contact mucous membranes (high-level disinfection)
- **Non-critical**: Contact intact skin (low-level disinfection)

**Single-use items**: Never reuse
**Reusable items**: Follow manufacturer's instructions
**Shared equipment**: Clean and disinfect between patients

## Antimicrobial Stewardship

### Principles
- **Right drug**: Based on culture and sensitivity
- **Right dose**: Adequate but not excessive
- **Right duration**: Shortest effective course
- **Right route**: Oral preferred when appropriate

### Wound-Specific Considerations

**Topical Antimicrobials**:
- Limited systemic absorption
- Risk of resistance development
- Consider allergic reactions
- Monitor for effectiveness

**Common Agents**:
- **Silver**: Broad spectrum, low resistance
- **Honey**: Natural antimicrobial, anti-inflammatory
- **Iodine**: Rapid kill, can be cytotoxic
- **Chlorhexidine**: Persistent activity, skin irritation

**Indications for Systemic Antibiotics**:
- Spreading cellulitis
- Systemic signs of infection
- High-risk patients (immunocompromised)
- Failed topical therapy

### Surveillance and Monitoring

**Healthcare-Associated Infections (HAIs)**:
- Surgical site infections
- Bloodstream infections
- Urinary tract infections
- Pneumonia

**Surveillance Methods**:
- **Active**: Dedicated personnel review cases
- **Passive**: Clinician reporting
- **Electronic**: Automated detection systems
- **Targeted**: High-risk areas/procedures

**Key Performance Indicators**:
- Infection rates by type and location
- Compliance with prevention practices
- Antimicrobial usage patterns
- Outbreak identification and response

## Outbreak Management

### Recognition
- Increase in infection rate
- Unusual pathogen or resistance pattern
- Temporal or geographical clustering
- Common source exposure

### Investigation Steps
1. **Confirm outbreak**: Case definition, case finding
2. **Descriptive epidemiology**: Person, place, time
3. **Hypothesis generation**: Possible sources/modes
4. **Analytical study**: Case-control or cohort
5. **Control measures**: Interrupt transmission
6. **Continued surveillance**: Monitor effectiveness

### Control Measures
- **Isolation**: Affected patients
- **Cohorting**: Group similar cases
- **Contact tracing**: Identify exposed individuals
- **Enhanced precautions**: Additional PPE/procedures
- **Environmental investigation**: Potential sources
- **Staff restrictions**: If implicated in transmission

## Special Populations

### Immunocompromised Patients
- **Higher risk**: Opportunistic infections
- **Protective measures**: Positive pressure rooms, HEPA filtration
- **Visitor restrictions**: Limit numbers, screen for illness
- **Enhanced surveillance**: Early detection crucial

### Long-term Care Facilities
- **Challenges**: High-risk residents, shared facilities
- **Strategies**: Vaccination programmes, infection control policies
- **Staff education**: Regular training and competency assessment
- **Family involvement**: Education about prevention

### Community Settings
- **Home care**: Equipment cleaning, carer education
- **Wound clinics**: Appointment scheduling, environmental controls
- **Patient education**: Self-care practices, when to seek help

## Quality Improvement

### Plan-Do-Study-Act (PDSA) Cycles
- **Plan**: Identify improvement opportunity
- **Do**: Implement small-scale change
- **Study**: Measure results and learn
- **Act**: Adopt, adapt, or abandon intervention

### Examples of Improvement Projects
- **Hand hygiene campaigns**: Increase compliance rates
- **Bundle implementation**: Evidence-based practices
- **Antimicrobial stewardship**: Reduce inappropriate use
- **Environmental improvements**: Enhanced cleaning protocols

### Measurement and Feedback
- **Process measures**: Compliance with practices
- **Outcome measures**: Infection rates, complications
- **Balancing measures**: Unintended consequences
- **Regular reporting**: Dashboard displays, team meetings

Remember: Prevention is always better than treatment - invest in robust prevention strategies to protect patients and healthcare workers.`,
          estimatedTime: 25,
        },
        {
          id: "wound-care-3-3",
          title: "3.3 Advanced Case Analysis: Multi-factorial Wound Management",
          type: "case-study", 
          content: "Analyse a complex case involving multiple wounds with different aetiologies and treatment challenges.",
          estimatedTime: 20,
          caseStudyContent: `# Advanced Case Analysis: Multi-factorial Wound Management

## Patient Background

**Patient**: Mr. James Mitchell, 67 years old  
**Setting**: Acute medical ward, day 12 of admission  
**Primary diagnosis**: Type 2 diabetes mellitus with complications  
**Secondary diagnoses**: 
- Peripheral arterial disease
- Chronic kidney disease (Stage 3)
- Heart failure (NYHA Class II)
- Previous stroke (6 months ago) with residual left-sided weakness

## Medical History
- **Diabetes**: 25-year history, poor glycaemic control (HbA1c 9.8%)
- **Smoking**: 40 pack-year history, quit 2 years ago
- **Medications**: Metformin, insulin, ACE inhibitor, diuretic, antiplatelet therapy
- **Allergies**: Penicillin (rash), documented iodine sensitivity

## Current Presentation

### Wound 1: Right Heel Pressure Ulcer
- **Location**: Right heel, posterior aspect
- **Size**: 4cm × 3cm × 1.5cm deep
- **Appearance**: 
  - 70% black, dry eschar
  - 30% surrounding erythema
  - Well-demarcated edges
  - No exudate
  - No odour
- **Duration**: Developed during current admission
- **ABPI**: Right leg 0.6 (abnormal)

### Wound 2: Left Diabetic Foot Ulcer  
- **Location**: Left first metatarsal head (plantar surface)
- **Size**: 2cm × 2cm × 0.8cm deep
- **Appearance**:
  - 40% pink granulation tissue
  - 60% yellow slough
  - Moderate yellow exudate
  - Slightly malodorous
  - Surrounding callus
  - Probe to bone test: Positive
- **Duration**: 6 weeks, patient unaware until admission
- **Sensation**: Absent (10g monofilament test)

### Wound 3: Surgical Site (Central Line Insertion)
- **Location**: Right subclavian area
- **Size**: 3cm linear incision
- **Appearance**:
  - Partial dehiscence (1cm gap)
  - Purulent discharge
  - Surrounding erythema (4cm radius)
  - Warm to touch
  - Fluctuant area suggesting collection
- **Duration**: Central line inserted 5 days ago, removed yesterday due to suspected infection

## Current Management
- **Blood glucose**: Ranging 15-25 mmol/L despite insulin
- **Pain management**: Paracetamol regular, morphine PRN
- **Current dressings**: 
  - Heel: Dry gauze changed daily
  - Foot ulcer: Hydrocolloid changed every 3 days
  - Surgical site: Gauze with antiseptic solution

## Laboratory Results
- **FBC**: WCC 18.2 (elevated), Hb 9.8 (low)
- **CRP**: 156 (significantly elevated)
- **Blood cultures**: Pending (taken yesterday)
- **Swabs**: Heel ulcer - no growth, Foot ulcer - heavy growth mixed organisms, Surgical site - pending
- **HbA1c**: 9.8% (poor control)
- **Albumin**: 25 g/L (low)
- **eGFR**: 42 mL/min (reduced)

## Current Medications
- Insulin sliding scale
- Metformin 500mg BD
- Ramipril 5mg OD
- Furosemide 40mg OD
- Aspirin 75mg OD
- Atorvastatin 40mg OD

## Social Circumstances
- Lives alone in ground floor flat
- Daughter visits twice weekly
- Previously independent with ADLs
- Poor understanding of diabetes management
- Financial constraints affecting dietary choices

## Comprehensive Assessment Questions

### 1. Risk Stratification
Analyse each wound's risk factors and prioritise management. Which wound poses the greatest immediate threat and why?

### 2. Infection Management
The foot ulcer probe-to-bone test is positive and there's systemic inflammation. What investigations would you arrange and what empirical antibiotic therapy would you consider?

### 3. Arterial Assessment
With an ABPI of 0.6, how does this affect your management of the heel pressure ulcer? What additional vascular assessments might be needed?

### 4. Surgical Site Complication
The fluctuant area around the surgical site suggests a collection. What immediate action is required and what are the implications for wound healing?

### 5. Glycaemic Control
How does the poor glycaemic control affect all three wounds? What strategies would you implement for better diabetes management?

### 6. Nutritional Status
The low albumin and anaemia suggest nutritional deficiency. How does this impact wound healing and what interventions are needed?

### 7. Multidisciplinary Approach
List all healthcare professionals who should be involved in this patient's care and their specific roles.

### 8. Discharge Planning
What needs to be in place before this patient can be safely discharged home? Consider equipment, support, and follow-up arrangements.

### 9. Patient Education
What are the key educational priorities for this patient and his daughter regarding wound care and diabetes management?

### 10. Long-term Prevention
What strategies would you implement to prevent future wound complications in this high-risk patient?`,
          caseQuestions: [
            {
              id: "case-advanced-1",
              question: "How would you prioritise the management of these three wounds and what immediate actions are required?",
              sampleAnswer: "Priority order: 1) Surgical site (urgent drainage needed, systemic sepsis risk), 2) Diabetic foot ulcer (osteomyelitis likely, limb-threatening), 3) Heel ulcer (stable, but requires arterial assessment). Immediate actions: Blood cultures, urgent surgical review for collection drainage, bone biopsy/MRI for foot ulcer, empirical antibiotics, vascular referral for heel ulcer assessment.",
              keyPoints: [
                "Surgical site has highest infection risk and systemic threat",
                "Probe-to-bone positive suggests osteomyelitis requiring urgent treatment",
                "Heel ulcer stable but arterial compromise affects healing potential",
                "Need for urgent surgical drainage of collection",
                "Empirical broad-spectrum antibiotics indicated",
                "Multidisciplinary team involvement essential"
              ]
            },
            {
              id: "case-advanced-2",
              question: "Given the ABPI of 0.6 and dry eschar on the heel, what is your management approach for this wound?",
              sampleAnswer: "With significant arterial compromise (ABPI 0.6), do NOT debride the dry, intact eschar as it provides protection. Refer urgently to vascular surgery for revascularisation assessment. Keep heel ulcer dry and protected. Monitor for signs of infection (increasing erythema, warmth, exudate). Consider pressure-relieving devices. Heel ulcers in arterial disease should remain dry unless infected.",
              keyPoints: [
                "ABPI 0.6 indicates significant arterial disease",
                "Dry, intact eschar should NOT be debrided in arterial disease",
                "Urgent vascular surgery referral required",
                "Pressure relief essential to prevent extension",
                "Monitor for signs of infection requiring intervention",
                "Keep wound dry unless signs of infection develop"
              ]
            },
            {
              id: "case-advanced-3", 
              question: "What comprehensive discharge planning would be required for this patient?",
              sampleAnswer: "Equipment: Pressure-relieving mattress, offloading device for foot, dressing supplies. Services: District nursing for wound care, diabetic nurse specialist, podiatry referral, physiotherapy. Education: Diabetes management, foot care, wound monitoring, when to seek help. Follow-up: Vascular surgery, diabetic clinic, wound clinic, GP review. Social: Consider care package, meal delivery, diabetes support groups.",
              keyPoints: [
                "Pressure relief equipment essential",
                "Specialist nursing support for complex wound care",
                "Diabetes education and ongoing specialist support",
                "Vascular and surgical follow-up appointments",
                "Social support for diabetes management and nutrition",
                "Clear escalation plan for wound deterioration"
              ]
            }
          ]
        }
      ]
    }
  ]
};