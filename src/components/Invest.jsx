import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { IMAGES } from '../constants/images';

const PORTRAIT = IMAGES.portrait3;

const projects = [
  {
    emoji: '🎬',
    title: 'Film Production',
    desc: "Join the next wave of Hello Sunshine productions. We're seeking visionary partners for award-caliber storytelling that elevates women's voices in cinema.",
    btn: 'Express Interest',
  },
  {
    emoji: '📱',
    title: 'Media Platform',
    desc: 'An innovative digital platform connecting creators, storytellers, and audiences. Be part of the media revolution reshaping entertainment.',
    btn: 'Express Interest',
  },
  {
    emoji: '👗',
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
      <div className="absolute inset-0" style={{ background: 'rgba(28,14,14,0.85)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-[11px] tracking-[4px] uppercase mb-3" style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            Investment Opportunities
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Projects Seeking <span className="italic gold-text">Visionary Investors</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="rounded-xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/10"
              style={{
                background: 'rgba(28,14,14,0.5)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(201,169,110,0.3)',
              }}
            >
              <span className="text-3xl mb-4 block">{p.emoji}</span>
              <h3 className="text-xl font-light text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {p.title}
              </h3>
              <p className="text-sm text-cream/60 leading-relaxed mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                {p.desc}
              </p>
              <button
                className="w-full py-2.5 rounded-sm text-[11px] tracking-[2px] uppercase transition-all duration-300 hover:bg-gold hover:text-dark"
                style={{ border: '1px solid rgba(201,169,110,0.4)', color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
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
          className="text-center mt-10 text-xs text-cream/40"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
        >
          All investment inquiries handled privately.
        </motion.p>
      </div>
    </section>
  );
}
