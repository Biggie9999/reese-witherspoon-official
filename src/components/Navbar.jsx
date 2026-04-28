import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../constants/images';

const navLinks = [
  { to: 'hero', label: 'Home' },
  { to: 'about', label: 'About' },
  { to: 'room55', label: 'Room of 55' },
  { to: 'tour', label: 'Tour' },
  { to: 'tickets', label: 'Tickets' },
  { to: 'invest', label: 'Invest' },
  { to: 'sponsors', label: 'Sponsors' },
  { to: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl shadow-[0_8px_32px_0_rgba(242,216,220,0.3)]'
            : 'bg-transparent'
        }`}
        style={scrolled ? {
          background: 'rgba(255, 255, 255, 0.3)',
          borderBottom: '1px solid rgba(255,255,255,0.4)',
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo — hot-pink bold serif like stitch */}
          <Link to="hero" smooth duration={800} className="cursor-pointer">
            <h2
              className={`text-xl md:text-2xl font-bold tracking-tighter transition-colors duration-300 ${
                scrolled ? 'text-pink-600' : 'text-white'
              }`}
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              REESE WITHERSPOON
            </h2>
            <p
              className={`text-[10px] tracking-[4px] font-semibold transition-colors duration-300 ${
                scrolled ? 'text-pink-400' : 'text-pink-200'
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              OFFICIAL
            </p>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={800}
                offset={-80}
                spy
                activeClass="!text-pink-600"
                className={`text-[13px] tracking-[1px] uppercase cursor-pointer transition-colors duration-300 hover:text-pink-600 ${
                  scrolled ? 'text-on-surface-variant' : 'text-white/90'
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Avatar + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="booking"
              smooth
              duration={800}
              className="hidden md:block btn-primary !py-2.5 !px-6 !text-[12px]"
            >
              Book Your Seat
            </Link>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/60 shadow-sm cursor-pointer hover:opacity-80 transition-opacity">
              <img
                src={IMAGES.hero}
                alt="Reese Witherspoon"
                className="w-full h-full object-cover"
              />
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden transition-colors p-2 rounded-full hover:bg-white/20 ${
                scrolled ? 'text-pink-600' : 'text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[28px]">menu</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu — blush glassmorphic drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex flex-col"
            style={{ background: 'rgba(255,248,242,0.95)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex justify-between items-center px-6 py-5">
              <h2
                className="text-xl font-bold text-pink-600"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                REESE WITHERSPOON
              </h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-pink-500 hover:text-pink-600 transition-colors p-2 rounded-full hover:bg-white/50"
              >
                <span className="material-symbols-outlined text-[28px]">close</span>
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-6 pb-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    smooth
                    duration={800}
                    offset={-80}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl md:text-3xl font-medium text-primary cursor-pointer hover:text-pink-600 transition-colors"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="booking"
                smooth
                duration={800}
                onClick={() => setMobileOpen(false)}
                className="mt-6 btn-primary"
              >
                Book Your Seat
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
