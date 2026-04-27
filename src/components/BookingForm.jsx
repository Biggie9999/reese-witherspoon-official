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

  const inputStyle = {
    fontFamily: "'Jost', sans-serif",
    fontWeight: 300,
    background: 'rgba(253,246,240,0.6)',
    border: '1px solid rgba(201,169,110,0.25)',
  };

  return (
    <section id="booking" className="py-16 md:py-24 relative" style={{ background: '#FDF6F0' }} ref={ref}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative">
        {/* Portrait inset */}
        <div className="hidden md:block absolute -top-4 right-8 w-24 h-24 rounded-full overflow-hidden border-2 border-gold/40 shadow-lg">
          <img src={PORTRAIT} alt="Reese" className="w-full h-full object-cover" style={{ filter: 'sepia(10%) brightness(105%)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <p className="text-[11px] tracking-[4px] uppercase mb-3" style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            Reserve Your Spot
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-dark" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Book Your Personal <span className="italic gold-text">Meet & Greet</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required
            className="px-4 py-3 rounded-lg text-sm text-dark placeholder-muted/60 focus:outline-none focus:border-gold/60 transition-colors"
            style={inputStyle} />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required
            className="px-4 py-3 rounded-lg text-sm text-dark placeholder-muted/60 focus:outline-none focus:border-gold/60 transition-colors"
            style={inputStyle} />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required
            className="px-4 py-3 rounded-lg text-sm text-dark placeholder-muted/60 focus:outline-none focus:border-gold/60 transition-colors"
            style={inputStyle} />
          <select name="state" value={form.state} onChange={handleChange} required
            className="px-4 py-3 rounded-lg text-sm text-dark focus:outline-none focus:border-gold/60 transition-colors"
            style={inputStyle}>
            <option value="">Select State</option>
            {Object.keys(statesData).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select name="city" value={form.city} onChange={handleChange} required disabled={!form.state}
            className="px-4 py-3 rounded-lg text-sm text-dark focus:outline-none focus:border-gold/60 transition-colors disabled:opacity-50"
            style={inputStyle}>
            <option value="">Select City</option>
            {form.state && statesData[form.state]?.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select name="tier" value={form.tier} onChange={handleChange} required
            className="px-4 py-3 rounded-lg text-sm text-dark focus:outline-none focus:border-gold/60 transition-colors"
            style={inputStyle}>
            <option value="">Ticket Tier</option>
            <option value="regular">Regular — $25–$50</option>
            <option value="vip">VIP — $70–$100</option>
            <option value="vvip">VVIP — $150–$200</option>
          </select>
          <select name="guests" value={form.guests} onChange={handleChange}
            className="px-4 py-3 rounded-lg text-sm text-dark focus:outline-none focus:border-gold/60 transition-colors"
            style={inputStyle}>
            {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
          </select>
          <select name="payment" value={form.payment} onChange={handleChange} required
            className="px-4 py-3 rounded-lg text-sm text-dark focus:outline-none focus:border-gold/60 transition-colors"
            style={inputStyle}>
            <option value="">Payment Method</option>
            <option value="crypto">Cryptocurrency</option>
            <option value="wire">Wire Transfer</option>
          </select>
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message (optional)" rows={3}
            className="md:col-span-2 px-4 py-3 rounded-lg text-sm text-dark placeholder-muted/60 focus:outline-none focus:border-gold/60 transition-colors resize-none"
            style={inputStyle} />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-sm text-[11px] tracking-[3px] uppercase transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
              style={{ background: '#1C0E0E', color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              {submitted ? '✓ Request Sent!' : 'Request My Booking'}
            </button>
          </div>
        </motion.form>

        <p className="text-center mt-6 text-xs text-muted" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          All bookings are confirmed manually within 24 hours.
        </p>
      </div>

      <div className="mt-16 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
    </section>
  );
}
