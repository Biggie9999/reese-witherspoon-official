import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const tourData = [
  {
    emoji: '🌴', state: 'California', month: 'June 2026', color: '#F2D8DC',
    cities: ['Los Angeles', 'Beverly Hills', 'San Diego', 'San Francisco', 'Malibu'],
  },
  {
    emoji: '🗽', state: 'New York', month: 'June 2026', color: '#F2D8DC',
    cities: ['Manhattan', 'Brooklyn', 'The Hamptons', 'Buffalo', 'Harlem'],
  },
  {
    emoji: '🌊', state: 'Florida', month: 'July 2026', color: '#E8A0AC',
    cities: ['Miami', 'Orlando', 'Tampa', 'Fort Lauderdale', 'Jacksonville'],
  },
  {
    emoji: '⭐', state: 'Texas', month: 'July 2026', color: '#E8A0AC',
    cities: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],
  },
  {
    emoji: '🎰', state: 'Nevada', month: 'August 2026', color: '#C9A96E',
    cities: ['Las Vegas', 'Henderson', 'Reno', 'Lake Tahoe', 'Carson City'],
  },
];

export default function Tour() {
  const [expanded, setExpanded] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tour" className="py-16 md:py-24 relative" style={{ background: '#F2D8DC' }} ref={ref}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23C9A96E\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="relative max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="text-[11px] tracking-[4px] uppercase mb-3" style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            2026 National Tour
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-dark mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            The Room Is Coming to <span className="italic gold-text">Your City</span>
          </h2>
          <p className="text-sm text-muted" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            5 States · 5 Cities Each · 4 Months Only
          </p>
        </motion.div>

        <div className="space-y-3">
          {tourData.map((tour, i) => (
            <motion.div
              key={tour.state}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
              style={{ background: 'rgba(253,246,240,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(201,169,110,0.15)' }}
            >
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-2xl md:text-3xl">{tour.emoji}</span>
                  <div>
                    <h3 className="text-lg md:text-xl font-light text-dark" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {tour.state}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="text-[10px] tracking-[2px] uppercase px-2 py-0.5 rounded-full"
                        style={{ background: tour.color, fontFamily: "'Jost', sans-serif", fontWeight: 500, color: '#1C0E0E' }}
                      >
                        {tour.month}
                      </span>
                      <span className="text-[10px] tracking-[2px] uppercase text-gold" style={{ fontFamily: "'Jost', sans-serif" }}>
                        Limited to 55 Seats
                      </span>
                    </div>
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: expanded === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gold text-lg"
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 pb-5 border-t" style={{ borderColor: 'rgba(201,169,110,0.15)' }}>
                      <div className="flex flex-wrap gap-2 mt-4 mb-4">
                        {tour.cities.map(city => (
                          <span
                            key={city}
                            className="px-3 py-1.5 text-xs rounded-full text-dark"
                            style={{ background: 'rgba(201,169,110,0.15)', fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                      <button
                        className="text-[11px] tracking-[2px] uppercase px-5 py-2 rounded-sm transition-all duration-300 hover:shadow-md"
                        style={{ background: '#C9A96E', color: '#1C0E0E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
                      >
                        Notify Me for This City
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
    </section>
  );
}
