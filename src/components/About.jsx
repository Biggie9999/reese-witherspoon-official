import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IMAGES } from '../constants/images';

const ABOUT_IMG = IMAGES.portrait2;

const features = [
  { icon: 'movie', title: 'Acting Masterclass', desc: 'Learn craft secrets from an Academy Award winner.' },
  { icon: 'trending_up', title: 'Investment Insights', desc: 'Discover how Reese built her empire beyond Hollywood.' },
  { icon: 'emoji_events', title: 'Award Ceremony', desc: 'Exclusive recognition for outstanding attendees.' },
  { icon: 'handshake', title: 'Exclusive Networking', desc: 'Connect with a curated community of 55 visionaries.' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative" ref={ref}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[700px]">
        {/* Image Panel */}
        <div className="relative hidden lg:block">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary-container via-secondary-container to-primary-container" />
          <img
            src={ABOUT_IMG}
            alt="Reese Witherspoon"
            className="w-full h-full object-cover"
            style={{ filter: 'sepia(10%) brightness(105%) contrast(105%)' }}
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="bg-surface px-6 md:px-12 lg:px-16 py-16 md:py-20 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="chip chip-gold uppercase tracking-widest text-[12px] mb-4 inline-block w-max"
          >
            About Room of 55
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-semibold mb-6 text-primary"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            More Than a{' '}
            <span className="italic text-pink-600">Meet & Greet</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-on-surface-variant leading-relaxed mb-8"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            The Room of 55 is an intimate, deeply personal experience — limited to just 45–70 attendees per city. 
            This isn't a stadium show or a distant photo-op. It's an evening where you sit with Reese, learn 
            her craft, hear her investment philosophy, and walk away with a personal connection to one of 
            Hollywood's most extraordinary women.
          </motion.p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="glass-card rounded-2xl p-5 hover:shadow-[0_12px_48px_0_rgba(242,216,220,0.5)] transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">{f.icon}</span>
                </div>
                <h3
                  className="text-base font-medium text-primary mb-1"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-on-surface-variant" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
