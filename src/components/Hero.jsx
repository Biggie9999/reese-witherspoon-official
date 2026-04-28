import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
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
        className="absolute inset-0 -top-20 -bottom-20 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${HERO_IMG})`,
          filter: 'sepia(10%) brightness(105%) contrast(105%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18]/70 via-[#1E1B18]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="chip chip-gold uppercase tracking-widest text-[12px] mb-6 inline-block"
        >
          An Exclusive Experience — Room of 55
        </motion.p>

        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white leading-tight"
          style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
        >
          An Evening With
        </motion.h1>

        <motion.h1
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-semibold italic leading-tight text-pink-200"
          style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
        >
          Reese Witherspoon
        </motion.h1>

        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="w-[120px] h-[1px] mx-auto my-6"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}
        />

        <motion.p
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="text-lg md:text-xl tracking-wide text-white/90 mb-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
        >
          Acting. Investments. Legacy.
        </motion.p>

        <motion.p
          custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="text-base text-white/70 max-w-[520px] mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}
        >
          A limited gathering of 55 minds. Learn from one of Hollywood's most powerful women — actress, producer, entrepreneur, and investor.
        </motion.p>

        <motion.div
          custom={6} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="tickets"
            smooth
            duration={800}
            className="bg-primary text-on-primary px-8 py-4 rounded-full font-semibold text-sm tracking-wider cursor-pointer shadow-[0_4px_20px_rgba(242,216,220,0.6)] hover:bg-tertiary transition-all hover:scale-105 inline-flex items-center gap-2 border border-white/30"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.05em' }}
          >
            Secure Your Seat
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
          <Link
            to="tour"
            smooth
            duration={800}
            className="btn-secondary !border-white/40 !text-white hover:!bg-white/10 cursor-pointer"
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
          <div className="glass-dark rounded-3xl py-5 px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p
                  className="text-2xl md:text-3xl font-semibold text-pink-200"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-[11px] tracking-wider uppercase text-white/60"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.05em' }}
                >
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
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50"
        style={{ animation: 'chevronBounce 2s ease-in-out infinite' }}
      >
        <span className="material-symbols-outlined text-[28px]">expand_more</span>
      </motion.div>
    </section>
  );
}
