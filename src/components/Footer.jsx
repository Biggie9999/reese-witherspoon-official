import { Link } from 'react-scroll';
import { FaInstagram, FaXTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa6';

import { IMAGES } from '../constants/images';

const PORTRAIT = IMAGES.hero;

const columns = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', to: 'hero' },
      { label: 'About', to: 'about' },
      { label: 'Room of 55', to: 'room55' },
      { label: 'Book Now', to: 'booking' },
    ],
  },
  {
    title: 'Tour',
    links: [
      { label: 'Tour Dates', to: 'tour' },
      { label: 'Tickets', to: 'tickets' },
      { label: 'Investments', to: 'invest' },
      { label: 'Sponsors', to: 'sponsors' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', to: 'contact' },
      { label: 'FAQ', to: 'contact' },
      { label: 'Terms', to: 'contact' },
      { label: 'Privacy', to: 'contact' },
    ],
  },
];

const socials = [
  { icon: <FaInstagram />, href: '#' },
  { icon: <FaXTwitter />, href: '#' },
  { icon: <FaFacebookF />, href: '#' },
  { icon: <FaYoutube />, href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 overflow-hidden" style={{ background: '#1C0E0E' }}>
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />

      {/* Faint portrait bg */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: `url(${PORTRAIT})` }}
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        {/* Logo + Tagline */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-3xl font-light text-white tracking-[4px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            REESE WITHERSPOON
          </h2>
          <p className="text-[10px] tracking-[4px] uppercase mt-1" style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif" }}>
            Official
          </p>
          <p
            className="mt-4 text-sm italic text-cream/40"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "Where Icons Meet Their People"
          </p>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map(col => (
            <div key={col.title}>
              <h4
                className="text-[11px] tracking-[3px] uppercase mb-4"
                style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      smooth
                      duration={800}
                      className="text-sm text-cream/40 hover:text-gold cursor-pointer transition-colors duration-300"
                      style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Column */}
          <div>
            <h4
              className="text-[11px] tracking-[3px] uppercase mb-4"
              style={{ color: '#C9A96E', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Social
            </h4>
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-cream/40 hover:text-gold transition-all duration-300 hover:scale-110"
                  style={{ border: '1px solid rgba(201,169,110,0.2)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] mb-6" style={{ background: 'rgba(201,169,110,0.15)' }} />

        {/* Copyright */}
        <div className="text-center space-y-2">
          <p className="text-xs text-cream/30" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            © 2026 Reese Witherspoon Official. All rights reserved.
          </p>
          <p className="text-[10px] text-cream/20" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            Official tour management platform. All experiences curated by AKA Management.
          </p>
        </div>
      </div>
    </footer>
  );
}
