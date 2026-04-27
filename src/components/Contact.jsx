import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiPhone, FiMessageCircle, FiSend } from 'react-icons/fi';

const contacts = [
  {
    icon: <FiPhone size={24} />,
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
    icon: <FiMessageCircle size={24} />,
    title: 'WhatsApp',
    lines: [
      '+1 (000) 000-0000',
      'Chat with us directly on WhatsApp',
    ],
    btn: 'Open WhatsApp',
    action: 'https://wa.me/10000000000',
  },
  {
    icon: <FiSend size={24} />,
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
    <section id="contact" className="py-16 md:py-24" style={{ background: '#FDF6F0' }} ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-[11px] tracking-[4px] uppercase mb-3" style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-dark" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            We're Here for <span className="italic gold-text">You</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {contacts.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="rounded-xl p-6 md:p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                background: 'rgba(253,246,240,0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(201,169,110,0.2)',
              }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.12)', color: '#C9A96E' }}>
                {c.icon}
              </div>
              <h3 className="text-lg font-light text-dark mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                {c.title}
              </h3>
              {c.lines.map((line, j) => (
                <p key={j} className="text-xs text-muted mb-1" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  {line}
                </p>
              ))}
              <a
                href={c.action}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2.5 rounded-sm text-[10px] tracking-[2px] uppercase transition-all duration-300 hover:shadow-md"
                style={{ border: '1px solid rgba(201,169,110,0.4)', color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
              >
                {c.btn}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
    </section>
  );
}
