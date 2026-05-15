import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export const AnimatedButton = ({
  children, onClick, variant = 'primary', className = '', icon: Icon, disabled = false, type = 'button'
}: AnimatedButtonProps) => {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/10',
    outline: 'border-2 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10',
    ghost: 'text-slate-400 hover:text-white hover:bg-white/5',
  };

  return (
    <motion.button
      type={type}
      className={cn(
        'relative px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant], className
      )}
      onClick={onClick}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      disabled={disabled}
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 2, opacity: [0.5, 0] }}
          transition={{ duration: 0.5 }}
          style={{ borderRadius: '50%', transformOrigin: 'center' }}
        />
      </div>
      {Icon && <Icon className="w-5 h-5" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};