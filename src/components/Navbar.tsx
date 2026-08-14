import React from 'react';
import { useApp, DEMO_STEPS } from '../context/AppContext';
import {
  Sparkles,
  Flame,
  Award,
  Users,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Bot,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    profile,
    xp,
    streak,
    level,
    activeDemoStepIndex,
    nextDemoStep,
    prevDemoStep,
    setShowTeamModal,
    resetToDemoInitialState,
  } = useApp();

  if (currentView === 'landing') {
    return null;
  }

  const currentStep = DEMO_STEPS[activeDemoStepIndex];

  return (
    <header className="sticky top-0 z-30 w-full glass-card border-b border-slate-200/80 px-4 lg:px-6 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Brand & Demo Step */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            title="Return to Landing Page"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-slate-900 tracking-tight text-base leading-none">
                  AI Placement Mentor
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200/60">
                  LIVE DEMO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">by Team INNOVATRIX</p>
            </div>
          </button>

          {/* Judge Demo Stepper Bar */}
          <div className="hidden xl:flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-200 bg-slate-50/80 py-1 px-3 rounded-full border">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Judge Walkthrough:
            </span>
            <button
              onClick={prevDemoStep}
              disabled={activeDemoStepIndex === 0}
              className="p-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Previous Step"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full">
              Step {currentStep.step}/10: {currentStep.label}
            </span>
            <button
              onClick={nextDemoStep}
              disabled={activeDemoStepIndex === DEMO_STEPS.length - 1}
              className="p-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Next Step"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Controls & Gamification */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-semibold"
            title="7 Day Practice Streak!"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streak} Day Streak</span>
          </div>

          {/* XP & Level */}
          <div
            onClick={() => setCurrentView('achievements')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/70 text-purple-800 text-xs font-bold cursor-pointer hover:bg-purple-100/70 transition-colors"
            title="View Achievements & XP Breakdown"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>{xp.toLocaleString()} XP</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-purple-200 text-purple-900 rounded font-semibold">
              Lvl {level}
            </span>
          </div>

          {/* Team Innovatrix Button */}
          <button
            onClick={() => setShowTeamModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 border border-slate-200 transition-colors cursor-pointer"
            title="Meet Team INNOVATRIX"
          >
            <Users className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden md:inline">Team Innovatrix</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={resetToDemoInitialState}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Reset Demo to Initial State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Student Profile Pill */}
          <button
            onClick={() => setCurrentView('profile')}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 transition-colors text-left"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 text-white flex items-center justify-center text-[11px] font-bold">
              {profile.name.charAt(0)}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">{profile.name}</p>
              <p className="text-[10px] text-slate-500 leading-none truncate max-w-[90px]">
                {profile.department.split(' ')[0]} (3rd Yr)
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
