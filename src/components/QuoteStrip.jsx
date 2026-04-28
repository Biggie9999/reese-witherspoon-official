import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { IMAGES } from '../constants/images';

const QUOTE_IMG = IMAGES.portrait2;

export default function QuoteStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const rect = bgRef.current.getBoundingClientRect();
        const offset = (rect.top * 0.3);
        bgRef.current.style.backgroundPositionY = `${offset}px`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-28 md:py-36 overflow-hidden" ref={ref}>
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${QUOTE_IMG})`,
          filter: 'sepia(10%) brightness(105%) contrast(105%)',
        }}
      />
      <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />

      {/* Quote icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="material-symbols-outlined text-white/10 text-[200px] md:text-[300px]">format_quote</span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl lg:text-[42px] italic leading-snug text-white drop-shadow-md"
          style={{ fontFamily: "'Noto Serif', serif", fontWeight: 500 }}
        >
          "I've learned that being powerful, being feminine, and being ambitious are not opposites. They are the same thing."
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-sm tracking-wider uppercase text-white/70"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.05em', fontWeight: 600 }}
        >
          — Reese Witherspoon
        </motion.p>
      </div>
    </section>
  );
}
