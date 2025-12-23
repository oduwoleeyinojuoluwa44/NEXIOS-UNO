
export interface User {
  id: string;
  username: string;
  gmail?: string;
  email?: string;
  fullName: string;
  professionalTitle?: string;
  country?: string;
  street?: string;
  bio?: string;
  profilePhoto?: string;
  preferences?: string[];
  selectionScore?: number;
  activeMatches?: number;
  profileViews?: number;
  proofScore?: number;
}

export interface SkillProof {
  id: string;
  name: string;
  level: string;
  projectName?: string;
  description?: string;
  impact?: string;
  projectLink?: string;
  supportingMaterials?: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

export interface ProblemResponse {
  id: string;
  question: string;
  response: string;
  impact?: string;
}

export interface Analytics {
  selectionScore: number;
  activeMatches: number;
  applicationsOut: number;
  profileViews: number;
  scoreTrend?: number;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
