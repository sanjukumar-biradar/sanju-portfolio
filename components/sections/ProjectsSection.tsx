import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const ProjectsSection = () => {
  const projects = [
    { title: 'E-Commerce Platform', tech: 'Next.js, Stripe, Tailwind', category: 'Web', color: 'from-indigo-500 to-purple-500' },
    { title: 'AI Chat Assistant', tech: 'React, OpenAI, Node.js', category: 'AI', color: 'from-purple-500 to-pink-500' },
    { title: 'Mobile Banking App', tech: 'React Native, Firebase', category: 'Mobile', color: 'from-pink-500 to-rose-500' },
    { title: 'Unity 3D Game', tech: 'Unity, C#, Blender', category: 'Game', color: 'from-emerald-500 to-teal-500' },
    { title: 'Excel Data Processor', tech: 'Python, Pandas, VBA', category: 'Automation', color: 'from-amber-500 to-orange-500' },
    { title: 'QR Payment System', tech: 'Next.js, QR API, MongoDB', category: 'Fintech', color: 'from-cyan-500 to-blue-500' },
  ];

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-400 max-w-2xl mx-auto">Showcasing my best work</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="group overflow-hidden" glow>
                <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Github className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs bg-white/10 text-slate-300 mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{project.tech}</p>
                  <div className="flex gap-2">
                    <motion.button
                      className="flex-1 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </motion.button>
                    <motion.button
                      className="flex-1 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};