// Backend API integration for OpenAI functionality
const API_BASE_URL = 'http://localhost:5000/api/openai';

export interface PatientProfile {
  name: string;
  age: number;
  gender: string;
  chief_complaint: string;
  symptoms: string[];
  vital_signs: {
    bp: string;
    hr: string;
    temp: string;
    rr: string;
  };
  personality: string;
}

export interface ChatMessage {
  sender: 'user' | 'patient';
  message: string;
  timestamp: Date;
}

export interface InterviewEvaluation {
  score: number;
  areas_covered: string[];
  total_questions: number;
  feedback: string;
  symptoms_reported: string[];
  possible_diagnosis: string;
}

export const generatePatient = async (): Promise<PatientProfile> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to generate patient');
    }

    const data = await response.json();
    return data.patient;
  } catch (error) {
    console.error('Error generating patient:', error);
    // Fallback patient if backend is not available
    return {
      name: "Demo Patient",
      age: 35,
      gender: "Female",
      chief_complaint: "General discomfort",
      symptoms: ["fatigue", "mild pain"],
      vital_signs: {
        bp: "120/80",
        hr: "75",
        temp: "36.5°C",
        rr: "16"
      },
      personality: "cooperative"
    };
  }
};

export const chatWithPatient = async (
  message: string,
  patientProfile: PatientProfile,
  conversationHistory: ChatMessage[]
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        patient_profile: patientProfile,
        conversation_history: conversationHistory,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get patient response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error chatting with patient:', error);
    // Fallback response if backend is not available
    return "I understand. Could you tell me more about what you'd like to know?";
  }
};

export const evaluateInterview = async (
  conversationHistory: ChatMessage[],
  patientProfile: PatientProfile
): Promise<InterviewEvaluation> => {
  try {
    const response = await fetch(`${API_BASE_URL}/evaluate-interview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_history: conversationHistory,
        patient_profile: patientProfile,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to evaluate interview');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error evaluating interview:', error);
    // Fallback evaluation if backend is not available
    return {
      score: 75,
      areas_covered: ["Basic questioning"],
      total_questions: conversationHistory.filter(msg => msg.sender === 'user').length,
      feedback: "Interview completed. Backend evaluation not available.",
      symptoms_reported: patientProfile.symptoms,
      possible_diagnosis: `Related to ${patientProfile.chief_complaint}`
    };
  }
};

