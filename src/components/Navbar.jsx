import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

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
            ? 'bg-cream/80 backdrop-blur-xl shadow-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="hero" smooth duration={800} className="cursor-pointer">
            <h2
              className={`text-lg md:text-xl font-light tracking-[3px] transition-colors duration-300 ${
                scrolled ? 'text-dark' : 'text-white'
              }`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              REESE WITHERSPOON
            </h2>
            <p className="text-[10px] tracking-[4px] text-gold font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>
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
                activeClass="!text-gold"
                className={`text-[11px] tracking-[2px] uppercase cursor-pointer transition-colors duration-300 hover:text-gold ${
                  scrolled ? 'text-dark' : 'text-white/90'
                }`}
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="booking"
              smooth
              duration={800}
              className="hidden md:block px-5 py-2.5 text-[11px] tracking-[2px] uppercase cursor-pointer gold-pulse rounded-sm"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                background: '#1C0E0E',
                color: '#C9A96E',
              }}
            >
              Book Your Seat
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden text-2xl transition-colors ${scrolled ? 'text-dark' : 'text-white'}`}
            >
              <HiMenuAlt3 />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
            style={{ background: '#F2D8DC' }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-3xl text-dark"
            >
              <HiX />
            </button>
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.to}
                    smooth
                    duration={800}
                    offset={-80}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl md:text-3xl font-light text-dark cursor-pointer hover:text-gold transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
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
                className="mt-4 px-8 py-3 text-xs tracking-[3px] uppercase cursor-pointer rounded-sm"
                style={{ background: '#1C0E0E', color: '#C9A96E', fontFamily: "'Jost', sans-serif" }}
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
