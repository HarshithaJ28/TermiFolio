import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface InteractiveTerminalProps {
  onCommandExecute?: (command: string) => React.ReactNode;
}

const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ onCommandExecute }) => {
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputs, setOutputs] = useState<Array<{ command: string; output: React.ReactNode }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const availableCommands = [
    'help', 'clear', 'whoami', 'ls', 'cat', 'tree', 'pwd', 'date', 'uname', 
    'ps', 'top', 'history', 'skills', 'projects', 'contact', 'resume', 'about',
    'sudo hack pentagon', 'exit', 'neofetch', 'fortune'
  ];

  const getCommandSuggestions = (input: string) => {
    return availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
  };

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-2">
            <p className="text-cyan-400">Available commands:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {availableCommands.map(cmd => (
                <span key={cmd} className="text-green-300">{cmd}</span>
              ))}
            </div>
          </div>
        );
        break;
      
      case 'clear':
        setOutputs([]);
        return;
      
      case 'whoami':
        output = (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400"
          >
            <p>harshitha - Full-stack Developer & AI/ML Enthusiast</p>
            <p className="text-gray-400">sudo privileges: enabled 🔓</p>
          </motion.div>
        );
        break;
      
      case 'pwd':
        output = <span className="text-blue-400">/home/harshitha/portfolio</span>;
        break;
      
      case 'date':
        output = <span className="text-yellow-400">{new Date().toLocaleString()}</span>;
        break;
      
      case 'uname':
        output = <span className="text-purple-400">Linux portfolio-system 5.15.0 #1 SMP Portfolio Machine</span>;
        break;
        
      case 'neofetch':
        output = (
          <div className="text-sm space-y-1">
            <div className="flex">
              <div className="text-cyan-400 mr-4">
                {`
                    ██╗  ██╗
                    ██║  ██║
                    ███████║
                    ██╔══██║
                    ██║  ██║
                    ╚═╝  ╚═╝
                `}
              </div>
              <div className="space-y-1">
                <p><span className="text-cyan-400">OS:</span> Portfolio Linux</p>
                <p><span className="text-cyan-400">Host:</span> Harshitha's Terminal</p>
                <p><span className="text-cyan-400">Kernel:</span> Resume 2024.1</p>
                <p><span className="text-cyan-400">Shell:</span> zsh with oh-my-zsh</p>
                <p><span className="text-cyan-400">Languages:</span> Python, JavaScript, C++</p>
                <p><span className="text-cyan-400">Frameworks:</span> React, Node.js, Flask</p>
                <p><span className="text-cyan-400">Terminal:</span> Interactive Portfolio</p>
              </div>
            </div>
          </div>
        );
        break;
        
      case 'sudo hack pentagon':
        output = (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-red-500"
          >
            <p>Access Denied! 🚫</p>
            <p className="text-gray-400">Nice try though 😄</p>
          </motion.div>
        );
        break;
        
      case 'fortune':
        const fortunes = [
          "The best code is no code at all.",
          "Code never lies, comments sometimes do.",
          "Debugging is twice as hard as writing code in the first place.",
          "The most important property of a program is whether it accomplishes the intention of its user.",
          "Simplicity is the ultimate sophistication."
        ];
        output = <span className="text-yellow-300 italic">{fortunes[Math.floor(Math.random() * fortunes.length)]}</span>;
        break;
        
      case 'history':
        output = (
          <div className="space-y-1">
            {commandHistory.map((cmd, index) => (
              <p key={index} className="text-gray-400">
                <span className="text-green-400">{index + 1}</span> {cmd}
              </p>
            ))}
          </div>
        );
        break;
        
      default:
        if (onCommandExecute) {
          output = onCommandExecute(command);
        } else {
          output = <span className="text-red-400">Command not found: {command}</span>;
        }
    }

    setOutputs(prev => [...prev, { command, output }]);
    setCommandHistory(prev => [...prev, command]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentInput.trim()) {
        executeCommand(currentInput);
        setCurrentInput('');
        setHistoryIndex(-1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const suggestions = getCommandSuggestions(currentInput);
      if (suggestions.length === 1) {
        setCurrentInput(suggestions[0]);
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="space-y-4">
      {/* Command Outputs */}
      <div className="space-y-4">
        {outputs.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center">
              <span className="text-green-400">$</span>
              <span className="ml-2 text-white">{item.command}</span>
            </div>
            <div className="ml-4">{item.output}</div>
          </motion.div>
        ))}
      </div>

      {/* Input Line */}
      <motion.div 
        className="flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="text-green-400 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-green-400"
          placeholder="Type 'help' for available commands..."
          autoComplete="off"
        />
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-5 bg-green-400 ml-1"
        />
      </motion.div>

      {/* Command Suggestions */}
      {currentInput && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="ml-6 text-sm text-gray-500"
        >
          Suggestions: {getCommandSuggestions(currentInput).slice(0, 5).join(', ')}
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveTerminal;