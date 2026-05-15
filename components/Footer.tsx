import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export const Footer = () => (
  <footer className="relative py-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div
          className="text-2xl font-bold text-gradient"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Sanjukumar
        </motion.div>

        <div className="flex items-center gap-4">
          {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>

        <p className="text-slate-500 text-sm">
          © 2024 Sanjukumar. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);