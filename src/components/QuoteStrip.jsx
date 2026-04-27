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
      <div className="absolute inset-0" style={{ background: 'rgba(28,14,14,0.7)' }} />

      {/* Decorative quotes */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[180px] md:text-[250px] leading-none opacity-10 gold-text pointer-events-none select-none" style={{ fontFamily: "'Playfair Display', serif" }}>
        &ldquo;
      </div>

      {/* Sparkle particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-40"
          style={{
            background: '#C9A96E',
            top: `${15 + Math.random() * 70}%`,
            left: `${5 + Math.random() * 90}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl lg:text-[42px] italic leading-snug text-cream/90"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
        >
          "I've learned that being powerful, being feminine, and being ambitious are not opposites. They are the same thing."
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-xs tracking-[4px] uppercase"
          style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif" }}
        >
          — Reese Witherspoon
        </motion.p>
      </div>
    </section>
  );
}
