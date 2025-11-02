import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Award, 
  Trophy, 
  Star, 
  Users, 
  Heart, 
  Code, 
  Briefcase, 
  BookOpen,
  Zap,
  Target,
  Globe
} from 'lucide-react';

const AchievementsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'activities' | 'community'>('achievements');
  const [loadingItems, setLoadingItems] = useState<string[]>([]);
  const [scanningIndex, setScanningIndex] = useState(-1);

  // Achievements data
  const achievementsData = {
    achievements: [
      {
        id: 'academic_excellence',
        title: 'Academic Excellence Award',
        description: 'Graduated with distinction from NYU Tandon School of Engineering',
        category: 'Academic',
        year: '2024',
        icon: '🎓',
        status: 'completed',
        impact: 'Top 5% of graduating class'
      },
      {
        id: 'hackathon_winner',
        title: 'Hackathon Champion',
        description: 'First place in NYC Tech Innovation Challenge',
        category: 'Competition',
        year: '2023',
        icon: '🏆',
        status: 'completed',
        impact: '50+ participating teams'
      },
      {
        id: 'research_publication',
        title: 'Research Publication',
        description: 'Published paper on distributed systems optimization',
        category: 'Research',
        year: '2023',
        icon: '📄',
        status: 'completed',
        impact: 'Cited by 15+ researchers'
      },
      {
        id: 'certification_aws',
        title: 'AWS Solutions Architect',
        description: 'Certified in cloud architecture and deployment',
        category: 'Certification',
        year: '2023',
        icon: '☁️',
        status: 'completed',
        impact: 'Professional recognition'
      }
    ],
    activities: [
      {
        id: 'mentorship_program',
        title: 'Tech Mentorship Program',
        description: 'Mentoring 20+ aspiring developers in AI/ML and web development',
        category: 'Mentorship',
        year: '2023-Present',
        icon: '👥',
        status: 'ongoing',
        impact: '85% mentee success rate'
      },
      {
        id: 'women_in_tech',
        title: 'Women in Tech Initiative',
        description: 'Leading workshops and coding bootcamps for underrepresented groups',
        category: 'Leadership',
        year: '2022-Present',
        icon: '💪',
        status: 'ongoing',
        impact: '200+ women trained'
      },
      {
        id: 'open_source',
        title: 'Open Source Contributions',
        description: 'Active contributor to major Python and JavaScript libraries',
        category: 'Development',
        year: '2021-Present',
        icon: '🌟',
        status: 'ongoing',
        impact: '500+ stars earned'
      },
      {
        id: 'tech_speaker',
        title: 'Conference Speaker',
        description: 'Presented at 5+ tech conferences on AI/ML and full-stack development',
        category: 'Speaking',
        year: '2022-Present',
        icon: '🎤',
        status: 'ongoing',
        impact: '1000+ audience reach'
      }
    ],
    community: [
      {
        id: 'coding_bootcamp',
        title: 'Free Coding Bootcamp',
        description: 'Founded and run weekly coding sessions for beginners',
        category: 'Education',
        year: '2023-Present',
        icon: '💻',
        status: 'ongoing',
        impact: '150+ students graduated'
      },
      {
        id: 'tech_volunteer',
        title: 'Tech for Good Volunteer',
        description: 'Building applications for non-profit organizations',
        category: 'Volunteer',
        year: '2022-Present',
        icon: '❤️',
        status: 'ongoing',
        impact: '8 NGOs supported'
      },
      {
        id: 'student_council',
        title: 'Student Technology Council',
        description: 'Led university technology initiatives and student representation',
        category: 'Leadership',
        year: '2022-2024',
        icon: '🏛️',
        status: 'completed',
        impact: 'Policy changes implemented'
      },
      {
        id: 'diversity_advocate',
        title: 'Diversity & Inclusion Advocate',
        description: 'Championing inclusive practices in tech education and workplace',
        category: 'Advocacy',
        year: '2021-Present',
        icon: '🌈',
        status: 'ongoing',
        impact: 'Cultural shift initiatives'
      }
    ]
  };

  const tabs = [
    { 
      id: 'achievements' as const, 
      label: 'Achievements', 
      icon: <Trophy className="w-4 h-4" />, 
      command: 'cat ~/.achievements.json',
      color: 'yellow'
    },
    { 
      id: 'activities' as const, 
      label: 'Activities', 
      icon: <Users className="w-4 h-4" />, 
      command: 'ls ~/extracurricular/',
      color: 'blue'
    },
    { 
      id: 'community' as const, 
      label: 'Community', 
      icon: <Heart className="w-4 h-4" />, 
      command: 'find ~/community -type impact',
      color: 'pink'
    }
  ];

  // Scanning animation
  useEffect(() => {
    const currentItems = achievementsData[activeTab];
    setScanningIndex(0);
    setLoadingItems([]);
    
    const scanInterval = setInterval(() => {
      setScanningIndex(prev => {
        if (prev >= currentItems.length - 1) {
          clearInterval(scanInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    const loadInterval = setInterval(() => {
      setLoadingItems(prev => {
        const nextIndex = prev.length;
        if (nextIndex >= currentItems.length) {
          clearInterval(loadInterval);
          return prev;
        }
        return [...prev, currentItems[nextIndex].id];
      });
    }, 500);

    return () => {
      clearInterval(scanInterval);
      clearInterval(loadInterval);
    };
  }, [activeTab]);

  const getTabColor = (color: string, active: boolean) => {
    const colors = {
      yellow: active ? 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30' : 'text-gray-400',
      blue: active ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'text-gray-400',
      pink: active ? 'bg-pink-600/20 text-pink-400 border-pink-500/30' : 'text-gray-400'
    };
    return colors[color as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' 
      ? 'text-green-400 border-green-400/30 bg-green-400/10' 
      : 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      'Academic': <BookOpen className="w-4 h-4" />,
      'Competition': <Trophy className="w-4 h-4" />,
      'Research': <Target className="w-4 h-4" />,
      'Certification': <Award className="w-4 h-4" />,
      'Mentorship': <Users className="w-4 h-4" />,
      'Leadership': <Star className="w-4 h-4" />,
      'Development': <Code className="w-4 h-4" />,
      'Speaking': <Globe className="w-4 h-4" />,
      'Education': <BookOpen className="w-4 h-4" />,
      'Volunteer': <Heart className="w-4 h-4" />,
      'Advocacy': <Zap className="w-4 h-4" />
    };
    return icons[category] || <Star className="w-4 h-4" />;
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
        <span>harshitha@portfolio:/profile$</span>
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
                ? getTabColor(tab.color, true) + ' border'
                : getTabColor(tab.color, false) + ' hover:text-gray-300 hover:bg-gray-800/30'
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

      {/* Content Display */}
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
            Scanning {activeTab}... [{scanningIndex + 1}/{achievementsData[activeTab].length}]
          </div>

          {/* Hexagonal Matrix Display */}
          <div className="relative">
            {/* Matrix Background Grid */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(6)].map((_, row) => (
                <div key={row} className="flex justify-center space-x-2 mb-2" style={{marginLeft: row % 2 === 1 ? '1.5rem' : '0'}}>
                  {[...Array(8)].map((_, col) => (
                    <div key={col} className="w-6 h-6 border border-green-400/20 transform rotate-45" />
                  ))}
                </div>
              ))}
            </div>

            {/* Compact Achievement Cards */}
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-3">
              {achievementsData[activeTab].map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                  animate={{ 
                    opacity: loadingItems.includes(item.id) ? 1 : 0.4,
                    scale: loadingItems.includes(item.id) ? 1 : 0.8,
                    rotateY: 0,
                    boxShadow: scanningIndex === index ? "0 0 25px rgba(0, 255, 255, 0.5)" : "none"
                  }}
                  transition={{ 
                    delay: index * 0.15, 
                    duration: 0.6, 
                    type: "spring", 
                    stiffness: 80 
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateX: 5, 
                    rotateY: 5,
                    boxShadow: "0 10px 30px rgba(0, 255, 255, 0.3)"
                  }}
                  className={`group relative aspect-square p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    scanningIndex === index 
                      ? 'border-cyan-400/70 bg-gradient-to-br from-cyan-900/30 to-blue-900/30' 
                      : loadingItems.includes(item.id)
                        ? getStatusColor(item.status) + ' bg-gradient-to-br from-gray-900/50 to-gray-800/50'
                        : 'border-gray-600/30 bg-gray-900/20'
                  }`}
                  style={{
                    perspective: '1000px'
                  }}
                >
                  {/* Scanning Radar Effect */}
                  {scanningIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-xl overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-conic from-cyan-400/20 via-transparent to-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: 3, ease: "linear" }}
                        style={{
                          background: 'conic-gradient(from 0deg, rgba(6, 182, 212, 0.3) 0deg, transparent 60deg, transparent 300deg, rgba(6, 182, 212, 0.3) 360deg)'
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Achievement Icon */}
                  <div className="flex justify-center mb-2">
                    <motion.div 
                      className="text-3xl filter drop-shadow-lg"
                      animate={scanningIndex === index ? { 
                        scale: [1, 1.2, 1],
                        filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(0deg)"]
                      } : {}}
                      transition={{ duration: 1, repeat: scanningIndex === index ? 2 : 0 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Achievement Title */}
                  <h3 className="text-center text-sm font-bold text-white mb-1 leading-tight group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Quick Stats */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center space-x-1 text-purple-400">
                        {getCategoryIcon(item.category)}
                        <span className="font-mono">{item.category.slice(0, 4)}</span>
                      </span>
                      <span className="text-gray-400 font-mono">{item.year.slice(-2)}</span>
                    </div>
                    
                    <div className={`text-center text-xs font-mono px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                      {item.status === 'completed' ? '✓' : '⟳'} {item.status.slice(0, 4).toUpperCase()}
                    </div>
                  </div>

                  {/* Impact Metric */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-xs text-orange-400 font-mono text-center truncate opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.impact.split(' ').slice(0, 2).join(' ')}
                    </div>
                  </div>

                  {/* Hover Tooltip */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-green-400/50 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 w-64">
                    <div className="text-xs text-white font-medium mb-1">{item.title}</div>
                    <div className="text-xs text-gray-300 mb-1">{item.description}</div>
                    <div className="text-xs text-orange-400 font-mono">Impact: {item.impact}</div>
                  </div>

                  {/* Matrix Connection Lines */}
                  {loadingItems.includes(item.id) && (
                    <motion.div
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <svg className="w-full h-full">
                        <motion.path
                          d={`M ${index % 2 === 0 ? '0' : '100%'} 50% L 50% 50% L ${index % 2 === 0 ? '100%' : '0'} 50%`}
                          stroke="rgba(6, 182, 212, 0.4)"
                          strokeWidth="1"
                          fill="none"
                          strokeDasharray="2,2"
                          className="animate-pulse"
                        />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Status Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 pt-4 border-t border-gray-700/30 flex justify-between items-center text-xs text-gray-400 font-mono"
          >
            <div>
              Status: {loadingItems.length === achievementsData[activeTab].length ? 'SCAN_COMPLETE' : 'SCANNING...'}
            </div>
            <div>
              Total Impact: {achievementsData[activeTab].length} records
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
        <span>harshitha@portfolio:/profile$</span>
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

export default AchievementsShowcase;