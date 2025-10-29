import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const bootSteps = [
    "Initializing Harshitha Portfolio System...",
    "Loading kernel modules... ✓",
    "Starting system services... ✓", 
    "Mounting filesystems... ✓",
    "Loading user profile... ✓",
    "Starting terminal interface... ✓",
    "Configuring network stack... ✓",
    "Loading projects database... ✓",
    "Initializing AI/ML modules... ✓",
    "System ready. Welcome to Harshitha's Portfolio!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < bootSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 1000);
          }, 1000);
          return prev;
        }
      });
    }, 300);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      >
        <div className="text-green-400 font-mono text-center">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="text-4xl mb-4"
          >
            ✓
          </motion.div>
          <p>System Ready</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="max-w-2xl w-full px-8">
        <div className="space-y-2 font-mono text-green-400">
          {bootSteps.slice(0, currentStep + 1).map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <span className="mr-2">
                {index === currentStep && index < bootSteps.length - 1 ? (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    ▋
                  </motion.span>
                ) : null}
              </span>
              <span className={index === bootSteps.length - 1 ? 'text-cyan-400 font-bold' : ''}>
                {step}
              </span>
            </motion.div>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-8 w-full bg-gray-800 rounded-full h-2">
          <motion.div
            className="bg-green-400 h-2 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / bootSteps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="mt-4 text-center text-gray-500 text-sm">
          Loading {Math.round(((currentStep + 1) / bootSteps.length) * 100)}%
        </div>
      </div>
    </motion.div>
  );
};

export default BootSequence;