import React from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Award,
  BarChart,
  CheckCircle2,
  Calendar,
  Zap,
  Target,
  ArrowUpRight,
  Sparkles,
  Building2,
  Flame,
} from 'lucide-react';

export const Analytics: React.FC = () => {
  const {
    placementReadiness,
    skillScores,
    completedPracticeCount,
    interviewEvaluations,
    xp,
    streakDays,
    setCurrentView,
  } = useApp();

  // Readiness Timeline Points
  const timelinePoints = [
    { day: 'Day 1 (Diagnostic)', score: 58 },
    { day: 'Day 3 (Sprint 1)', score: 64 },
    { day: 'Day 5 (Sprint 2)', score: 68 },
    { day: 'Current Readiness', score: placementReadiness },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">
              Placement Telemetry
            </span>
            <span className="text-xs text-slate-500 font-semibold">Continuous Performance Analytics</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Performance Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time trajectory tracking your placement readiness growth, skill velocity, and interview scores.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-center min-w-[90px]">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">Streak</span>
            <span className="text-xl font-extrabold text-amber-900 leading-tight">🔥 {streakDays} Days</span>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-center min-w-[90px]">
            <span className="text-[10px] uppercase font-bold text-purple-700 block">Total XP</span>
            <span className="text-xl font-extrabold text-purple-900 leading-tight">{xp}</span>
          </div>
        </div>
      </div>

      {/* Placement Readiness Growth Trajectory Chart Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>Placement Readiness Trajectory</span>
            </h3>
            <p className="text-xs text-slate-500">Growth from baseline diagnostic to current standing</p>
          </div>
          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full self-start">
            +{(placementReadiness - 58)}% Improvement
          </span>
        </div>

        {/* Visual Bar Progression */}
        <div className="grid grid-cols-4 gap-3 pt-2">
          {timelinePoints.map((pt, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-2">
              <span className="text-sm font-extrabold text-slate-900">{pt.score}%</span>
              <div className="w-full bg-slate-100 rounded-2xl h-32 flex flex-col justify-end p-1.5 overflow-hidden">
                <div
                  className={`w-full rounded-xl transition-all duration-1000 ${
                    idx === timelinePoints.length - 1
                      ? 'bg-gradient-to-t from-indigo-600 to-purple-600 shadow-md shadow-indigo-200'
                      : 'bg-indigo-300/80'
                  }`}
                  style={{ height: `${(pt.score / 100) * 100}%` }}
                />
              </div>
              <span className="text-[11px] font-semibold text-slate-500 text-center leading-tight">
                {pt.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Mastery Velocity & Weak Area Recovery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Skill Breakdown */}
        <div className="glass-card p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart className="w-4 h-4 text-purple-600" />
            <span>Category Proficiency Matrix</span>
          </h3>

          <div className="space-y-3 pt-1">
            {skillScores.map((skill, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{skill.name}</span>
                  <span className="font-bold text-slate-900">{skill.score}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      skill.score >= 75
                        ? 'bg-emerald-500'
                        : skill.score >= 60
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Cutoff Benchmarks */}
        <div className="glass-card p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>Company Cutoff Benchmark</span>
          </h3>

          <div className="space-y-3 pt-1">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">TCS (Digital / Ninja)</p>
                <p className="text-[10px] text-slate-500">Cutoff: 70% • Current: {placementReadiness}%</p>
              </div>
              <span
                className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                  placementReadiness >= 70
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {placementReadiness >= 70 ? 'Qualified' : 'Borderline'}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">Infosys (Specialist Programmer)</p>
                <p className="text-[10px] text-slate-500">Cutoff: 72% • Current: {placementReadiness}%</p>
              </div>
              <span
                className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                  placementReadiness >= 72
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {placementReadiness >= 72 ? 'Qualified' : 'Requires DSA Sprint'}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">Accenture (Associate SE)</p>
                <p className="text-[10px] text-slate-500">Cutoff: 65% • Current: {placementReadiness}%</p>
              </div>
              <span className="font-bold px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800">
                Target Exceeded
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Interview Historical Telemetry */}
      {interviewEvaluations.length > 0 && (
        <div className="glass-card p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-display text-base font-bold text-slate-900">
            Recent Mock Interview Rubrics
          </h3>

          <div className="space-y-3">
            {interviewEvaluations.map((ev, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Technical Session {i + 1}</span>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      Score: {ev.overallScore}% ({ev.verdict})
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1">"{ev.feedback}"</p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <span className="px-2 py-1 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                    Tech: {ev.technicalAccuracy}%
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-purple-100 text-purple-800 font-bold text-[10px]">
                    Comm: {ev.communication}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
