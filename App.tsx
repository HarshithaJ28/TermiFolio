import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalWindow from './components/TerminalWindow';
import MatrixRain from './components/MatrixRain';
import ParticleField from './components/ParticleField';
import BootSequence from './components/BootSequence';
import InteractiveTerminal from './components/InteractiveTerminal';
import InteractiveProjectShowcase from './components/InteractiveProjectShowcase';
import InteractiveSkillsShowcase from './components/InteractiveSkillsShowcase';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import LazyComponent from './components/LazyComponent';
import InteractiveHero from './components/InteractiveHero';
import ProjectCards from './components/ProjectCards';
import EducationExperience from './components/EducationExperience';
import AchievementsShowcase from './components/AchievementsShowcase';
import CustomCursor from './components/CustomCursor';
import { USER_DATA } from './constants';

const App: React.FC = () => {
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [currentMode, setCurrentMode] = useState<'portfolio' | 'interactive'>('portfolio');

  // Enhanced project data with additional features
  const enhancedProjects = USER_DATA.projects.map(project => ({
    ...project,
    stats: {
      stars: Math.floor(Math.random() * 100) + 10,
      forks: Math.floor(Math.random() * 50) + 5,
      commits: Math.floor(Math.random() * 500) + 50
    }
  }));

  // Custom command handler for interactive mode
  const handleCustomCommand = (command: string): string => {
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
      case 'projects':
        return 'Loading project showcase...';
      case 'skills':
        return 'Displaying skills matrix...';
      case 'resume':
        return 'Generating resume download...';
      case 'contact':
        return 'Opening contact information...';
      default:
        return `Command '${command}' not found. Type 'help' for available commands.`;
    }
  };

  if (showBootSequence) {
    return <BootSequence onComplete={() => setShowBootSequence(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono relative overflow-hidden">
      {/* Custom Terminal Cursor */}
      <CustomCursor />
      
      {/* Performance Optimizer */}
      <PerformanceOptimizer />
      
      {/* Background Effects */}
      <LazyComponent fallback={<div className="fixed inset-0 bg-black" />}>
        <MatrixRain />
        <ParticleField />
      </LazyComponent>
      
      <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
        <TerminalWindow>
          <main className="w-full space-y-8 terminal-area">
            {/* Interactive Hero Section */}
            <InteractiveHero 
              onModeSwitch={setCurrentMode}
              currentMode={currentMode}
            />

            <AnimatePresence mode="wait">
              {currentMode === 'interactive' ? (
                <motion.div
                  key="interactive"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <InteractiveTerminal onCommandExecute={handleCustomCommand} />
                </motion.div>
              ) : (
                <motion.div
                  key="portfolio"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-12"
                >
                  {/* Featured Project Cards */}
                  <LazyComponent fallback={<div className="h-64 bg-gray-800/20 rounded-lg animate-pulse" />}>
                    <ProjectCards />
                  </LazyComponent>

                  {/* Project Showcase */}
                  <LazyComponent fallback={<div className="h-64 bg-gray-800/20 rounded-lg animate-pulse" />}>
                    <InteractiveProjectShowcase projects={enhancedProjects} />
                  </LazyComponent>

                  {/* Skills Showcase */}
                  <LazyComponent fallback={<div className="h-48 bg-gray-800/20 rounded-lg animate-pulse" />}>
                    <InteractiveSkillsShowcase />
                  </LazyComponent>

                  {/* Achievements & Activities */}
                  <LazyComponent fallback={<div className="h-48 bg-gray-800/20 rounded-lg animate-pulse" />}>
                    <AchievementsShowcase />
                  </LazyComponent>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 py-6 border-t border-gray-700/30"
          >
            <div className="text-center space-y-2">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-gray-400 text-sm font-mono"
              >
                <span className="text-green-400">~</span> Made with ❤️ by <span className="text-cyan-400 font-semibold">Harshitha</span> <span className="text-green-400">~</span>
              </motion.div>
              <div className="text-xs text-gray-500 font-mono">
                Built with React • TypeScript • Framer Motion
              </div>
            </div>
          </motion.footer>
        </TerminalWindow>
      </div>
    </div>
  );
};

export default App;