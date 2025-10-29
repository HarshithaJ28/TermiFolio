import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Globe, Code, Zap, Star } from 'lucide-react';

interface SkillCategory {
  name: string;
  skills: Array<{
    name: string;
    level: number;
    experience: string;
    icon?: React.ComponentType<any>;
  }>;
  icon: React.ComponentType<any>;
  color: string;
}

const InteractiveSkillsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);

  const skillCategories: SkillCategory[] = [
    {
      name: "Languages",
      icon: Code,
      color: "text-blue-400",
      skills: [
        { name: "Python", level: 95, experience: "5+ years" },
        { name: "JavaScript/TypeScript", level: 90, experience: "4+ years" },
        { name: "C++", level: 85, experience: "3+ years" },
        { name: "SQL", level: 80, experience: "3+ years" },
        { name: "Java", level: 75, experience: "2+ years" }
      ]
    },
    {
      name: "Frontend",
      icon: Globe,
      color: "text-green-400",
      skills: [
        { name: "React", level: 92, experience: "4+ years" },
        { name: "Next.js", level: 85, experience: "2+ years" },
        { name: "Vue.js", level: 80, experience: "2+ years" },
        { name: "Tailwind CSS", level: 90, experience: "3+ years" },
        { name: "TypeScript", level: 88, experience: "3+ years" }
      ]
    },
    {
      name: "Backend",
      icon: Database,
      color: "text-yellow-400",
      skills: [
        { name: "Node.js", level: 90, experience: "4+ years" },
        { name: "Express.js", level: 88, experience: "4+ years" },
        { name: "Flask", level: 85, experience: "3+ years" },
        { name: "MongoDB", level: 82, experience: "3+ years" },
        { name: "PostgreSQL", level: 80, experience: "2+ years" }
      ]
    },
    {
      name: "DevOps & Tools",
      icon: Cpu,
      color: "text-purple-400",
      skills: [
        { name: "Docker", level: 83, experience: "2+ years" },
        { name: "Kubernetes", level: 75, experience: "1+ years" },
        { name: "AWS", level: 80, experience: "2+ years" },
        { name: "Git", level: 95, experience: "5+ years" },
        { name: "CI/CD", level: 78, experience: "2+ years" }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentCategory = skillCategories[selectedCategory];
  const IconComponent = currentCategory.icon;

  return (
    <div className="space-y-6">
      {/* Category Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {skillCategories.map((category, index) => {
          const CategoryIcon = category.icon;
          return (
            <motion.button
              key={category.name}
              onClick={() => setSelectedCategory(index)}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                selectedCategory === index
                  ? 'border-green-400 bg-green-400/10'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center space-y-2">
                <CategoryIcon 
                  size={24} 
                  className={selectedCategory === index ? category.color : 'text-gray-400'}
                />
                <span 
                  className={`text-sm font-medium ${
                    selectedCategory === index ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {category.name}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Skills Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          {/* Category Header */}
          <motion.div 
            className="flex items-center space-x-3 mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`p-2 rounded-lg bg-gray-700 ${currentCategory.color}`}>
              <IconComponent size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{currentCategory.name}</h3>
              <p className="text-gray-400 text-sm">Technical Expertise</p>
            </div>
          </motion.div>

          {/* Skills List */}
          <div className="space-y-4">
            {currentCategory.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gray-900 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-white font-medium">{skill.name}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                        >
                          <Star
                            size={12}
                            className={
                              i < Math.floor(skill.level / 20)
                                ? currentCategory.color
                                : 'text-gray-600'
                            }
                            fill={i < Math.floor(skill.level / 20) ? 'currentColor' : 'none'}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${currentCategory.color}`}>
                      {skill.level}%
                    </span>
                    <p className="text-xs text-gray-400">{skill.experience}</p>
                  </div>
                </div>

                {/* Skill Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 relative overflow-hidden">
                  <motion.div
                    className={`h-2 rounded-full ${currentCategory.color.replace('text-', 'bg-')}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.6 + index * 0.1,
                      ease: "easeOut"
                    }}
                  />
                  
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      delay: 1 + index * 0.2,
                      ease: "easeInOut"
                    }}
                    style={{ width: '30%' }}
                  />
                </div>

                {/* Skill Details on Hover */}
                <motion.div
                  className="mt-2 text-xs text-gray-500 opacity-0 hover:opacity-100 transition-opacity"
                  whileHover={{ opacity: 1 }}
                >
                  Professional experience with {skill.name} for {skill.experience}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Category Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Average Proficiency</p>
                <p className={`text-lg font-bold ${currentCategory.color}`}>
                  {Math.round(currentCategory.skills.reduce((acc, skill) => acc + skill.level, 0) / currentCategory.skills.length)}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Total Skills</p>
                <p className="text-lg font-bold text-white">{currentCategory.skills.length}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Live Stats Animation */}
      <motion.div
        animate={{
          y: [0, -5, 0],
          rotateY: animationPhase * 120
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="text-center text-sm text-gray-500"
      >
        <Zap className="inline mr-2" size={16} />
        Skills are constantly evolving through continuous learning
      </motion.div>
    </div>
  );
};

export default InteractiveSkillsShowcase;