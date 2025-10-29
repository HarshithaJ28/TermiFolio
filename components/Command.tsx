import React, { useState, useEffect, useRef } from 'react';
import Typewriter from './Typewriter';
import Cursor from './Cursor';

interface CommandProps {
  command: string;
  children: React.ReactNode;
}

const Command: React.FC<CommandProps> = ({ command, children }) => {
  const [isCommandTyped, setIsCommandTyped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current!);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className={`transition-opacity duration-1000 ease-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center">
        <span className="text-green-400">$</span>
        {isVisible && (
          <Typewriter 
            text={` ${command}`} 
            onComplete={() => setIsCommandTyped(true)}
            className="ml-2"
          />
        )}
        {!isCommandTyped && isVisible && <Cursor />}
      </div>
      <div className={`transition-opacity duration-700 ease-out ${isCommandTyped ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

export default Command;
