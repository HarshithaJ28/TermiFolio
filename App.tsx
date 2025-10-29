import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { USER_DATA } from './constants';
import { GithubIcon, LinkedinIcon, MailIcon } from './components/icons';
import TerminalWindow from './components/TerminalWindow';
import MatrixRain from './components/MatrixRain';
import ParticleField from './components/ParticleField';
import BootSequence from './components/BootSequence';
import EnhancedCommand from './components/EnhancedCommand';
import InteractiveTerminal from './components/InteractiveTerminal';
import InteractiveProjectShowcase from './components/InteractiveProjectShowcase';
import InteractiveSkillsShowcase from './components/InteractiveSkillsShowcase';
import DownloadableResume from './components/DownloadableResume';
import GlitchText from './components/GlitchText';
import Cursor from './components/Cursor';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import LazyComponent from './components/LazyComponent';

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

  // Resume data structure
  const resumeData = {
    personalInfo: {
      name: USER_DATA.name,
      title: USER_DATA.role,
      email: USER_DATA.contact.email,
      location: "New York, NY",
      linkedin: USER_DATA.contact.linkedin,
      github: USER_DATA.contact.github
    },
    summary: "Experienced Full-stack Developer and AI/ML Enthusiast with 5+ years of expertise in building scalable applications and implementing machine learning solutions. Passionate about mentoring and fostering collaborative learning environments in technology.",
    experience: [
      {
        title: "Senior Full-Stack Developer",
        company: "Tech Innovation Labs",
        duration: "2022 - Present",
        description: [
          "Led development of microservices architecture serving 1M+ users",
          "Implemented ML-powered recommendation systems using Python and TensorFlow",
          "Mentored junior developers and conducted technical interviews",
          "Reduced application load time by 40% through optimization"
        ],
        technologies: ["Python", "React", "Node.js", "MongoDB", "AWS", "Docker"]
      },
      {
        title: "Software Engineer",
        company: "Data Solutions Inc",
        duration: "2020 - 2022",
        description: [
          "Developed real-time data processing pipelines using Apache Kafka and Spark",
          "Built responsive web applications with React and TypeScript",
          "Collaborated with data scientists to deploy ML models in production",
          "Implemented CI/CD pipelines reducing deployment time by 60%"
        ],
        technologies: ["JavaScript", "Python", "Kafka", "Spark", "PostgreSQL"]
      }
    ],
    education: [
      {
        degree: "Master of Science in Computer Science",
        institution: "NYU Tandon School of Engineering",
        duration: "2018 - 2020",
        gpa: "3.8/4.0",
        achievements: [
          "Specialized in Big Data Analytics and Machine Learning",
          "Teaching Assistant for Advanced Algorithms course",
          "Published research on distributed systems optimization"
        ]
      }
    ],
    achievements: [
      "Led team of 5 developers in successful delivery of enterprise-grade applications",
      "Mentored 20+ students in AI/ML and full-stack development",
      "Contributed to open-source projects with 500+ GitHub stars",
      "Speaker at 3 major tech conferences on AI and web development",
      "Reduced system costs by 30% through cloud optimization strategies"
    ],
    certifications: [
      {
        name: "AWS Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023"
      },
      {
        name: "MongoDB Certified Developer",
        issuer: "MongoDB Inc.",
        date: "2022"
      }
    ]
  };

  const handleCustomCommand = (command: string): React.ReactNode => {
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
      case 'skills':
        return <InteractiveSkillsShowcase />;
      case 'projects':
        return <InteractiveProjectShowcase projects={enhancedProjects} />;
      case 'resume':
        return <DownloadableResume data={resumeData} />;
      case 'about':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-300"># About Harshitha</h3>
            <p className="text-gray-400">{USER_DATA.about.experience}</p>
            <p className="text-gray-400">{USER_DATA.about.mentorship}</p>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <MailIcon className="w-6 h-6 text-green-400"/>
              <a href={`mailto:${USER_DATA.contact.email}`} className="hover:underline hover:text-green-300 text-glow">
                {USER_DATA.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <LinkedinIcon className="w-6 h-6 text-green-400"/>
              <a href={USER_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-green-300 text-glow">
                LinkedIn Profile
              </a>
            </div>
            <div className="flex items-center gap-4">
              <GithubIcon className="w-6 h-6 text-green-400"/>
              <a href={USER_DATA.contact.github} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-green-300 text-glow">
                GitHub Profile
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (showBootSequence) {
    return <BootSequence onComplete={() => setShowBootSequence(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono relative overflow-hidden">
      {/* Performance Optimizer */}
      <PerformanceOptimizer />
      
      {/* Background Effects */}
      <LazyComponent fallback={<div className="fixed inset-0 bg-black" />}>
        <MatrixRain />
        <ParticleField />
      </LazyComponent>
      
      <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
        <TerminalWindow>
          <main className="w-full space-y-8">
            {/* Welcome Header with Glitch Effect */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-12"
            >
              <GlitchText 
                text="HARSHITHA.EXE" 
                className="text-4xl md:text-6xl font-bold text-green-400 mb-4"
                intensity={2}
              />
              <motion.p 
                className="text-xl text-cyan-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Welcome to the Neural Network
              </motion.p>
            </motion.div>

            {/* Mode Switcher */}
            <motion.div 
              className="flex justify-center space-x-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={() => setCurrentMode('portfolio')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentMode === 'portfolio' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Portfolio Mode
              </motion.button>
              <motion.button
                onClick={() => setCurrentMode('interactive')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentMode === 'interactive' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Interactive Terminal
              </motion.button>
            </motion.div>

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
                  <EnhancedCommand command="sudo whoami" delay={0}>
                    <div className="mt-2 ml-4 text-sm sm:text-base">
                      <p><span className="font-bold text-green-400 text-glow">Name:</span> {USER_DATA.name}</p>
                      <p><span className="font-bold text-green-400 text-glow">Role:</span> {USER_DATA.role}</p>
                      <p><span className="font-bold text-green-400 text-glow">Skills:</span> {USER_DATA.introSkills}</p>
                      <p><span className="font-bold text-green-400 text-glow">Education:</span> {USER_DATA.education}</p>
                    </div>
                  </EnhancedCommand>

                  <EnhancedCommand command="cat welcome.txt" delay={1}>
                    <motion.pre 
                      className="text-green-400 my-4 text-xs sm:text-sm md:text-base whitespace-pre-wrap"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1 }}
                    >
                      {USER_DATA.asciiArt}
                    </motion.pre>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <p>Welcome to my interactive terminal portfolio.</p>
                      <p>Experience next-generation web development.</p>
                      <p className="text-cyan-400 mt-2">Try switching to Interactive Terminal mode above! 🚀</p>
                    </motion.div>
                  </EnhancedCommand>

                  <EnhancedCommand command="less /about/bio.txt" delay={2}>
                    <div className="space-y-6 ml-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-lg font-semibold text-green-300"># Education</h3>
                        <p className="mt-2 text-gray-400">{USER_DATA.about.education}</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-lg font-semibold text-green-300"># Experience</h3>
                        <p className="mt-2 text-gray-400">{USER_DATA.about.experience}</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h3 className="text-lg font-semibold text-green-300"># Mentorship</h3>
                        <p className="mt-2 text-gray-400">{USER_DATA.about.mentorship}</p>
                      </motion.div>
                    </div>
                  </EnhancedCommand>
                  
                  <EnhancedCommand command="ls -la /projects --showcase" delay={3}>
                    <LazyComponent fallback={<div className="text-gray-500">Loading projects...</div>}>
                      <InteractiveProjectShowcase projects={enhancedProjects} />
                    </LazyComponent>
                  </EnhancedCommand>

                  <EnhancedCommand command="tree /skills --interactive" delay={4}>
                    <LazyComponent fallback={<div className="text-gray-500">Loading skills...</div>}>
                      <InteractiveSkillsShowcase />
                    </LazyComponent>
                  </EnhancedCommand>

                  <EnhancedCommand command="cat /contact.info" delay={5}>
                    <div className="ml-4 space-y-4 mt-2">
                      <motion.p 
                        className="flex items-center gap-4"
                        whileHover={{ x: 10 }}
                      >
                        <MailIcon className="w-6 h-6 text-green-400"/>
                        <a href={`mailto:${USER_DATA.contact.email}`} className="hover:underline hover:text-green-300 text-glow">
                          {USER_DATA.contact.email}
                        </a>
                      </motion.p>
                      <motion.p 
                        className="flex items-center gap-4"
                        whileHover={{ x: 10 }}
                      >
                        <LinkedinIcon className="w-6 h-6 text-green-400"/>
                        <a href={USER_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-green-300 text-glow">
                          linkedin.com/in/harshithajay
                        </a>
                      </motion.p>
                      <motion.p 
                        className="flex items-center gap-4"
                        whileHover={{ x: 10 }}
                      >
                        <GithubIcon className="w-6 h-6 text-green-400"/>
                        <a href={USER_DATA.contact.github} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-green-300 text-glow">
                          github.com/harshithajay
                        </a>
                      </motion.p>
                    </div>
                  </EnhancedCommand>

                  <EnhancedCommand command="generate-resume --download" delay={6}>
                    <LazyComponent fallback={<div className="text-gray-500">Generating resume...</div>}>
                      <DownloadableResume data={resumeData} />
                    </LazyComponent>
                  </EnhancedCommand>

                  {/* Fake prompt for effect */}
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 7 }}
                  >
                    <div className="flex items-center text-sm">
                      <span className="text-green-400 font-bold">harshitha</span>
                      <span className="text-gray-400">@</span>
                      <span className="text-blue-400 font-bold">portfolio</span>
                      <span className="text-gray-400">:</span>
                      <span className="text-cyan-400 font-bold">~</span>
                      <span className="text-gray-400">$</span>
                    </div>
                    <span className="ml-2 flex-grow"></span>
                    <Cursor />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
          
          <motion.footer 
            className="text-center text-gray-500 text-sm mt-20 pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 8 }}
          >
            <p>&copy; {new Date().getFullYear()} {USER_DATA.name}. All rights reserved.</p>
            <p>Built with React, Framer Motion & Advanced Terminal Animations.</p>
            <p className="text-green-400 mt-2">🚀 Next-generation portfolio experience</p>
          </motion.footer>
        </TerminalWindow>
      </div>
    </div>
  );
};

export default App;