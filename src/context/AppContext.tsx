import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  ViewType,
  StudentProfile,
  SkillScore,
  RoadmapWeek,
  Recommendation,
  AchievementBadge,
  InterviewEvaluation,
} from '../types';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_SKILL_SCORES,
  ROADMAP_WEEKS,
  RECOMMENDATIONS,
  INITIAL_ACHIEVEMENTS,
} from '../data/mockData';

export interface DemoStep {
  step: number;
  label: string;
  view: ViewType;
  description: string;
}

export const DEMO_STEPS: DemoStep[] = [
  { step: 1, label: 'Dashboard', view: 'dashboard', description: 'Overview & 68% Readiness Score' },
  { step: 2, label: 'AI Assessment', view: 'assessment', description: 'Multi-topic adaptive test' },
  { step: 3, label: 'Skill Gap', view: 'skill-gap', description: 'AI detects DSA & Comm gaps' },
  { step: 4, label: 'Roadmap', view: 'roadmap', description: '6-Week personalized curriculum' },
  { step: 5, label: 'Adaptive Practice', view: 'practice', description: 'Aptitude & Tech questions with explanations' },
  { step: 6, label: 'AI Mentor', view: 'mentor', description: 'Priority actions & Live AI advice' },
  { step: 7, label: 'AI Mock Interview', view: 'mock-interview', description: 'Voice/Text interview simulator' },
  { step: 8, label: 'Companies', view: 'companies', description: 'TCS, Infosys, Accenture patterns' },
  { step: 9, label: 'Analytics', view: 'analytics', description: 'Deep performance & progress trends' },
  { step: 10, label: 'Placement Readiness', view: 'readiness', description: 'Milestone 78% score achieved!' },
];

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  skillScores: SkillScore[];
  setSkillScores: React.Dispatch<React.SetStateAction<SkillScore[]>>;
  roadmap: RoadmapWeek[];
  setRoadmap: React.Dispatch<React.SetStateAction<RoadmapWeek[]>>;
  recommendations: Recommendation[];
  achievements: AchievementBadge[];
  setAchievements: React.Dispatch<React.SetStateAction<AchievementBadge[]>>;
  placementReadiness: number;
  setPlacementReadiness: (score: number) => void;
  completedAssessment: boolean;
  setCompletedAssessment: (val: boolean) => void;
  completedPracticeCount: number;
  incrementPracticeCount: () => void;
  interviewEvaluations: InterviewEvaluation[];
  addInterviewEvaluation: (evaluation: InterviewEvaluation) => void;
  xp: number;
  addXP: (amount: number, reason?: string) => void;
  streak: number;
  level: number;
  activeDemoStepIndex: number;
  setActiveDemoStepIndex: (index: number) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  jumpToDemoStep: (stepNumber: number) => void;
  showTeamModal: boolean;
  setShowTeamModal: (show: boolean) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  triggerCelebration: () => void;
  resetToDemoInitialState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [skillScores, setSkillScores] = useState<SkillScore[]>(INITIAL_SKILL_SCORES);
  const [roadmap, setRoadmap] = useState<RoadmapWeek[]>(ROADMAP_WEEKS);
  const [recommendations] = useState<Recommendation[]>(RECOMMENDATIONS);
  const [achievements, setAchievements] = useState<AchievementBadge[]>(INITIAL_ACHIEVEMENTS);
  
  // Placement readiness starts at 68% and dynamically increases to 78%+
  const [placementReadiness, setPlacementReadiness] = useState<number>(68);
  const [completedAssessment, setCompletedAssessment] = useState<boolean>(false);
  const [completedPracticeCount, setCompletedPracticeCount] = useState<number>(3);
  const [interviewEvaluations, setInterviewEvaluations] = useState<InterviewEvaluation[]>([]);
  
  const [xp, setXp] = useState<number>(1450);
  const [streak] = useState<number>(7);
  const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [activeDemoStepIndex, setActiveDemoStepIndex] = useState<number>(0);

  // Level based on XP
  const level = Math.floor(xp / 500) + 1;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#818CF8', '#A78BFA', '#34D399', '#60A5FA', '#F472B6'],
      });
    } catch {
      // safe fallback
    }
  };

  const addXP = (amount: number, reason?: string) => {
    setXp((prev) => {
      const next = prev + amount;
      return next;
    });
    if (amount >= 100) {
      triggerCelebration();
    }
  };

  const incrementPracticeCount = () => {
    setCompletedPracticeCount((prev) => {
      const updated = prev + 1;
      // Boost readiness as student works through practice
      if (updated >= 5 && placementReadiness < 75) {
        setPlacementReadiness(74);
      }
      return updated;
    });
    // Boost DSA skill score
    setSkillScores((prev) =>
      prev.map((s) => (s.name.includes('DSA') ? { ...s, score: Math.min(s.score + 6, 88) } : s))
    );
  };

  const addInterviewEvaluation = (evaluation: InterviewEvaluation) => {
    setInterviewEvaluations((prev) => [evaluation, ...prev]);
    addXP(150, 'Completed AI Mock Interview');
    // Bump communication skill score and overall readiness to 78%
    setSkillScores((prev) =>
      prev.map((s) => (s.name.includes('Communication') ? { ...s, score: Math.min(s.score + 10, 80) } : s))
    );
    if (placementReadiness < 78) {
      setPlacementReadiness(78);
      // unlock milestone achievement
      setAchievements((prev) =>
        prev.map((a) => (a.id === 'ach-6' ? { ...a, unlocked: true, unlockedAt: 'Just now' } : a))
      );
    }
  };

  const nextDemoStep = () => {
    if (activeDemoStepIndex < DEMO_STEPS.length - 1) {
      const nextIdx = activeDemoStepIndex + 1;
      setActiveDemoStepIndex(nextIdx);
      setCurrentView(DEMO_STEPS[nextIdx].view);
    }
  };

  const prevDemoStep = () => {
    if (activeDemoStepIndex > 0) {
      const prevIdx = activeDemoStepIndex - 1;
      setActiveDemoStepIndex(prevIdx);
      setCurrentView(DEMO_STEPS[prevIdx].view);
    }
  };

  const jumpToDemoStep = (stepNumber: number) => {
    const idx = DEMO_STEPS.findIndex((s) => s.step === stepNumber);
    if (idx !== -1) {
      setActiveDemoStepIndex(idx);
      setCurrentView(DEMO_STEPS[idx].view);
    }
  };

  // Keep active demo step synced with currentView when user navigates manually
  useEffect(() => {
    const idx = DEMO_STEPS.findIndex((s) => s.view === currentView);
    if (idx !== -1) {
      setActiveDemoStepIndex(idx);
    }
  }, [currentView]);

  const resetToDemoInitialState = () => {
    setProfile(INITIAL_STUDENT_PROFILE);
    setSkillScores(INITIAL_SKILL_SCORES);
    setRoadmap(ROADMAP_WEEKS);
    setPlacementReadiness(68);
    setCompletedAssessment(false);
    setCompletedPracticeCount(3);
    setInterviewEvaluations([]);
    setXp(1450);
    setCurrentView('dashboard');
    setActiveDemoStepIndex(0);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        profile,
        setProfile,
        skillScores,
        setSkillScores,
        roadmap,
        setRoadmap,
        recommendations,
        achievements,
        setAchievements,
        placementReadiness,
        setPlacementReadiness,
        completedAssessment,
        setCompletedAssessment,
        completedPracticeCount,
        incrementPracticeCount,
        interviewEvaluations,
        addInterviewEvaluation,
        xp,
        addXP,
        streak,
        level,
        activeDemoStepIndex,
        setActiveDemoStepIndex,
        nextDemoStep,
        prevDemoStep,
        jumpToDemoStep,
        showTeamModal,
        setShowTeamModal,
        showAuthModal,
        setShowAuthModal,
        triggerCelebration,
        resetToDemoInitialState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
