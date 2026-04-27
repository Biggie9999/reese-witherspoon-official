import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { IMAGES } from '../constants/images';

const ABOUT_IMG = IMAGES.portrait2;

const features = [
  { emoji: '🎬', title: 'Acting Masterclass', desc: 'Learn craft secrets from an Academy Award winner.' },
  { emoji: '💼', title: 'Investment Insights', desc: 'Discover how Reese built her empire beyond Hollywood.' },
  { emoji: '🏆', title: 'Award Ceremony', desc: 'Exclusive recognition for outstanding attendees.' },
  { emoji: '🤝', title: 'Exclusive Networking', desc: 'Connect with a curated community of 55 visionaries.' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative" ref={ref}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[700px]">
        {/* Image Panel */}
        <div className="relative hidden lg:block">
          <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: 'linear-gradient(180deg, #C9A96E, #E8D5B0)' }} />
          <img
            src={ABOUT_IMG}
            alt="Reese Witherspoon"
            className="w-full h-full object-cover warm-filter"
            style={{ filter: 'sepia(10%) brightness(105%) contrast(105%)' }}
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="bg-cream px-6 md:px-12 lg:px-16 py-16 md:py-20 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[4px] uppercase mb-3"
            style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
          >
            About Room of 55
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-light mb-6 text-dark"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            More Than a{' '}
            <span className="italic gold-text">Meet & Greet</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted leading-relaxed mb-8 text-sm md:text-base"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
          >
            The Room of 55 is an intimate, deeply personal experience — limited to just 45–70 attendees per city. 
            This isn't a stadium show or a distant photo-op. It's an evening where you sit with Reese, learn 
            her craft, hear her investment philosophy, and walk away with a personal connection to one of 
            Hollywood's most extraordinary women. Each gathering creates an exclusive community bound by 
            ambition, creativity, and the courage to dream bigger.
          </motion.p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="glass rounded-xl p-5 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300"
                style={{ background: 'rgba(253,246,240,0.6)', border: '1px solid rgba(201,169,110,0.2)' }}
              >
                <span className="text-2xl mb-2 block">{f.emoji}</span>
                <h3
                  className="text-base font-medium text-dark mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                  {f.title}
                </h3>
                <p className="text-xs text-muted" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
    </section>
  );
}
