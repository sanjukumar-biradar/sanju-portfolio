import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';
import { UserData } from '@/types';

interface NavigationProps {
  user: UserData | null;
  onLoginClick: () => void;
  onAdminClick: () => void;
  onCartClick: () => void;
  cartCount: number;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navigation = ({ user, onLoginClick, onAdminClick, onCartClick, cartCount, activeSection, onNavigate }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'store', label: 'Store' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div
            className="text-xl md:text-2xl font-bold text-gradient cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigate('home')}
          >
            Sanjukumar
          </motion.div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => onNavigate(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              className="relative p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              onClick={onCartClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:block text-sm text-slate-300">{user.name}</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                  {user.name[0]}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <AnimatedButton variant="ghost" onClick={onLoginClick} className="px-4 py-2 text-sm">
                  Login
                </AnimatedButton>
                <AnimatedButton onClick={onAdminClick} className="px-4 py-2 text-sm">
                  Admin
                </AnimatedButton>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-xl hover:bg-white/10 text-slate-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-white/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${
                    activeSection === item.id ? 'bg-white/10 text-white' : 'text-slate-400'
                  }`}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
              {!user && (
                <div className="flex gap-2 pt-2">
                  <AnimatedButton variant="secondary" onClick={onLoginClick} className="flex-1 justify-center">
                    User Login
                  </AnimatedButton>
                  <AnimatedButton onClick={onAdminClick} className="flex-1 justify-center">
                    Admin
                  </AnimatedButton>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};