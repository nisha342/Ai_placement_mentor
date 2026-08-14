import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANIES_DATA } from '../data/mockData';
import { CompanyData } from '../types';
import {
  Building2,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCode,
  Target,
  Layers,
  Award,
  Clock,
} from 'lucide-react';

export const CompaniesGuide: React.FC = () => {
  const { setCurrentView, triggerCelebration } = useApp();
  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(COMPANIES_DATA[0]);

  const handlePracticeForCompany = () => {
    setCurrentView('practice');
    triggerCelebration();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">
              Placement Intelligence
            </span>
            <span className="text-xs text-slate-500 font-semibold">Tier-1 Company Blueprints</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Target Company Patterns & Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Exam patterns, hiring rounds, coding syllabus, and sample questions for top recruiters.
          </p>
        </div>

        <button
          onClick={handlePracticeForCompany}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Target className="w-3.5 h-3.5" />
          <span>Practice for {selectedCompany.name.split(' ')[0]}</span>
        </button>
      </div>

      {/* Company Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {COMPANIES_DATA.map((company) => {
          const isSelected = selectedCompany.id === company.id;
          return (
            <button
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{company.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Company Detail Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 font-display font-extrabold text-xl flex items-center justify-center border border-indigo-100 shadow-xs">
              {selectedCompany.logoLetter}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-bold text-slate-900">
                  {selectedCompany.name}
                </h3>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                  Cutoff: {selectedCompany.stats.avgTestScoreNeeded}
                </span>
              </div>
              <p className="text-xs text-slate-500">{selectedCompany.tagline}</p>
            </div>
          </div>

          <div className="text-right sm:self-center">
            <p className="text-xs font-bold text-slate-700">CTC Package Range</p>
            <p className="text-xs text-indigo-600 font-bold">{selectedCompany.packageRange}</p>
          </div>
        </div>

        {/* Rounds Breakdown */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            Hiring Selection Rounds
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {selectedCompany.hiringRounds.map((round) => (
              <div
                key={round.roundNumber}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center">
                    {round.roundNumber}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {round.duration}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-800">{round.name}</h5>
                <p className="text-[11px] text-slate-600 leading-relaxed">{round.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Syllabus Highlights */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Priority Syllabus & Focus Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedCompany.technicalTopics.map((s, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-800 text-xs font-semibold border border-indigo-100"
              >
                {s}
              </span>
            ))}
            {selectedCompany.aptitudeTopics.map((s, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-purple-50 text-purple-800 text-xs font-semibold border border-purple-100"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Sample Real Interview Questions */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/40 border border-indigo-100 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-indigo-600" />
            Frequently Asked Interview Questions
          </h4>
          <div className="space-y-2 text-xs text-slate-700">
            {selectedCompany.hrQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl border border-indigo-100 flex items-start gap-2.5"
              >
                <span className="font-bold text-indigo-600 shrink-0">Q{idx + 1}:</span>
                <span className="font-medium">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handlePracticeForCompany}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch {selectedCompany.name.split(' ')[0]} Practice Pack</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
