import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

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
      title: "DepPy",
      description: "A deterministic Python dependency resolver and conflict detector that parses requirements files, builds transitive dependency graphs, detects version conflicts, and suggests deterministic fixes using heuristics and MILP optimization.",
      technologies: ["Python", "OR-Tools", "MILP", "Graph Theory"],
      githubUrl: "https://github.com/HarshithaJ28/DepPy",
      stars: 127,
      forks: 34,
      status: "completed",
      category: "DevTools",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 2,
      title: "FormGenie",
      description: "An intelligent form generator that converts documents like PDF, DOCX, and TXT into professional survey forms using AI technology, with automated Google Forms creation and seamless integration capabilities.",
      technologies: ["Python", "AI/ML", "Google Forms API", "Document Processing"],
      githubUrl: "https://github.com/HarshithaJ28/FormGenie",
      stars: 89,
      forks: 23,
      status: "completed",
      category: "AI/ML",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 3,
      title: "GrubSync",
      description: "An intelligent, group-centric restaurant recommender system that helps friends find the best dining compromise when choosing where to eat, using advanced algorithms and collaborative filtering techniques for optimal group satisfaction.",
      technologies: ["Python", "Machine Learning", "Collaborative Filtering", "React"],
      githubUrl: "https://github.com/HarshithaJ28/GrubSync",
      stars: 156,
      forks: 42,
      status: "completed",
      category: "AI/ML",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 4,
      title: "T&C Guard",
      description: "A privacy-first browser extension that instantly analyzes Terms & Conditions and Privacy Policies, providing plain-language summaries, comprehensive risk detection, and actionable insights for informed user decisions.",
      technologies: ["JavaScript", "Browser Extension", "NLP", "Privacy"],
      githubUrl: "https://github.com/HarshithaJ28/Terms-and-Conditions-Guard",
      stars: 156,
      forks: 42,
      status: "completed",
      category: "Privacy",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 5,
      title: "MineMind",
      description: "A prototype AI-driven geospatial tool for visualizing predicted mine-related hazard risks across terrain and planning safer traversal routes that account for both predicted risk levels and model uncertainty for enhanced safety.",
      technologies: ["Python", "AI/ML", "Geospatial Analysis", "Risk Modeling"],
      githubUrl: "https://github.com/HarshithaJ28/MineMind",
      stars: 203,
      forks: 67,
      status: "completed",
      category: "AI/ML",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 6,
      title: "WelcomeHome",
      description: "A comprehensive database-driven management system designed to efficiently track and organize donations, inventory, client orders, volunteer coordination, and delivery logistics for the non-profit organization WelcomeHome's operational excellence.",
      technologies: ["Database Design", "SQL", "Management System", "Non-profit"],
      githubUrl: "https://github.com/HarshithaJ28/Welcome-Home",
      stars: 203,
      forks: 67,
      status: "completed",
      category: "Database",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 7,
      title: "TermiFolio",
      description: "A sleek, Linux terminal-themed developer portfolio that brings your projects and profile to life through a command-line aesthetic. Fully responsive, animation-ready, and easily customizable as a reusable template for any tech enthusiast.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/HarshithaJ28/TermiFolio",
      stars: 203,
      forks: 67,
      status: "completed",
      category: "Portfolio",
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=250&fit=crop&auto=format"
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
      case 'DevTools':
        return 'text-violet-400';
      case 'Privacy':
        return 'text-teal-400';
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
            <p className="text-gray-300 text-sm mb-4 leading-relaxed text-justify">
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