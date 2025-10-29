import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Typewriter from './Typewriter';
import Cursor from './Cursor';

interface EnhancedCommandProps {
  command: string;
  children: React.ReactNode;
  delay?: number;
  username?: string;
  hostname?: string;
  directory?: string;
}

const EnhancedCommand: React.FC<EnhancedCommandProps> = ({ 
  command, 
  children, 
  delay = 0,
  username = "harshitha",
  hostname = "portfolio",
  directory = "~"
}) => {
  const [isCommandTyped, setIsCommandTyped] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isCommandTyped) {
      const timer = setTimeout(() => {
        setShowOutput(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isCommandTyped]);

  const promptVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay
      }
    }
  };

  const outputVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div 
      ref={sectionRef}
      variants={promptVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-6"
    >
      {/* Command Line */}
      <div className="flex items-center mb-2">
        {/* Prompt */}
        <div className="flex items-center text-sm">
          <span className="text-green-400 font-bold">{username}</span>
          <span className="text-gray-400">@</span>
          <span className="text-blue-400 font-bold">{hostname}</span>
          <span className="text-gray-400">:</span>
          <span className="text-cyan-400 font-bold">{directory}</span>
          <span className="text-gray-400">$</span>
        </div>
        
        {/* Command */}
        {isInView && (
          <motion.div className="ml-2 flex items-center">
            <Typewriter 
              text={command} 
              onComplete={() => setIsCommandTyped(true)}
              speed={30}
              delay={delay + 500}
            />
            {!isCommandTyped && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-5 bg-green-400 ml-1"
              />
            )}
          </motion.div>
        )}
      </div>

      {/* Output */}
      <motion.div
        variants={outputVariants}
        initial="hidden"
        animate={showOutput ? "visible" : "hidden"}
        className="ml-4 border-l-2 border-gray-700 pl-4"
      >
        {children}
      </motion.div>

      {/* Execution indicator */}
      {isCommandTyped && !showOutput && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-4 text-yellow-400 text-sm flex items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full mr-2"
          />
          Executing...
        </motion.div>
      )}
    </motion.div>
  );
};

export default EnhancedCommand;