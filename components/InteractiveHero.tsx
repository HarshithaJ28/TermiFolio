import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code } from 'lucide-react';
import { USER_DATA } from '../constants';
import Typewriter from './Typewriter';
import TerminalPhoto from './TerminalPhoto';
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
              {/* Interactive Name Display */}
              <div className="mb-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.0 }}
                  className="text-sm text-green-400 font-mono mb-1"
                >
                  <span className="text-gray-500">&gt;</span> whoami
                </motion.div>
                
                <div className="flex flex-wrap items-center gap-2">
                  {/* First Name with Glitch Effect */}
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.2 }}
                    whileHover={{ 
                      textShadow: [
                        "0 0 5px #06b6d4",
                        "0 0 15px #06b6d4, 0 0 25px #06b6d4",
                        "0 0 5px #06b6d4"
                      ]
                    }}
                    className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 hover:from-cyan-300 hover:to-blue-300 transition-all duration-300 cursor-pointer"
                  >
                    Harshitha
                  </motion.span>
                  
                  {/* Terminal Separator */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.4 }}
                    className="text-2xl md:text-3xl text-green-400 font-mono"
                  >
                    @
                  </motion.span>
                  
                  {/* Last Name with Typing Effect */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.6 }}
                    className="relative"
                  >
                    <span className="text-3xl md:text-4xl font-bold text-white hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                      Jonnagaddala
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 3.5 }}
                      className="text-3xl md:text-4xl text-cyan-400 font-mono"
                    >
                      |
                    </motion.span>
                  </motion.div>
                </div>
                
                {/* Professional Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.0 }}
                  className="flex items-center space-x-2 mt-2"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400 font-mono">
                    <span className="text-green-400">status:</span> available_for_opportunities
                  </span>
                </motion.div>
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
              className="max-w-2xl space-y-4"
            >
              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.2 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="text-white font-semibold text-lg">Passionate</span>
                <span className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 text-sm font-medium rounded-full border border-cyan-400/30">
                  Full-Stack Developer
                </span>
                <span className="text-gray-300">&</span>
                <span className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-medium rounded-full border border-purple-400/30">
                  AI/ML Engineer
                </span>
              </motion.div>

              {/* Education & Specialization */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.4 }}
                className="flex items-center space-x-2 text-gray-300"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">
                  <span className="text-white font-medium">Master's from NYU</span> • 
                  Specializing in <span className="text-cyan-400">scalable applications</span> and 
                  <span className="text-purple-400"> machine learning solutions</span>
                </span>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.6 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="text-gray-400 text-sm">Building with:</span>
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs rounded border border-blue-500/20">React</span>
                  <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 text-xs rounded border border-yellow-500/20">Python</span>
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Cloud Tech</span>
                </div>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.8 }}
                className="text-gray-300 text-sm leading-relaxed pl-4 border-l-2 border-cyan-400/30"
              >
                Mentoring developers and contributing to open-source projects that 
                <span className="text-cyan-400 font-medium"> make tech more accessible</span>.
              </motion.div>
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
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 cursor-pointer ${
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
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 cursor-pointer ${
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


    </div>
  );
};

export default InteractiveHero;