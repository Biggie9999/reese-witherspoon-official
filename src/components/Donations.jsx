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
    <section id="donations" className="py-16 md:py-24 relative overflow-hidden bg-surface" ref={ref}>
      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Hero Glass Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="relative rounded-[2.5rem] overflow-hidden mb-16 h-[500px] flex items-center justify-center shadow-lg border border-white/40"
        >
          <img
            src={HERO_IMG}
            alt="Philanthropy"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'sepia(10%) brightness(105%) contrast(105%)' }}
          />
          <div className="absolute inset-0 bg-[#26181B]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#26181B]/90 via-transparent to-transparent" />
          
          <div className="relative z-10 text-center max-w-3xl px-6 mt-32">
            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white mb-6 drop-shadow-md"
              style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
            >
              The Giving Heart
            </h2>
            <p
              className="text-base md:text-lg text-white/90 font-medium mb-8 max-w-xl mx-auto drop-shadow-md"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Empowering women, educating children, and building stronger communities through compassionate action.
            </p>
            <button
              className="btn-primary inline-flex items-center gap-2 shadow-2xl !bg-white !text-primary hover:!bg-pink-50"
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
        >
          <div className="text-center mb-12">
            <span className="chip chip-gold uppercase tracking-widest text-[11px] mb-4 inline-block font-semibold">
              Our Impact
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Large Card */}
            <div className="md:col-span-2 glass-panel rounded-[28px] p-8 md:p-12 relative overflow-hidden group border border-white/50 bg-white/40">
              <div className="absolute top-0 right-0 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-110 pointer-events-none" />
              <h4 className="text-4xl md:text-5xl font-semibold text-primary mb-3" style={{ fontFamily: "'Noto Serif', serif" }}>
                $5.2M+
              </h4>
              <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Funds Raised Globally
              </p>
              <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-lg mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Supporting initiatives for early childhood education and women's entrepreneurial grants across 12 countries.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="chip chip-gold text-[12px] shadow-sm bg-white/80">Education</span>
                <span className="chip chip-pink text-[12px] shadow-sm bg-white/80">Empowerment</span>
              </div>
            </div>

            {/* Small Stat Cards Container */}
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              <div className="glass-panel rounded-[28px] p-8 flex flex-col justify-center text-center border border-white/50 bg-white/40 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[24px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                </div>
                <h4 className="text-3xl font-semibold text-primary mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>250k+</h4>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Lives Touched
                </p>
              </div>

              <div className="glass-panel rounded-[28px] p-8 flex flex-col justify-center text-center border border-white/50 bg-white/40 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[24px] text-pink-600" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
                </div>
                <h4 className="text-3xl font-semibold text-primary mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>14</h4>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Partner Charities
                </p>
              </div>
            </div>

            {/* Wide Card — Donation Form */}
            <div id="donation-form" className="md:col-span-3 glass-panel rounded-[28px] p-8 md:p-12 relative overflow-hidden border border-white/60 shadow-[0_12px_48px_0_rgba(242,216,220,0.4)] mt-4 bg-white/60 backdrop-blur-xl">
              <div className="max-w-2xl mx-auto text-center">
                <h4 className="text-3xl md:text-4xl font-semibold text-primary mb-4" style={{ fontFamily: "'Noto Serif', serif" }}>
                  Send Reese Some Love <span className="text-3xl">🌸</span>
                </h4>
                <p
                  className="text-base text-on-surface-variant mb-10"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Your support means the world. Every contribution helps bring the Room of 55 experience to more cities and more dreamers.
                </p>

                {/* Amount buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {amounts.map(amt => (
                    <button
                      key={amt}
                      onClick={() => { setSelected(amt); setCustom(''); }}
                      className={`py-4 rounded-2xl text-base font-bold transition-all duration-300 ${
                        selected === amt
                          ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-[1.02]'
                          : 'border border-primary/20 text-primary hover:bg-white hover:border-primary/40 bg-white/50 backdrop-blur-sm shadow-sm'
                      }`}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <input
                    type="number"
                    placeholder="Custom Amount ($)"
                    value={custom}
                    onChange={e => { setCustom(e.target.value); setSelected(null); }}
                    className="w-full px-6 py-4 rounded-2xl text-base text-on-surface placeholder-outline focus:outline-none border border-primary/20 bg-white/80 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary-container transition-all shadow-sm"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  />
                  
                  <div className="relative">
                    <select
                      value={payment}
                      onChange={e => setPayment(e.target.value)}
                      className="w-full appearance-none px-6 py-4 rounded-2xl text-base text-on-surface focus:outline-none border border-primary/20 bg-white/80 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary-container transition-all shadow-sm"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      <option value="" disabled>Select Payment Method</option>
                      <option value="wire">Wire Transfer</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-primary/50 text-[24px]">expand_more</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSend}
                  className="btn-primary w-full !py-4 md:!py-5 !text-base shadow-xl flex items-center justify-center gap-2 hover:shadow-2xl !rounded-2xl"
                >
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  {sent ? 'Love Sent! 💕' : 'Send My Love'}
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
