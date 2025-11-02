import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, Cpu, Zap, Globe, Database } from 'lucide-react';
import { USER_DATA } from '../constants';
import GlitchText from './GlitchText';
import Typewriter from './Typewriter';
import TerminalPhoto from './TerminalPhoto';
import TerminalSocialLinks from './TerminalSocialLinks';
import PortfolioDirectory from './PortfolioDirectory';
import EducationExperience from './EducationExperience';

interface InteractiveHeroProps {
  onModeSwitch: (mode: 'portfolio' | 'interactive') => void;
  currentMode: 'portfolio' | 'interactive';
}

const InteractiveHero: React.FC<InteractiveHeroProps> = ({ onModeSwitch, currentMode }) => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const titles = [
    "Full-Stack Developer",
    "AI/ML Engineer", 
    "Problem Solver",
    "Tech Innovator",
    "Mentor & Open Source Contributor"
  ];

  const skills = [
    { icon: <Code className="w-5 h-5" />, name: "Full-Stack Development", level: 95 },
    { icon: <Cpu className="w-5 h-5" />, name: "AI/ML Engineering", level: 90 },
    { icon: <Database className="w-5 h-5" />, name: "Data Science", level: 85 },
    { icon: <Globe className="w-5 h-5" />, name: "Cloud Architecture", level: 88 },
    { icon: <Zap className="w-5 h-5" />, name: "Performance Optimization", level: 92 }
  ];

  // Cycle through titles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);



  // Show details after initial animation
  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full space-y-8">
      {/* Main Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="grid lg:grid-cols-3 gap-8 items-start"
      >
        {/* Left Side - Terminal Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Terminal Header */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-2 text-green-400 text-sm"
          >
            <Terminal className="w-4 h-4" />
            <span>~/harshitha/profile</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-cyan-400"
            >
              █
            </motion.span>
          </motion.div>

          {/* sudo whoami command */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <span className="text-green-400">harshitha@portfolio:</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-white"
              >
                sudo whoami
              </motion.span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="pl-0"
            >
              <div className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-wide">
                {USER_DATA.name}
              </div>
              <div className="text-xl md:text-2xl text-cyan-400 h-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Typewriter 
                      text={titles[currentTitle]}
                      speed={100}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* cat aboutme.md command */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="space-y-3 font-mono"
          >
            <div className="flex items-center space-x-2">
              <span className="text-green-400">harshitha@portfolio:</span>
              <span className="text-white">cat aboutme.md</span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
              className="text-gray-300 leading-relaxed max-w-2xl"
            >
              <p className="text-base md:text-lg">
                Passionate Full-Stack Developer and AI/ML Engineer with a Master's from NYU, 
                specializing in scalable applications and machine learning solutions. I build 
                robust systems using React, Python, and cloud technologies while mentoring 
                developers and contributing to open-source projects that make tech more accessible.
              </p>
            </motion.div>
          </motion.div>

          {/* Next prompt indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
            className="flex items-center space-x-2 text-sm pt-4 font-mono"
          >
            <span className="text-green-400">harshitha@portfolio:</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 4.5 }}
              className="text-white"
            >
              █
            </motion.span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="flex flex-wrap gap-3"
          >
            <motion.button
              onClick={() => onModeSwitch('portfolio')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                currentMode === 'portfolio' 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600'
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="w-4 h-4" />
              <span>View Portfolio</span>
            </motion.button>
            
            <motion.button
              onClick={() => onModeSwitch('interactive')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                currentMode === 'interactive' 
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' 
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600'
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Terminal</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side - Interactive Photo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="relative flex justify-center lg:justify-start lg:sticky lg:top-8"
        >
          {/* Terminal Photo Component */}
          <TerminalPhoto 
            photoUrl="/images/Upload_Img.jpg"
            alt="Harshitha Jonnagaddala"
            className="w-72 lg:w-80"
          />
        </motion.div>
      </motion.div>

      {/* Portfolio Directory Structure - Second Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4 }}
        className="mt-12"
      >
        <PortfolioDirectory onSectionClick={(section) => console.log(`Navigate to: ${section}`)} />
      </motion.div>

      {/* Education & Experience Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5 }}
        className="mt-8"
      >
        <EducationExperience />
      </motion.div>

      {/* Skills and Social Links Section - Bottom */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 6 }}
            className="grid lg:grid-cols-2 gap-6 mt-8"
          >
            {/* Skills Preview */}
            <div className="bg-gray-900/30 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-sm text-green-400 mb-3 flex items-center space-x-2">
                <Cpu className="w-4 h-4" />
                <span>SYSTEM CAPABILITIES</span>
              </div>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 6.5 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="text-cyan-400">{skill.icon}</div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-300">{skill.name}</div>
                      <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                        <motion.div
                          className="bg-green-400 h-1 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: 7 + index * 0.1, duration: 1 }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-green-400 font-mono">{skill.level}%</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <TerminalSocialLinks />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveHero;