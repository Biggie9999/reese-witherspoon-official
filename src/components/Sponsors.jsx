import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const sponsors = [
  'Draper James', 'Hello Sunshine', 'Pacific Standard', 'Type A Films', 'Scarlett Letter', 'Witherspoon & Co',
];

export default function Sponsors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="sponsors" className="py-16 md:py-24 bg-surface-container-low" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="chip chip-gold uppercase tracking-widest text-[12px] mb-4 inline-block"
        >
          Our Partners
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-5xl font-semibold text-primary mb-12"
          style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
        >
          The Brands Behind the <span className="italic text-pink-600">Room</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {sponsors.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="h-24 md:h-28 glass-panel rounded-2xl flex items-center justify-center transition-all duration-300 hover:shadow-[0_12px_48px_0_rgba(242,216,220,0.5)] hover:-translate-y-1"
            >
              <span
                className="text-sm md:text-base tracking-[3px] uppercase text-on-surface-variant"
                style={{ fontFamily: "'Noto Serif', serif", fontWeight: 400 }}
              >
                {name}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-on-surface-variant mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Proud supporters of the Room of 55 experience
        </p>

        <a
          href="#contact"
          className="btn-secondary inline-block"
        >
          Become a Sponsor
        </a>
      </div>
    </section>
  );
}
