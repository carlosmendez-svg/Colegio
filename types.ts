
export interface StateData {
  id: string;
  name: string;
  capital: string;
  region: string;
  flagUrl: string;
  description: string;
}

export interface GroundingSource {
  title?: string;
  uri?: string;
}

export interface DetailedStateInfo {
  social: string;
  economic: string;
  political: string;
  currentNews: string;
  sources: GroundingSource[];
}

export interface PlaceSuggestion {
  name: string;
  uri: string;
  snippet?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: GroundingSource[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
