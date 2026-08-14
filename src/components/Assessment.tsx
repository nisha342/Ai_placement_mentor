import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ASSESSMENT_QUESTIONS } from '../data/mockData';
import {
  GraduationCap,
  Timer,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Bot,
  BrainCircuit,
  Zap,
} from 'lucide-react';

export const Assessment: React.FC = () => {
  const { setCurrentView, setCompletedAssessment, addXP, triggerCelebration } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isAnalyzing || showSummary) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isAnalyzing, showSummary]);

  const currentQ = ASSESSMENT_QUESTIONS[currentIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const isAnswered = Boolean(selectedAnswers[currentQ.id]);

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitAssessment = () => {
    setIsSubmitting(true);
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowSummary(true);
      setCompletedAssessment(true);
      addXP(200, 'Completed Comprehensive Skill Assessment');
      triggerCelebration();
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isAnalyzing) {
    return (
      <div className="glass-card p-10 sm:p-16 rounded-3xl bg-white border border-indigo-100 shadow-xl text-center max-w-xl mx-auto my-12 space-y-6">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-ping" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-200 animate-spin">
            <BrainCircuit className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            AI Multi-Modal Engine
          </span>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Analyzing Your Skill Vectors...
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Cross-referencing your algorithmic tracing, aptitude timing, and error patterns against TCS, Infosys & Accenture benchmarks.
          </p>
        </div>

        <div className="space-y-2 max-w-xs mx-auto text-left text-xs text-slate-600">
          <div className="flex items-center gap-2 text-emerald-600 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Python & SQL Accuracy Verified (82% & 74%)</span>
          </div>
          <div className="flex items-center gap-2 text-rose-600 font-semibold">
            <AlertCircle className="w-4 h-4" />
            <span>DSA Binary Search Complexity Gap Identified (45%)</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Generating Personalized 6-Week Roadmap...</span>
          </div>
        </div>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div className="glass-card p-6 sm:p-10 rounded-3xl bg-white border border-indigo-100 shadow-xl max-w-2xl mx-auto my-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl shadow-xs">
            ✓
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Assessment Completed
            </span>
            <h2 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
              Skill Diagnostic Successfully Processed
            </h2>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 space-y-2">
          <h4 className="text-xs font-bold uppercase text-indigo-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            AI Diagnostic Summary
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            You completed <strong>{totalQuestions} benchmark questions</strong> across Aptitude, Logical Reasoning, Verbal Ability, Python, SQL, and DSA.
            Your baseline placement readiness score is set at <strong>68%</strong>.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] text-slate-500 font-semibold uppercase">Python</p>
            <p className="text-lg font-bold text-emerald-600">82%</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] text-slate-500 font-semibold uppercase">SQL</p>
            <p className="text-lg font-bold text-emerald-600">74%</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] text-slate-500 font-semibold uppercase">DSA</p>
            <p className="text-lg font-bold text-rose-600">45% (Gap)</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] text-slate-500 font-semibold uppercase">Aptitude</p>
            <p className="text-lg font-bold text-amber-600">61%</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] text-slate-500 font-semibold uppercase">Reasoning</p>
            <p className="text-lg font-bold text-emerald-600">72%</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] text-slate-500 font-semibold uppercase">Verbal</p>
            <p className="text-lg font-bold text-amber-600">65%</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => setCurrentView('skill-gap')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to AI Skill Gap Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24">
      {/* Top Header Card */}
      <div className="glass-card p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
              Diagnostic Module
            </span>
            <span className="text-xs font-bold text-slate-600">Category: {currentQ.category}</span>
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900">
            AI Placement Skill Assessment
          </h2>
        </div>

        {/* Live Timer & Question Progress */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
            <Timer className="w-4 h-4 text-indigo-600" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
            Question {currentIndex + 1} of {totalQuestions}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
        {/* Category & Difficulty Tag */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Topic: {currentQ.topic}
          </span>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              currentQ.difficulty === 'Easy'
                ? 'bg-emerald-100 text-emerald-800'
                : currentQ.difficulty === 'Medium'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {currentQ.difficulty}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {currentQ.question}
        </h3>

        {/* Optional Code Snippet */}
        {currentQ.codeSnippet && (
          <div className="p-4 rounded-2xl bg-slate-900 text-indigo-200 font-mono text-xs overflow-x-auto border border-slate-800">
            <pre>{currentQ.codeSnippet}</pre>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt) => {
            const isSelected = selectedAnswers[currentQ.id] === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50/90 border-indigo-400 text-indigo-950 font-bold shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold uppercase ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {opt.id}
                  </div>
                  <span className="text-sm">{opt.text}</span>
                </div>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitAssessment}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analyze My Performance</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
