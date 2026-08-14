import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Bot,
  Send,
  Target,
  ArrowRight,
  AlertCircle,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
} from 'lucide-react';

export const AIMentor: React.FC = () => {
  const { recommendations, setCurrentView, profile, triggerCelebration } = useApp();

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello ${profile.name}! I am your AI Placement Mentor. I've analyzed your performance: your Python (82%) and SQL (74%) are solid, but we must urgently boost your DSA Problem Solving (45%) for TCS & Infosys drives. What would you like guidance on today?`,
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setInputMsg('');
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          studentContext: profile,
        }),
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
    } catch {
      // Fallback
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `For ${profile.targetRole} roles at ${profile.targetCompanies.join(', ')}: Focus on Two-Pointer array patterns and practice speaking your technical explanations aloud during our AI Mock Interview!`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAction = (targetView: typeof recommendations[0]['targetView']) => {
    setCurrentView(targetView);
    triggerCelebration();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md shadow-indigo-100">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md">
              AI Recommendation Engine
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Your AI Mentor
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          Continuous AI synthesis analyzing your assessment gaps, practice history, and company requirements into prioritized daily recommendations.
        </p>
      </div>

      {/* Prioritized Recommendations Cards */}
      <div className="space-y-4">
        <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-600" />
          <span>Prioritized Action Plan</span>
        </h3>

        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className={`glass-card p-5 sm:p-6 rounded-3xl border shadow-sm transition-all hover:shadow-md ${rec.color}`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                      rec.priority === 'HIGH'
                        ? 'bg-rose-600 text-white'
                        : rec.priority === 'MEDIUM'
                        ? 'bg-amber-600 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {rec.priority} PRIORITY
                  </span>
                  <span className="text-xs font-bold text-slate-800">{rec.topic}</span>
                  <span className="text-xs font-semibold opacity-70">({rec.currentAccuracy} accuracy)</span>
                </div>

                <h4 className="font-display text-lg font-bold text-slate-900 leading-tight">
                  {rec.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  <strong>Reason:</strong> "{rec.reason}"
                </p>

                <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 pt-1">
                  <Lightbulb className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Recommended action: {rec.recommendedAction}</span>
                </p>
              </div>

              <button
                onClick={() => handleAction(rec.targetView)}
                className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>START PRACTICE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live AI Mentor Conversational Chat Box */}
      <div className="glass-card p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <h3 className="font-display text-base font-bold text-slate-900">
              Ask Your AI Placement Mentor
            </h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Online • Ready
          </span>
        </div>

        {/* Message Thread */}
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl text-xs max-w-lg leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-100/90 text-slate-800 border border-slate-200'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-indigo-500" />
              <span>AI Mentor is crafting custom guidance...</span>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Ask anything (e.g. 'What questions does TCS ask in Technical round?', 'How to explain DSA recursion?')"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-slate-50"
          />
          <button
            type="submit"
            disabled={!inputMsg.trim() || isTyping}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 disabled:opacity-40 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask Mentor</span>
          </button>
        </form>
      </div>
    </div>
  );
};
