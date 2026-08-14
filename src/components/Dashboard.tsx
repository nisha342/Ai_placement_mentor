import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  CheckCircle2,
  AlertTriangle,
  Play,
  Flame,
  Award,
  BookOpen,
  Mic,
  GraduationCap,
  Zap,
  Clock,
  ChevronRight,
  Building2,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    profile,
    setCurrentView,
    placementReadiness,
    skillScores,
    roadmap,
    recommendations,
    completedPracticeCount,
  } = useApp();

  const currentWeek = roadmap.find((w) => !w.completed) || roadmap[0];

  return (
    <div className="space-y-6 pb-24">
      {/* Top Welcome & Readiness Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/40 border border-indigo-100 shadow-sm relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-200/40 via-purple-200/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-md">
                Active Candidate Profile
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {profile.year} • {profile.department}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {profile.name} 👋
            </h1>
            <p className="text-sm text-slate-600 max-w-xl">
              Targeting <strong className="text-slate-800">{profile.targetRole}</strong> at{' '}
              <strong className="text-slate-800">{profile.targetCompanies.join(', ')}</strong>.
              Your AI Mentor has synthesized your daily placement targets.
            </p>
          </div>

          {/* Placement Readiness Gauge Card */}
          <div className="shrink-0 bg-white/90 p-4 sm:p-5 rounded-2xl border border-indigo-100/80 shadow-md flex items-center gap-4">
            {/* Radial Percentage Visual */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-600 transition-all duration-1000 ease-out"
                  strokeDasharray={`${placementReadiness}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-display text-xl font-extrabold text-slate-900 leading-none">
                  {placementReadiness}%
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-500 mt-0.5">Readiness</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    placementReadiness >= 75
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {placementReadiness >= 75 ? 'Placement Ready' : 'On Track'}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800 mt-1">
                {placementReadiness >= 75 ? 'Tier-1 Benchmark Met!' : 'Target: 78%+ for Tier-1'}
              </p>
              <button
                onClick={() => setCurrentView('readiness')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-1"
              >
                <span>Full Readiness Report</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 pt-5 border-t border-indigo-100/60">
          <button
            onClick={() => setCurrentView('assessment')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-white hover:bg-indigo-50/70 border border-slate-200 text-slate-700 hover:text-indigo-700 text-xs font-bold transition-all shadow-2xs group"
          >
            <GraduationCap className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
            <span>Take Assessment</span>
          </button>

          <button
            onClick={() => setCurrentView('roadmap')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-white hover:bg-purple-50/70 border border-slate-200 text-slate-700 hover:text-purple-700 text-xs font-bold transition-all shadow-2xs group"
          >
            <BookOpen className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
            <span>Continue Roadmap</span>
          </button>

          <button
            onClick={() => setCurrentView('mock-interview')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-white hover:bg-pink-50/70 border border-slate-200 text-slate-700 hover:text-pink-700 text-xs font-bold transition-all shadow-2xs group"
          >
            <Mic className="w-4 h-4 text-pink-600 group-hover:scale-110 transition-transform" />
            <span>Start Mock Interview</span>
          </button>

          <button
            onClick={() => setCurrentView('practice')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-white hover:bg-emerald-50/70 border border-slate-200 text-slate-700 hover:text-emerald-700 text-xs font-bold transition-all shadow-2xs group"
          >
            <Zap className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span>Practice Weak Area</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Skill Breakdown & AI Mentor Priority */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Mentor High Priority Insight */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-rose-50/60 via-purple-50/40 to-indigo-50/60 border border-rose-200/80 shadow-xs">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-rose-200">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                      AI Mentor Priority 1
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {recommendations[0].title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {recommendations[0].reason}
                  </p>
                  <p className="text-xs font-semibold text-slate-800 mt-2 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-rose-600" />
                    <span>Action: {recommendations[0].recommendedAction}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentView('practice')}
                className="shrink-0 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-200 transition-colors cursor-pointer"
              >
                Start Practice →
              </button>
            </div>
          </div>

          {/* Skill Diagnostic Radar / Bars */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Skill Mastery Diagnostic
                </h3>
                <p className="text-xs text-slate-500">Live accuracy evaluated across placement categories</p>
              </div>
              <button
                onClick={() => setCurrentView('skill-gap')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>View Full Gap Analysis</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {skillScores.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{skill.name}</span>
                    <span
                      className={`font-extrabold ${
                        skill.score >= 75
                          ? 'text-emerald-600'
                          : skill.score >= 60
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {skill.score}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${
                        skill.score >= 75
                          ? 'bg-emerald-500'
                          : skill.score >= 60
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>
                      {skill.score >= 75
                        ? '🟢 Strong Pillar'
                        : skill.score >= 60
                        ? '🟡 Moderate'
                        : '🔴 Needs Focus'}
                    </span>
                    <span>Assessed {skill.lastAssessed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Goals & Recommended Activities */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <h3 className="font-display text-base font-bold text-slate-900">
                  Today's Placement Sprint
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {completedPracticeCount}/5 Tasks Done
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="line-through text-slate-500 font-medium">
                    Review Python mutable vs immutable objects
                  </span>
                </div>
                <span className="text-emerald-700 font-bold">+50 XP</span>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-indigo-200 flex items-center justify-between text-xs hover:bg-indigo-50/50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-400" />
                  <span className="font-bold text-slate-800">
                    Solve 2 Two-Pointer Array problems (Week 2 Sprint)
                  </span>
                </div>
                <button
                  onClick={() => setCurrentView('practice')}
                  className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[11px]"
                >
                  Start →
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-purple-200 flex items-center justify-between text-xs hover:bg-purple-50/50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border-2 border-purple-400" />
                  <span className="font-bold text-slate-800">
                    Simulate 1 AI Technical Mock Interview (Python/DSA)
                  </span>
                </div>
                <button
                  onClick={() => setCurrentView('mock-interview')}
                  className="px-3 py-1 rounded-lg bg-purple-600 text-white font-bold text-[11px]"
                >
                  Practice →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Roadmap Status & Target Companies */}
        <div className="space-y-6">
          {/* Active Roadmap Card */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                Active Week
              </span>
              <span className="text-xs font-bold text-slate-500">Week 2 of 6</span>
            </div>

            <div>
              <h4 className="font-display text-base font-bold text-slate-900">
                {currentWeek.title}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">{currentWeek.subtitle}</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Module Progress</span>
                <span className="font-bold text-indigo-600">{currentWeek.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                  style={{ width: `${currentWeek.progress}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-[11px] font-bold text-slate-700 block">Topics In Scope:</span>
              <ul className="text-xs text-slate-600 space-y-1">
                {currentWeek.topics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setCurrentView('roadmap')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Full 6-Week Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Target Companies Overview */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>Target Companies</span>
              </h4>
              <button
                onClick={() => setCurrentView('companies')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                All 5 →
              </button>
            </div>

            <div className="space-y-2">
              {['TCS', 'Infosys', 'Accenture'].map((company, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentView('companies')}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-200 flex items-center justify-between text-xs cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                      {company.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{company}</p>
                      <p className="text-[10px] text-slate-500">
                        {company === 'TCS'
                          ? 'NQT & Digital Roles'
                          : company === 'Infosys'
                          ? 'Specialist Programmer'
                          : 'Associate Software Eng'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Cutoff: 70%+</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
