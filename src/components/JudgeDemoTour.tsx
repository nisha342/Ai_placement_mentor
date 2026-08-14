import React, { useState } from 'react';
import { useApp, DEMO_STEPS } from '../context/AppContext';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  X,
  Play,
  RotateCcw,
} from 'lucide-react';

export const JudgeDemoTour: React.FC = () => {
  const {
    currentView,
    activeDemoStepIndex,
    nextDemoStep,
    prevDemoStep,
    jumpToDemoStep,
    resetToDemoInitialState,
  } = useApp();

  const [minimized, setMinimized] = useState(false);

  if (currentView === 'landing') {
    return null;
  }

  const currentStep = DEMO_STEPS[activeDemoStepIndex];

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 text-white shadow-xl hover:bg-indigo-700 transition-all font-semibold text-xs border border-indigo-400/40 animate-bounce cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-indigo-300" />
          <span>Judge 5-Min Walkthrough ({currentStep.step}/10)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl">
      <div className="glass-card bg-white/95 backdrop-blur-xl border border-indigo-200/90 shadow-2xl rounded-2xl p-3 sm:p-4 text-slate-800 transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Left Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-200 shrink-0">
              {currentStep.step}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                  HACKATHON DEMO FLOW
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Step {currentStep.step} of 10
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight mt-0.5">
                {currentStep.label} — <span className="text-slate-600 font-normal">{currentStep.description}</span>
              </h4>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={prevDemoStep}
              disabled={activeDemoStepIndex === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={nextDemoStep}
              disabled={activeDemoStepIndex === DEMO_STEPS.length - 1}
              className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-200 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

            <button
              onClick={resetToDemoInitialState}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Restart Demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMinimized(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Minimize Guide"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Step dots */}
        <div className="grid grid-cols-10 gap-1.5 mt-3 pt-2.5 border-t border-slate-100">
          {DEMO_STEPS.map((s, idx) => {
            const isCurrent = activeDemoStepIndex === idx;
            const isCompleted = activeDemoStepIndex > idx;
            return (
              <button
                key={s.step}
                onClick={() => jumpToDemoStep(s.step)}
                className={`group flex flex-col items-center gap-1 cursor-pointer focus:outline-none transition-all`}
                title={`Step ${s.step}: ${s.label}`}
              >
                <div
                  className={`w-full h-1.5 rounded-full transition-all ${
                    isCurrent
                      ? 'bg-indigo-600 ring-2 ring-indigo-300 ring-offset-1'
                      : isCompleted
                      ? 'bg-purple-300 hover:bg-purple-400'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                />
                <span
                  className={`text-[9px] font-bold tracking-tight truncate max-w-full hidden md:block ${
                    isCurrent ? 'text-indigo-700 font-extrabold' : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
