export type ViewType =
  | 'landing'
  | 'dashboard'
  | 'assessment'
  | 'skill-gap'
  | 'roadmap'
  | 'practice'
  | 'mentor'
  | 'mock-interview'
  | 'companies'
  | 'analytics'
  | 'readiness'
  | 'achievements'
  | 'profile';

export interface StudentProfile {
  name: string;
  department: string;
  college: string;
  year: string;
  targetRole: string;
  targetCompanies: string[];
  skills: string[];
  avatarUrl?: string;
  email: string;
}

export interface SkillScore {
  name: string;
  category: 'technical' | 'aptitude' | 'soft-skills';
  score: number;
  status: 'strong' | 'moderate' | 'weak';
  topicCount: number;
  completedTopics: number;
  lastAssessed: string;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  category: 'Aptitude' | 'Logical Reasoning' | 'Verbal Ability' | 'Python' | 'SQL' | 'DSA' | 'HR';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  codeSnippet?: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  topic: string;
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  subtitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  completed: boolean;
  progress: number;
  topics: string[];
  resources: {
    title: string;
    type: 'Video' | 'Article' | 'Practice' | 'Cheat Sheet';
    url: string;
    duration: string;
  }[];
  practiceQuizId?: string;
}

export interface Recommendation {
  id: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  topic: string;
  reason: string;
  currentAccuracy: string;
  recommendedAction: string;
  targetView: ViewType;
  badge: string;
  color: string;
}

export interface InterviewEvaluation {
  technicalAccuracy: number;
  communication: number;
  confidence: number;
  completeness: number;
  overallScore: number;
  verdict: string;
  feedback: string;
  idealPointsCovered: string[];
  missedKeyPoints: string[];
  improvedSampleAnswer: string;
}

export interface CompanyData {
  id: string;
  name: string;
  tagline: string;
  logoLetter: string;
  color: string;
  accentBg: string;
  packageRange: string;
  hiringRounds: {
    roundNumber: number;
    name: string;
    description: string;
    duration: string;
    cutoff: string;
  }[];
  aptitudeTopics: string[];
  technicalTopics: string[];
  hrQuestions: string[];
  stats: {
    hiringRatio: string;
    avgTestScoreNeeded: string;
    difficulty: 'Moderate' | 'High' | 'Very High';
  };
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
  category: 'Assessment' | 'Practice' | 'Interview' | 'Streak';
}
