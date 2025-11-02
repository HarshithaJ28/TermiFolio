import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Eye, Camera, Zap, CheckCircle, Activity, Download } from 'lucide-react';

interface TerminalPhotoProps {
  photoUrl: string;
  alt: string;
  className?: string;
}

const TerminalPhoto: React.FC<TerminalPhotoProps> = ({ photoUrl, alt, className }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [scanLine, setScanLine] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Scanning animation effect
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsScanning(false);
          setIsAnalyzing(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev >= 100 ? 0 : prev + 5));
    }, 80);

    return () => {
      clearInterval(progressInterval);
      clearInterval(scanInterval);
    };
  }, []);

  // Stop analyzing after scan completes
  useEffect(() => {
    if (isAnalyzing) {
      const timer = setTimeout(() => setIsAnalyzing(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing]);

  return (
    <div className={`relative ${className}`}>
      {/* Terminal Window Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-gray-900/80 border border-green-500/30 rounded-lg backdrop-blur-md shadow-2xl overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="bg-gray-800/90 px-4 py-3 flex items-center justify-between border-b border-green-500/20">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2 text-green-400 text-sm font-mono">
              <Terminal className="w-4 h-4" />
              <span>biometric_scanner.exe</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Activity className="w-3 h-3" />
            <span>ACTIVE</span>
          </div>
        </div>

        {/* Photo Container */}
        <div className="relative p-6">
          {/* Main Photo */}
          <div className="relative overflow-hidden rounded-lg border border-cyan-400/30 shadow-lg">
            <motion.img
              src={photoUrl}
              alt={alt}
              className="w-full h-80 object-cover"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ 
                opacity: loadingProgress >= 100 ? 1 : 0.7,
                filter: loadingProgress >= 100 ? 'blur(0px)' : 'blur(2px)'
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Scanning Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent">
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg"
                  style={{ top: `${scanLine}%` }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </div>
            )}

            {/* Grid Overlay for Analysis */}
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {[...Array(10)].map((_, i) => (
                    <g key={i}>
                      <line
                        x1="0" y1={i * 10} x2="100" y2={i * 10}
                        stroke="rgba(6, 182, 212, 0.3)"
                        strokeWidth="0.2"
                      />
                      <line
                        x1={i * 10} y1="0" x2={i * 10} y2="100"
                        stroke="rgba(6, 182, 212, 0.3)"
                        strokeWidth="0.2"
                      />
                    </g>
                  ))}
                </svg>
                {/* Corner Brackets */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400"></div>
              </motion.div>
            )}

            {/* Holographic Border Effect */}
            <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-400/20 via-green-400/20 to-purple-400/20 rounded-lg"></div>
          </div>

          {/* Status Panel */}
          <div className="mt-4 space-y-3">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Camera className="w-3 h-3" />
                  <span>FACIAL_RECOGNITION.exe</span>
                </div>
                <span className="text-green-400 font-mono">{loadingProgress}%</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-green-400 rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Status Messages */}
            <div className="space-y-1 text-xs font-mono">
              {loadingProgress > 20 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 text-yellow-400"
                >
                  <Eye className="w-3 h-3" />
                  <span>Analyzing facial features...</span>
                </motion.div>
              )}
              {loadingProgress > 50 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 text-blue-400"
                >
                  <Zap className="w-3 h-3" />
                  <span>Processing biometric data...</span>
                </motion.div>
              )}
              {loadingProgress >= 100 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 text-green-400"
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>Identity verified: {alt}</span>
                </motion.div>
              )}
            </div>

            {/* Resume Download Button */}
            {loadingProgress >= 100 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-4"
              >
                <motion.button
                  onClick={() => {
                    // Create a temporary link to download resume
                    const link = document.createElement('a');
                    link.href = '/resume.pdf'; // Update this path to your actual resume file
                    link.download = 'Harshitha_Jonnagaddala_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-600/80 to-cyan-600/80 hover:from-green-500/90 hover:to-cyan-500/90 text-white rounded-lg border border-green-500/30 transition-all duration-300 font-mono"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Ambient Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-green-400/5 to-purple-400/5 rounded-lg pointer-events-none"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default TerminalPhoto;