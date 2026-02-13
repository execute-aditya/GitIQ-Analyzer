export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
  has_readme: boolean;
}

export interface AnalysisMetrics {
  totalStars: number;
  repoCount: number;
  languages: Record<string, number>;
  readmeRatio: number;
  activityScore: number;
  accountAgeDays: number;
  followersScore: number;
}

export interface AIEvaluation {
  hiringSignal: string;
  technicalStrengths: string[];
  skillGaps: string[];
  improvementRoadmap: string[];
  overallSummary: string;
}

export interface AnalysisResult {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  metrics: AnalysisMetrics;
  aiEvaluation: AIEvaluation;
  improvements: Improvement[];
}

export interface Improvement {
  tip: string;
  impact: 'high' | 'medium' | 'low';
}

export interface RecentAnalysis {
  username: string;
  avatarUrl: string;
  analyzedAt: string;
}
