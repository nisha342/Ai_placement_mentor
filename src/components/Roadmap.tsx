import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RoadmapWeek } from '../types';
import {
  Map,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Play,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  Video,
  Target,
  Zap,
} from 'lucide-react';

export const Roadmap: React.FC = () => {
  const { roadmap, setRoadmap, setCurrentView, triggerCelebration } = useApp();
  const [expandedWeek, setExpandedWeek] = useState<number>(2); // Default to Week 2

  const toggleExpand = (weekNum: number) => {
    setExpandedWeek(expandedWeek === weekNum ? 0 : weekNum);
  };

  const handleStartPractice = (week: RoadmapWeek) => {
    setCurrentView('practice');
    triggerCelebration();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
              AI Personalized Curriculum
            </span>
            <span className="text-xs text-slate-500 font-semibold">6-Week Sprint</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Placement Learning Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tailored dynamically to bridge your DSA and Communication gaps for TCS, Infosys & Accenture drives.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('practice')}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Launch Today's Practice</span>
        </button>
      </div>

      {/* 6-Week Interactive Roadmap Cards */}
      <div className="space-y-4">
        {roadmap.map((week) => {
          const isExpanded = expandedWeek === week.weekNumber;
          const isCurrentActive = week.weekNumber === 2;

          return (
            <div
              key={week.weekNumber}
              className={`glass-card rounded-3xl border transition-all overflow-hidden ${
                isCurrentActive
                  ? 'border-indigo-300 ring-2 ring-indigo-100/80 shadow-md bg-white'
                  : week.completed
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {/* Card Header (Clickable) */}
              <div
                onClick={() => toggleExpand(week.weekNumber)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* Week Badge */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-extrabold text-sm shrink-0 shadow-xs ${
                      week.completed
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isCurrentActive
                        ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-indigo-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {week.completed ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      `W${week.weekNumber}`
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        WEEK {week.weekNumber}
                      </span>
                      {isCurrentActive && (
                        <span className="text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                          CURRENT SPRINT
                        </span>
                      )}
                      {week.completed && (
                        <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-tight mt-0.5">
                      {week.title}
                    </h3>
                    <p className="text-xs text-slate-500">{week.subtitle}</p>
                  </div>
                </div>

                {/* Progress & Meta Badges */}
                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{week.estimatedHours} Hours</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${
                        week.difficulty === 'Beginner'
                          ? 'bg-emerald-50 text-emerald-700'
                          : week.difficulty === 'Intermediate'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {week.difficulty}
                    </span>
                  </div>

                  {/* Radial or linear small progress */}
                  <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden hidden md:block">
                    <div
                      className={`h-2 rounded-full ${
                        week.completed
                          ? 'bg-emerald-500'
                          : isCurrentActive
                          ? 'bg-indigo-600'
                          : 'bg-slate-300'
                      }`}
                      style={{ width: `${week.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-700 min-w-[32px] text-right">
                    {week.progress}%
                  </span>

                  <div className="p-1 rounded-full text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Card Details */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 bg-slate-50/40">
                  {/* Topic Checkpoints */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Key Topic Syllabus
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {week.topics.map((topic, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Resources */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Curated AI Learning Resources
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {week.resources.map((res, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-2 hover:border-indigo-300 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                              {res.type === 'Video' ? (
                                <Video className="w-3.5 h-3.5" />
                              ) : res.type === 'Article' ? (
                                <FileText className="w-3.5 h-3.5" />
                              ) : res.type === 'Cheat Sheet' ? (
                                <BookOpen className="w-3.5 h-3.5" />
                              ) : (
                                <Target className="w-3.5 h-3.5" />
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[140px]">
                                {res.title}
                              </p>
                              <p className="text-[10px] text-slate-400">{res.duration}</p>
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500">
                      Estimated workload: ~{week.estimatedHours} hours this week
                    </span>
                    <button
                      onClick={() => handleStartPractice(week)}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Start Week {week.weekNumber} Practice</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
