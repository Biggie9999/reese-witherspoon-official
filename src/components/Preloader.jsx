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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#F2D8DC' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1
              className="text-4xl md:text-6xl font-light tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1C0E0E' }}
            >
              Reese Witherspoon
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-2 text-xs tracking-[4px] uppercase font-medium"
              style={{ fontFamily: "'Jost', sans-serif", color: '#C9A96E' }}
            >
              Official
            </motion.p>
          </motion.div>

          <div className="mt-10 w-48 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(201,169,110,0.3)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0, #C9A96E)', width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
