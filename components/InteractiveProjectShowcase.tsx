import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Star, 
  GitBranch, 
  Activity,
  Code,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

interface Project {
  name: string;
  description: string;
  techStack: string[];
  github: string;
  stats?: {
    stars: number;
    forks: number;
    commits: number;
  };
}

interface InteractiveProjectShowcaseProps {
  projects: Project[];
}

const InteractiveProjectShowcase: React.FC<InteractiveProjectShowcaseProps> = ({ projects }) => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Auto-advance projects
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  // Show details after initial load
  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const techColors = {
    'React': 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    'Python': 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    'JavaScript': 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    'TypeScript': 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    'Node.js': 'text-green-400 border-green-400/30 bg-green-400/10',
    'MongoDB': 'text-green-400 border-green-400/30 bg-green-400/10',
    'Flask': 'text-gray-400 border-gray-400/30 bg-gray-400/10',
    'Spark': 'text-orange-400 border-orange-400/30 bg-orange-400/10',
    'Kafka': 'text-red-400 border-red-400/30 bg-red-400/10',
    'Unity': 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    'C#': 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    'Dask': 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10'
  };

  const getTechColor = (tech: string) => {
    return techColors[tech as keyof typeof techColors] || 'text-gray-400 border-gray-400/30 bg-gray-400/10';
  };

  const project = projects[currentProject];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full"
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 rounded-t-lg border border-green-500/30 border-b-0">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-xs text-gray-400 ml-4 flex items-center space-x-2">
              <Code className="w-3 h-3" />
              <span>Project Showcase</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-xs text-cyan-400">
              {currentProject + 1} / {projects.length}
            </div>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-900/50 border border-green-500/30 border-t-0 rounded-b-lg backdrop-blur-sm overflow-hidden">
        {/* Command Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-4 py-3 border-b border-gray-700/50"
        >
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-green-400">harshitha@portfolio:</span>
            <span className="text-white">cd projects/ && ls -la</span>
          </div>
        </motion.div>

        {/* Project Display */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="space-y-6"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between">
                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    {project.name}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-300 leading-relaxed max-w-2xl"
                  >
                    {project.description}
                  </motion.p>
                </div>

                {/* Project Stats */}
                {project.stats && showDetails && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col space-y-2 bg-black/30 rounded-lg p-3 border border-green-500/20"
                  >
                    <div className="flex items-center space-x-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300">{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <GitBranch className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">{project.stats.forks}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Activity className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">{project.stats.commits}</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 text-sm">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400">Tech Stack:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300
                        ${getTechColor(tech)}
                        ${hoveredTech === tech ? 'scale-110 shadow-lg' : ''}
                        cursor-pointer
                      `}
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-4 pt-4"
              >
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  <span>View Source</span>
                </motion.a>

                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700/50"
          >
            <button
              onClick={prevProject}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Previous</span>
            </button>

            {/* Project Indicators */}
            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentProject 
                      ? 'bg-green-400 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveProjectShowcase;