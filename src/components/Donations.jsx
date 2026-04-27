import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { IMAGES } from '../constants/images';

const PORTRAIT = IMAGES.hero;
const amounts = [5, 10, 25, 50];

// Rose petal SVG component
function RosePetal({ style }) {
  return (
    <svg viewBox="0 0 24 24" className="absolute w-4 h-4 md:w-6 md:h-6 opacity-30 pointer-events-none" style={style}>
      <path d="M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z" fill="#E8A0AC" />
    </svg>
  );
}

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
    <section id="donations" className="py-16 md:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F2D8DC, #FDF6F0)' }} ref={ref}>
      {/* Floating petals */}
      {[...Array(6)].map((_, i) => (
        <RosePetal
          key={i}
          style={{
            top: `${-5 + Math.random() * 10}%`,
            left: `${5 + Math.random() * 90}%`,
            animation: `petalDrift ${8 + Math.random() * 6}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <div className="relative max-w-xl mx-auto px-4 md:px-8 text-center">
        {/* Portrait circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          className="w-20 h-20 rounded-full mx-auto mb-6 overflow-hidden border-2 shadow-lg"
          style={{ borderColor: '#C9A96E' }}
        >
          <img src={PORTRAIT} alt="Reese" className="w-full h-full object-cover" style={{ filter: 'sepia(10%) brightness(105%)' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-[11px] tracking-[4px] uppercase mb-3"
          style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
        >
          Show Your Love
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-light text-dark mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Send Reese Some Love 🌸
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted mb-8"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
        >
          Your support means the world. Every contribution helps bring the Room of 55 experience to more cities and more dreamers.
        </motion.p>

        {/* Amount buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {amounts.map(amt => (
            <button
              key={amt}
              onClick={() => { setSelected(amt); setCustom(''); }}
              className="px-5 py-2.5 rounded-full text-sm transition-all duration-300"
              style={{
                background: selected === amt ? '#C9A96E' : 'rgba(201,169,110,0.12)',
                color: selected === amt ? '#1C0E0E' : '#7A5C5C',
                fontFamily: "'Jost', sans-serif",
                fontWeight: selected === amt ? 500 : 400,
                border: '1px solid rgba(201,169,110,0.25)',
              }}
            >
              ${amt}
            </button>
          ))}
          <input
            type="number"
            placeholder="Custom"
            value={custom}
            onChange={e => { setCustom(e.target.value); setSelected(null); }}
            className="px-4 py-2 w-24 rounded-full text-sm text-center text-dark placeholder-muted/50 focus:outline-none"
            style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.25)', fontFamily: "'Jost', sans-serif" }}
          />
        </div>

        <select
          value={payment}
          onChange={e => setPayment(e.target.value)}
          className="w-full max-w-xs mx-auto block px-4 py-2.5 rounded-lg text-sm text-dark mb-4 focus:outline-none"
          style={{ background: 'rgba(253,246,240,0.6)', border: '1px solid rgba(201,169,110,0.25)', fontFamily: "'Jost', sans-serif" }}
        >
          <option value="">Payment Method</option>
          <option value="crypto">Cryptocurrency</option>
          <option value="wire">Wire Transfer</option>
        </select>

        <button
          onClick={handleSend}
          className="px-10 py-3 rounded-sm text-[11px] tracking-[3px] uppercase transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
          style={{ background: '#1C0E0E', color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
        >
          {sent ? '💕 Love Sent!' : 'Send My Love'}
        </button>
      </div>

      <div className="mt-16 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
    </section>
  );
}
