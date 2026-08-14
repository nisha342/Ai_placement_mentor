import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  MapPin,
  Mic,
  GraduationCap,
  Award,
  CheckCircle2,
  Users,
  Compass,
  Zap,
  TrendingUp,
  Building2,
  Flame,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setShowAuthModal, setShowTeamModal, triggerCelebration } = useApp();

  const handleTryDemo = () => {
    setCurrentView('dashboard');
    triggerCelebration();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Floating Navigation */}
      <header className="sticky top-0 z-30 w-full glass-card border-b border-slate-200/80 px-4 sm:px-8 py-3.5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display text-lg font-extrabold tracking-tight text-slate-900 block leading-tight">
                AI PLACEMENT MENTOR
              </span>
              <span className="text-[11px] font-semibold text-indigo-600 tracking-wide">
                by Team INNOVATRIX • AVS Engineering College
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTeamModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 border border-slate-200 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              <span>Meet Team</span>
            </button>

            <button
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Sign In
            </button>

            <button
              onClick={handleTryDemo}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span>TRY LIVE DEMO</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Soft Pastel Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-200/40 via-purple-200/40 to-pink-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Hackathon Innovation Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-indigo-200/80 shadow-xs text-xs font-bold text-indigo-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>AI Hackathon 2025 Live Prototype</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium">Department of AI & Data Science</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            AI PLACEMENT <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">MENTOR</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl font-semibold text-slate-700 tracking-tight">
            "Your Personal AI Mentor for Placement Success"
          </p>

          {/* Supporting text */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Assess your skills. Discover your gaps. Follow a personalized roadmap. Practice smarter. Crack your interview.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>START YOUR JOURNEY</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleTryDemo}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>TRY LIVE DEMO (5 MIN)</span>
            </button>
          </div>

          {/* Pre-populated student note */}
          <p className="text-xs text-slate-500">
            ✨ One-click instant login loaded with sample student <span className="font-bold text-slate-700">Alex Kumar</span> (3rd Year, AI & DS)
          </p>
        </div>

        {/* Visual Representation of Dashboard */}
        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
          <div className="glass-card p-3 sm:p-5 rounded-3xl shadow-2xl border border-indigo-100 bg-white/90 relative group">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-slate-500 ml-2">
                  ai-placement-mentor.innovatrix.app
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Readiness: 68% → 78%
                </span>
              </div>
            </div>

            {/* Dashboard Teaser Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Readiness Dial */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Placement Readiness
                    </span>
                    <span className="text-xs font-bold text-slate-400">Baseline</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-extrabold text-slate-900">68%</span>
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                      On Track
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Calculated from Python (82%), SQL (74%), DSA (45%), and Communication (58%).
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-indigo-100/60 flex items-center justify-between text-xs text-indigo-600 font-bold">
                  <span>Target: 78%+ for Tier-1</span>
                  <span>↗</span>
                </div>
              </div>

              {/* Card 2: AI Gap Detection */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                      AI Gap Analysis
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Python & SQL</span>
                      <span className="font-bold text-emerald-600">Strong (82%)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">DSA Algorithms</span>
                      <span className="font-bold text-rose-600">High Gap (45%)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">HR Fluency</span>
                      <span className="font-bold text-amber-600">Moderate (58%)</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 p-2 rounded-xl bg-purple-100/60 text-[11px] text-purple-900 font-medium leading-tight">
                  💡 Priority 1: Complete Arrays & Strings two-pointer practice.
                </div>
              </div>

              {/* Card 3: Personalized Roadmap */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-white border border-pink-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
                      Adaptive Roadmap
                    </span>
                    <span className="text-[10px] font-bold bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                      Week 2 of 6
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">Arrays & Strings Masterclass</p>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                    <div className="bg-pink-500 h-1.5 rounded-full w-[45%]" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    45% Completed • 3 practice problems remaining for TCS/Infosys alignment.
                  </p>
                </div>
                <button
                  onClick={handleTryDemo}
                  className="mt-3 w-full py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Explore Interactive App →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Real World Problem vs AI Solution Section */}
      <section className="py-16 px-4 sm:px-6 bg-white/70 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Why We Built This
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From Fragmented Chaos to One Intelligent Journey
            </h2>
            <p className="text-sm text-slate-600">
              Students juggle 6+ websites for Aptitude, Coding, and HR, leaving them clueless about what to study next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Fragmented Problem */}
            <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/60 border border-rose-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
                  ✕
                </div>
                <div>
                  <h3 className="font-bold text-rose-950 text-lg">The Fragmented Approach</h3>
                  <p className="text-xs text-rose-700">How 95% of engineering students currently prepare</p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-rose-900">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Separate platforms for Aptitude, LeetCode, YouTube, and Mock tests with zero sync.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>No clear diagnostic of exact weak skills (e.g. why am I failing Round 1?).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Generic roadmaps that ignore student's existing strengths (wasting 40+ hours).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>No objective placement readiness metric before facing actual company drives.</span>
                </li>
              </ul>
            </div>

            {/* The AI Mentor Solution */}
            <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/60 border border-emerald-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-emerald-950 text-lg">AI Placement Mentor Solution</h3>
                  <p className="text-xs text-emerald-700">Unified, personalized & continuous intelligence</p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-emerald-900">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>AI Skill Assessment:</strong> Pinpoints exact algorithmic & cognitive bottlenecks in 10 mins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Personalized 6-Week Roadmap:</strong> Prioritizes weak topics (DSA) while consolidating strengths.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>AI Voice Mock Interviews:</strong> Real-time grading on technical correctness, STAR format, and fluency.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Placement Readiness Score:</strong> Dynamic 0-100% index benchmarked against TCS, Infosys & Accenture.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Major Benefits */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Core Capabilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered for Complete Placement Mastery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Benefit 1 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                1. AI Skill Intelligence
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adaptive multi-category diagnostics cross-evaluate Aptitude, Reasoning, Verbal, Python, SQL, and DSA to calculate your exact strengths and weak areas.
              </p>
              <div className="pt-2 text-xs font-bold text-indigo-600">
                Live Skill Matrix →
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                2. Personalized Learning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No more one-size-fits-all tutorials. Get dynamic weekly study sprints, curated video/article resources, and prioritized problem sets updated in real time.
              </p>
              <div className="pt-2 text-xs font-bold text-purple-600">
                Custom Roadmap Engine →
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center shadow-xs">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                3. AI Mock Interviews
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Practice technical coding and behavioral HR rounds with an AI interviewer. Receive instant scores for technical accuracy, communication, confidence, and completeness.
              </p>
              <div className="pt-2 text-xs font-bold text-pink-600">
                Multi-Modal Evaluator →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Clickable User Journey Stepper Banner */}
      <section className="py-12 px-4 sm:px-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 text-white rounded-3xl mx-4 sm:mx-8 mb-16 shadow-2xl">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-700">
            Complete Clickable Experience
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
            Explore the 10-Step Interactive Hackathon Demo
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-xl mx-auto">
            Student Profile → AI Assessment → Skill Gap → Roadmap → Adaptive Practice → AI Mentor → Mock Interview → AI Feedback → Analytics → Readiness
          </p>

          <div className="pt-2">
            <button
              onClick={handleTryDemo}
              className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-extrabold text-sm hover:bg-indigo-50 shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>LAUNCH LIVE DEMO NOW</span>
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Team INNOVATRIX Footer */}
      <footer className="border-t border-slate-200 bg-white/80 py-8 px-4 sm:px-8 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-900">AI Placement Mentor</span>
            <span className="text-slate-400">|</span>
            <span>Team INNOVATRIX (Sudharsan, Taj Nisha, Thoufika, Suman)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500">AVS Engineering College • Dept of AI & DS</span>
            <button
              onClick={() => setShowTeamModal(true)}
              className="font-bold text-indigo-600 hover:underline"
            >
              Team Details
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
