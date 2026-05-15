import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export const GlassCard = ({ children, className = '', hover = true, glow = false, onClick }: GlassCardProps) => (
  <motion.div
    className={cn(
      'relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl',
      className
    )}
    whileHover={hover ? {
      y: -5, scale: 1.02,
      boxShadow: glow ? '0 20px 60px rgba(99,102,241,0.3)' : '0 20px 40px rgba(0,0,0,0.3)'
    } : {}}
    transition={{ type: 'spring', damping: 20 }}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
    {children}
  </motion.div>
);