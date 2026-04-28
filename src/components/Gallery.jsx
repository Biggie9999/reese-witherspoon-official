import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IMAGES } from '../constants/images';

const images = [
  { src: IMAGES.gallery1, label: 'The Icon' },
  { src: IMAGES.gallery2, label: 'The Producer' },
  { src: IMAGES.gallery3, label: 'The Author' },
  { src: IMAGES.gallery4, label: 'The Entrepreneur' },
  { src: IMAGES.gallery5, label: 'The Inspiration' },
  { src: IMAGES.gallery6, label: 'The Visionary' },
  { src: IMAGES.gallery7, label: 'The Star' },
  { src: IMAGES.gallery8, label: 'The Trailblazer' },
  { src: IMAGES.gallery9, label: 'The Reader' },
  { src: IMAGES.gallery10, label: 'The Muse' },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="room55" className="py-16 md:py-20 overflow-hidden bg-surface-container-low" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="chip chip-pink uppercase tracking-widest text-[12px] mb-4 inline-block"
        >
          Reese's World
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-semibold text-primary"
          style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
        >
          A Life in <span className="italic text-pink-600">Focus</span>
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
            <div
              className="relative overflow-hidden rounded-3xl shadow-[0_8px_32px_0_rgba(242,216,220,0.3)] border border-white/60"
              style={{ height: '420px', aspectRatio: '3/4' }}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: 'sepia(10%) brightness(105%) contrast(105%)' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span
                  className="chip bg-white/30 backdrop-blur-md text-white border-white/40 text-[12px] uppercase tracking-widest"
                >
                  {img.label}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
