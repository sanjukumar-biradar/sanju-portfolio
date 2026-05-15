import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 rounded-full hidden md:block"
      animate={{
        x: position.x - 150,
        y: position.y - 150,
        opacity: visible ? 0.15 : 0,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      style={{
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, rgba(139,92,246,0.3) 40%, transparent 70%)',
        filter: 'blur(40px)',
      }}
    />
  );
};