import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  GitFork,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BrainCircuit,
  Target,
  BarChart,
  Layers,
} from 'lucide-react';

export const SkillGapAnalysis: React.FC = () => {
  const { setCurrentView, placementReadiness, triggerCelebration } = useApp();

  const handleGenerateRoadmap = () => {
    setCurrentView('roadmap');
    triggerCelebration();
  };

  const skillGaps = [
    { name: 'Python Fundamentals', score: 82, status: 'strong', category: 'Technical' },
    { name: 'SQL & Database Queries', score: 74, status: 'strong', category: 'Technical' },
    { name: 'Data Structures & Algo (DSA)', score: 45, status: 'weak', category: 'Technical Problem Solving' },
    { name: 'Quantitative Aptitude', score: 61, status: 'moderate', category: 'Cognitive' },
    { name: 'Communication & HR Fluency', score: 58, status: 'weak', category: 'Behavioral' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-2xl -z-10 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md">
                AI Diagnostic Engine
              </span>
              <span className="text-xs text-slate-500 font-semibold">Tier-1 Company Benchmark</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Skill Gap & Readiness Analysis
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Multi-dimensional analysis comparing your profile against TCS, Infosys & Accenture hiring cutoffs.
            </p>
          </div>

          {/* Large Circular Readiness Score */}
          <div className="shrink-0 p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 text-center min-w-[140px] shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 block">
              Placement Readiness
            </span>
            <span className="font-display text-4xl font-extrabold text-slate-900 leading-tight block">
              {placementReadiness}%
            </span>
            <span className="text-[11px] font-bold text-amber-600 bg-amber-100/80 px-2 py-0.5 rounded-full inline-block mt-1">
              Baseline Assessed
            </span>
          </div>
        </div>
      </div>

      {/* AI Mentor Synthesis Insight Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 text-white shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2.5 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-indigo-300" />
          <span>AI Mentor Diagnostic Insight</span>
        </div>
        <p className="text-base sm:text-lg font-medium leading-relaxed text-indigo-50">
          "Your Python and SQL fundamentals are strong. Your highest improvement opportunities are DSA problem solving and communication."
        </p>
        <p className="text-xs text-indigo-200 leading-relaxed max-w-2xl">
          By completing the 6-week tailored roadmap with targeted Arrays/Strings drills and voice mock interviews, your readiness will accelerate from <strong>68%</strong> to <strong>78%+</strong>.
        </p>
      </div>

      {/* Strong vs Weak Areas Two-Column Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Strong Areas Card */}
        <div className="glass-card p-6 rounded-3xl bg-white border border-emerald-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900">Strong Areas</h3>
              <p className="text-xs text-emerald-700 font-semibold">Exceeds 70% Cutoff Threshold</p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Python</p>
                <p className="text-[11px] text-slate-500">OOPs, Mutability, Collections</p>
              </div>
              <span className="text-base font-extrabold text-emerald-600">82%</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">SQL & Databases</p>
                <p className="text-[11px] text-slate-500">Joins, Grouping, Aggregations</p>
              </div>
              <span className="text-base font-extrabold text-emerald-600">74%</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            Recommendation: Maintain these strengths through weekly booster quizzes while diverting 70% of study time to weak areas.
          </p>
        </div>

        {/* Weak Areas Card */}
        <div className="glass-card p-6 rounded-3xl bg-white border border-rose-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
              !
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900">Weak Areas (Gap Focus)</h3>
              <p className="text-xs text-rose-700 font-semibold">Requires Targeted Roadmap Sprints</p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Data Structures & Algo (DSA)</p>
                <p className="text-[11px] text-rose-700 font-semibold">Binary Search, Two-Pointer (Gap)</p>
              </div>
              <span className="text-base font-extrabold text-rose-600">45%</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Communication & HR</p>
                <p className="text-[11px] text-amber-700 font-semibold">STAR Method, Project Delivery</p>
              </div>
              <span className="text-base font-extrabold text-amber-600">58%</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Quantitative Aptitude</p>
                <p className="text-[11px] text-slate-500">Speed Math, Time & Distance</p>
              </div>
              <span className="text-base font-extrabold text-amber-600">61%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer to Generate Roadmap */}
      <div className="p-6 rounded-3xl bg-white border border-indigo-200 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-display text-base font-bold text-slate-900">
            Ready to Bridge Your Skill Gaps?
          </h4>
          <p className="text-xs text-slate-500">
            Our AI engine will dynamically generate a 6-week curriculum tailored to your profile.
          </p>
        </div>

        <button
          onClick={handleGenerateRoadmap}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>GENERATE MY ROADMAP</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
