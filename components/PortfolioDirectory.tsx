import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  File, 
  ChevronRight, 
  ChevronDown, 
  Terminal,
  Code,
  User,
  Briefcase,
  Award,
  Mail,
  Download
} from 'lucide-react';

interface PortfolioDirectoryProps {
  onSectionClick?: (section: string) => void;
}

const PortfolioDirectory: React.FC<PortfolioDirectoryProps> = ({ onSectionClick }) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['portfolio']);
  const [currentPath, setCurrentPath] = useState('~/harshitha/portfolio');
  const [showTree, setShowTree] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTree(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const portfolioStructure = [
    {
      name: 'portfolio',
      type: 'folder',
      icon: <Folder className="w-4 h-4" />,
      path: '~/harshitha/portfolio',
      children: [
        {
          name: 'about',
          type: 'folder',
          icon: <User className="w-4 h-4" />,
          children: [
            { name: 'education.md', type: 'file', icon: <File className="w-4 h-4" />, section: 'education' },
            { name: 'experience.json', type: 'file', icon: <File className="w-4 h-4" />, section: 'experience' },
            { name: 'bio.txt', type: 'file', icon: <File className="w-4 h-4" />, section: 'about' }
          ]
        },
        {
          name: 'projects',
          type: 'folder',
          icon: <Code className="w-4 h-4" />,
          children: [
            { name: 'grubsync/', type: 'folder', icon: <Folder className="w-4 h-4" />, section: 'projects' },
            { name: 'vip-metaverse/', type: 'folder', icon: <Folder className="w-4 h-4" />, section: 'projects' },
            { name: 'file-path-checker/', type: 'folder', icon: <Folder className="w-4 h-4" />, section: 'projects' },
            { name: 'random-walk-viz/', type: 'folder', icon: <Folder className="w-4 h-4" />, section: 'projects' }
          ]
        },
        {
          name: 'skills',
          type: 'folder',
          icon: <Award className="w-4 h-4" />,
          children: [
            { name: 'languages.json', type: 'file', icon: <File className="w-4 h-4" />, section: 'skills' },
            { name: 'frameworks.yml', type: 'file', icon: <File className="w-4 h-4" />, section: 'skills' },
            { name: 'tools.config', type: 'file', icon: <File className="w-4 h-4" />, section: 'skills' }
          ]
        },
        {
          name: 'work',
          type: 'folder',
          icon: <Briefcase className="w-4 h-4" />,
          children: [
            { name: 'senior-fullstack.md', type: 'file', icon: <File className="w-4 h-4" />, section: 'experience' },
            { name: 'software-engineer.md', type: 'file', icon: <File className="w-4 h-4" />, section: 'experience' },
            { name: 'achievements.log', type: 'file', icon: <File className="w-4 h-4" />, section: 'experience' }
          ]
        },
        {
          name: 'contact',
          type: 'folder',
          icon: <Mail className="w-4 h-4" />,
          children: [
            { name: 'email.link', type: 'file', icon: <File className="w-4 h-4" />, section: 'contact' },
            { name: 'linkedin.url', type: 'file', icon: <File className="w-4 h-4" />, section: 'contact' },
            { name: 'github.link', type: 'file', icon: <File className="w-4 h-4" />, section: 'contact' }
          ]
        },
        { name: 'resume.pdf', type: 'file', icon: <Download className="w-4 h-4" />, section: 'resume' }
      ]
    }
  ];

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(name => name !== folderName)
        : [...prev, folderName]
    );
  };

  const handleItemClick = (item: any, path: string) => {
    if (item.type === 'folder') {
      toggleFolder(item.name);
      setCurrentPath(path);
    } else if (item.section && onSectionClick) {
      onSectionClick(item.section);
    }
  };

  const renderTreeItem = (item: any, level: number = 0, parentPath: string = '') => {
    const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name;
    const isExpanded = expandedFolders.includes(item.name);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.name}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: level * 0.1 }}
          className={`flex items-center space-x-2 py-1 px-2 rounded cursor-pointer transition-all duration-200 hover:bg-green-500/10 ${
            item.type === 'folder' ? 'text-cyan-400' : 'text-gray-300'
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => handleItemClick(item, currentPath)}
        >
          {hasChildren && (
            <div className="w-4 flex justify-center">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3 text-green-400" />
              ) : (
                <ChevronRight className="w-3 h-3 text-green-400" />
              )}
            </div>
          )}
          {!hasChildren && <div className="w-4" />}
          
          <div className={item.type === 'folder' ? 'text-cyan-400' : 'text-green-400'}>
            {item.icon}
          </div>
          
          <span className="text-sm font-mono hover:text-white transition-colors">
            {item.name}
          </span>
          
          {item.type === 'file' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray-500 ml-auto"
            >
              [{item.section}]
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.children.map((child: any) => 
                renderTreeItem(child, level + 1, currentPath)
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
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
              <Terminal className="w-3 h-3" />
              <span>Portfolio Directory Structure</span>
            </div>
          </div>
          <div className="text-xs text-green-400 font-mono">{currentPath}</div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="bg-gray-900/50 border border-green-500/30 border-t-0 rounded-b-lg backdrop-blur-sm">
        <div className="p-4">
          {/* Command Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center space-x-2 text-sm mb-4"
          >
            <span className="text-green-400">harshitha@portfolio:</span>
            <span className="text-white">tree -a --dirsfirst</span>
          </motion.div>

          {/* Directory Tree */}
          <AnimatePresence>
            {showTree && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar"
              >
                {portfolioStructure.map(item => renderTreeItem(item))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Command Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-4 text-xs text-gray-500 border-t border-gray-700/50 pt-3"
          >
            <p>💡 <span className="text-cyan-400">Tip:</span> Click on folders to expand/collapse, files to navigate to sections</p>
          </motion.div>

          {/* Next Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="flex items-center space-x-2 text-sm mt-4"
          >
            <span className="text-green-400">harshitha@portfolio:</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-white"
            >
              █
            </motion.span>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.7);
        }
      `}</style>
    </motion.div>
  );
};

export default PortfolioDirectory;