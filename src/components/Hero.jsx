import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiChevronDown } from 'react-icons/fi';

import { IMAGES } from '../constants/images';

const HERO_IMG = IMAGES.hero;

const stats = [
  { value: '55', label: 'Guests Max' },
  { value: '5', label: 'States' },
  { value: '4', label: 'Month Tour' },
  { value: '3', label: 'Ticket Tiers' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 2.4 + i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
};

export default function Hero() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
      {/* Parallax BG */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-20 -bottom-20 bg-cover bg-center bg-no-repeat warm-filter will-change-transform"
        style={{
          backgroundImage: `url(${HERO_IMG})`,
          filter: 'sepia(10%) brightness(105%) contrast(105%)',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(28,14,14,0.45)' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="text-[11px] tracking-[4px] uppercase mb-4"
          style={{ fontFamily: "'Jost', sans-serif", color: '#C9A96E', fontWeight: 500 }}
        >
          An Exclusive Experience — Room of 55
        </motion.p>

        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          An Evening With
        </motion.h1>

        <motion.h1
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-light italic leading-tight gold-text"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Reese Witherspoon
        </motion.h1>

        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="w-[120px] h-[1px] mx-auto my-6"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
        />

        <motion.p
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="text-lg md:text-xl tracking-[3px] text-cream/90 mb-4"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
        >
          Acting. Investments. Legacy.
        </motion.p>

        <motion.p
          custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="text-sm md:text-base text-cream/70 max-w-[480px] mx-auto mb-8 leading-relaxed"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
        >
          A limited gathering of 55 minds. Learn from one of Hollywood's most powerful women — actress, producer, entrepreneur, and investor. This is more than a meet & greet. This is a masterclass in life.
        </motion.p>

        <motion.div
          custom={6} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="tickets"
            smooth
            duration={800}
            className="px-8 py-3 text-[11px] tracking-[3px] uppercase cursor-pointer font-medium rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/30"
            style={{ background: '#C9A96E', color: '#1C0E0E', fontFamily: "'Jost', sans-serif" }}
          >
            Secure Your Seat
          </Link>
          <Link
            to="tour"
            smooth
            duration={800}
            className="px-8 py-3 text-[11px] tracking-[3px] uppercase cursor-pointer font-medium rounded-sm border transition-all duration-300 hover:bg-white/10"
            style={{ borderColor: 'rgba(253,246,240,0.4)', color: '#FDF6F0', fontFamily: "'Jost', sans-serif" }}
          >
            View Tour Dates
          </Link>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.4, duration: 0.6 }}
        className="absolute bottom-16 left-0 right-0"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-dark rounded-lg py-4 px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-light gold-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {s.value}
                </p>
                <p className="text-[10px] tracking-[2px] uppercase text-cream/60" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gold/60"
        style={{ animation: 'chevronBounce 2s ease-in-out infinite' }}
      >
        <FiChevronDown size={24} />
      </motion.div>
    </section>
  );
}
