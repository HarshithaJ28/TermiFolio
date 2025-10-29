import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', intensity = 1 }) => {
  const glitchVariants = {
    initial: { 
      x: 0,
      opacity: 1,
      filter: 'hue-rotate(0deg)'
    },
    glitch: {
      x: [0, -2 * intensity, 2 * intensity, -1 * intensity, 1 * intensity, 0],
      opacity: [1, 0.8, 1, 0.9, 1],
      filter: [
        'hue-rotate(0deg)',
        'hue-rotate(90deg)',
        'hue-rotate(180deg)',
        'hue-rotate(270deg)',
        'hue-rotate(0deg)'
      ],
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      variants={glitchVariants}
      initial="initial"
      whileHover="glitch"
      style={{ display: 'inline-block' }}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glitch layers */}
      <motion.span
        className="absolute inset-0 text-red-500 opacity-0"
        animate={{
          opacity: [0, 0.7, 0],
          x: [0, -2 * intensity, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: Math.random() * 2 + 1,
        }}
      >
        {text}
      </motion.span>
      
      <motion.span
        className="absolute inset-0 text-cyan-500 opacity-0"
        animate={{
          opacity: [0, 0.7, 0],
          x: [0, 2 * intensity, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: Math.random() * 2 + 1.5,
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

export default GlitchText;