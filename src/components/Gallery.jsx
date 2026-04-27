import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { IMAGES } from '../constants/images';

const images = [
  { src: IMAGES.gallery1, label: 'The Icon' },
  { src: IMAGES.gallery2, label: 'The Producer' },
  { src: IMAGES.gallery3, label: 'The Author' },
  { src: IMAGES.gallery4, label: 'The Entrepreneur' },
  { src: IMAGES.gallery5, label: 'The Inspiration' },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="room55" className="py-16 md:py-20 overflow-hidden" style={{ background: '#FFFAF7' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-[11px] tracking-[4px] uppercase mb-3"
          style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
        >
          Reese's World
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-dark"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          A Life in <span className="italic gold-text">Focus</span>
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-8 pb-4 hide-scrollbar snap-x snap-mandatory"
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex-shrink-0 group cursor-pointer snap-center"
          >
            <div className="relative overflow-hidden rounded-lg" style={{ height: '420px', aspectRatio: '3/4' }}>
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                style={{ filter: 'sepia(10%) brightness(105%) contrast(105%)' }}
                loading="lazy"
              />
              <div
                className="absolute inset-0 border-2 border-transparent group-hover:border-gold/60 rounded-lg transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <p
              className="mt-3 text-center text-[11px] tracking-[3px] uppercase text-muted group-hover:text-gold transition-colors duration-300"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
            >
              {img.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Gold divider */}
      <div className="mt-16 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
    </section>
  );
}
