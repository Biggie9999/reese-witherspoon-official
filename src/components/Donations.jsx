import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IMAGES } from '../constants/images';

const HERO_IMG = IMAGES.gallery4;
const amounts = [5, 10, 25, 50];

export default function Donations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState(null);
  const [custom, setCustom] = useState('');
  const [payment, setPayment] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="donations" className="py-16 md:py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-surface" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        {/* Hero Glass Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="relative rounded-[2rem] overflow-hidden mb-16 h-[480px] min-h-[420px] flex items-center justify-center glass-panel"
        >
          <img
            src={HERO_IMG}
            alt="Philanthropy"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-white/40 to-transparent" />
          <div className="relative z-10 text-center max-w-3xl px-6">
            <h2
              className="text-4xl md:text-5xl font-semibold text-primary mb-6 text-glow"
              style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
            >
              The Giving Heart
            </h2>
            <p
              className="text-lg text-on-surface-variant mb-8 px-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Empowering women, educating children, and building stronger communities through compassionate action.
            </p>
            <button
              className="btn-primary inline-flex items-center gap-2"
              onClick={() => document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              Make a Donation
            </button>
          </div>
        </motion.section>

        {/* Impact Bento Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h3
            className="text-3xl font-medium text-primary text-center mb-12"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            Our Impact
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Card */}
            <div className="md:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full blur-3xl opacity-50 -mr-20 -mt-20 transition-transform group-hover:scale-110" />
              <h4 className="text-2xl font-medium text-primary mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>
                $5.2M+
              </h4>
              <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.05em' }}>
                Funds Raised Globally
              </p>
              <p className="text-on-surface" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Supporting initiatives for early childhood education and women's entrepreneurial grants across 12 countries.
              </p>
              <div className="mt-6 flex gap-2">
                <span className="chip chip-gold text-[12px]">Education</span>
                <span className="chip chip-pink text-[12px]">Empowerment</span>
              </div>
            </div>

            {/* Small Card — Lives Touched */}
            <div className="glass-panel rounded-3xl p-8 flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-[48px] text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
              <h4 className="text-2xl font-medium text-primary mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>250k+</h4>
              <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.05em' }}>
                Lives Touched
              </p>
            </div>

            {/* Small Card — Partner Charities */}
            <div className="glass-panel rounded-3xl p-8 flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-[48px] text-tertiary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
              <h4 className="text-2xl font-medium text-primary mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>14</h4>
              <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.05em' }}>
                Active Partner Charities
              </p>
            </div>

            {/* Wide Card — Donation Form */}
            <div id="donation-form" className="md:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden">
              <h4 className="text-2xl font-medium text-primary mb-6" style={{ fontFamily: "'Noto Serif', serif" }}>
                Send Reese Some Love 🌸
              </h4>
              <p
                className="text-on-surface-variant mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Your support means the world. Every contribution helps bring the Room of 55 experience to more cities and more dreamers.
              </p>

              {/* Amount buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {amounts.map(amt => (
                  <button
                    key={amt}
                    onClick={() => { setSelected(amt); setCustom(''); }}
                    className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                      selected === amt
                        ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                        : 'border border-primary/30 text-primary hover:bg-primary/5'
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    ${amt}
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="Custom"
                  value={custom}
                  onChange={e => { setCustom(e.target.value); setSelected(null); }}
                  className="px-4 py-2.5 w-24 rounded-full text-[13px] text-center text-on-surface placeholder-outline focus:outline-none border border-primary/30 bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary-container transition-all"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />
              </div>

              <select
                value={payment}
                onChange={e => setPayment(e.target.value)}
                className="w-full max-w-xs block px-5 py-3 rounded-xl text-sm text-on-surface mb-6 focus:outline-none border border-primary/30 bg-white/50 backdrop-blur-sm"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <option value="">Payment Method</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="wire">Wire Transfer</option>
              </select>

              <button
                onClick={handleSend}
                className="btn-primary inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                {sent ? 'Love Sent! 💕' : 'Send My Love'}
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
