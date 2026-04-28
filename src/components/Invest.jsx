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
      <div className="absolute inset-0 bg-inverse-surface/85" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="chip chip-gold uppercase tracking-widest text-[12px] mb-4 inline-block">
            Investment Opportunities
          </span>
          <h2
            className="text-3xl md:text-5xl font-semibold text-white"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            Projects Seeking <span className="italic text-pink-200">Visionary Investors</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="glass-dark rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_48px_0_rgba(242,216,220,0.3)] group"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-pink-200 text-[24px]">{p.icon}</span>
              </div>
              <h3
                className="text-xl font-medium text-white mb-3"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm text-white/60 leading-relaxed mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {p.desc}
              </p>
              <button
                className="w-full py-3 rounded-full text-sm font-semibold tracking-wider text-white border border-white/30 hover:bg-white/10 transition-colors backdrop-blur-sm"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.05em' }}
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
          className="text-center mt-10 text-sm text-white/40"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          All investment inquiries handled privately.
        </motion.p>
      </div>
    </section>
  );
}
