import { Link } from 'react-scroll';
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

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 overflow-hidden bg-inverse-surface">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Faint portrait bg */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.05] pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: `url(${PORTRAIT})` }}
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        {/* Logo + Tagline */}
        <div className="text-center mb-16">
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tighter text-white"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            REESE WITHERSPOON
          </h2>
          <p
            className="text-[10px] tracking-[4px] uppercase mt-2 text-white/50 font-semibold"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Official
          </p>
          <p
            className="mt-6 text-sm italic text-white/70 font-medium"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            "Where Icons Meet Their People"
          </p>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map(col => (
            <div key={col.title}>
              <h4
                className="text-[11px] tracking-widest uppercase mb-6 text-white/50 font-semibold"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      smooth
                      duration={800}
                      className="text-sm text-white/80 hover:text-white cursor-pointer transition-colors duration-300"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Column using Material Icons instead of React Icons */}
          <div>
            <h4
              className="text-[11px] tracking-widest uppercase mb-6 text-white/50 font-semibold"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Social
            </h4>
            <div className="flex gap-4">
              {['photo_camera', 'alternate_email', 'thumb_up', 'play_arrow'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 border border-white/20 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105"
                >
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] mb-8 bg-white/10" />

        {/* Copyright */}
        <div className="text-center space-y-3">
          <p className="text-xs text-white/40" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            © 2026 Reese Witherspoon Official. All rights reserved.
          </p>
          <p className="text-[10px] text-white/30" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Official tour management platform. All experiences curated by AKA Management.
          </p>
        </div>
      </div>
    </footer>
  );
}
