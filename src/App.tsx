import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { JudgeDemoTour } from './components/JudgeDemoTour';
import { TeamModal } from './components/TeamModal';
import { AuthModal } from './components/AuthModal';

import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Assessment } from './components/Assessment';
import { SkillGapAnalysis } from './components/SkillGapAnalysis';
import { Roadmap } from './components/Roadmap';
import { PracticeCenter } from './components/PracticeCenter';
import { AIMentor } from './components/AIMentor';
import { MockInterview } from './components/MockInterview';
import { Analytics } from './components/Analytics';
import { PlacementReadiness } from './components/PlacementReadiness';
import { CompaniesGuide } from './components/CompaniesGuide';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  // If on landing page, show the landing experience
  if (currentView === 'landing') {
    return <LandingPage />;
  }

  // Otherwise, render full SaaS application layout with Sidebar & Navbar
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Dynamic View Panel */}
        <main className="flex-1 min-w-0">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'assessment' && <Assessment />}
          {currentView === 'skill-gap' && <SkillGapAnalysis />}
          {currentView === 'roadmap' && <Roadmap />}
          {currentView === 'practice' && <PracticeCenter />}
          {currentView === 'mentor' && <AIMentor />}
          {currentView === 'mock-interview' && <MockInterview />}
          {currentView === 'analytics' && <Analytics />}
          {currentView === 'readiness' && <PlacementReadiness />}
          {currentView === 'companies' && <CompaniesGuide />}
        </main>
      </div>

      {/* Floating Demo Tour for Hackathon Judges */}
      <JudgeDemoTour />

      {/* Team Innovatrix Modal */}
      <TeamModal />

      {/* Authentication & Student Onboarding Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
