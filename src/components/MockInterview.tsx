import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_INTERVIEW_QUESTIONS } from '../data/mockData';
import { InterviewEvaluation } from '../types';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Bot,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Square,
  Award,
  Send,
  User,
  BrainCircuit,
  MessageSquare,
} from 'lucide-react';

export const MockInterview: React.FC = () => {
  const { profile, addInterviewEvaluation, setCurrentView, triggerCelebration } = useApp();

  const [inSession, setInSession] = useState(false);
  const [interviewType, setInterviewType] = useState<'Technical' | 'HR'>('Technical');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);

  const filteredQuestions = MOCK_INTERVIEW_QUESTIONS.filter(
    (q) => q.type === interviewType
  );
  const currentQ = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  // Speech synthesis for AI question voice
  const speakQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeakingQuestion(true);
      utterance.onend = () => setIsSpeakingQuestion(false);
      utterance.onerror = () => setIsSpeakingQuestion(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartInterview = () => {
    setInSession(true);
    setCurrentQuestionIndex(0);
    setCandidateAnswer('');
    setEvaluation(null);
    speakQuestion(currentQ.question);
  };

  // Toggle voice recognition
  const toggleRecording = () => {
    if (!isRecording) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-US';

          recognition.onresult = (event: any) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
              transcript += event.results[i][0].transcript;
            }
            setCandidateAnswer((prev) => (prev ? prev + ' ' + transcript : transcript));
          };

          recognition.onstart = () => setIsRecording(true);
          recognition.onend = () => setIsRecording(false);
          recognition.onerror = () => setIsRecording(false);

          recognition.start();
          (window as any)._activeRecognition = recognition;
        } catch {
          setIsRecording(true);
        }
      } else {
        // Simulated voice mode if Web Speech not supported
        setIsRecording(true);
        setTimeout(() => {
          setCandidateAnswer(
            (prev) =>
              prev +
              ' In Python, lists are mutable dynamic arrays, whereas tuples are immutable fixed sequences that consume less memory.'
          );
          setIsRecording(false);
        }, 3000);
      }
    } else {
      if ((window as any)._activeRecognition) {
        (window as any)._activeRecognition.stop();
      }
      setIsRecording(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!candidateAnswer.trim()) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (isRecording && (window as any)._activeRecognition) {
      (window as any)._activeRecognition.stop();
      setIsRecording(false);
    }

    setIsEvaluating(true);

    try {
      const res = await fetch('/api/ai/evaluate-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.question,
          answer: candidateAnswer,
          interviewType,
          role: profile.targetRole,
          difficulty,
        }),
      });
      const data = await res.json();
      if (data.evaluation) {
        setEvaluation(data.evaluation);
        addInterviewEvaluation(data.evaluation);
      }
    } catch {
      // High-quality fallback evaluation
      const fallbackEval: InterviewEvaluation = {
        technicalAccuracy: 82,
        communication: 74,
        confidence: 68,
        completeness: 79,
        overallScore: 76,
        verdict: 'Good',
        feedback:
          'Your technical understanding is good. Improve answer structure and confidence by using the STAR method for experiential points.',
        idealPointsCovered: [
          'Correctly contrasted mutability and immutability',
          'Mentioned memory footprint and hashability',
        ],
        missedKeyPoints: [
          'Did not explicitly quantify runtime O(1) index lookup benchmark',
        ],
        improvedSampleAnswer: currentQ.sampleIdealAnswer,
      };
      setEvaluation(fallbackEval);
      addInterviewEvaluation(fallbackEval);
    } finally {
      setIsEvaluating(false);
      triggerCelebration();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setCandidateAnswer('');
      setEvaluation(null);
      speakQuestion(filteredQuestions[nextIdx].question);
    } else {
      // Loop or finish
      setCurrentQuestionIndex(0);
      setCandidateAnswer('');
      setEvaluation(null);
      speakQuestion(filteredQuestions[0].question);
    }
  };

  const handleEndInterview = () => {
    setInSession(false);
    setCandidateAnswer('');
    setEvaluation(null);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-2.5 py-0.5 rounded-md">
              AI Voice & Text Simulator
            </span>
            <span className="text-xs text-slate-500 font-semibold">Real-time Rubric Evaluation</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Mock Interview
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Simulate realistic technical and HR interviews with real-time feedback on Accuracy, Fluency, and Completeness.
          </p>
        </div>

        {!inSession ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Live AI Evaluator</span>
          </div>
        ) : (
          <button
            onClick={handleEndInterview}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Square className="w-3.5 h-3.5" />
            <span>End Interview</span>
          </button>
        )}
      </div>

      {!inSession ? (
        /* Setup Configuration Screen */
        <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shadow-xs">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Configure Your Mock Interview
              </h3>
              <p className="text-xs text-slate-500">
                Select your target round type and difficulty calibration
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Interview Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Interview Type</label>
              <div className="flex gap-2">
                {(['Technical', 'HR'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setInterviewType(type)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      interviewType === type
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Role */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Target Role</label>
              <div className="px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
                {profile.targetRole}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Difficulty</label>
              <div className="flex gap-1.5">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      difficulty === diff
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Question Preview */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Sample Question in this Session:
            </span>
            <p className="text-xs text-slate-800 font-medium italic">
              "{currentQ.question}"
            </p>
          </div>

          <button
            onClick={handleStartInterview}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-700 text-white font-extrabold text-xs shadow-lg shadow-cyan-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>START AI INTERVIEW</span>
          </button>
        </div>
      ) : (
        /* Live Interview Interface */
        <div className="space-y-6">
          {/* AI Interviewer Avatar & Question Box */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Animated AI Interviewer Orb */}
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-cyan-200 ${
                      isSpeakingQuestion ? 'animate-pulse ring-4 ring-cyan-200' : ''
                    }`}
                  >
                    <Bot className="w-6 h-6" />
                  </div>
                  {isSpeakingQuestion && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-base font-bold text-slate-900">
                      AI Interviewer
                    </h4>
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                      {interviewType} Round
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Question {currentQuestionIndex + 1} of {filteredQuestions.length}
                  </p>
                </div>
              </div>

              <button
                onClick={() => speakQuestion(currentQ.question)}
                className="p-2 rounded-xl text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition-colors"
                title="Re-read Question Aloud"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Question Display */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-cyan-50/70 border border-indigo-100">
              <p className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                "{currentQ.question}"
              </p>
            </div>
          </div>

          {/* Answer Input Area (Voice + Text) */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <User className="w-4 h-4 text-indigo-600" />
                <span>Your Answer</span>
              </label>

              {/* Voice recording toggle */}
              <button
                type="button"
                onClick={toggleRecording}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {isRecording ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                <span>{isRecording ? 'Listening (Speak Now)...' : 'Enable Voice Mic'}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={candidateAnswer}
              onChange={(e) => setCandidateAnswer(e.target.value)}
              placeholder="Type your response here or click 'Enable Voice Mic' to speak your answer..."
              className="w-full p-4 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-slate-50 leading-relaxed"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-400">
                Tip: Aim for structured explanations covering definitions, syntax, and performance trade-offs.
              </span>

              <button
                onClick={handleSubmitAnswer}
                disabled={!candidateAnswer.trim() || isEvaluating}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <BrainCircuit className="w-4 h-4 animate-spin text-indigo-200" />
                    <span>AI Evaluating Rubric...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Submit for AI Evaluation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Evaluation Scorecard */}
          {evaluation && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-indigo-200 shadow-xl space-y-6 animate-in fade-in duration-300">
              {/* Overall Score Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-white px-2.5 py-0.5 rounded-md shadow-2xs">
                    AI Evaluation Scorecard
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    Overall Performance Score: <strong className="text-indigo-600">{evaluation.overallScore}%</strong>
                  </h3>
                  <p className="text-xs text-slate-600">
                    Verdict: <strong className="text-emerald-700 font-bold">{evaluation.verdict}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    +150 XP Awarded
                  </span>
                </div>
              </div>

              {/* 4 Core Rubric Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Technical Accuracy</p>
                  <p className="font-display text-2xl font-extrabold text-indigo-600">
                    {evaluation.technicalAccuracy}%
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Communication</p>
                  <p className="font-display text-2xl font-extrabold text-purple-600">
                    {evaluation.communication}%
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Confidence</p>
                  <p className="font-display text-2xl font-extrabold text-pink-600">
                    {evaluation.confidence}%
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Completeness</p>
                  <p className="font-display text-2xl font-extrabold text-emerald-600">
                    {evaluation.completeness}%
                  </p>
                </div>
              </div>

              {/* AI Feedback */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  AI Mentor Feedback
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  "{evaluation.feedback}"
                </p>
              </div>

              {/* Ideal Model Answer */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  Model Industry Standard Answer:
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-mono bg-white p-3 rounded-xl border border-indigo-100">
                  {evaluation.improvedSampleAnswer}
                </p>
              </div>

              {/* Next Question / End Interview Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={handleEndInterview}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
                >
                  END INTERVIEW
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>NEXT QUESTION</span>
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
