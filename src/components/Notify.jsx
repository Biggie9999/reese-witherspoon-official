import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Notify() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-16 md:py-24" style={{ background: '#F2D8DC' }} ref={ref}>
      <div className="max-w-xl mx-auto px-4 md:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-light text-dark mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          New Tour Dates Drop <span className="italic gold-text">Regularly</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted mb-8"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
        >
          Be the first to know when your city is announced.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg text-sm text-dark placeholder-muted/50 focus:outline-none"
            style={{ background: 'rgba(253,246,240,0.7)', border: '1px solid rgba(201,169,110,0.25)', fontFamily: "'Jost', sans-serif" }}
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-sm text-[11px] tracking-[2px] uppercase transition-all duration-300 hover:shadow-lg"
            style={{ background: '#C9A96E', color: '#1C0E0E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
          >
            {submitted ? '✓ Subscribed!' : 'Notify Me'}
          </button>
        </motion.form>

        <p className="text-xs text-muted/60" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          No spam. Just Reese.
        </p>
      </div>

      <div className="mt-16 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
    </section>
  );
}
