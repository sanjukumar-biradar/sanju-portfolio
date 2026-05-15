import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const ProfileCard = () => (
  <GlassCard className="p-8 max-w-md mx-auto" glow>
    <div className="flex flex-col items-center text-center">
      <motion.div className="relative w-32 h-32 mb-6" whileHover={{ scale: 1.05 }}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow" />
        <div className="absolute inset-1 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border-2 border-white/20">
          <div className="text-5xl">👨‍💻</div>
        </div>
        <motion.div
          className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-slate-900"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <motion.h3 className="text-2xl font-bold text-white mb-1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        Sanjukumar
      </motion.h3>
      <motion.p className="text-indigo-400 font-medium mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        Full-Stack Developer
      </motion.p>

      <div className="space-y-3 w-full">
        <motion.div
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
          whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.1)' }}
        >
          <Phone className="w-5 h-5 text-indigo-400" />
          <span className="text-slate-300">8431944340</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
          whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.1)' }}
        >
          <MapPin className="w-5 h-5 text-purple-400" />
          <span className="text-slate-300 text-sm">TQ Bhalki, Dist Bidar, Karnataka, India</span>
        </motion.div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {['React', 'Next.js', 'AI', 'Unity', 'Excel'].map((skill, i) => (
          <motion.span
            key={skill}
            className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  </GlassCard>
);