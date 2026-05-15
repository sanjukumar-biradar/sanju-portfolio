import { motion } from 'framer-motion';
import { GlassCard } from '../GlassCard';
import { ProfileCard } from '../ProfileCard';

export const AboutSection = () => (
  <section id="about" className="py-20 md:py-32 relative">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">About Me</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <ProfileCard />
        
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Who I Am</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              I'm Sanjukumar, a passionate full-stack developer from TQ Bhalki, Dist Bidar, Karnataka, India. 
              I specialize in creating cutting-edge digital solutions that combine beautiful design with powerful functionality.
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              With expertise in React, Next.js, AI integration, Unity game development, and Excel automation, 
              I deliver solutions that help businesses grow and users smile.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Years Experience', value: '5+' },
                { label: 'Projects Completed', value: '50+' },
                { label: 'Happy Clients', value: '30+' },
                { label: 'Technologies', value: '20+' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 text-center"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <p className="text-2xl font-bold text-indigo-400">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  </section>
);