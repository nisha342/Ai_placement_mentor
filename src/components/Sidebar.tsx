import React from 'react';
import { useApp } from '../context/AppContext';
import { ViewType } from '../types';
import {
  LayoutDashboard,
  GraduationCap,
  GitFork,
  Map,
  CheckSquare,
  Sparkles,
  Mic,
  Building2,
  BarChart3,
  Award,
  UserCircle,
  TrendingUp,
} from 'lucide-react';

interface NavItem {
  id: ViewType;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, placementReadiness } = useApp();

  if (currentView === 'landing') {
    return null;
  }

  const mainNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assessment', label: 'AI Assessment', icon: GraduationCap, badge: 'Adaptive', badgeColor: 'bg-indigo-100 text-indigo-700' },
    { id: 'skill-gap', label: 'Skill Gap', icon: GitFork, badge: 'AI Insight', badgeColor: 'bg-purple-100 text-purple-700' },
    { id: 'roadmap', label: 'Roadmap', icon: Map, badge: '6 Weeks', badgeColor: 'bg-emerald-100 text-emerald-700' },
    { id: 'practice', label: 'Practice', icon: CheckSquare },
    { id: 'mentor', label: 'AI Mentor', icon: Sparkles, badge: 'Smart', badgeColor: 'bg-rose-100 text-rose-700' },
    { id: 'mock-interview', label: 'Mock Interview', icon: Mic, badge: 'AI Voice', badgeColor: 'bg-cyan-100 text-cyan-800' },
    { id: 'companies', label: 'Companies', icon: Building2, badge: 'TCS/Infosys', badgeColor: 'bg-blue-100 text-blue-700' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'readiness', label: 'Placement Readiness', icon: TrendingUp, badge: `${placementReadiness}%`, badgeColor: placementReadiness >= 75 ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-amber-100 text-amber-800 font-bold' },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'profile', label: 'Profile', icon: UserCircle },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white/80 backdrop-blur-md border-r border-slate-200/80 p-3.5 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-53px)] sticky top-[53px]">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Placement Engine
        </div>

        <nav className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-bold shadow-xs border border-indigo-200/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      item.badgeColor || 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mini Placement Readiness Card in Sidebar Footer */}
      <div className="pt-4 border-t border-slate-200/80">
        <div
          onClick={() => setCurrentView('readiness')}
          className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-100 cursor-pointer hover:border-indigo-300 transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-800">Placement Target</span>
            <span className="text-xs font-extrabold text-indigo-600 bg-white px-2 py-0.5 rounded-full shadow-xs">
              {placementReadiness}%
            </span>
          </div>
          <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${placementReadiness}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>{placementReadiness >= 75 ? '🎉 Placement Ready' : '🎯 Target: 75%+'}</span>
            <span className="text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform">
              View →
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
};
