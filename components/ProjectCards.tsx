import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCard {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  forks?: number;
  status: 'completed' | 'in-progress' | 'planned';
  category: string;
  image?: string;
}

const ProjectCards: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 3;

  const projects: ProjectCard[] = [
    {
      id: 1,
      title: "AI Code Assistant",
      description: "Intelligent code completion and debugging tool using GPT-4 and machine learning algorithms.",
      technologies: ["Python", "TensorFlow", "React", "FastAPI"],
      githubUrl: "https://github.com/HarshithaJ28/ai-code-assistant",
      liveUrl: "https://ai-code-assistant.demo.com",
      stars: 127,
      forks: 34,
      status: "completed",
      category: "AI/ML",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 2,
      title: "Real-time Chat Platform",
      description: "Scalable messaging platform with WebSocket support, file sharing, and end-to-end encryption.",
      technologies: ["Node.js", "Socket.io", "MongoDB", "Vue.js"],
      githubUrl: "https://github.com/HarshithaJ28/realtime-chat",
      liveUrl: "https://chat-platform.demo.com",
      stars: 89,
      forks: 23,
      status: "completed",
      category: "Full-Stack",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 3,
      title: "Smart Home Dashboard",
      description: "IoT dashboard for monitoring and controlling smart home devices with predictive analytics.",
      technologies: ["React Native", "Firebase", "Arduino", "Python"],
      githubUrl: "https://github.com/HarshithaJ28/smart-home-dashboard",
      stars: 156,
      forks: 42,
      status: "in-progress",
      category: "IoT",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 4,
      title: "Blockchain Voting System",
      description: "Secure and transparent voting system built on Ethereum with smart contracts and Web3 integration.",
      technologies: ["Solidity", "Web3.js", "React", "Truffle"],
      githubUrl: "https://github.com/HarshithaJ28/blockchain-voting",
      liveUrl: "https://blockchain-vote.demo.com",
      stars: 203,
      forks: 67,
      status: "completed",
      category: "Blockchain",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 5,
      title: "E-commerce Analytics Platform",
      description: "Advanced analytics dashboard for e-commerce businesses with real-time sales tracking and customer insights.",
      technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
      githubUrl: "https://github.com/HarshithaJ28/ecommerce-analytics",
      liveUrl: "https://analytics-platform.demo.com",
      stars: 94,
      forks: 28,
      status: "completed",
      category: "Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 6,
      title: "Social Media Scheduler",
      description: "Multi-platform social media management tool with AI-powered content suggestions and scheduling.",
      technologies: ["Vue.js", "Express.js", "Redis", "AWS"],
      githubUrl: "https://github.com/HarshithaJ28/social-scheduler",
      stars: 112,
      forks: 35,
      status: "in-progress",
      category: "SaaS",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 7,
      title: "Fitness Tracking App",
      description: "Mobile fitness application with workout tracking, nutrition monitoring, and progress analytics.",
      technologies: ["React Native", "GraphQL", "MongoDB", "TensorFlow"],
      githubUrl: "https://github.com/HarshithaJ28/fitness-tracker",
      liveUrl: "https://fitness-app.demo.com",
      stars: 78,
      forks: 21,
      status: "completed",
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 8,
      title: "Cybersecurity Dashboard",
      description: "Enterprise security monitoring system with threat detection and automated response capabilities.",
      technologies: ["Angular", "Python", "Elasticsearch", "Docker"],
      githubUrl: "https://github.com/HarshithaJ28/security-dashboard",
      stars: 165,
      forks: 52,
      status: "planned",
      category: "Security",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&auto=format"
    }
  ];

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'in-progress':
        return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'planned':
        return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      default:
        return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI/ML':
        return 'text-purple-400';
      case 'Full-Stack':
        return 'text-blue-400';
      case 'IoT':
        return 'text-orange-400';
      case 'Blockchain':
        return 'text-yellow-400';
      case 'Analytics':
        return 'text-indigo-400';
      case 'SaaS':
        return 'text-emerald-400';
      case 'Mobile':
        return 'text-pink-400';
      case 'Security':
        return 'text-red-400';
      default:
        return 'text-cyan-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full mb-12"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-2 text-green-400 mb-2">
          <span className="text-sm font-mono">harshitha@portfolio:</span>
          <span className="text-white">ls -la ./featured-projects/</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Featured Projects</h2>
        <p className="text-gray-400">Quick overview of my latest and most impactful work</p>
        
        {/* Navigation Info */}
        <div className="flex items-center justify-center mt-4">
          <div className="text-sm text-gray-500 font-mono">
            Page {currentPage + 1} of {totalPages} • {projects.length} total projects
          </div>
        </div>
      </motion.div>

      {/* Project Cards Grid with Navigation */}
      <div className="flex items-center justify-center gap-6">
        {/* Left Arrow */}
        <button
          onClick={prevPage}
          className="p-3 rounded-lg bg-gray-800/50 border border-gray-600/30 text-cyan-400 hover:bg-gray-700/50 hover:border-cyan-400/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={totalPages <= 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 max-w-6xl">
          {currentProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.3 + index * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(0, 255, 255, 0.1)"
            }}
            className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-5 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Status Badge */}
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-mono border ${getStatusColor(project.status)}`}>
              {project.status.replace('-', ' ')}
            </div>

            {/* Category Tag */}
            <div className={`text-xs font-mono mb-3 ${getCategoryColor(project.category)}`}>
              {project.category}
            </div>

            {/* Project Image Placeholder */}
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-700/50 bg-gray-800/30">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={`${project.title} preview`}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                  <div className="text-gray-500 text-sm font-mono">
                    Project Preview
                  </div>
                </div>
              )}
            </div>

            {/* Project Title */}
            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1 mb-4">
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-gray-800/50 text-cyan-400 text-xs rounded border border-cyan-400/20"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded border border-gray-600/20">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
              {project.stars && (
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>{project.stars}</span>
                </div>
              )}
              {project.forks && (
                <div className="flex items-center space-x-1">
                  <GitFork className="w-3 h-3" />
                  <span>{project.forks}</span>
                </div>
              )}
            </div>

            {/* Action Links */}
            <div className="flex space-x-2">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded text-xs transition-all border border-gray-600/30 hover:border-gray-500/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-3 h-3" />
                  <span>Code</span>
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 hover:text-cyan-300 rounded text-xs transition-all border border-cyan-400/30 hover:border-cyan-400/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Live</span>
                </motion.a>
              )}
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextPage}
          className="p-3 rounded-lg bg-gray-800/50 border border-gray-600/30 text-cyan-400 hover:bg-gray-700/50 hover:border-cyan-400/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={totalPages <= 1}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Terminal Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center space-x-2 text-green-400 text-sm mt-6 font-mono"
      >
        <span>harshitha@portfolio:</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-white"
        >
          █
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCards;