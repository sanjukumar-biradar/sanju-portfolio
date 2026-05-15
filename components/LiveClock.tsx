import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40 glass rounded-xl px-4 py-2 flex items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <Clock className="w-4 h-4 text-indigo-400" />
      <div className="text-right">
        <motion.p
          className="text-sm font-mono font-bold text-white"
          key={time.getSeconds()}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
        >
          {formatTime(time)}
        </motion.p>
        <p className="text-xs text-slate-400">{formatDate(time)}</p>
      </div>
    </motion.div>
  );
};