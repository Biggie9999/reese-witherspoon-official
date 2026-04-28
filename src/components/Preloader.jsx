import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(() => onComplete(), 500);
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1
              className="text-4xl md:text-6xl font-bold tracking-tighter text-pink-600"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              REESE WITHERSPOON
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-2 text-[11px] tracking-[4px] uppercase font-semibold text-pink-400"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Official
            </motion.p>
          </motion.div>

          <div className="mt-10 w-48 h-[2px] rounded-full overflow-hidden bg-primary-container">
            <motion.div
              className="h-full rounded-full bg-pink-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
