import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalPhotoProps {
  photoUrl?: string;
  alt?: string;
  className?: string;
}

const TerminalPhoto: React.FC<TerminalPhotoProps> = ({ 
  photoUrl, 
  alt = "Profile", 
  className = "" 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scanlinePosition, setScanlinePosition] = useState(0);

  // Scanning effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative group ${className}`}>
      {/* Terminal Window Frame for Photo */}
      <div className="bg-gray-900 rounded-lg border border-green-500/30 overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-green-500/30">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-xs text-gray-400 ml-4">user@terminal:~/profile/harshitha.jpg</div>
        </div>

        {/* Photo Container with Terminal Effects */}
        <div className="relative w-80 h-80 bg-black overflow-hidden">
          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Scanning Lines Effect */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(34, 197, 94, 0.1) 2px,
                rgba(34, 197, 94, 0.1) 4px
              )`
            }}
          />

          {photoUrl ? (
            <>
              {/* Actual Photo */}
              <motion.img
                src={photoUrl}
                alt={alt}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: imageLoaded ? 1 : 0,
                  scale: imageLoaded ? 1 : 1.1
                }}
                transition={{ duration: 1 }}
                onLoad={() => setImageLoaded(true)}
                style={{
                  filter: 'contrast(1.1) brightness(0.9) hue-rotate(10deg)'
                }}
              />

              {/* Photo Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-900/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-transparent to-cyan-900/10" />
            </>
          ) : (
            /* Placeholder when no photo is provided */
            <div className="w-full h-full bg-gradient-to-br from-green-900/20 via-gray-900 to-cyan-900/20 flex items-center justify-center">
              <div className="text-center text-green-400">
                <div className="text-6xl mb-4">👨‍💻</div>
                <div className="text-lg font-mono">HARSHITHA</div>
                <div className="text-sm text-gray-500 mt-2">Add your photo here</div>
                <div className="text-xs text-gray-600 mt-1 max-w-48">
                  Replace photoUrl prop with your image URL
                </div>
              </div>
            </div>
          )}

          {/* Animated Scanning Line */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-green-400/60 shadow-lg shadow-green-400/50"
            animate={{
              top: ['0%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Corner Brackets */}
          <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-green-400 opacity-80"></div>
          <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-green-400 opacity-80"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-green-400 opacity-80"></div>
          <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-green-400 opacity-80"></div>

          {/* Terminal-style data points */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/80 px-2 py-1 rounded text-xs text-green-400 font-mono">
              SCAN_ACTIVE
            </div>
          </div>

          {/* Glitch effect on hover */}
          <motion.div
            className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100"
            animate={{
              x: [0, -2, 2, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
      </div>

      {/* Status Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute -bottom-6 -right-6 bg-black/90 border border-cyan-500/50 rounded-lg p-3 backdrop-blur-sm"
      >
        <div className="text-xs text-cyan-400 space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>ONLINE</span>
          </div>
          <div>ID: HARSHITHA_J28</div>
          <div>STATUS: READY</div>
          <div>UPTIME: 5+ YEARS</div>
        </div>
      </motion.div>

      {/* Hover Effects */}
      <div className="absolute inset-0 bg-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
    </div>
  );
};

export default TerminalPhoto;