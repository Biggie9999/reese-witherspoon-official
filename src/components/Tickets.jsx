import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const tiers = [
  {
    name: 'Sunshine Member',
    price: '$25',
    period: '/ticket',
    featured: false,
    description: 'The perfect starting point for admirers.',
    perks: [
      'Meet Reese Witherspoon in person',
      'Personal photo session',
      'Free customized polo shirt & cap',
      'Merchandise delivered 3–7 days after payment',
    ],
    btn: 'Join Sunshine',
  },
  {
    name: 'The Elite',
    price: '$70',
    period: '/ticket',
    featured: true,
    badge: 'Most Popular',
    description: 'Enhanced access and exclusive perks.',
    perks: [
      'All Sunshine perks',
      'Photo & video access',
      'Exclusive after-party access',
      'Award presentation',
      'Invites to Virtual Q&As',
    ],
    btn: 'Become Elite',
  },
  {
    name: 'Southern Belle VIP',
    price: '$150',
    period: '/ticket',
    featured: false,
    description: 'The ultimate, intimate Room of 55 experience.',
    perks: [
      'All Elite perks',
      'Signed merchandise & exclusive merch box',
      'Intimate Virtual Meet & Greets',
      'VIP Access at Live Events',
      "Reese's private contact details",
      'Unlimited call/video chat with Reese post-event',
    ],
    btn: 'Join VIP',
  },
];

export default function Tickets() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tickets" className="relative py-20 md:py-28 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-container/20 via-surface to-surface" />

      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-container/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary-container/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="chip chip-gold uppercase tracking-widest text-[12px] mb-4 inline-block">
            Exclusive Access
          </span>
          <h2
            className="text-4xl md:text-5xl font-semibold text-primary mb-4"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            Choose Your <span className="italic gold-text">Experience</span>
          </h2>
          <p
            className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Step into a world of exclusive gatherings and unforgettable moments. Choose the tier that fits your journey.
          </p>
        </motion.div>

        {/* Tier Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12 }}
              className={`glass-card rounded-3xl p-8 flex flex-col relative overflow-hidden transition-all duration-500 ${
                tier.featured
                  ? 'glow-pink md:-translate-y-4 border-white/60'
                  : 'group hover:-translate-y-2'
              }`}
            >
              {/* Decorative blur */}
              {tier.featured ? (
                <>
                  <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary-container via-secondary-container to-primary-container" />
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none" />
                </>
              ) : (
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10" />
              )}

              {/* Badge */}
              {tier.badge && (
                <span className="absolute top-6 right-6 bg-secondary text-on-secondary text-[10px] uppercase tracking-wider py-1 px-3 rounded-full font-semibold">
                  {tier.badge}
                </span>
              )}

              {/* Name & Description */}
              <div className="mb-8">
                <h3
                  className={`text-2xl font-medium mb-2 ${tier.featured ? 'text-primary font-semibold' : 'text-tertiary'}`}
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {tier.name}
                </h3>
                <p
                  className="text-on-surface-variant min-h-[48px]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 flex items-baseline gap-2">
                <span
                  className={`${tier.featured ? 'text-5xl' : 'text-4xl'} font-semibold text-primary`}
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {tier.price}
                </span>
                <span className="text-outline" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {tier.period}
                </span>
              </div>

              {/* Perks */}
              <ul className="space-y-4 mb-10 flex-1">
                {tier.perks.map((perk, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span
                      className={`material-symbols-outlined mt-0.5 text-[20px] ${
                        tier.featured ? 'text-secondary' : 'text-tertiary'
                      }`}
                      style={tier.featured ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {tier.featured && j === 0 ? 'stars' : 'check_circle'}
                    </span>
                    <span
                      className="text-on-surface"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`w-full ${tier.featured ? 'btn-primary' : 'btn-secondary !w-full'} !py-3.5`}
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
          className="text-center mt-10 text-sm text-on-surface-variant"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          We accept Cryptocurrency & Wire Transfer. Payment details sent upon booking confirmation.
        </motion.p>
      </div>
    </section>
  );
}
