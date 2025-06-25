export interface UserData {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  image?: string;
  lesionArea: string;
}

export interface SkinAnalysisResult {
  diagnosis: 'nv' | 'mel' | 'bkl' | 'bcc' | 'akiec' | 'vasc' | 'df';
  confidence: number;
  findings: string;
  recommendations: string[];
  urgency: 'routine' | 'soon' | 'urgent' | 'immediate';
  nextSteps: string[];
  diagnosisName: string;
  description: string;
}