import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const tiers = [
  {
    name: 'Sunshine Member',
    price: '$25',
    description: 'The perfect starting point for admirers.',
    features: [
      'Meet Reese Witherspoon in person',
      'Personal photo session',
      'Free customized polo shirt & cap',
      'Merchandise delivered 3–7 days after payment',
    ],
    btn: 'Join Sunshine',
    featured: false,
  },
  {
    name: 'The Elite',
    price: '$70',
    description: 'Enhanced access and exclusive perks.',
    badge: 'MOST POPULAR',
    features: [
      'All Sunshine perks',
      'Photo & video access',
      'Exclusive after-party access',
      'Award presentation',
      'Invites to Virtual Q&As',
    ],
    btn: 'Become Elite',
    featured: true,
  },
  {
    name: 'Southern Belle VIP',
    price: '$150',
    description: 'The ultimate, intimate Room of 55 experience.',
    features: [
      'All Elite perks',
      '20-min private 1-on-1 session',
      'Autographed memoir & merchandise',
      'Investment networking access',
      'Lifetime community membership',
    ],
    btn: 'Claim VIP Status',
    featured: false,
  },
];

export default function Tickets() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tickets" className="py-20 md:py-32 relative bg-surface-dim" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-semibold text-primary mb-4"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            Choose Your <span className="italic text-secondary">Experience</span>
          </h2>
          <p
            className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Step into a world of exclusive gatherings and unforgettable moments. Choose the tier that fits your journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12 }}
              className={`relative bg-white rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                tier.featured
                  ? 'border border-primary shadow-xl md:-translate-y-4 z-10'
                  : 'border border-outline-variant shadow-sm hover:shadow-md'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 inset-x-0 flex justify-center">
                  <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-6 mt-2">
                <h3
                  className="text-xl md:text-2xl font-semibold text-primary mb-2"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {tier.name}
                </h3>
                <p
                  className="text-sm text-on-surface-variant min-h-[40px]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {tier.description}
                </p>
              </div>

              <div className="mb-8 pb-8 border-b border-outline-variant">
                <span
                  className="text-4xl md:text-5xl font-semibold text-primary tracking-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {tier.price}
                </span>
                <span className="text-on-surface-variant ml-1 font-medium">/ticket</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span
                      className="text-sm text-on-surface-variant leading-snug"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-full text-[13px] font-semibold tracking-wide transition-all ${
                  tier.featured
                    ? 'bg-primary text-white hover:bg-black/80 shadow-md'
                    : 'bg-transparent text-primary border border-primary hover:bg-surface-dim'
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {tier.btn}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
