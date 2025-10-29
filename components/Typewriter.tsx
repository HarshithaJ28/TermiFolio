import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, delay = 0, onComplete, className }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const startTyping = () => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text[i]);
          i++;
          timeoutId = setTimeout(type, speed);
        } else {
          if (onComplete) {
            onComplete();
          }
        }
      };
      type();
    };

    const startDelay = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
    </span>
  );
};

export default Typewriter;