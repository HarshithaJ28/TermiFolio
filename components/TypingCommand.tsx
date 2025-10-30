import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface TypingCommandProps {
  commands: string[];
  onComplete?: () => void;
  delay?: number;
  typingSpeed?: number;
}

const TypingCommand: React.FC<TypingCommandProps> = ({ 
  commands, 
  onComplete, 
  delay = 0,
  typingSpeed = 50 
}) => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping || currentCommandIndex >= commands.length) {
      if (currentCommandIndex >= commands.length && onComplete) {
        onComplete();
      }
      return;
    }

    const command = commands[currentCommandIndex];
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < command.length) {
        setCurrentText(command.slice(0, charIndex + 1));
        charIndex++;
        setTimeout(typeChar, typingSpeed);
      } else {
        // Command completed, wait a bit then move to next
        setTimeout(() => {
          setCurrentCommandIndex(prev => prev + 1);
          setCurrentText('');
        }, 1000);
      }
    };

    typeChar();
  }, [isTyping, currentCommandIndex, commands, typingSpeed, onComplete]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  if (!isTyping) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm font-mono text-sm"
    >
      <div className="flex items-center space-x-2 text-green-400 mb-2">
        <Terminal className="w-4 h-4" />
        <span>EXECUTING COMMANDS...</span>
      </div>
      
      <div className="space-y-2">
        {commands.slice(0, currentCommandIndex).map((cmd, index) => (
          <div key={index} className="text-gray-300">
            <span className="text-green-400">$</span> {cmd}
            <div className="text-cyan-400 text-xs ml-4 mt-1">✓ Command executed successfully</div>
          </div>
        ))}
        
        {currentCommandIndex < commands.length && (
          <div className="text-gray-300">
            <span className="text-green-400">$</span> {currentText}
            <motion.span
              className="text-green-400"
              animate={{ opacity: showCursor ? 1 : 0 }}
              transition={{ duration: 0 }}
            >
              █
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TypingCommand;