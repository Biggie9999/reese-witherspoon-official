import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { IMAGES } from '../constants/images';

const TICKET_BG = IMAGES.portrait3;

const tiers = [
  {
    name: 'Regular',
    price: '$25 – $50',
    featured: false,
    perks: [
      'Meet Reese Witherspoon in person',
      'Personal photo session',
      'Free customized polo shirt & cap',
      'Merchandise delivered 3–7 days after payment',
    ],
    btn: 'Book Regular',
  },
  {
    name: 'VIP',
    price: '$70 – $100',
    featured: true,
    badge: 'Most Popular',
    perks: [
      'Meet Reese Witherspoon in person',
      'Photo & video access',
      'Free customized polo shirt & cap',
      'Exclusive after-party access',
      'Award presentation',
    ],
    btn: 'Book VIP',
  },
  {
    name: 'VVIP',
    price: '$150 – $200',
    featured: false,
    perks: [
      'Meet Reese Witherspoon in person',
      'Photo & video access',
      'Free customized polo shirt & cap',
      'Exclusive after-party access',
      'Award presentation',
      "Reese's private contact details",
      'Unlimited call/video chat with Reese post-event',
    ],
    btn: 'Book VVIP',
  },
];

export default function Tickets() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tickets" className="relative py-20 md:py-28" ref={ref}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${TICKET_BG})`,
          filter: 'sepia(10%) brightness(105%) contrast(105%)',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(28,14,14,0.78)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-[11px] tracking-[4px] uppercase mb-3" style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            Secure Your Seat
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Choose Your Room of 55 <span className="italic gold-text">Experience</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12 }}
              className={`relative rounded-xl p-6 md:p-8 transition-all duration-400 hover:-translate-y-2 ${
                tier.featured ? 'hover:shadow-2xl hover:shadow-gold/20' : 'hover:shadow-xl hover:shadow-gold/10'
              }`}
              style={{
                background: 'rgba(253,246,240,0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: tier.featured ? '2px solid rgba(201,169,110,0.6)' : '1px solid rgba(201,169,110,0.15)',
                boxShadow: tier.featured ? '0 0 30px rgba(201,169,110,0.15)' : 'none',
              }}
            >
              {tier.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] tracking-[2px] uppercase"
                  style={{ background: '#C9A96E', color: '#1C0E0E', fontFamily: "'Jost', sans-serif", fontWeight: 600 }}
                >
                  {tier.badge}
                </div>
              )}

              <h3
                className="text-2xl md:text-3xl font-light text-white mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {tier.name}
              </h3>
              <p className="text-xl gold-text mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                {tier.price}
              </p>

              <ul className="space-y-3 mb-8">
                {tier.perks.map((perk, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-cream/80" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                    <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-sm text-[11px] tracking-[2px] uppercase transition-all duration-300 hover:shadow-lg"
                style={{
                  background: tier.featured ? '#C9A96E' : 'transparent',
                  color: tier.featured ? '#1C0E0E' : '#C9A96E',
                  border: tier.featured ? 'none' : '1px solid rgba(201,169,110,0.4)',
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 500,
                }}
              >
                {tier.btn}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10 text-sm text-cream/60"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
        >
          We accept Cryptocurrency & Wire Transfer. Payment details sent upon booking confirmation.
        </motion.p>
      </div>
    </section>
  );
}
