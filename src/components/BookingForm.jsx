import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IMAGES } from '../constants/images';

const PORTRAIT = IMAGES.hero;

const statesData = {
  California: ['Los Angeles', 'Beverly Hills', 'San Diego', 'San Francisco', 'Malibu'],
  'New York': ['Manhattan', 'Brooklyn', 'The Hamptons', 'Buffalo', 'Harlem'],
  Florida: ['Miami', 'Orlando', 'Tampa', 'Fort Lauderdale', 'Jacksonville'],
  Texas: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],
  Nevada: ['Las Vegas', 'Henderson', 'Reno', 'Lake Tahoe', 'Carson City'],
};

export default function BookingForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({
    name: '', email: '', phone: '', state: '', city: '',
    tier: '', guests: '1', payment: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { city: '' } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClasses = "px-5 py-3.5 rounded-xl text-sm text-on-surface placeholder-outline focus:outline-none border border-primary/20 bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary-container transition-all";

  return (
    <section id="booking" className="py-16 md:py-24 relative bg-surface" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative">
        {/* Portrait inset */}
        <div className="hidden md:block absolute -top-4 right-8 w-24 h-24 rounded-full overflow-hidden border-2 border-white/60 shadow-lg glow-pink">
          <img src={PORTRAIT} alt="Reese" className="w-full h-full object-cover" style={{ filter: 'sepia(10%) brightness(105%)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="chip chip-gold uppercase tracking-widest text-[12px] mb-4 inline-block">
            Reserve Your Spot
          </span>
          <h2
            className="text-3xl md:text-5xl font-semibold text-primary"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            Book Your Personal <span className="italic text-pink-600">Meet & Greet</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-panel rounded-3xl p-8 md:p-10"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required
              className={inputClasses}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required
              className={inputClasses}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required
              className={inputClasses}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
            <select name="state" value={form.state} onChange={handleChange} required
              className={inputClasses}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <option value="">Select State</option>
              {Object.keys(statesData).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select name="city" value={form.city} onChange={handleChange} required disabled={!form.state}
              className={`${inputClasses} disabled:opacity-50`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <option value="">Select City</option>
              {form.state && statesData[form.state]?.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select name="tier" value={form.tier} onChange={handleChange} required
              className={inputClasses}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <option value="">Ticket Tier</option>
              <option value="sunshine">Sunshine — $25</option>
              <option value="elite">Elite — $70</option>
              <option value="vip">Southern Belle VIP — $150</option>
            </select>
            <select name="guests" value={form.guests} onChange={handleChange}
              className={inputClasses}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
            </select>
            <select name="payment" value={form.payment} onChange={handleChange} required
              className={inputClasses}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <option value="">Payment Method</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="wire">Wire Transfer</option>
            </select>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message (optional)" rows={3}
              className={`md:col-span-2 resize-none ${inputClasses}`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full btn-primary !rounded-xl !py-4"
              >
                {submitted ? '✓ Request Sent!' : 'Request My Booking'}
              </button>
            </div>
          </div>
        </motion.form>

        <p className="text-center mt-6 text-sm text-on-surface-variant" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          All bookings are confirmed manually within 24 hours.
        </p>
      </div>
    </section>
  );
}
