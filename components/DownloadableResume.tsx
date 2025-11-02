import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Terminal, 
  Check, 
  ExternalLink,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const DownloadableResume: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadComplete(true);
      
      // Create download link (replace with your actual resume file)
      const link = document.createElement('a');
      link.href = '/resume.pdf'; // Update this path to your actual resume file
      link.download = 'Harshitha_Jonnagaddala_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Reset completion state after delay
      setTimeout(() => setDownloadComplete(false), 3000);
    }, 2000);
  };

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, label: 'Email', value: 'harshitha.jonnagaddala@example.com' },
    { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: 'New York, NY' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full space-y-6"
    >
      {/* Terminal Header */}
      <div className="flex items-center space-x-2 text-green-400 text-sm">
        <Terminal className="w-4 h-4" />
        <span>harshitha@portfolio:/contact$</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-cyan-400"
        >
          █
        </motion.span>
      </div>

      {/* Main Contact & Resume Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Resume Download Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900/30 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm"
        >
          <div className="text-center space-y-4">
            {/* Resume Icon */}
            <motion.div
              animate={isDownloading ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: isDownloading ? Infinity : 0, ease: "linear" }}
              className="flex justify-center"
            >
              {downloadComplete ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-400"
                >
                  <Check className="w-8 h-8 text-green-400" />
                </motion.div>
              ) : (
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center border-2 border-cyan-400">
                  <FileText className="w-8 h-8 text-cyan-400" />
                </div>
              )}
            </motion.div>

            {/* Download Status */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                {downloadComplete ? 'Download Complete!' : isDownloading ? 'Downloading...' : 'Resume Available'}
              </h3>
              <p className="text-gray-400 text-sm">
                {downloadComplete 
                  ? 'Resume has been downloaded successfully' 
                  : isDownloading 
                    ? 'Preparing your resume file...' 
                    : 'Get my latest resume with detailed experience and projects'
                }
              </p>
            </div>

            {/* Progress Bar (when downloading) */}
            {isDownloading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full bg-gray-700 rounded-full h-2 overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-green-400"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                />
              </motion.div>
            )}

            {/* Download Button */}
            <motion.button
              onClick={handleDownload}
              disabled={isDownloading || downloadComplete}
              className={`w-full px-6 py-3 rounded-lg font-mono text-sm transition-all flex items-center justify-center space-x-2 ${
                downloadComplete
                  ? 'bg-green-600/20 text-green-400 border border-green-500/30 cursor-not-allowed'
                  : isDownloading
                    ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 cursor-wait'
                    : 'bg-gray-700/50 text-white border border-gray-600 hover:bg-gray-600/50 hover:border-cyan-400/50'
              }`}
              whileHover={!isDownloading && !downloadComplete ? { scale: 1.02 } : {}}
              whileTap={!isDownloading && !downloadComplete ? { scale: 0.98 } : {}}
            >
              {downloadComplete ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Downloaded</span>
                </>
              ) : isDownloading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Download className="w-4 h-4" />
                  </motion.div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </>
              )}
            </motion.button>

            {/* File Info */}
            <div className="text-xs text-gray-500 font-mono">
              PDF • ~250KB • Last updated: Nov 2024
            </div>
          </div>
        </motion.div>

        {/* Contact Information Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900/30 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm"
        >
          <div className="space-y-4">
            {/* Contact Header */}
            <div className="flex items-center space-x-2 text-blue-400">
              <User className="w-5 h-5" />
              <h3 className="text-lg font-bold">Get In Touch</h3>
            </div>

            {/* Contact List */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700/30 hover:border-blue-400/30 transition-all group"
                >
                  <div className="text-blue-400 group-hover:text-blue-300">
                    {contact.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400">{contact.label}</div>
                    <div className="text-white font-mono text-sm">{contact.value}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-gray-700/30">
              <div className="text-xs text-gray-400 mb-2 font-mono">Quick Actions:</div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-3 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded text-xs font-mono hover:bg-blue-600/30 transition-all"
                >
                  Send Email
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-3 py-2 bg-green-600/20 text-green-400 border border-green-500/30 rounded text-xs font-mono hover:bg-green-600/30 transition-all"
                >
                  Schedule Call
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Terminal Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center justify-between text-xs text-gray-400 font-mono pt-6 border-t border-gray-700/30"
      >
        <div>
          © 2024 Harshitha Jonnagaddala • Built with React & TypeScript
        </div>
        <div className="flex items-center space-x-2">
          <span>Status: ONLINE</span>
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 bg-green-400 rounded-full"
          />
        </div>
      </motion.div>

      {/* Final Terminal Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex items-center space-x-2 text-green-400 text-sm font-mono pb-8"
      >
        <span>harshitha@portfolio:/contact$</span>
        <span className="text-gray-400">Thanks for visiting!</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1, delay: 2 }}
          className="text-white"
        >
          █
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default DownloadableResume;
