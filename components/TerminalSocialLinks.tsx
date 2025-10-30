import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Mail, MapPin, Calendar } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { USER_DATA } from '../constants';

const TerminalSocialLinks: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: USER_DATA.contact.github,
      icon: <GithubIcon className="w-5 h-5" />,
      color: 'text-purple-400',
      hoverColor: 'hover:text-purple-300'
    },
    {
      name: 'LinkedIn',
      url: USER_DATA.contact.linkedin,
      icon: <LinkedinIcon className="w-5 h-5" />,
      color: 'text-blue-400',
      hoverColor: 'hover:text-blue-300'
    },
    {
      name: 'Email',
      url: `mailto:${USER_DATA.contact.email}`,
      icon: <Mail className="w-5 h-5" />,
      color: 'text-green-400',
      hoverColor: 'hover:text-green-300'
    }
  ];

  const quickInfo = [
    {
      icon: <MapPin className="w-4 h-4" />,
      label: 'Location',
      value: 'New York, NY'
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      label: 'Experience',
      value: '5+ Years'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8 }}
      className="bg-gray-900/30 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm"
    >
      {/* Terminal Header */}
      <div className="flex items-center space-x-2 text-green-400 text-sm mb-4">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>NETWORK_CONNECTIONS</span>
      </div>

      {/* Social Links */}
      <div className="space-y-3 mb-4">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 + index * 0.1 }}
            className={`flex items-center space-x-3 p-2 rounded-lg bg-gray-800/30 border border-gray-700/50 transition-all duration-300 ${link.color} ${link.hoverColor} hover:border-green-500/50 hover:bg-gray-700/30 group`}
            whileHover={{ x: 5 }}
          >
            <div className="flex-shrink-0">{link.icon}</div>
            <div className="flex-1">
              <div className="text-sm font-mono">{link.name}</div>
              <div className="text-xs text-gray-500 group-hover:text-gray-400">
                {link.name === 'Email' ? USER_DATA.contact.email : `Connect on ${link.name}`}
              </div>
            </div>
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        ))}
      </div>

      {/* Quick Info */}
      <div className="border-t border-gray-700/50 pt-3 space-y-2">
        {quickInfo.map((info, index) => (
          <motion.div
            key={info.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 + index * 0.1 }}
            className="flex items-center space-x-3 text-sm"
          >
            <div className="text-cyan-400">{info.icon}</div>
            <div className="text-gray-400">{info.label}:</div>
            <div className="text-gray-300 font-mono">{info.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Status Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="border-t border-gray-700/50 pt-3 mt-3"
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">AVAILABLE FOR OPPORTUNITIES</span>
          </div>
          <div className="text-gray-500 font-mono">
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TerminalSocialLinks;