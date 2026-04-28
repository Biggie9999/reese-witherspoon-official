import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IMAGES } from '../constants/images';

const PORTRAIT = IMAGES.portrait3;

const projects = [
  {
    icon: 'movie',
    title: 'Film Production',
    desc: "Join the next wave of Hello Sunshine productions. We're seeking visionary partners for award-caliber storytelling that elevates women's voices in cinema.",
    btn: 'Express Interest',
  },
  {
    icon: 'devices',
    title: 'Media Platform',
    desc: 'An innovative digital platform connecting creators, storytellers, and audiences. Be part of the media revolution reshaping entertainment.',
    btn: 'Express Interest',
  },
  {
    icon: 'checkroom',
    title: 'Lifestyle Brand',
    desc: 'Draper James and beyond — invest in Southern-inspired lifestyle brands with global appeal and an authentic voice that resonates with millions.',
    btn: 'Express Interest',
  },
];

export default function Invest() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="invest" className="relative py-20 md:py-28" ref={ref}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${PORTRAIT})`,
          filter: 'sepia(10%) brightness(60%)',
        }}
      />
      <div className="absolute inset-0 bg-[#26181B]/85" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="chip chip-gold uppercase tracking-widest text-[11px] mb-4 inline-block font-semibold">
            Investment Opportunities
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            Projects Seeking <br className="hidden md:block" />
            <span className="italic text-pink-300 font-medium drop-shadow-md">Visionary Investors</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-dark rounded-[28px] p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_48px_0_rgba(242,216,220,0.15)] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-pink-300/10 flex items-center justify-center shrink-0 border border-pink-300/20">
                  <span className="material-symbols-outlined text-pink-300 text-[24px]">{p.icon}</span>
                </div>
                <h3
                  className="text-xl md:text-2xl font-medium text-white leading-tight"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {p.title}
                </h3>
              </div>
              <p
                className="text-sm md:text-base text-white/70 leading-relaxed flex-grow mb-8"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {p.desc}
              </p>
              <button
                className="btn-secondary !w-full !text-white !border-white/20 hover:!bg-white/10 mt-auto"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.1em' }}
              >
                {p.btn}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-sm text-white/40"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          All investment inquiries handled privately.
        </motion.p>
      </div>
    </section>
  );
}
