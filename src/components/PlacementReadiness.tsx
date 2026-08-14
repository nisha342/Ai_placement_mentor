import React from 'react';
import { useApp } from '../context/AppContext';
import { TEAM_INFO } from '../data/mockData';
import {
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
  Share2,
  Building2,
  GraduationCap,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const PlacementReadiness: React.FC = () => {
  const { profile, placementReadiness, setCurrentView, triggerCelebration } = useApp();

  const isReady = placementReadiness >= 75;

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
              Placement Readiness Certificate & Report
            </span>
            <span className="text-xs text-slate-500 font-semibold">Tier-1 Eligibility Verified</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Placement Readiness Index
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Comprehensive evaluation certificate benchmarked for campus placements.
          </p>
        </div>

        <button
          onClick={handlePrintCertificate}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Official Report</span>
        </button>
      </div>

      {/* Official Placement Readiness Certificate Card */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30 border-2 border-indigo-200 shadow-xl space-y-8 relative overflow-hidden">
        {/* Certificate Watermark / Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-100 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 font-bold">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-md">
                Verified AI Diagnostic
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                AI PLACEMENT MENTOR SCORECARD
              </h2>
              <p className="text-xs text-slate-500">
                Issued by Team {TEAM_INFO.name} • {TEAM_INFO.college}
              </p>
            </div>
          </div>

          {/* Big Circular Score */}
          <div className="text-center bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm min-w-[130px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Readiness Score
            </span>
            <span className="font-display text-4xl font-extrabold text-slate-900 leading-tight block">
              {placementReadiness}%
            </span>
            <span
              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                isReady ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isReady ? 'Placement Ready' : 'On Track'}
            </span>
          </div>
        </div>

        {/* Candidate Profile Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
            <p className="text-[10px] font-bold uppercase text-slate-400">Candidate Name</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{profile.name}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
            <p className="text-[10px] font-bold uppercase text-slate-400">Academic Year</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{profile.year}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
            <p className="text-[10px] font-bold uppercase text-slate-400">Department</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{profile.department}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
            <p className="text-[10px] font-bold uppercase text-slate-400">Target Role</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{profile.targetRole}</p>
          </div>
        </div>

        {/* 4 Pillars Breakdown */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Placement Evaluation Pillars
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Technical Knowledge (Python & SQL)</span>
                <span className="text-emerald-600">78%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[78%]" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Algorithmic Problem Solving (DSA)</span>
                <span className="text-indigo-600">{isReady ? '74%' : '55%'}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: isReady ? '74%' : '55%' }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Communication & Fluency (HR/Mock)</span>
                <span className="text-purple-600">{isReady ? '76%' : '65%'}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: isReady ? '76%' : '65%' }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Quantitative & Logical Aptitude</span>
                <span className="text-amber-600">66%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full w-[66%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Company Readiness Eligibility Matrix */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>Target Company Clearance Matrix</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">TCS</p>
                <p className="text-[10px] text-slate-500">Cutoff: 70%</p>
              </div>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Cleared</span>
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Infosys</p>
                <p className="text-[10px] text-slate-500">Cutoff: 72%</p>
              </div>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Cleared</span>
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Accenture</p>
                <p className="text-[10px] text-slate-500">Cutoff: 65%</p>
              </div>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Cleared</span>
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps for Candidate */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Recommended Next Actions to Maintain 80%+
          </h4>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px]">
                1
              </span>
              <span className="text-slate-700">
                Complete <strong>Week 3 Problem Solving</strong> (Trees & Binary Search).
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-[10px]">
                2
              </span>
              <span className="text-slate-700">
                Attend <strong>2 more AI Mock Interviews</strong> to cement STAR responses.
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-[10px]">
                3
              </span>
              <span className="text-slate-700">
                Practice <strong>Quantitative Aptitude speed drills</strong> (Time & Distance).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
