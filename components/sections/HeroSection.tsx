import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ExternalLink, Phone } from 'lucide-react';
import { AnimatedButton } from '../AnimatedButton';

export const HeroSection = ({ onNavigate }: { onNavigate: (section: string) => void }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            <span>Full-Stack Developer & Digital Creator</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <motion.span className="block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Sanjukumar
            </motion.span>
            <motion.span className="block text-gradient" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              Developer
            </motion.span>
          </h1>

          <motion.p
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Crafting next-level websites, AI tools, mobile apps, and digital experiences that transform businesses and captivate users.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <AnimatedButton onClick={() => onNavigate('projects')} icon={ExternalLink}>
              View Projects
            </AnimatedButton>
            <AnimatedButton variant="secondary" onClick={() => onNavigate('contact')} icon={Phone}>
              Contact Me
            </AnimatedButton>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl"
              style={{ left: `${20 + i * 15}%`, top: `${30 + (i % 2) * 30}%` }}
              animate={{ y: [0, -30, 0], x: [0, 10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <motion.div className="w-1.5 h-3 rounded-full bg-white/50" animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
};