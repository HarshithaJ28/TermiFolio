import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Server, Database, Cpu, Zap, GitBranch, Monitor } from 'lucide-react';
import { USER_DATA } from '../constants';

const InteractiveSkillsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'languages' | 'frameworks' | 'tools'>('languages');
  const [scanningIndex, setScanningIndex] = useState(-1);
  const [loadedItems, setLoadedItems] = useState<string[]>([]);

  // Enhanced skills data with categories
  const skillsData = {
    languages: [
      { name: 'Python', category: 'Backend', icon: '🐍', level: 'expert' },
      { name: 'JavaScript', category: 'Frontend', icon: '⚡', level: 'expert' },
      { name: 'TypeScript', category: 'Frontend', icon: '📘', level: 'advanced' },
      { name: 'C++', category: 'Systems', icon: '⚙️', level: 'advanced' },
      { name: 'SQL', category: 'Database', icon: '🗃️', level: 'advanced' }
    ],
    frameworks: [
      { name: 'React', category: 'Frontend', icon: '⚛️', level: 'expert' },
      { name: 'Node.js', category: 'Backend', icon: '🟢', level: 'expert' },
      { name: 'Express', category: 'Backend', icon: '🚄', level: 'advanced' },
      { name: 'Flask', category: 'Backend', icon: '🌶️', level: 'advanced' },
      { name: 'Next.js', category: 'Frontend', icon: '▲', level: 'proficient' }
    ],
    tools: [
      { name: 'Git', category: 'Version Control', icon: '🌳', level: 'expert' },
      { name: 'Docker', category: 'DevOps', icon: '🐳', level: 'advanced' },
      { name: 'MongoDB', category: 'Database', icon: '🍃', level: 'expert' },
      { name: 'PostgreSQL', category: 'Database', icon: '🐘', level: 'advanced' },
      { name: 'Kafka', category: 'Big Data', icon: '⚡', level: 'proficient' },
      { name: 'Spark', category: 'Big Data', icon: '✨', level: 'proficient' },
      { name: 'Kubernetes', category: 'DevOps', icon: '☸️', level: 'proficient' }
    ]
  };

  const tabs = [
    { id: 'languages' as const, label: 'Languages', icon: <Code2 className="w-4 h-4" />, command: 'cat languages.py' },
    { id: 'frameworks' as const, label: 'Frameworks', icon: <Server className="w-4 h-4" />, command: 'ls frameworks/' },
    { id: 'tools' as const, label: 'Tools', icon: <Database className="w-4 h-4" />, command: 'which tools' }
  ];

  // Scanning animation effect
  useEffect(() => {
    const currentSkills = skillsData[activeTab];
    setScanningIndex(0);
    setLoadedItems([]);
    
    const scanInterval = setInterval(() => {
      setScanningIndex(prev => {
        if (prev >= currentSkills.length - 1) {
          clearInterval(scanInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 300);

    // Add items to loaded list with delay
    const loadInterval = setInterval(() => {
      setLoadedItems(prev => {
        const nextIndex = prev.length;
        if (nextIndex >= currentSkills.length) {
          clearInterval(loadInterval);
          return prev;
        }
        return [...prev, currentSkills[nextIndex].name];
      });
    }, 400);

    return () => {
      clearInterval(scanInterval);
      clearInterval(loadInterval);
    };
  }, [activeTab]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'border-green-400/40 bg-green-400/10 text-green-400';
      case 'advanced': return 'border-cyan-400/40 bg-cyan-400/10 text-cyan-400';
      case 'proficient': return 'border-yellow-400/40 bg-yellow-400/10 text-yellow-400';
      default: return 'border-gray-400/40 bg-gray-400/10 text-gray-400';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'expert': return '●●●';
      case 'advanced': return '●●○';
      case 'proficient': return '●○○';
      default: return '○○○';
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
        <span>harshitha@portfolio:/skills$</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-cyan-400"
        >
          █
        </motion.span>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-900/30 p-1 rounded-lg border border-gray-700/50">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-mono transition-all ${
              activeTab === tab.id
                ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Command Display */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-sm text-gray-400 font-mono"
      >
        <span className="text-green-400">$ </span>
        {tabs.find(tab => tab.id === activeTab)?.command}
      </motion.div>

      {/* Skills Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900/20 border border-gray-700/30 rounded-lg p-6 backdrop-blur-sm"
        >
          {/* Scanning Indicator */}
          <div className="mb-4 text-xs text-cyan-400 font-mono">
            Scanning {activeTab}... [{scanningIndex + 1}/{skillsData[activeTab].length}]
          </div>

          {/* Skills Tag Cloud */}
          <div className="flex flex-wrap gap-3">
            {skillsData[activeTab].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: loadedItems.includes(skill.name) ? 1 : 0.4,
                  scale: loadedItems.includes(skill.name) ? 1 : 0.9,
                  y: 0,
                  boxShadow: scanningIndex === index ? "0 0 15px rgba(0, 255, 255, 0.4)" : "none"
                }}
                transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 5px 20px rgba(0, 255, 255, 0.2)"
                }}
                className={`group relative px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                  scanningIndex === index 
                    ? 'border-cyan-400/60 bg-cyan-400/15' 
                    : getLevelColor(skill.level)
                }`}
              >
                {/* Skill Badge Content */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{skill.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{skill.name}</span>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-gray-400">{skill.category}</span>
                      <span className="font-mono text-xs opacity-70">
                        {getLevelIcon(skill.level)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scanning Line Effect */}
                {scanningIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1, repeat: 2 }}
                  />
                )}

                {/* Hover Terminal Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-green-400/30 rounded px-2 py-1 text-xs text-green-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {skill.level.toUpperCase()}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Status Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 pt-4 border-t border-gray-700/30 flex justify-between items-center text-xs text-gray-400 font-mono"
          >
            <div>
              Status: {loadedItems.length === skillsData[activeTab].length ? 'SCAN_COMPLETE' : 'SCANNING...'}
            </div>
            <div>
              Total: {skillsData[activeTab].length} items
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Terminal Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex items-center space-x-2 text-green-400 text-sm font-mono"
      >
        <span>harshitha@portfolio:/skills$</span>
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

export default InteractiveSkillsShowcase;