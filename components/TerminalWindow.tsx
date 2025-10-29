import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minimize2, Maximize2, X, Minus } from 'lucide-react';

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ 
  children, 
  title = "harshitha@portfolio:~$",
  onMinimize,
  onMaximize,
  onClose 
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    onMaximize?.();
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-gray-900 rounded-lg overflow-hidden shadow-2xl ${
        isMaximized ? 'fixed inset-4 z-50' : 'mx-auto max-w-6xl'
      }`}
      style={{
        boxShadow: '0 0 50px rgba(0, 255, 0, 0.2), inset 0 0 50px rgba(0, 255, 0, 0.05)'
      }}
    >
      {/* Terminal Header */}
      <motion.div 
        className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
            />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onMinimize}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"
            />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMaximize}
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"
            />
          </div>
        </div>
        
        <div className="text-sm text-gray-300 font-mono flex items-center space-x-4">
          <span className="text-green-400">{title}</span>
          <span className="text-gray-500">|</span>
          <span className="text-blue-400">{currentTime.toLocaleTimeString()}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-400">
          <motion.button 
            whileHover={{ scale: 1.1, color: '#10b981' }}
            whileTap={{ scale: 0.9 }}
          >
            <Minus size={16} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, color: '#10b981' }}
            whileTap={{ scale: 0.9 }}
            onClick={handleMaximize}
          >
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, color: '#ef4444' }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} />
          </motion.button>
        </div>
      </motion.div>

      {/* Terminal Content */}
      <div className="bg-gray-900 min-h-screen font-mono text-green-400 p-6 relative overflow-hidden">
        {/* Scanlines Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-pulse" />
          <motion.div 
            className="absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalWindow;