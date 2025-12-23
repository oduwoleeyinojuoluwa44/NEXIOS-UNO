
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  professionalTitle?: string;
  location?: string;
  experienceYears?: number;
  remotePreference?: 'Remote' | 'Hybrid' | 'On-site' | 'Flexible';
  availabilityStatus?: string;
  bio?: string;
  intentStatement?: string;
  profilePhoto?: string;
  preferences?: string[];
  selectionScore?: number;
  activeMatches?: number;
  profileViews?: number;
  proofScore?: number;
}

export interface SkillProof {
  id: string;
  skill: string;
  projectName: string;
  description: string;
  impact: string;
  projectLink?: string;
  supportingMaterials?: string[];
  createdAt: string;
}

export interface Experience {
  id: string;
  companyName: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
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
