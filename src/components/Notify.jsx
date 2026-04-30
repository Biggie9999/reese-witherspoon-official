import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Notify() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://formsubmit.co/ajax/management@reesewitherspoontours.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _subject: "New Newsletter Subscriber",
        email: email
      })
    }).catch(console.error);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-16 md:py-24 bg-primary-container/40 relative overflow-hidden" ref={ref}>
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-container rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-xl mx-auto px-4 md:px-8 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-medium text-primary mb-3"
          style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
        >
          New Tour Dates Drop <span className="italic text-pink-600">Regularly</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="text-on-surface-variant mb-8"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
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
            className="flex-1 px-5 py-3 rounded-full text-sm text-on-surface placeholder-outline focus:outline-none border border-primary/20 bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary-container transition-all"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          />
          <button
            type="submit"
            className="btn-primary"
          >
            {submitted ? '✓ Subscribed!' : 'Notify Me'}
          </button>
        </motion.form>

        <p className="text-xs text-on-surface-variant" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          No spam. Just Reese.
        </p>
      </div>
    </section>
  );
}
