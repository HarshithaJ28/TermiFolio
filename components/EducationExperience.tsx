import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, GraduationCap, Briefcase, MapPin, Calendar, Award, Code, Users } from 'lucide-react';

const EducationExperience: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'education' | 'experience'>('education');
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Education data
  const educationData = [
    {
      degree: "Master of Science in Computer Science",
      institution: "NYU Tandon School of Engineering",
      location: "New York, NY",
      period: "2022 - 2024",
      gpa: "3.8/4.0",
      focus: "Big Data Analytics, Machine Learning, Distributed Systems",
      achievements: [
        "Specialized in big data analytics and machine learning",
        "Completed advanced coursework in distributed systems",
        "Research focus on scalable data processing systems"
      ],
      courses: ["Machine Learning", "Big Data Analytics", "Distributed Systems", "Data Structures & Algorithms"]
    },
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Previous Institution",
      location: "India",
      period: "2018 - 2022",
      gpa: "8.9/10.0",
      focus: "Software Development, Data Structures, Algorithms",
      achievements: [
        "Graduated with distinction",
        "Active in coding competitions and hackathons",
        "Led multiple student tech projects"
      ],
      courses: ["Data Structures", "Algorithms", "Web Development", "Database Management"]
    }
  ];

  // Work experience data
  const experienceData = [
    {
      title: "Full-Stack Developer Intern",
      company: "Tech Innovation Lab",
      location: "New York, NY",
      period: "Summer 2023",
      type: "Internship",
      responsibilities: [
        "Developed scalable web applications using React and Node.js",
        "Implemented machine learning models for data analytics",
        "Collaborated with cross-functional teams on product development",
        "Optimized application performance and reduced load times by 40%"
      ],
      technologies: ["React", "Node.js", "Python", "MongoDB", "AWS"]
    },
    {
      title: "Research Assistant",
      company: "NYU Tandon School of Engineering",
      location: "Brooklyn, NY",
      period: "2023 - 2024",
      type: "Research",
      responsibilities: [
        "Conducted research on distributed systems and big data processing",
        "Developed tools for analyzing large-scale datasets",
        "Published findings in academic conferences",
        "Mentored undergraduate students in research methodologies"
      ],
      technologies: ["Python", "Spark", "Kafka", "Hadoop", "TensorFlow"]
    },
    {
      title: "Software Developer",
      company: "Previous Company",
      location: "India",
      period: "2021 - 2022",
      type: "Full-time",
      responsibilities: [
        "Built and maintained enterprise-level applications",
        "Implemented automated testing and CI/CD pipelines",
        "Led a team of junior developers on key projects",
        "Contributed to system architecture and design decisions"
      ],
      technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker"]
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
    const command = activeSection === 'education' ? 'cat ~/cv/education.json' : 'cat ~/cv/experience.json';
    typeCommand(command);
  }, [activeSection]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Internship':
        return '🎯';
      case 'Research':
        return '🔬';
      case 'Full-time':
        return '💼';
      default:
        return '💼';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full space-y-6"
    >
      {/* Terminal Header */}
      <div className="flex items-center space-x-2 text-green-400 text-sm">
        <Terminal className="w-4 h-4" />
        <span>harshitha@portfolio:/cv$</span>
        <span className="text-white">{typingText}</span>
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="text-cyan-400"
          >
            █
          </motion.span>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-900/30 p-1 rounded-lg border border-gray-700/50">
        <motion.button
          onClick={() => setActiveSection('education')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-mono transition-all ${
            activeSection === 'education'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
              : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Education</span>
        </motion.button>
        
        <motion.button
          onClick={() => setActiveSection('experience')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-mono transition-all ${
            activeSection === 'experience'
              ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
              : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Briefcase className="w-4 h-4" />
          <span>Experience</span>
        </motion.button>
      </div>

      {/* Content Display */}
      <AnimatePresence mode="wait">
        {activeSection === 'education' ? (
          <motion.div
            key="education"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900/20 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-blue-500/40 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-1">{edu.degree}</h3>
                    <div className="flex items-center space-x-4 text-gray-300">
                      <div className="flex items-center space-x-1">
                        <GraduationCap className="w-4 h-4 text-blue-400" />
                        <span>{edu.institution}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="text-blue-400 font-mono text-sm mt-1">GPA: {edu.gpa}</div>
                  </div>
                </div>

                {/* Focus Area */}
                <div className="mb-4">
                  <div className="text-cyan-400 text-sm font-mono mb-2">Focus Area:</div>
                  <div className="text-gray-300">{edu.focus}</div>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <div className="text-green-400 text-sm font-mono mb-2">Key Achievements:</div>
                  <ul className="space-y-1">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start space-x-2 text-gray-300">
                        <Award className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Relevant Courses */}
                <div>
                  <div className="text-purple-400 text-sm font-mono mb-2">Relevant Coursework:</div>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded border border-purple-400/20"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="experience"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900/20 border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-purple-500/40 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-bold text-purple-400">{exp.title}</h3>
                      <span className="text-lg">{getTypeIcon(exp.type)}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Briefcase className="w-4 h-4 text-purple-400" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="text-purple-400 font-mono text-sm mt-1">{exp.type}</div>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-4">
                  <div className="text-cyan-400 text-sm font-mono mb-3">Key Responsibilities:</div>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start space-x-2 text-gray-300">
                        <Code className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <div className="text-orange-400 text-sm font-mono mb-2">Technologies Used:</div>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded border border-orange-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xs text-gray-400 font-mono border-t border-gray-700/30 pt-4"
      >
        <div className="flex justify-between items-center">
          <span>
            {activeSection === 'education' 
              ? `Education records: ${educationData.length} entries loaded` 
              : `Experience records: ${experienceData.length} positions loaded`
            }
          </span>
          <span className="text-green-400">STATUS: ✓ VERIFIED</span>
        </div>
      </motion.div>

      {/* Terminal Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex items-center space-x-2 text-green-400 text-sm font-mono"
      >
        <span>harshitha@portfolio:/cv$</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-white"
        >
          █
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default EducationExperience;