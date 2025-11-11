import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Award, 
  Code, 
  FileText,
  Folder,
  FolderOpen,
  Play,
  CheckCircle
} from 'lucide-react';

const EducationExperience: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'education' | 'experience'>('education');
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Clean education data with logos
  const educationData = [
    {
      id: 'msc_cs',
      degree: "Master of Science in Computer Science",
      institution: "NYU Tandon School of Engineering",
      logo: "https://engineering.nyu.edu/sites/default/files/2019-01/tandon_long_color.png",
      location: "New York, NY",
      period: "2022 - 2024",
      gpa: "3.8/4.0",
      description: "Specialized in Big Data Analytics, Machine Learning, and Distributed Systems",
      technologies: ["Python", "Spark", "Hadoop", "TensorFlow", "Kubernetes"]
    },
    {
      id: 'btech_cs',
      degree: "Bachelor of Technology in Computer Science",
      institution: "Previous Institution",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=80&fit=crop&auto=format",
      location: "India", 
      period: "2018 - 2022",
      gpa: "8.9/10.0",
      description: "Strong foundation in Software Development, Data Structures, and Algorithms",
      technologies: ["Java", "C++", "JavaScript", "MySQL", "Git"]
    }
  ];

  // Clean experience data with company logos
  const experienceData = [
    {
      id: 'fs_intern',
      title: "Full-Stack Developer Intern",
      company: "Tech Innovation Lab",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=80&fit=crop&auto=format",
      location: "New York, NY",
      period: "Summer 2023",
      type: "Internship",
      description: "Developed scalable web applications and implemented ML-driven analytics solutions",
      technologies: ["React", "Node.js", "Python", "MongoDB", "AWS"],
      impact: "40% performance improvement"
    },
    {
      id: 'research_assistant',
      title: "Research Assistant",
      company: "NYU Tandon School of Engineering",
      logo: "https://engineering.nyu.edu/sites/default/files/2019-01/tandon_long_color.png",
      location: "Brooklyn, NY",
      period: "2023 - 2024",
      type: "Research",
      description: "Conducted cutting-edge research in distributed systems and big data processing",
      technologies: ["Python", "Apache Spark", "Kafka", "Hadoop", "TensorFlow"],
      impact: "3 publications"
    },
    {
      id: 'software_dev',
      title: "Software Developer", 
      company: "Previous Company",
      logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=80&fit=crop&auto=format",
      location: "India",
      period: "2021 - 2022",
      type: "Full-time",
      description: "Developed enterprise applications and led development teams",
      technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker"],
      impact: "Led 5-person team"
    }
  ];

  const typeCommand = (command: string) => {
    setIsTyping(true);
    setTypingText('');
    let i = 0;
    const typing = setInterval(() => {
      if (i < command.length) {
        setTypingText(command.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
        setIsTyping(false);
      }
    }, 50);
  };

  useEffect(() => {
    const command = activeSection === 'education' 
      ? 'cat ~/portfolio/education.json' 
      : 'cat ~/portfolio/experience.json';
    typeCommand(command);
  }, [activeSection]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full space-y-6"
    >
      {/* Enhanced Terminal Header */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-green-400 text-sm font-mono relative">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Terminal className="w-4 h-4" />
          </motion.div>
          <span>harshitha@portfolio:~$</span>
          <motion.span 
            className="text-white"
            animate={{ 
              textShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 10px rgba(34,211,238,0.5)",
                "0 0 0px rgba(255,255,255,0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {typingText}
          </motion.span>
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-cyan-400"
            >
              █
            </motion.span>
          )}
          
          {/* Floating particles */}
          <motion.div
            className="absolute -top-1 left-20 w-1 h-1 bg-cyan-400 rounded-full"
            animate={{ 
              y: [-5, -15, -5],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              delay: 0
            }}
          />
          <motion.div
            className="absolute -top-2 left-32 w-0.5 h-0.5 bg-green-400 rounded-full"
            animate={{ 
              y: [-3, -12, -3],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              delay: 0.5
            }}
          />
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-900/60 rounded-lg p-1 border border-gray-700/50 relative overflow-hidden">
        {/* Animated background indicator */}
        <motion.div
          className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ${
            activeSection === 'education' 
              ? 'left-1 w-[calc(50%-0.125rem)] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30' 
              : 'left-[calc(50%+0.125rem)] w-[calc(50%-0.125rem)] bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30'
          }`}
          layout
        />
        
        <motion.button
          onClick={() => setActiveSection('education')}
          className={`relative flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-mono transition-all z-10 cursor-pointer ${
            activeSection === 'education'
              ? 'text-cyan-400'
              : 'text-gray-400 hover:text-cyan-300'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ 
              rotate: activeSection === 'education' ? 360 : 0,
              scale: activeSection === 'education' ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <GraduationCap className="w-4 h-4" />
          </motion.div>
          <span>Education</span>
          {activeSection === 'education' && (
            <motion.div
              className="absolute inset-0 bg-cyan-400/10 rounded-md opacity-0 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
        
        <motion.button
          onClick={() => setActiveSection('experience')}
          className={`relative flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-mono transition-all z-10 cursor-pointer ${
            activeSection === 'experience'
              ? 'text-purple-400'
              : 'text-gray-400 hover:text-purple-300'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ 
              rotate: activeSection === 'experience' ? 360 : 0,
              scale: activeSection === 'experience' ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Briefcase className="w-4 h-4" />
          </motion.div>
          <span>Experience</span>
          {activeSection === 'experience' && (
            <motion.div
              className="absolute inset-0 bg-purple-400/10 rounded-md opacity-0 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeSection === 'education' ? (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-gradient-to-r from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/30 rounded-xl p-4 hover:border-cyan-400/60 transition-all duration-300 group overflow-hidden cursor-pointer backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "rgba(34, 211, 238, 0.6)"
                }}
              >
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-5 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-400/10"></div>
                </div>

                {/* Minimal Corner Accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-cyan-400/40 group-hover:border-cyan-300/60 transition-colors duration-300"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-cyan-400/40 group-hover:border-cyan-300/60 transition-colors duration-300"></div>

                {/* Enhanced Header */}
                <div className="relative z-10 flex items-center space-x-4 mb-3">
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-400/30 p-2 flex-shrink-0"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: "rgba(34, 211, 238, 0.5)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img 
                      src={edu.logo} 
                      alt={edu.institution}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <motion.h3 
                        className="text-white font-semibold text-lg truncate group-hover:text-cyan-300 transition-colors duration-300"
                        whileHover={{ x: 3 }}
                      >
                        {edu.degree}
                      </motion.h3>
                      <motion.span 
                        className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-medium rounded-full border border-purple-400/30 ml-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <span className="font-mono">{edu.gpa}</span>
                      </motion.span>
                    </div>
                    
                    <motion.p 
                      className="text-cyan-300 font-medium group-hover:text-cyan-200 transition-colors duration-300"
                      whileHover={{ x: 2 }}
                    >
                      {edu.institution}
                    </motion.p>
                    
                    <div className="flex items-center space-x-3 text-sm text-gray-400 mt-1">
                      <motion.span 
                        className="flex items-center space-x-1"
                        whileHover={{ scale: 1.02, color: "#9ca3af" }}
                      >
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{edu.location}</span>
                      </motion.span>
                      <motion.span 
                        className="flex items-center space-x-1"
                        whileHover={{ scale: 1.02, color: "#9ca3af" }}
                      >
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>{edu.period}</span>
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="relative z-10 space-y-3">
                  <motion.p 
                    className="text-gray-200 text-sm leading-relaxed bg-gray-900/30 p-3 rounded-lg border border-cyan-400/20 backdrop-blur-sm"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ 
                      opacity: 1, 
                      x: 3,
                      backgroundColor: "rgba(34, 211, 238, 0.05)",
                      borderColor: "rgba(34, 211, 238, 0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {edu.description}
                  </motion.p>
                  
                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2">
                    {edu.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        className="px-2 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded border border-cyan-400/30 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-colors duration-200"
                        whileHover={{ 
                          scale: 1.05,
                          y: -1
                        }}
                        transition={{ type: "spring", stiffness: 400 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <span className="font-mono text-xs">{tech}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Subtle Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                
                {/* Pulse Ring Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-cyan-400/0 group-hover:border-cyan-400/30"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-gradient-to-r from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-purple-400/30 rounded-xl p-4 hover:border-purple-400/60 transition-all duration-300 group overflow-hidden cursor-pointer backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "rgba(168, 85, 247, 0.6)"
                }}
              >
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-5 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400/10 via-transparent to-pink-400/10"></div>
                </div>

                {/* Minimal Corner Accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-purple-400/40 group-hover:border-purple-300/60 transition-colors duration-300"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-purple-400/40 group-hover:border-purple-300/60 transition-colors duration-300"></div>

                {/* Enhanced Header */}
                <div className="relative z-10 flex items-center space-x-4 mb-3">
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-400/30 p-2 flex-shrink-0"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: "rgba(168, 85, 247, 0.5)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img 
                      src={exp.logo} 
                      alt={exp.company}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <motion.h3 
                        className="text-white font-semibold text-lg truncate group-hover:text-purple-300 transition-colors duration-300"
                        whileHover={{ x: 3 }}
                      >
                        {exp.title}
                      </motion.h3>
                      <motion.span 
                        className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30 ml-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <span className="font-mono">{exp.type}</span>
                      </motion.span>
                    </div>
                    
                    <motion.p 
                      className="text-purple-300 font-medium group-hover:text-purple-200 transition-colors duration-300"
                      whileHover={{ x: 2 }}
                    >
                      {exp.company}
                    </motion.p>
                    
                    <div className="flex items-center space-x-3 text-sm text-gray-400 mt-1">
                      <motion.span 
                        className="flex items-center space-x-1"
                        whileHover={{ scale: 1.02, color: "#9ca3af" }}
                      >
                        <MapPin className="w-3 h-3 text-purple-400" />
                        <span>{exp.location}</span>
                      </motion.span>
                      <motion.span 
                        className="flex items-center space-x-1"
                        whileHover={{ scale: 1.02, color: "#9ca3af" }}
                      >
                        <Calendar className="w-3 h-3 text-purple-400" />
                        <span>{exp.period}</span>
                      </motion.span>
                      <motion.span 
                        className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-medium rounded-full border border-purple-400/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="font-mono">{exp.impact}</span>
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="relative z-10 space-y-3">
                  <motion.p 
                    className="text-gray-200 text-sm leading-relaxed bg-gray-900/30 p-3 rounded-lg border border-purple-400/20 backdrop-blur-sm"
                    whileHover={{ x: 3 }}
                  >
                    {exp.description}
                  </motion.p>
                  
                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded border border-purple-400/30 hover:bg-purple-500/20 hover:border-purple-400/50 transition-colors duration-200"
                        whileHover={{ 
                          scale: 1.05,
                          y: -1
                        }}
                        transition={{ type: "spring", stiffness: 400 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <span className="font-mono text-xs">{tech}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Subtle Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center justify-between text-xs font-mono text-gray-400 pt-4 border-t border-gray-700/30"
      >
        <div className="flex items-center space-x-2">
          <Terminal className="w-3 h-3 text-green-400" />
          <span>harshitha@portfolio:~$</span>
          <span className="text-green-400">
            {activeSection === 'education' ? 'education data loaded successfully' : 'experience data loaded successfully'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-green-400">Ready</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EducationExperience;