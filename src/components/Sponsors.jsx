import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const sponsors = [
  'Draper James', 'Hello Sunshine', 'Pacific Standard', 'Type A Films', 'Scarlett Letter', 'Witherspoon & Co',
];

export default function Sponsors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="sponsors" className="py-16 md:py-24" style={{ background: '#FFFAF7' }} ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-[11px] tracking-[4px] uppercase mb-3"
          style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
        >
          Our Partners
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-5xl font-light text-dark mb-12"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          The Brands Behind the <span className="italic gold-text">Room</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {sponsors.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="h-24 md:h-28 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                background: 'rgba(253,246,240,0.8)',
                border: '1px solid rgba(201,169,110,0.2)',
                boxShadow: '0 2px 12px rgba(201,169,110,0.08)',
              }}
            >
              <span
                className="text-sm md:text-base tracking-[3px] uppercase text-muted/60"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
              >
                {name}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-muted mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          Proud supporters of the Room of 55 experience
        </p>

        <a
          href="#contact"
          className="inline-block px-8 py-3 text-[11px] tracking-[3px] uppercase rounded-sm transition-all duration-300 hover:shadow-md"
          style={{
            border: '1px solid rgba(201,169,110,0.4)',
            color: '#C9A96E',
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
          }}
        >
          Become a Sponsor
        </a>
      </div>

      <div className="mt-16 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
    </section>
  );
}
