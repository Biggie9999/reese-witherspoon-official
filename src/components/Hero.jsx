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
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 2.2 + i * 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[750px] overflow-hidden flex flex-col justify-end pb-28">
      {/* Parallax BG */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-20 -bottom-20 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${HERO_IMG})`,
          filter: 'sepia(10%) brightness(105%) contrast(105%)',
        }}
      />
      
      {/* Beautiful smooth gradient for text readability without darkening the whole image */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#26181B]/90 via-[#26181B]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#26181B]/40 via-transparent to-[#26181B]/40" />

      {/* Content Container */}
      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        
        {/* Left Side: Typography & CTA */}
        <div className="max-w-3xl">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="mb-5"
          >
            <span className="chip chip-gold uppercase tracking-widest text-[11px] font-bold">
              Room of 55 — Exclusive Tour
            </span>
          </motion.div>

          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-5xl md:text-7xl lg:text-[84px] font-bold text-white leading-[1.05]"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            An Evening With
          </motion.h1>

          <motion.h1
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-5xl md:text-7xl lg:text-[84px] font-semibold italic text-pink-200 leading-[1.05] mb-6"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            Reese Witherspoon
          </motion.h1>

          <motion.p
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="text-base md:text-lg text-white/80 max-w-xl mb-10 leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            A limited gathering of 55 minds. Learn from one of Hollywood's most powerful women — actress, producer, entrepreneur, and investor.
          </motion.p>

          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-wrap gap-4 items-center"
          >
            <Link
              to="tickets"
              smooth
              duration={800}
              className="btn-primary"
            >
              Secure Your Seat
            </Link>
            <Link
              to="tour"
              smooth
              duration={800}
              className="btn-secondary !text-white !border-white/30 hover:!bg-white/10"
            >
              View Tour Dates
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Stats Block */}
        <motion.div
          custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="hidden lg:flex flex-col gap-6 backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-[32px] shadow-2xl min-w-[240px]"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-3xl font-bold text-pink-200 mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/60 font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {s.label}
              </span>
              {i !== stats.length - 1 && <div className="w-8 h-[1px] bg-white/20 mt-6" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Stats (only visible on small screens) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="lg:hidden absolute bottom-0 left-0 right-0 bg-[#26181B]/80 backdrop-blur-lg border-t border-white/10 py-4 px-6 flex justify-between items-center z-10"
      >
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-lg font-bold text-pink-200" style={{ fontFamily: "'Noto Serif', serif" }}>{s.value}</p>
            <p className="text-[9px] uppercase tracking-wider text-white/60 font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
