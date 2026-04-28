import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { IMAGES } from '../constants/images';

const tourData = [
  {
    state: 'California',
    month: 'June 2026',
    type: 'Book Tour Premiere',
    chipStyle: 'chip-pink',
    featured: true,
    cities: ['Los Angeles', 'Beverly Hills', 'San Diego', 'San Francisco', 'Malibu'],
    venue: 'The Hollywood Bowl',
    image: IMAGES.gallery3,
  },
  {
    state: 'New York',
    month: 'June 2026',
    type: 'Speaking Engagement',
    chipStyle: 'chip-gold',
    featured: false,
    cities: ['Manhattan', 'Brooklyn', 'The Hamptons', 'Buffalo', 'Harlem'],
    venue: 'The Town Hall',
    image: IMAGES.gallery2,
  },
  {
    state: 'Florida',
    month: 'July 2026',
    type: 'Fireside Chat',
    chipStyle: 'chip-pink',
    featured: false,
    cities: ['Miami', 'Orlando', 'Tampa', 'Fort Lauderdale', 'Jacksonville'],
    venue: 'Adrienne Arsht Center',
    image: IMAGES.gallery4,
  },
  {
    state: 'Texas',
    month: 'July 2026',
    type: 'Book Tour',
    chipStyle: 'chip-gold',
    featured: false,
    cities: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],
    venue: 'Bass Concert Hall',
    image: IMAGES.gallery5,
  },
  {
    state: 'Nevada',
    month: 'August 2026',
    type: 'Fireside Chat',
    chipStyle: 'chip-pink',
    featured: false,
    cities: ['Las Vegas', 'Henderson', 'Reno', 'Lake Tahoe', 'Carson City'],
    venue: 'The Smith Center',
    image: IMAGES.gallery1,
  },
];

export default function Tour() {
  const [expanded, setExpanded] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tour" className="py-16 md:py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-container-low to-surface" />

      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-container/20 to-transparent blur-3xl rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2
            className="text-4xl md:text-5xl font-semibold text-primary mb-4"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            On the Road
          </h2>
          <p
            className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Join Reese for an evening of stories, inspiration, and connection. Explore upcoming dates below.
          </p>
        </motion.div>

        {/* Event Grid (Bento) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourData.map((tour, i) => (
            <motion.article
              key={tour.state}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              className={`group relative overflow-hidden rounded-[24px] glass-panel flex flex-col transition-all hover:shadow-[0_12px_48px_0_rgba(242,216,220,0.5)] ${
                i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${i === 0 ? 'h-64 md:h-80' : 'h-48'}`}>
                <img
                  src={tour.image}
                  alt={tour.state}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className={`flex-1 flex flex-col justify-between ${
                i === 0 ? 'p-8 -mt-20 relative z-10' : 'p-6 -mt-12 relative z-10'
              }`}>
                <div>
                  {/* Type Chip */}
                  <div className={`chip ${tour.chipStyle} text-[12px] mb-4`}>
                    {tour.type}
                  </div>

                  {/* City & Date */}
                  <h3
                    className={`font-medium text-primary mb-3 ${i === 0 ? 'text-3xl' : 'text-2xl'}`}
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {tour.state}
                  </h3>

                  <p className="text-on-surface-variant flex items-center gap-2 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    {tour.month}
                  </p>
                  <p className="text-on-surface-variant flex items-center gap-2 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    {tour.venue}
                  </p>

                  {/* City chips on expand */}
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="text-sm font-semibold text-primary flex items-center gap-1 mb-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.05em' }}
                  >
                    {expanded === i ? 'Hide Cities' : 'View All Cities'}
                    <motion.span
                      animate={{ rotate: expanded === i ? 180 : 0 }}
                      className="material-symbols-outlined text-[18px]"
                    >
                      expand_more
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tour.cities.map(city => (
                            <span
                              key={city}
                              className="chip chip-pink text-[12px]"
                            >
                              {city}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Button */}
                <button
                  className={`mt-4 w-full flex items-center justify-center gap-2 ${i === 0 ? 'btn-primary' : 'btn-secondary'} !py-3`}
                >
                  {tour.btn ? tour.btn : 'Get Tickets'}
                  {i === 0 && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
