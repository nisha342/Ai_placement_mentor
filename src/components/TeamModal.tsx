import React from 'react';
import { useApp } from '../context/AppContext';
import { TEAM_INFO } from '../data/mockData';
import {
  Users,
  Award,
  Sparkles,
  BookOpen,
  GraduationCap,
  X,
  CheckCircle2,
  Cpu,
  Target,
} from 'lucide-react';

export const TeamModal: React.FC = () => {
  const { showTeamModal, setShowTeamModal } = useApp();

  if (!showTeamModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Pastel Accent Background */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400" />

        <button
          onClick={() => setShowTeamModal(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
                Team {TEAM_INFO.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                Hackathon 2025
              </span>
            </div>
            <p className="text-sm text-slate-500">{TEAM_INFO.tagline}</p>
          </div>
        </div>

        {/* Institution Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-indigo-500 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase text-slate-400">College</p>
              <p className="text-sm font-bold text-slate-800">{TEAM_INFO.college}</p>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <Cpu className="w-5 h-5 text-purple-500 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase text-slate-400">Department</p>
              <p className="text-sm font-bold text-slate-800">{TEAM_INFO.department}</p>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600" />
            Project Contributors
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Team Head */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {TEAM_INFO.head.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{TEAM_INFO.head}</p>
                  <p className="text-xs text-indigo-600 font-semibold">Team Head & Architecture</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-600 text-white">
                LEAD
              </span>
            </div>

            {/* Members */}
            {TEAM_INFO.members.map((member, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                  {member.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{member}</p>
                  <p className="text-xs text-slate-500">Core Developer & AI Specialist</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Innovation Highlights */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/60 via-purple-50/40 to-pink-50/60 border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide">
              The Innovatrix AI Placement Framework
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Engineered to bridge the fragmented placement preparation cycle for engineering students.
            Combines multi-modal evaluation, dynamic gap detection, and customized roadmap generation into one seamless interface.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowTeamModal(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
