import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Code, ExternalLink, Github, Star } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  techStack: string[];
  github: string;
  demo?: string;
  image?: string;
  stats?: {
    stars?: number;
    forks?: number;
    commits?: number;
  };
}

interface InteractiveProjectShowcaseProps {
  projects: Project[];
}

const InteractiveProjectShowcase: React.FC<InteractiveProjectShowcaseProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentCode, setCurrentCode] = useState('');

  const codeExamples: { [key: string]: string } = {
    'GrubSync': `
// Real-time event processing with Kafka
const processEventStream = async () => {
  const consumer = kafka.consumer({ groupId: 'grub-sync' });
  await consumer.subscribe({ topic: 'food-events' });
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      await analyzeAndRecommend(event);
    },
  });
};`,
    'VIP-Metaverse': `
// Unity C# - Real-time avatar synchronization
public class AvatarSync : MonoBehaviourPunPV {
    void Update() {
        if (photonView.IsMine) {
            // Send position data to other clients
            photonView.RPC("UpdatePosition", 
                RpcTarget.Others, 
                transform.position, 
                transform.rotation
            );
        }
    }
}`,
    'FilePathChecker': `
// Python AST analysis for hardcoded paths
def analyze_file(file_path):
    with open(file_path, 'r') as f:
        tree = ast.parse(f.read())
    
    for node in ast.walk(tree):
        if isinstance(node, ast.Str):
            if is_hardcoded_path(node.s):
                yield PathIssue(node.lineno, node.s)`,
    'RandomWalkVisualizer': `
// 3D random walk simulation
def random_walk_3d(steps=1000):
    positions = [(0, 0, 0)]
    x, y, z = 0, 0, 0
    
    for _ in range(steps):
        direction = random.choice(['x+', 'x-', 'y+', 'y-', 'z+', 'z-'])
        # Update position based on random direction
        x, y, z = update_position(x, y, z, direction)
        positions.append((x, y, z))
    
    return positions`
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        setSelectedProject(prev => (prev + 1) % projects.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying, projects.length]);

  useEffect(() => {
    const project = projects[selectedProject];
    const code = codeExamples[project.name] || '// No code example available';
    setCurrentCode('');
    
    // Typewriter effect for code
    let i = 0;
    const typeCode = () => {
      if (i < code.length) {
        setCurrentCode(prev => prev + code[i]);
        i++;
        setTimeout(typeCode, 20);
      }
    };
    
    setTimeout(typeCode, 500);
  }, [selectedProject, projects]);

  const currentProject = projects[selectedProject];

  return (
    <div className="space-y-6">
      {/* Project Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setSelectedProject(index);
                setIsAutoPlaying(false);
              }}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                index === selectedProject 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {index + 1}
            </motion.button>
          ))}
        </div>
        
        <motion.button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="flex items-center space-x-2 text-green-400 hover:text-green-300"
          whileHover={{ scale: 1.05 }}
        >
          {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span className="text-sm">{isAutoPlaying ? 'Pause' : 'Play'}</span>
        </motion.button>
      </div>

      {/* Project Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProject}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800"
        >
          {/* Project Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <motion.h3 
                  className="text-xl font-bold text-green-400"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  {currentProject.name}
                </motion.h3>
                <motion.p 
                  className="text-gray-300 mt-1"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {currentProject.description}
                </motion.p>
              </div>
              
              <div className="flex space-x-2">
                <motion.a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={16} className="text-gray-300" />
                </motion.a>
                {currentProject.demo && (
                  <motion.a
                    href={currentProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-green-600 rounded hover:bg-green-500 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={16} className="text-white" />
                  </motion.a>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            <motion.div 
              className="flex flex-wrap gap-2 mt-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentProject.techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Code Preview */}
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Code size={16} className="text-green-400" />
              <span className="text-sm text-green-400">Code Preview</span>
            </div>
            <motion.div
              className="bg-black rounded p-4 font-mono text-sm overflow-x-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <pre className="text-green-300">
                <code>{currentCode}</code>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-green-400"
                >
                  ▋
                </motion.span>
              </pre>
            </motion.div>
          </div>

          {/* Project Stats */}
          {currentProject.stats && (
            <motion.div 
              className="p-4 border-t border-gray-700 flex space-x-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {currentProject.stats.stars && (
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star size={16} />
                  <span>{currentProject.stats.stars}</span>
                </div>
              )}
              {currentProject.stats.forks && (
                <div className="text-gray-400">
                  <span className="font-mono">{currentProject.stats.forks} forks</span>
                </div>
              )}
              {currentProject.stats.commits && (
                <div className="text-gray-400">
                  <span className="font-mono">{currentProject.stats.commits} commits</span>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-full h-1">
        <motion.div
          className="bg-green-400 h-1 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((selectedProject + 1) / projects.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default InteractiveProjectShowcase;