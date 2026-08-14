import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Bot,
  User,
  Building,
  Target,
  Code,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    showAuthModal,
    setShowAuthModal,
    profile,
    setProfile,
    setCurrentView,
    triggerCelebration,
  } = useApp();

  const [mode, setMode] = useState<'login' | 'onboarding'>('login');
  const [email, setEmail] = useState('alex.kumar@avsengg.edu.in');
  const [password, setPassword] = useState('••••••••');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Onboarding form state
  const [name, setName] = useState(profile.name);
  const [department, setDepartment] = useState(profile.department);
  const [year, setYear] = useState(profile.year);
  const [targetRole, setTargetRole] = useState(profile.targetRole);
  const [targetCompaniesInput, setTargetCompaniesInput] = useState(profile.targetCompanies.join(', '));
  const [skillsInput, setSkillsInput] = useState(profile.skills.join(', '));

  if (!showAuthModal) return null;

  const handleInstantDemoLogin = () => {
    setShowAuthModal(false);
    setCurrentView('dashboard');
    triggerCelebration();
  };

  const handleAnalyzeProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    const parsedCompanies = targetCompaniesInput.split(',').map((s) => s.trim()).filter(Boolean);
    const parsedSkills = skillsInput.split(',').map((s) => s.trim()).filter(Boolean);

    setProfile({
      ...profile,
      name: name || 'Alex Kumar',
      department: department || 'Artificial Intelligence & Data Science',
      year: year || '3rd Year',
      targetRole: targetRole || 'Software Developer',
      targetCompanies: parsedCompanies.length > 0 ? parsedCompanies : ['TCS', 'Infosys', 'Accenture'],
      skills: parsedSkills.length > 0 ? parsedSkills : ['Python', 'SQL', 'JavaScript', 'DSA'],
    });

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAuthModal(false);
      setCurrentView('skill-gap');
      triggerCelebration();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Top Gradient Banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              {mode === 'login' ? 'Welcome to AI Placement Mentor' : 'Student Onboarding & Profile'}
            </h2>
            <p className="text-xs text-slate-500">
              {mode === 'login'
                ? 'Sign in or explore our ready-to-use live demo profile'
                : 'Configure your career goals for real-time AI roadmap generation'}
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-1 bg-slate-100 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              mode === 'login' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Quick Login
          </button>
          <button
            type="button"
            onClick={() => setMode('onboarding')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              mode === 'onboarding' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Custom Student Profile
          </button>
        </div>

        {mode === 'login' ? (
          <div>
            {/* Instant Demo Login Highlight Card */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                    Recommended for Judges
                  </span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                  1-CLICK
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3.5">
                Instantly enter with our pre-populated student record (<strong className="text-slate-900">Alex Kumar</strong>, 3rd Yr AI & DS, targeting TCS, Infosys & Accenture).
              </p>
              <button
                type="button"
                onClick={handleInstantDemoLogin}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>TRY LIVE DEMO NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Standard Login Form */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">College Email ID</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-slate-50"
                  placeholder="student@college.edu"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-slate-50"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleInstantDemoLogin}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('onboarding')}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs transition-colors"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleAnalyzeProfile} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="e.g. Alex Kumar"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="AI & Data Science"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Academic Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                >
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Target Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Software Developer"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Target Companies</label>
                <input
                  type="text"
                  value={targetCompaniesInput}
                  onChange={(e) => setTargetCompaniesInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="TCS, Infosys, Accenture"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Current Skills (comma separated)</label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Python, SQL, JavaScript, DSA"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-indigo-200" />
                    <span>AI Analyzing Profile & Gaps...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze My Profile →</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
