import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X } from 'lucide-react';

interface WelcomeAssistantProps {
  onComplete: () => void;
}

export const WelcomeAssistant = ({ onComplete }: WelcomeAssistantProps) => {
  const [show, setShow] = useState(true);
  const [subtitle, setSubtitle] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const welcomeText = "Welcome to the digital world of developer Sanjukumar. Explore innovative websites, apps, AI tools, business systems, and modern digital experiences.";

  useEffect(() => {
    if (!show) return;

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= welcomeText.length) {
        setSubtitle(welcomeText.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 40);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window && soundEnabled) {
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(welcomeText);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 0.8;

        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(v =>
          v.name.includes('Female') ||
          v.name.includes('Samantha') ||
          v.name.includes('Victoria') ||
          v.lang.includes('en-GB')
        );
        if (femaleVoice) utterance.voice = femaleVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }, 500);
    }

    const dismissTimer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 8000);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(dismissTimer);
    };
  }, [show, soundEnabled, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}
        >
          <motion.div
            className="relative max-w-2xl w-full mx-4"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {/* Character */}
            <motion.div
              className="w-64 h-64 mx-auto mb-6 relative"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 15, delay: 0.2 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow" />
              <div className="absolute inset-1 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <motion.img
                  src="/profile.jpg"
                  alt="Sanju Kumar"
                  className="w-full h-full object-cover"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(99,102,241,0.5)',
                    '0 0 40px rgba(139,92,246,0.8)',
                    '0 0 20px rgba(99,102,241,0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <h2 className="text-3xl font-bold text-gradient mb-4">Welcome!</h2>

              <div className="min-h-[80px] flex items-center justify-center">
                <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                  {subtitle}
                  <motion.span
                    className="inline-block w-0.5 h-5 bg-indigo-400 ml-1 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                </button>
                {isSpeaking && (
                  <motion.div className="flex gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {[1, 2, 3].map(i => (
                      <motion.div
                        key={i}
                        className="w-1 bg-indigo-400 rounded-full"
                        animate={{ height: [4, 16, 4] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>

              <motion.button
                className="mt-6 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 text-sm transition-all border border-white/10 flex items-center gap-2 mx-auto"
                onClick={() => { setShow(false); onComplete(); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4" />
                Skip Introduction
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};