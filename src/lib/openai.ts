import OpenAI from 'openai';

// Note: In production, this should be handled by a backend API for security
// For demo purposes, we'll use a placeholder that can be configured
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || 'your-openai-api-key-here',
  dangerouslyAllowBrowser: true // Only for demo - use backend in production
});

export interface PatientProfile {
  name: string;
  age: number;
  gender: string;
  chiefComplaint: string;
  symptoms: string[];
  medicalHistory: string[];
  currentMedications: string[];
  allergies: string[];
  socialHistory: string;
  vitalSigns: {
    temperature: string;
    bloodPressure: string;
    heartRate: string;
    respiratoryRate: string;
    oxygenSaturation: string;
  };
}

export const generateRandomPatient = (): PatientProfile => {
  const names = ['Sarah Johnson', 'Michael Brown', 'Emma Wilson', 'James Davis', 'Lisa Anderson', 'David Miller'];
  const ages = [25, 32, 45, 58, 67, 73];
  const genders = ['Female', 'Male'];
  
  const complaints = [
    'Chest pain',
    'Shortness of breath',
    'Abdominal pain',
    'Headache',
    'Fatigue',
    'Dizziness',
    'Nausea and vomiting',
    'Back pain',
    'Joint pain',
    'Skin rash'
  ];

  const symptomSets = {
    'Chest pain': ['Sharp chest pain', 'Pain radiating to left arm', 'Sweating', 'Nausea'],
    'Shortness of breath': ['Difficulty breathing', 'Wheezing', 'Cough', 'Chest tightness'],
    'Abdominal pain': ['Cramping pain', 'Bloating', 'Loss of appetite', 'Nausea'],
    'Headache': ['Throbbing pain', 'Sensitivity to light', 'Nausea', 'Neck stiffness'],
    'Fatigue': ['Extreme tiredness', 'Weakness', 'Difficulty concentrating', 'Sleep disturbances'],
    'Dizziness': ['Lightheadedness', 'Balance problems', 'Nausea', 'Blurred vision'],
    'Nausea and vomiting': ['Feeling sick', 'Vomiting', 'Loss of appetite', 'Abdominal discomfort'],
    'Back pain': ['Lower back pain', 'Stiffness', 'Pain radiating to legs', 'Muscle spasms'],
    'Joint pain': ['Swollen joints', 'Stiffness', 'Limited range of motion', 'Morning stiffness'],
    'Skin rash': ['Red, itchy rash', 'Dry skin', 'Swelling', 'Burning sensation']
  };

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomAge = ages[Math.floor(Math.random() * ages.length)];
  const randomGender = genders[Math.floor(Math.random() * genders.length)];
  const randomComplaint = complaints[Math.floor(Math.random() * complaints.length)];
  const randomSymptoms = symptomSets[randomComplaint as keyof typeof symptomSets] || [];

  return {
    name: randomName,
    age: randomAge,
    gender: randomGender,
    chiefComplaint: randomComplaint,
    symptoms: randomSymptoms,
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'].slice(0, Math.floor(Math.random() * 3)),
    currentMedications: ['Metformin', 'Lisinopril', 'Aspirin'].slice(0, Math.floor(Math.random() * 4)),
    allergies: ['Penicillin', 'Shellfish'].slice(0, Math.floor(Math.random() * 3)),
    socialHistory: 'Non-smoker, occasional alcohol use, works as a teacher',
    vitalSigns: {
      temperature: '37.2°C',
      bloodPressure: '140/90 mmHg',
      heartRate: '88 bpm',
      respiratoryRate: '18/min',
      oxygenSaturation: '98%'
    }
  };
};

export const createPatientSystemPrompt = (patient: PatientProfile): string => {
  return `You are a virtual patient for medical training. Your details are:

Name: ${patient.name}
Age: ${patient.age}
Gender: ${patient.gender}
Chief Complaint: ${patient.chiefComplaint}
Current Symptoms: ${patient.symptoms.join(', ')}
Medical History: ${patient.medicalHistory.join(', ') || 'None significant'}
Current Medications: ${patient.currentMedications.join(', ') || 'None'}
Allergies: ${patient.allergies.join(', ') || 'None known'}
Social History: ${patient.socialHistory}

Vital Signs:
- Temperature: ${patient.vitalSigns.temperature}
- Blood Pressure: ${patient.vitalSigns.bloodPressure}
- Heart Rate: ${patient.vitalSigns.heartRate}
- Respiratory Rate: ${patient.vitalSigns.respiratoryRate}
- Oxygen Saturation: ${patient.vitalSigns.oxygenSaturation}

Instructions:
1. Act as this patient during a medical interview
2. Only provide information when specifically asked
3. Be realistic - patients don't always know medical terms
4. Show appropriate concern or worry about your symptoms
5. Answer questions about your symptoms, history, and concerns
6. If asked about something not in your profile, respond naturally as a patient would
7. Keep responses concise but informative
8. Remember previous parts of the conversation
9. Don't volunteer information unless directly asked

Start by briefly introducing yourself and your main concern when the interview begins.`;
};

export const generateAIResponse = async (
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  patientProfile: PatientProfile
): Promise<string> => {
  try {
    // Check if API key is configured
    if (!process.env.REACT_APP_OPENAI_API_KEY || process.env.REACT_APP_OPENAI_API_KEY === 'your-openai-api-key-here') {
      // Return a realistic mock response based on the patient profile
      return generateMockResponse(messages[messages.length - 1]?.content || '', patientProfile);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      max_tokens: 200,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "I'm sorry, I didn't understand that. Could you please rephrase your question?";
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to mock response
    return generateMockResponse(messages[messages.length - 1]?.content || '', patientProfile);
  }
};

const generateMockResponse = (userMessage: string, patient: PatientProfile): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
    if (patient.chiefComplaint.toLowerCase().includes('chest')) {
      return "The pain is in my chest, it's quite sharp and sometimes spreads to my left arm. It started about 2 hours ago.";
    } else if (patient.chiefComplaint.toLowerCase().includes('abdominal')) {
      return "I have this cramping pain in my stomach area. It comes and goes, but it's been bothering me since this morning.";
    } else if (patient.chiefComplaint.toLowerCase().includes('head')) {
      return "My head is pounding, especially on the right side. The pain is throbbing and gets worse with bright lights.";
    }
    return `I'm experiencing ${patient.chiefComplaint.toLowerCase()}. It's been quite uncomfortable.`;
  }
  
  if (lowerMessage.includes('when') || lowerMessage.includes('start')) {
    return "It started earlier today, around morning time. It's been getting gradually worse.";
  }
  
  if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
    if (patient.currentMedications.length > 0) {
      return `I'm currently taking ${patient.currentMedications.join(', ')}. I take them as prescribed by my doctor.`;
    }
    return "I'm not taking any medications at the moment.";
  }
  
  if (lowerMessage.includes('allerg')) {
    if (patient.allergies.length > 0) {
      return `Yes, I'm allergic to ${patient.allergies.join(' and ')}. I have to be careful about that.`;
    }
    return "No, I don't have any known allergies.";
  }
  
  if (lowerMessage.includes('history') || lowerMessage.includes('medical')) {
    if (patient.medicalHistory.length > 0) {
      return `I have a history of ${patient.medicalHistory.join(' and ')}. My doctor has been monitoring these conditions.`;
    }
    return "I don't have any significant medical history.";
  }
  
  if (lowerMessage.includes('symptom')) {
    return `Besides the ${patient.chiefComplaint.toLowerCase()}, I've also been experiencing ${patient.symptoms.slice(1).join(', ')}.`;
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return `Hello, I'm ${patient.name}. I'm here because I've been having ${patient.chiefComplaint.toLowerCase()} and I'm quite worried about it.`;
  }
  
  return "Could you please be more specific about what you'd like to know? I'm happy to answer your questions about my condition.";
};

export const generateInterviewSummary = (
  messages: Array<{ content: string; isUser: boolean }>,
  patient: PatientProfile
): {
  symptomsReported: string[];
  possibleDiagnosis: string[];
  performanceAssessment: string;
  completenessScore: number;
} => {
  const userQuestions = messages.filter(m => m.isUser).map(m => m.content.toLowerCase());
  
  const keyAreas = [
    'chief complaint',
    'pain assessment',
    'medical history',
    'medications',
    'allergies',
    'social history',
    'symptom timeline',
    'associated symptoms'
  ];
  
  const askedAbout = keyAreas.filter(area => {
    return userQuestions.some(q => 
      (area === 'chief complaint' && (q.includes('problem') || q.includes('concern') || q.includes('bring'))) ||
      (area === 'pain assessment' && (q.includes('pain') || q.includes('hurt') || q.includes('scale'))) ||
      (area === 'medical history' && (q.includes('history') || q.includes('medical'))) ||
      (area === 'medications' && (q.includes('medication') || q.includes('medicine') || q.includes('drug'))) ||
      (area === 'allergies' && q.includes('allerg')) ||
      (area === 'social history' && (q.includes('smoke') || q.includes('drink') || q.includes('work'))) ||
      (area === 'symptom timeline' && (q.includes('when') || q.includes('start') || q.includes('how long'))) ||
      (area === 'associated symptoms' && (q.includes('other') || q.includes('else') || q.includes('symptom')))
    );
  });
  
  const completenessScore = Math.round((askedAbout.length / keyAreas.length) * 100);
  
  let performanceAssessment = '';
  if (completenessScore >= 80) {
    performanceAssessment = 'Excellent: Comprehensive history taking with good coverage of all key areas.';
  } else if (completenessScore >= 60) {
    performanceAssessment = 'Good: Covered most important areas, but could explore some aspects more thoroughly.';
  } else if (completenessScore >= 40) {
    performanceAssessment = 'Fair: Basic history taking, but missed several important areas of inquiry.';
  } else {
    performanceAssessment = 'Needs Improvement: Limited history taking. Consider asking about medical history, medications, and associated symptoms.';
  }
  
  const possibleDiagnoses = {
    'chest pain': ['Myocardial infarction', 'Angina', 'Pulmonary embolism', 'Costochondritis'],
    'shortness of breath': ['Asthma', 'COPD', 'Heart failure', 'Pneumonia'],
    'abdominal pain': ['Appendicitis', 'Gastroenteritis', 'Peptic ulcer', 'Gallbladder disease'],
    'headache': ['Tension headache', 'Migraine', 'Cluster headache', 'Sinusitis'],
    'fatigue': ['Anemia', 'Thyroid disorder', 'Depression', 'Sleep disorder']
  };
  
  const diagnosis = possibleDiagnoses[patient.chiefComplaint.toLowerCase() as keyof typeof possibleDiagnoses] || ['Further investigation needed'];
  
  return {
    symptomsReported: patient.symptoms,
    possibleDiagnosis: diagnosis,
    performanceAssessment,
    completenessScore
  };
};

