import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRACTICE_QUESTIONS } from '../data/mockData';
import { Question } from '../types';
import {
  CheckSquare,
  Timer,
  CheckCircle2,
  XCircle,
  Sparkles,
  RefreshCw,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  Award,
  Zap,
} from 'lucide-react';

export const PracticeCenter: React.FC = () => {
  const { incrementPracticeCount, addXP, triggerCelebration, setCurrentView } = useApp();

  const [activeTab, setActiveTab] = useState<'APTITUDE' | 'REASONING' | 'VERBAL' | 'TECHNICAL' | 'HR'>('TECHNICAL');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [questionBank, setQuestionBank] = useState<Record<string, Question[]>>(PRACTICE_QUESTIONS);
  const [incorrectCountInTopic, setIncorrectCountInTopic] = useState(0);

  const questionsList = questionBank[activeTab] || [];
  const currentQuestion = questionsList[currentQIndex] || questionsList[0];

  // Timer
  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted, activeTab, currentQIndex]);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setTimerSeconds(120);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;
    setSubmitted(true);

    const isCorrect = selectedOption === currentQuestion.correctOptionId;
    if (isCorrect) {
      addXP(60, `Correct Answer in ${activeTab}`);
      incrementPracticeCount();
      triggerCelebration();
    } else {
      setIncorrectCountInTopic((prev) => prev + 1);
      incrementPracticeCount();
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questionsList.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setSubmitted(false);
      setTimerSeconds(120);
    } else {
      // Loop or generate similar
      setCurrentQIndex(0);
      setSelectedOption(null);
      setSubmitted(false);
      setTimerSeconds(120);
    }
  };

  const handlePracticeSimilarQuestions = () => {
    // Generate an adaptive question into the list
    const newQ: Question = {
      id: `dyn-${Date.now()}`,
      category: currentQuestion.category,
      difficulty: currentQuestion.difficulty,
      question: `[Adaptive Drill] In an array of size N containing integers, what is the optimal time complexity to find the maximum contiguous subarray sum?`,
      options: [
        { id: 'a', text: 'O(N) using Kadane\'s Algorithm' },
        { id: 'b', text: 'O(N^2) using brute-force nested loops' },
        { id: 'c', text: 'O(log N) using Binary Search' },
        { id: 'd', text: 'O(N!) using Permutations' },
      ],
      correctOptionId: 'a',
      explanation: 'Kadane\'s algorithm computes the maximum subarray sum in a single O(N) pass with O(1) auxiliary space.',
      topic: 'Array Sprints & Subarrays',
    };

    setQuestionBank((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newQ],
    }));

    setCurrentQIndex(questionsList.length);
    setSelectedOption(null);
    setSubmitted(false);
    setTimerSeconds(120);
    triggerCelebration();
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isCorrect = selectedOption === currentQuestion?.correctOptionId;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">
              Adaptive Practice Engine
            </span>
            <span className="text-xs text-slate-500 font-semibold">TCS / Infosys Pattern Questions</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Practice Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time problem solving with instant AI explanations and weak-skill remediation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-purple-600" />
            <span>+60 XP / Correct</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['TECHNICAL', 'APTITUDE', 'REASONING', 'VERBAL', 'HR'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
          {/* Header with Topic, Difficulty and Timer */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {currentQuestion.topic}
              </span>
              <span className="text-xs font-bold text-slate-500">
                Question {currentQIndex + 1} of {questionsList.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
              <Timer className="w-3.5 h-3.5 text-indigo-600" />
              <span>{formatTimer(timerSeconds)}</span>
            </div>
          </div>

          {/* Question Text */}
          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              const isCorrectOption = opt.id === currentQuestion.correctOptionId;

              let optionClasses = 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-800';
              if (isSelected && !submitted) {
                optionClasses = 'bg-indigo-50 border-indigo-400 text-indigo-950 font-bold';
              } else if (submitted) {
                if (isCorrectOption) {
                  optionClasses = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                } else if (isSelected && !isCorrectOption) {
                  optionClasses = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={submitted}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${optionClasses}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold uppercase ${
                        submitted && isCorrectOption
                          ? 'bg-emerald-600 text-white'
                          : submitted && isSelected
                          ? 'bg-rose-600 text-white'
                          : isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {opt.id}
                    </div>
                    <span className="text-sm">{opt.text}</span>
                  </div>

                  {submitted && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {submitted && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Button: Submit or Next */}
          {!submitted ? (
            <div className="flex justify-end pt-4">
              <button
                type="button"
                disabled={!selectedOption}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
              >
                Submit Answer
              </button>
            </div>
          ) : (
            /* Post-Submission Explanation & Actions */
            <div className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in duration-300">
              {/* Verdict Header */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isCorrect
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-600" />
                  )}
                  <div>
                    <p className="font-bold text-sm">
                      {isCorrect ? 'Correct Answer! (+60 XP)' : 'Incorrect Solution'}
                    </p>
                    <p className="text-xs opacity-80">
                      {isCorrect
                        ? 'Great algorithmic deduction!'
                        : `Correct option was (${currentQuestion.correctOptionId.toUpperCase()})`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Deep Explanation */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-indigo-600" />
                  Detailed Concept Explanation
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>

              {/* Low Accuracy Recommendation Trigger */}
              {!isCorrect && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-amber-950">AI Diagnostic Alert</p>
                      <p className="text-[11px] text-amber-800">
                        Your accuracy in {currentQuestion.topic} is below 60%. We recommend solving 3 similar pattern drills.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handlePracticeSimilarQuestions}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] transition-colors"
                  >
                    Practice Similar
                  </button>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePracticeSimilarQuestions}
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Practice Similar Questions</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
