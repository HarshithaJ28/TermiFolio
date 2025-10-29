import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Mail, Phone, MapPin, Calendar, Award, Briefcase, GraduationCap } from 'lucide-react';

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string[];
    technologies: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    duration: string;
    gpa?: string;
    achievements?: string[];
  }>;
  achievements: string[];
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
}

const DownloadableResume: React.FC<{ data: ResumeData }> = ({ data }) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeSection, setActiveSection] = useState('summary');

  const generateResumeText = () => {
    return `
===========================================
               RESUME
===========================================

${data.personalInfo.name}
${data.personalInfo.title}

📧 ${data.personalInfo.email}
📍 ${data.personalInfo.location}
🔗 ${data.personalInfo.linkedin}
🐙 ${data.personalInfo.github}

-------------------------------------------
PROFESSIONAL SUMMARY
-------------------------------------------

${data.summary}

-------------------------------------------
EXPERIENCE
-------------------------------------------

${data.experience.map(exp => `
${exp.title} | ${exp.company}
${exp.duration}

${exp.description.map(desc => `• ${desc}`).join('\n')}

Technologies: ${exp.technologies.join(', ')}
`).join('\n')}

-------------------------------------------
EDUCATION
-------------------------------------------

${data.education.map(edu => `
${edu.degree}
${edu.institution} | ${edu.duration}
${edu.gpa ? `GPA: ${edu.gpa}` : ''}
${edu.achievements ? edu.achievements.map(ach => `• ${ach}`).join('\n') : ''}
`).join('\n')}

-------------------------------------------
KEY ACHIEVEMENTS
-------------------------------------------

${data.achievements.map(achievement => `• ${achievement}`).join('\n')}

${data.certifications ? `
-------------------------------------------
CERTIFICATIONS
-------------------------------------------

${data.certifications.map(cert => `• ${cert.name} - ${cert.issuer} (${cert.date})`).join('\n')}
` : ''}

Generated from terminal portfolio - ${new Date().toLocaleDateString()}
`;
  };

  const downloadResume = () => {
    const resumeContent = generateResumeText();
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personalInfo.name.replace(' ', '_')}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sections = [
    { id: 'summary', label: 'Summary', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Download */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {data.personalInfo.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{data.personalInfo.name}</h2>
            <p className="text-green-400">{data.personalInfo.title}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPreviewMode ? 'Interactive View' : 'Preview Mode'}
          </motion.button>
          
          <motion.button
            onClick={downloadResume}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            <span>Download Resume</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="flex items-center space-x-2 text-gray-300">
          <Mail size={16} className="text-green-400" />
          <span className="text-sm">{data.personalInfo.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-300">
          <MapPin size={16} className="text-green-400" />
          <span className="text-sm">{data.personalInfo.location}</span>
        </div>
        {data.personalInfo.phone && (
          <div className="flex items-center space-x-2 text-gray-300">
            <Phone size={16} className="text-green-400" />
            <span className="text-sm">{data.personalInfo.phone}</span>
          </div>
        )}
      </motion.div>

      {isPreviewMode ? (
        /* Preview Mode - Clean Resume Layout */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white text-black p-8 rounded-lg max-w-4xl mx-auto"
          style={{ fontFamily: 'Times, serif' }}
        >
          <div className="text-center border-b-2 border-black pb-4 mb-6">
            <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
            <p className="text-lg">{data.personalInfo.title}</p>
            <div className="flex justify-center space-x-4 mt-2 text-sm">
              <span>{data.personalInfo.email}</span>
              <span>•</span>
              <span>{data.personalInfo.location}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold border-b border-gray-400 pb-1 mb-3">PROFESSIONAL SUMMARY</h2>
              <p className="text-sm leading-relaxed">{data.summary}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b border-gray-400 pb-1 mb-3">EXPERIENCE</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{exp.title}</h3>
                    <span className="text-sm text-gray-600">{exp.duration}</span>
                  </div>
                  <p className="font-medium text-gray-700">{exp.company}</p>
                  <ul className="text-sm mt-2 space-y-1">
                    {exp.description.map((desc, i) => (
                      <li key={i}>• {desc}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Technologies:</strong> {exp.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold border-b border-gray-400 pb-1 mb-3">EDUCATION</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <span className="text-sm text-gray-600">{edu.duration}</span>
                  </div>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        /* Interactive Mode */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Section Navigation */}
          <div className="space-y-2">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent size={16} />
                    <span className="text-sm font-medium">{section.label}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Section Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 min-h-[400px]"
              >
                {activeSection === 'summary' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Professional Summary</h3>
                    <motion.p 
                      className="text-gray-300 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {data.summary}
                    </motion.p>
                  </div>
                )}

                {activeSection === 'experience' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Professional Experience</h3>
                    {data.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-l-2 border-green-400 pl-4 pb-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold text-white">{exp.title}</h4>
                          <span className="text-sm text-gray-400 flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-blue-400 font-medium mb-3">{exp.company}</p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          {exp.description.map((desc, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="flex items-start"
                            >
                              <span className="text-green-400 mr-2">▸</span>
                              {desc}
                            </motion.li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {exp.technologies.map((tech, i) => (
                            <motion.span
                              key={tech}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.05 }}
                              className="px-2 py-1 bg-gray-700 text-cyan-400 rounded text-xs"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeSection === 'education' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Education</h3>
                    {data.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-900 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                          <span className="text-sm text-gray-400">{edu.duration}</span>
                        </div>
                        <p className="text-blue-400 mb-2">{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-green-400 text-sm">GPA: {edu.gpa}</p>
                        )}
                        {edu.achievements && (
                          <ul className="mt-3 space-y-1">
                            {edu.achievements.map((achievement, i) => (
                              <li key={i} className="text-gray-300 text-sm flex items-center">
                                <Award size={12} className="text-yellow-400 mr-2" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeSection === 'achievements' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Key Achievements</h3>
                    <div className="grid gap-3">
                      {data.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-3 bg-gray-900 rounded-lg"
                        >
                          <Award size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadableResume;