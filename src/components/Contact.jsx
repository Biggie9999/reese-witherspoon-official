import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const contacts = [
  {
    icon: 'call',
    title: 'Customer Support',
    lines: [
      'Phone: +1 (000) 000-0000',
      'Email: support@reesewitherspoonofficial.com',
      'Hours: Mon–Sat, 9am–7pm EST',
    ],
    btn: 'Contact Support',
    action: '#',
  },
  {
    icon: 'chat',
    title: 'WhatsApp',
    lines: [
      '+1 (000) 000-0000',
      'Chat with us directly on WhatsApp',
    ],
    btn: 'Open WhatsApp',
    action: 'https://wa.me/10000000000',
  },
  {
    icon: 'send',
    title: 'Telegram',
    lines: [
      '@ReeseTourOfficial',
      'Join our official Telegram for updates',
    ],
    btn: 'Join Telegram',
    action: 'https://t.me/ReeseTourOfficial',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-16 md:py-24 bg-surface" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="chip chip-pink uppercase tracking-widest text-[11px] mb-4 inline-block font-semibold">
            Get in Touch
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            We're Here for <span className="italic text-pink-600">You</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {contacts.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-panel rounded-[28px] p-6 md:p-8 flex flex-col transition-all duration-300 hover:shadow-[0_12px_48px_0_rgba(242,216,220,0.5)] hover:-translate-y-1 bg-white/40"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shrink-0 border border-primary/10 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-[24px]">{c.icon}</span>
                </div>
                <h3
                  className="text-xl md:text-2xl font-medium text-primary leading-tight"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {c.title}
                </h3>
              </div>
              <div className="flex-grow space-y-2 mb-8">
                {c.lines.map((line, j) => (
                  <p key={j} className="text-sm md:text-base text-on-surface-variant" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {line}
                  </p>
                ))}
              </div>
              <a
                href={c.action}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center mt-auto shadow-sm !py-3.5 bg-white/50"
              >
                {c.btn}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
