import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import PaymentPage from './PaymentPage';
import TourPage from './TourPage';

import { IMAGES, EXTRA_IMAGES } from './constants/images';

// === CONSTANTS & ASSETS ===
const HERO_IMG = IMAGES.gallery6;
const ABOUT_IMG = IMAGES.gallery7;
const TICKETS_IMG = IMAGES.gallery10;

const GALLERY_IMAGES = [
  IMAGES.gallery6, IMAGES.gallery7, IMAGES.gallery10,
  IMAGES.gallery8, IMAGES.gallery9
];

const GALLERY_LABELS = ["The Icon", "The Producer", "The Author", "The Entrepreneur", "The Inspiration"];

const FILMOGRAPHY = [
  { title: "Legally Blonde", type: "Film" },
  { title: "Walk the Line", type: "Film" },
  { title: "Wild", type: "Film" },
  { title: "Big Little Lies", type: "TV Series" },
  { title: "The Morning Show", type: "TV Series" },
  { title: "Legally Blonde 3", type: "Film (Coming Soon)" },
  { title: "Hello Sunshine", type: "Company" },
  { title: "Reese's Book Club", type: "Brand" }
];

const COUNTRIES = [
  { name: "Japan", percent: 85 },
  { name: "Dubai", percent: 92 },
  { name: "Italy", percent: 78 },
  { name: "France", percent: 64 },
  { name: "South Africa", percent: 55 }
];

// === ANIMATION VARIANTS ===
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

export default function App() {
  const [currentView, setCurrentView] = useState('LANDING');
  const [paymentOrder, setPaymentOrder] = useState(null);

  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedState, setExpandedState] = useState(null);
  
  // Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  // Form States
  const [bookingForm, setBookingForm] = useState({ guests: 1, payment: 'crypto', tier: 'Regular', state: '' });
  const [donationAmount, setDonationAmount] = useState('$25');
  const [o7cAmount, setO7cAmount] = useState('$10,000');
  const [o7cCustom, setO7cCustom] = useState('');
  const [donationCustom, setDonationCustom] = useState('');
  const [donationPayment, setDonationPayment] = useState('crypto');
  const [liveDonation, setLiveDonation] = useState(7341250);

  // Media Tabs
  const [mediaTab, setMediaTab] = useState('PHOTOS');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    // Preloader timer
    const timer = setTimeout(() => setLoading(false), 2200);
    
    // Scroll listener for nav
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);

    // Countdown logic (Target: March 1, 2026)
    const targetDate = new Date('2026-03-01T00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) return clearInterval(interval);
      
      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
        minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')
      });
    }, 1000);

    const donationInterval = setInterval(() => {
      setLiveDonation(prev => prev + Math.floor(Math.random() * 8500) + 1500);
    }, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      clearInterval(donationInterval);
    };
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const basePrice = bookingForm.tier === 'Regular' ? 50 : bookingForm.tier === 'VIP' ? 100 : 200;
    
    setPaymentOrder({
      type: 'TICKET',
      amount: basePrice * bookingForm.guests,
      details: {
        event: "An Evening With Reese — 2026 National Tour",
        tier: bookingForm.tier + " Experience",
        location: bookingForm.state ? `${bookingForm.state} · ${fd.get('city') || 'General Admission'}` : "Virtual Access",
        date: "June 2026",
        guests: bookingForm.guests,
        fee: (basePrice * bookingForm.guests) * 0.05
      },
      buyer: {
        name: fd.get('fullName'),
        email: fd.get('email'),
        phone: fd.get('phone')
      }
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('PAYMENT');
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const amountStr = donationAmount === 'Custom' ? donationCustom : donationAmount;
    const amountNum = parseFloat(amountStr.replace(/[^0-9.]/g, '')) || 0;
    
    setPaymentOrder({
      type: 'DONATION',
      amount: amountNum,
      details: {},
      buyer: {
        name: "Anonymous Fan",
        email: "guest@reesewitherspoon.com",
        phone: "-"
      }
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('PAYMENT');
  };

  if (currentView === 'PAYMENT') {
    return (
      <div className="relative">
        <button 
          onClick={() => setCurrentView('LANDING')} 
          className="absolute top-6 left-[6%] z-50 text-dark font-jost text-[12px] font-semibold tracking-[2px] uppercase hover:text-gold transition-colors flex items-center gap-2"
        >
          <i className="ri-arrow-left-line"></i> Return to Site
        </button>
        <PaymentPage order={paymentOrder} />
      </div>
    );
  }

  return (
    <div className="bg-dark text-cream font-jost antialiased relative">
      {/* 1. SCROLL PROGRESS */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[200] origin-left" style={{ scaleX }} />

      {/* Removed PRELOADER */}

      {/* 3. NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#FDF6F0E6] backdrop-blur-[16px] border-b border-border text-dark py-4' : 'bg-transparent text-cream py-6'}`}>
        <div className="max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px] flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-cormorant font-semibold text-[20px] leading-none">REESE WITHERSPOON</span>
            <span className="text-[10px] tracking-[4px] uppercase text-gold mt-1">OFFICIAL</span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-[12px] font-medium tracking-[2px] uppercase">
            {['About', 'Tour', 'Tickets', 'Media', 'Invest', 'Contact'].map(link => (
              <Link key={link} to={link.toLowerCase()} smooth offset={-100} className="cursor-pointer hover:text-gold transition-colors duration-200">
                {link}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link to="tickets" smooth offset={-100} className="bg-gold text-dark px-[28px] py-[12px] text-[12px] font-semibold tracking-[2.5px] uppercase cursor-pointer hover:bg-dark hover:text-gold transition-all duration-300 shadow-[0_0_20px_rgba(201,169,110,0.4)]">
              Book Your Seat
            </Link>
          </div>

          <button className="lg:hidden text-[24px]" onClick={() => setMobileMenuOpen(true)}>
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center"
          >
            <button className="absolute top-8 right-8 text-gold text-[32px]" onClick={() => setMobileMenuOpen(false)}>
              <i className="ri-close-line"></i>
            </button>
            <div className="flex flex-col gap-6 text-center">
              {['About', 'Tour', 'Tickets', 'Media', 'Invest', 'Contact'].map((link, i) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link to={link.toLowerCase()} smooth offset={-100} onClick={() => setMobileMenuOpen(false)}
                    className="font-cormorant text-[48px] text-cream hover:text-gold transition-colors cursor-pointer"
                  >
                    {link}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. HERO */}
      <section className="relative min-h-[100vh] flex items-center pt-[120px] pb-[280px] md:pb-[160px]">
        <div className="absolute inset-0 z-0 bg-dark lg:bg-fixed bg-cover bg-center warm-filter" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#1C0E0EE6] via-[#1C0E0E80] to-[#1C0E0E33]" />
        
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px]">
          <div className="max-w-[640px]">
            <motion.span variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="inline-block border border-gold text-gold px-[20px] py-[8px] rounded-[2px] text-[11px] uppercase tracking-[3px] mb-8"
            >
              An Exclusive Experience
            </motion.span>
            
            <motion.h1 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="font-cormorant font-light text-[48px] md:text-[80px] lg:text-[96px] text-cream leading-[0.95] gold-italic-emphasis"
            >
              A Personal<br/><em>World Journey</em>
            </motion.h1>
            
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.45 }}
              className="w-[100px] h-[1px] bg-gold my-[24px]"
            />
            
            <motion.h3 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.6 }}
              className="text-[14px] uppercase tracking-[4px] text-cream opacity-80 mb-6"
            >
              Mentorship · Legacy · Connection
            </motion.h3>
            
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.75 }}
              className="text-[16px] font-light leading-[1.9] text-cream opacity-75 max-w-[420px] mb-[40px]"
            >
              "For years, I've wanted to do something deeper than a red carpet wave. I want to know your stories, your dreams, and your businesses. I’m limiting this journey to just 55 of you—so we can truly walk this path together."
            </motion.p>
            
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="tickets" smooth offset={-100} className="bg-gold text-dark px-[40px] py-[16px] text-[12px] font-semibold tracking-[2.5px] uppercase cursor-pointer hover:bg-gold-dark hover:-translate-y-[2px] transition-all shadow-[0_8px_24px_rgba(201,169,110,0.4)]">
                Secure Your Seat
              </Link>
              <Link to="tour" smooth offset={-100} className="bg-transparent border border-cream text-cream px-[40px] py-[16px] text-[12px] font-semibold tracking-[2.5px] uppercase cursor-pointer hover:bg-cream hover:text-dark transition-all">
                View Tour Dates
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 1.1 }}
          className="absolute bottom-0 left-0 right-0 bg-[#1C0E0EB3] backdrop-blur-[8px] py-[20px] px-[6%] lg:px-[5%] md:px-[20px] flex flex-wrap justify-between gap-8 border-t border-white/10"
        >
          {[
            {v: '55', l: 'Fans Only'}, 
            {v: '5', l: 'Countries'}, 
            {v: <i className="ri-building-4-line text-[24px]"></i>, l: 'Private Mansions'}, 
            {v: <i className="ri-vip-crown-line text-[24px]"></i>, l: 'World Leaders'}, 
            {v: <i className="ri-ship-line text-[24px]"></i>, l: 'Private Boat Cruise'}
          ].map((s, i) => (
            <div key={i} className="flex items-baseline gap-3">
              <span className="font-cormorant text-gold text-[32px] flex items-center">{s.v}</span>
              <span className="text-[11px] text-cream uppercase tracking-[2px]">{s.l}</span>
            </div>
          ))}
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-[200px] md:bottom-[120px] right-[6%] text-cream opacity-60 text-[32px] hidden md:block"
        >
          <i className="ri-arrow-down-line"></i>
        </motion.div>
      </section>
      
      {/* 4.5. OFFICIAL TOUR POSTER */}
      <section className="bg-dark py-[80px] md:py-[120px] flex justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="relative w-full max-w-[1100px] px-[6%] group"
        >
          <img src={IMAGES.tourPoster} alt="Official Tour Poster" className="w-full h-auto rounded-[8px] shadow-[0_40px_120px_rgba(0,0,0,0.7)] border border-gold/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[8px]" />
          <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <span className="text-gold text-[10px] uppercase tracking-[4px] font-semibold">The 2026 World Journey</span>
          </div>
        </motion.div>
      </section>

      {/* 5. CINEMATIC QUOTE STRIP */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-[120px] overflow-hidden">
        <div className="absolute inset-0 z-0 lg:bg-fixed bg-cover bg-center warm-filter" style={{ backgroundImage: `url(${ABOUT_IMG})` }} />
        <div className="absolute inset-0 z-0 bg-[#1C0E0EB8]" />
        
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="relative z-10 max-w-[800px] px-[6%] text-center flex flex-col items-center"
        >
          <div className="w-[80px] h-[1px] bg-gold mb-[40px]" />
          <span className="absolute top-0 left-[-40px] md:left-[-80px] font-cormorant text-[220px] text-gold opacity-12 leading-none">“</span>
          <p className="font-playfair italic text-[38px] text-cream leading-[1.5] relative z-10">
            I've learned that being powerful, being feminine, and being ambitious are not opposites. They are the same thing.
          </p>
          <span className="block mt-[24px] text-[13px] tracking-[3px] text-gold uppercase">— Reese Witherspoon</span>
        </motion.div>
      </section>

      {/* 6. ABOUT */}
      <section id="about" className="bg-cream text-dark py-[80px] md:py-[120px]">
        <div className="max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px] grid lg:grid-cols-[60%_40%] gap-[48px] items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <span className="text-[11px] font-semibold uppercase tracking-[4px] text-gold block mb-6">About the Experience</span>
            <h2 className="font-cormorant font-light text-[42px] md:text-[64px] leading-[1.1] mb-8 gold-italic-emphasis">
              More Than a<br/><em>Meet & Greet</em>
            </h2>
            <div className="space-y-6 mb-8 text-[16px] font-light leading-[1.9] text-muted max-w-[540px]">
              <p>55 fans. 5 countries. One shared journey. For the first time ever, I am opening my private world to a group of 55 hand-selected guests for a multi-country experience that focuses on real connection, mentorship, and legacy.</p>
              <p>We won't just "meet"—we will live together. We’ll cruise the seas, share mansions in every country, and navigate the world together. I’ll personally introduce you to my global network of kings, ministers, and icons across Japan, Dubai, Italy, France, and South Africa.</p>
              <p>I’m limiting this to just 55 people because I want to give you my undivided attention. We will leave this experience as more than acquaintances; we will be a community.</p>
            </div>
            
            <ul className="space-y-6 mb-12 max-w-[540px]">
              {[
                { i: 'ri-ship-line', t: 'Luxury Yacht Experience', d: 'Set sail together along the coastline. Fine dining, sunsets, and genuine conversation — just us and the open sea.' },
                { i: 'ri-building-4-line', t: 'Private Mansion Stays', d: 'No hotels. In every country the entire group lives together in an exclusive private residence handpicked by Reese.' },
                { i: 'ri-vip-crown-line', t: 'Meet World Leaders', d: 'Reese personally introduces you to ministers, governors, kings, and global icons through her private network.' },
                { i: 'ri-goblet-line', t: 'Parties in Every Country', d: 'Every stop ends with an exclusive after-party. Five countries. Five unforgettable nights.' }
              ].map((f, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="text-gold mt-1 text-[8px]">●</span>
                  <div>
                    <strong className="flex items-center gap-2 font-jost font-medium text-[16px] text-dark">
                      <i className={`${f.i} text-gold text-[18px]`}></i> {f.t}
                    </strong>
                    <span className="text-[15px] font-light text-muted">{f.d}</span>
                  </div>
                </li>
              ))}
            </ul>
            
            <Link to="invest" smooth offset={-100} className="inline-flex items-center gap-2 text-gold font-jost font-semibold text-[14px] hover:text-gold-dark cursor-pointer transition-colors">
              Learn More About the Experience <i className="ri-arrow-right-line"></i>
            </Link>
          </motion.div>
          
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="relative h-[600px] lg:h-[800px] w-full border-l-[3px] border-gold shadow-[-16px_16px_0_#E8D5B0]"
          >
            <img src={ABOUT_IMG} alt="Reese Portrait" className="w-full h-full object-cover warm-filter" />
          </motion.div>
        </div>
        <div className="max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px] mt-[120px]">
          <div className="w-full h-[1px] bg-gold opacity-50" />
        </div>
      </section>

      {/* ACTIVITIES & EXPERIENCES */}
      <section className="bg-dark py-[120px]">
        <div className="max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px] text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-gold text-[11px] uppercase tracking-[4px] font-semibold block mb-4">Activities & Experiences</span>
            <h2 className="font-cormorant font-light text-[36px] md:text-[64px] text-cream leading-[1.1] mb-6">
              Every Day is an <em className="text-gold italic font-cormorant">Adventure</em>
            </h2>
            <p className="font-jost text-cream/75 text-[16px] leading-[1.9] max-w-[600px] mx-auto mb-16">
              Each country brings a new set of unforgettable experiences. From boat cruises along stunning coastlines to private mansion dinners, games with Reese, and exclusive parties — every single day of this tour is designed to blow your mind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { i: 'ri-ship-line', t: 'Boat Cruise', d: 'Sail together along the coastline of one of the most beautiful places on earth with Reese.' },
              { i: 'ri-gamepad-line', t: 'Games with Reese', d: 'Group competitions, trivia, and pure fun — Reese plays too. No sitting on the sidelines.' },
              { i: 'ri-goblet-line', t: 'Exclusive Parties', d: 'Private after-parties in every country. Five countries. Five unforgettable nights.' },
              { i: 'ri-building-4-line', t: 'Mansion Living', d: 'The whole group lives together in a private residence every stop — no hotels, ever.' }
            ].map((c, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#FFFFFF14] backdrop-blur-[12px] border border-[rgba(201,169,110,0.3)] rounded-[4px] p-[32px_24px]"
              >
                <i className={`${c.i} text-gold text-[36px] mb-4 inline-block`}></i>
                <h4 className="font-jost text-cream font-semibold text-[18px] mb-2">{c.t}</h4>
                <p className="font-jost text-cream/70 text-[14px] leading-[1.6]">{c.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="font-jost text-[13px] text-gold uppercase tracking-[2px]">Activities vary by country. Full itinerary shared upon booking confirmation.</p>
          </motion.div>
        </div>
      </section>

      {/* 7. GALLERY STRIP */}
      <section className="bg-dark pt-[80px] overflow-hidden">
        <div className="px-[6%] lg:px-[5%] md:px-[20px] mb-8">
          <span className="text-gold text-[11px] tracking-[4px] uppercase">Reese's World</span>
        </div>
        <div className="flex w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-[40px] md:pb-0">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }}
              className="relative min-w-[80vw] md:min-w-[33.33vw] lg:min-w-[20vw] h-[400px] md:h-[520px] group overflow-hidden snap-start cursor-pointer border border-transparent hover:border-gold transition-colors duration-300"
            >
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover warm-filter transition-all duration-400 group-hover:scale-[1.04] group-hover:brightness-110" />
              <div className="absolute inset-x-0 bottom-0 p-[16px] bg-[#1C0E0ECC] translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-cormorant italic text-gold text-[20px]">{GALLERY_LABELS[i]}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. TOUR DATES (Rebuilt Drop-in Component) */}
      <div id="tour">
        <TourPage />
      </div>

      {/* MEET THE ICONS */}
      <section className="bg-cream text-dark py-[120px]">
        <div className="max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-gold text-[11px] uppercase tracking-[4px] font-semibold block mb-4">Exclusive Access</span>
            <h2 className="font-cormorant font-light text-[36px] md:text-[64px] leading-[1.1] mb-6">
              You'll Be Introduced to <em className="text-gold italic font-cormorant">the World</em>
            </h2>
            <p className="font-jost text-muted text-[16px] leading-[1.9] max-w-[600px] mx-auto">
              This isn't just about meeting Reese. Through her extraordinary global network, she personally introduces every fan to some of the most powerful people on the planet. Ministers. Governors. Kings. Icons.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { i: 'ri-vip-crown-line', t: 'Royalty & Heads of State', d: 'Private audiences with kings and royal families across the tour countries.' },
              { i: 'ri-government-line', t: 'Government Ministers', d: 'Meet and dine with senior government officials in Japan, UAE, Italy, France, and South Africa.' },
              { i: 'ri-earth-line', t: 'Governors & Regional Leaders', d: "Face-to-face with the decision-makers who shape the regions you'll be experiencing." },
              { i: 'ri-briefcase-4-line', t: 'Business Titans', d: "Reese's personal network of entrepreneurs, investors, and industry leaders — all in one room." },
              { i: 'ri-movie-2-line', t: 'Hollywood & Entertainment Icons', d: "Fellow actors, directors, and creators who share Reese's world at the highest level." },
              { i: 'ri-plant-line', t: 'Philanthropists & Changemakers', d: "People using power to change the world — and now you'll know them personally." }
            ].map((c, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#FFFFFF] border border-border border-l-4 border-l-gold rounded-r-[4px] p-[32px_24px] hover:-translate-y-[4px] hover:shadow-[0_0_20px_rgba(201,169,110,0.2)] transition-all"
              >
                <i className={`${c.i} text-gold text-[36px] mb-4 inline-block`}></i>
                <h4 className="font-jost text-dark font-semibold text-[18px] mb-2">{c.t}</h4>
                <p className="font-jost text-muted text-[14px] leading-[1.6]">{c.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="font-jost text-[13px] text-muted italic text-center">All introductions are personally facilitated by Reese Witherspoon through her private network.</p>
          </motion.div>
        </div>
      </section>

      {/* 9. COUNTDOWN + URGENCY BAR */}
      <section className="bg-dark-2 py-[48px] px-[6%] lg:px-[5%] md:px-[20px]">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[auto_1fr] gap-[64px] items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-gold text-[11px] uppercase tracking-[3px] font-semibold block mb-4">The Journey Begins In</span>
            <div className="flex items-start gap-4 md:gap-8">
              {Object.entries(timeLeft).map(([label, val], i, arr) => (
                <React.Fragment key={label}>
                  <div className="text-center">
                    <div className="font-cormorant font-light text-gold text-[48px] md:text-[64px] leading-none">{val}</div>
                    <div className="text-cream text-[11px] uppercase tracking-[1px] mt-2 opacity-80">{label}</div>
                  </div>
                  {i < arr.length - 1 && <span className="font-cormorant text-gold text-[40px] md:text-[50px] leading-none opacity-50">:</span>}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} className="w-full">
            <h3 className="font-cormorant italic text-cream text-[32px] mb-6">Seats Are Filling Fast</h3>
            <div className="space-y-4">
              {COUNTRIES.map(state => (
                <div key={state.name} className="flex flex-col gap-1">
                  <div className="flex justify-between text-[12px] text-cream opacity-90">
                    <span className="capitalize">{state.name.toLowerCase()}</span>
                    <span>{state.percent}% full</span>
                  </div>
                  <div className="w-full h-[4px] bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: `${state.percent}%` }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.3 }}
                      className="h-full bg-gold rounded-full" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. TICKET TIERS */}
      <section id="tickets" className="relative py-[80px] md:py-[120px] bg-dark">
        <div className="absolute inset-0 z-0 bg-fixed bg-cover bg-center warm-filter" style={{ backgroundImage: `url(${TICKETS_IMG})` }} />
        <div className="absolute inset-0 z-0 bg-[#1C0E0EC7]" />
        
        <div className="relative z-10 max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-[80px]">
            <span className="text-gold text-[11px] uppercase tracking-[4px] font-semibold block mb-4">Secure Your Seat</span>
            <h2 className="font-cormorant font-light text-cream text-[48px] md:text-[64px] leading-[1.1] gold-italic-emphasis">
              Choose Your<br/><em>Experience</em>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-[32px] items-center">
            {/* Regular */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-[#FDF6F012] backdrop-blur-[16px] border border-[rgba(201,169,110,0.3)] rounded-[4px] p-[48px] md:p-[36px] hover:-translate-y-[6px] transition-transform duration-300"
            >
              <div className="text-gold font-cormorant text-[52px] font-light mb-2">$25,000</div>
              <div className="text-gold text-[12px] uppercase tracking-[4px] font-semibold mb-6">REGULAR</div>
              <div className="w-full h-[1px] bg-gold opacity-30 mb-8" />
              <ul className="space-y-4 mb-12 min-h-[220px]">
                {[
                  "Full 5-country world tour with Reese", "Private boat cruise included", "Private mansion stays every country",
                  "Meet Reese personally", "Personal photo session", "Free customized polo shirt & cap", "Access to unreleased & special books", "Award ceremony attendance", "Merch delivered 3–7 days after payment"
                ].map((f, i) => (
                  <li key={i} className="flex gap-3 text-cream font-light text-[14px]">
                    <i className="ri-check-line text-gold mt-1"></i> <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => { document.getElementById('booking').scrollIntoView({behavior: 'smooth'}); setBookingForm({...bookingForm, tier: 'Regular'}) }} className="w-full border border-cream text-cream py-[16px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-cream hover:text-dark transition-colors">
                Book Regular
              </button>
            </motion.div>

            {/* VIP */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="relative bg-[#FDF6F01A] backdrop-blur-[16px] border border-gold rounded-[4px] p-[48px] md:p-[36px] scale-[1.04] shadow-[0_0_40px_rgba(201,169,110,0.25)] z-10"
            >
              <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 bg-gold text-dark text-[10px] uppercase tracking-[2px] font-bold px-[16px] py-[6px] rounded-full whitespace-nowrap">
                Most Popular
              </div>
              <div className="text-gold font-cormorant text-[52px] font-light mb-2">$40,000</div>
              <div className="text-gold text-[12px] uppercase tracking-[4px] font-semibold mb-6">VIP</div>
              <div className="w-full h-[1px] bg-gold opacity-50 mb-8" />
              <ul className="space-y-4 mb-12 min-h-[220px]">
                {[
                  "Everything in Regular, plus:", "Photo & video access throughout the tour", "Exclusive after-party access every country",
                  "VIP seating at all events & dinners", "Personal introduction to world leaders", "Award presented at live ceremony"
                ].map((f, i) => (
                  <li key={i} className="flex gap-3 text-cream font-light text-[14px]">
                    <i className="ri-check-line text-gold mt-1"></i> <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => { document.getElementById('booking').scrollIntoView({behavior: 'smooth'}); setBookingForm({...bookingForm, tier: 'VIP'}) }} className="w-full bg-gold text-dark py-[16px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-gold-dark transition-colors shadow-lg">
                Book VIP
              </button>
            </motion.div>

            {/* VVIP */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="bg-[#FDF6F012] backdrop-blur-[16px] border border-[rgba(201,169,110,0.3)] rounded-[4px] p-[48px] md:p-[36px] hover:-translate-y-[6px] transition-transform duration-300"
            >
              <div className="text-gold font-cormorant text-[52px] font-light mb-2">$75,000</div>
              <div className="text-gold text-[12px] uppercase tracking-[4px] font-semibold mb-6">VVIP</div>
              <div className="w-full h-[1px] bg-gold opacity-30 mb-8" />
              <ul className="space-y-4 mb-12 min-h-[220px]">
                {[
                  "Everything in VIP, plus:", "Reese's private contact details", "Unlimited 1-on-1 call/video chat with Reese post-tour",
                  "Private 1-on-1 dinner with Reese in each country", "Dedicated personal concierge throughout entire tour", "First-row access at all masterclass sessions"
                ].map((f, i) => (
                  <li key={i} className="flex gap-3 text-cream font-light text-[14px]">
                    <i className="ri-check-line text-gold mt-1"></i> <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => { document.getElementById('booking').scrollIntoView({behavior: 'smooth'}); setBookingForm({...bookingForm, tier: 'VVIP'}) }} className="w-full border border-cream text-cream py-[16px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-cream hover:text-dark transition-colors">
                Book VVIP
              </button>
            </motion.div>
          </div>
          
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-[48px] text-center opacity-70">
            <p className="text-[13px] text-cream max-w-[400px] mx-auto">We accept Cryptocurrency & Wire Transfer.<br/>Full payment instructions sent upon booking confirmation.</p>
          </motion.div>
        </div>
      </section>

      {/* 11. BOOKING FORM */}
      <section id="booking" className="bg-cream text-dark py-[80px] md:py-[120px]">
        <div className="max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px] grid lg:grid-cols-2 gap-[64px] items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <span className="text-[11px] font-semibold uppercase tracking-[4px] text-gold block mb-4">Reserve Your Spot</span>
            <h2 className="font-cormorant font-light text-[48px] md:text-[64px] leading-[1.1] mb-12 gold-italic-emphasis">
              Book Your Personal<br/><em>Meet & Greet</em>
            </h2>

            <form className="space-y-6" onSubmit={handleBookingSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <input name="fullName" type="text" placeholder="Full Name" required className="w-full bg-transparent border-b border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-dark transition-colors placeholder:text-dark/50" />
                <input name="email" type="email" placeholder="Email Address" required className="w-full bg-transparent border-b border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-dark transition-colors placeholder:text-dark/50" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input name="phone" type="tel" placeholder="Phone Number" required className="w-full bg-transparent border-b border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-dark transition-colors placeholder:text-dark/50" />
                <input name="countryResidence" type="text" placeholder="Country of Residence" required className="w-full bg-transparent border-b border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-dark transition-colors placeholder:text-dark/50" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <select 
                  value={bookingForm.state} onChange={e => setBookingForm({...bookingForm, state: e.target.value})} required 
                  className="w-full bg-transparent border-b border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-dark transition-colors appearance-none text-dark/70"
                >
                  <option value="" disabled>Preferred Tour Country</option>
                  <option value="Japan" className="text-dark">Japan</option>
                  <option value="Dubai" className="text-dark">Dubai</option>
                  <option value="Italy" className="text-dark">Italy</option>
                  <option value="France" className="text-dark">France</option>
                  <option value="South Africa" className="text-dark">South Africa</option>
                  <option value="No Preference" className="text-dark">No Preference</option>
                </select>
                <select value={bookingForm.tier} onChange={e => setBookingForm({...bookingForm, tier: e.target.value})} required className="w-full bg-transparent border-b border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-dark transition-colors appearance-none text-dark">
                  <option value="Regular" className="text-dark">Regular Tier</option>
                  <option value="VIP" className="text-dark">VIP Tier</option>
                  <option value="VVIP" className="text-dark">VVIP Tier</option>
                </select>
              </div>
              
              <div className="border-b border-dark/30 py-[16px] flex justify-between items-center">
                <span className="text-[15px] text-dark/70">Number of Guests</span>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setBookingForm({...bookingForm, guests: Math.max(1, bookingForm.guests - 1)})} className="text-gold text-xl hover:text-dark transition-colors"><i className="ri-subtract-line"></i></button>
                  <span className="font-semibold">{bookingForm.guests}</span>
                  <button type="button" onClick={() => setBookingForm({...bookingForm, guests: Math.min(4, bookingForm.guests + 1)})} className="text-gold text-xl hover:text-dark transition-colors"><i className="ri-add-line"></i></button>
                </div>
              </div>

              <textarea placeholder="Message (optional)" rows="4" className="w-full bg-transparent border-b border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-dark transition-colors placeholder:text-dark/50 resize-none mt-4"></textarea>

              <button type="submit" className="w-full bg-dark text-gold py-[18px] text-[12px] font-semibold tracking-[2.5px] uppercase mt-8 hover:bg-gold hover:text-dark transition-colors shadow-lg">
                Request My Booking
              </button>
              <p className="text-muted italic text-[12px] text-center mt-4">
                Only 55 spots available worldwide across all tiers.<br/>All bookings are confirmed manually within 24 hours.
              </p>
            </form>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="hidden lg:block h-[800px] w-full border-l-[3px] border-gold"
          >
            <img src={ABOUT_IMG} alt="Reese Booking" className="w-full h-full object-cover warm-filter" />
          </motion.div>
        </div>
      </section>

      {/* 12. DONATIONS */}
      <section className="relative bg-deep-blush py-[100px] text-center overflow-hidden border-b border-dark/10">
        {/* Subtle floating petals via CSS/motion */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <motion.i animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="ri-leaf-line absolute top-[20%] left-[10%] text-6xl text-dark" />
          <motion.i animate={{ y: [0, 30, 0], x: [0, -15, 0], rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="ri-leaf-line absolute bottom-[20%] right-[15%] text-8xl text-dark" />
        </div>

        <div className="relative z-10 max-w-[800px] mx-auto px-[6%] lg:px-[5%] md:px-[20px] flex flex-col items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="w-[120px] h-[120px] rounded-full border-[3px] border-gold overflow-hidden mx-auto mb-8 shadow-xl">
              <img src={ABOUT_IMG} alt="Reese Philanthropy" className="w-full h-full object-cover warm-filter" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[4px] text-dark block mb-4">Show Your Love</span>
            <h2 className="font-cormorant font-light text-dark text-[48px] md:text-[64px] leading-[1.1] mb-6 gold-italic-emphasis">
              Send Reese Some<br/><em>Love</em>
            </h2>
            <p className="text-[16px] text-dark/80 max-w-[480px] mx-auto mb-10">
              Your support means the world. Every gesture, big or small, fuels the mission.
            </p>

            <form onSubmit={handleDonationSubmit} className="w-full max-w-[500px] mx-auto bg-cream/30 p-8 rounded-[8px] backdrop-blur-sm border border-dark/10">
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['$5', '$10', '$25', '$50', 'Custom'].map(amt => (
                  <button key={amt} type="button" onClick={() => { setDonationAmount(amt); if(amt!=='Custom') setDonationCustom(''); }}
                    className={`px-[24px] py-[12px] text-[14px] font-semibold rounded-[4px] transition-colors ${donationAmount === amt ? 'bg-dark text-gold' : 'bg-transparent border border-dark text-dark hover:bg-dark/10'}`}
                  >
                    {amt}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {donationAmount === 'Custom' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-8 overflow-hidden">
                    <input type="text" placeholder="$0.00" value={donationCustom} onChange={e => setDonationCustom(e.target.value)} required
                      className="w-full bg-transparent border-b-2 border-gold py-2 font-cormorant text-[32px] text-gold text-center focus:outline-none placeholder:text-gold/50"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mb-10"></div>

              <button type="submit" className="w-full bg-dark text-gold py-[16px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-gold hover:text-dark transition-colors shadow-lg rounded-[4px]">
                Send My Love 🌸
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 13. O7C FUNDRAISING */}
      <section className="relative bg-cream py-[120px] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <motion.i animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="ri-earth-line absolute top-[20%] left-[10%] text-6xl text-dark" />
          <motion.i animate={{ y: [0, 30, 0], x: [0, -15, 0], rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="ri-heart-3-line absolute bottom-[20%] right-[15%] text-8xl text-dark" />
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-[6%] lg:px-[5%] md:px-[20px]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-dark text-[11px] font-semibold uppercase tracking-[4px] block mb-4">October 7 Coalition (O7C)</span>
            <h2 className="font-cormorant font-light text-dark text-[48px] md:text-[64px] leading-[1.1] mb-6 gold-italic-emphasis">
              Standing with the <br/><em>Vulnerable</em>
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
              <div className="bg-dark text-gold px-8 py-4 rounded-[4px] shadow-lg">
                <span className="block text-[10px] uppercase tracking-[2px] opacity-80 mb-1">Target Amount</span>
                <span className="font-cormorant text-[36px] leading-none">$50,000,000</span>
              </div>
              <div className="bg-white text-dark px-8 py-4 rounded-[4px] shadow-lg border border-gold/30">
                <span className="block text-[10px] uppercase tracking-[2px] opacity-80 mb-1">Live Donated Amount</span>
                <span className="font-cormorant text-[36px] text-green-700 leading-none">${liveDonation.toLocaleString()} <span className="text-[14px] font-jost text-muted ml-1">raised so far</span></span>
              </div>
            </div>
            
            <p className="font-jost text-[16px] text-dark/80 max-w-[700px] mx-auto leading-[1.8] mb-6">
              "I have a number of shows scheduled over the coming weeks, and I am committed to making the most of them, not only to connect with my fans, but also to give back to society through my charity organization. We are rebuilding with hope."
            </p>
            <p className="font-jost text-[16px] text-dark/80 max-w-[700px] mx-auto leading-[1.8] mb-12">
              "I would be truly grateful if you could support the October 7 Coalition (O7C) with a donation. Contributions begin at a minimum of $10,000 and play a meaningful role in helping us provide for those in need. Your generosity will have a lasting impact."
            </p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <form onSubmit={handleDonationSubmit} className="w-full max-w-[600px] mx-auto bg-white p-8 md:p-10 rounded-[8px] border border-dark/10 shadow-xl">
              <h3 className="font-cormorant text-[24px] text-center mb-8">Make a Contribution</h3>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {['$10,000', '$25,000', '$50,000', '$100,000'].map(amt => (
                  <button key={amt} type="button" onClick={() => { setO7cAmount(amt); setO7cCustom(''); }}
                    className={`px-[24px] py-[16px] text-[14px] font-semibold rounded-[4px] transition-colors ${o7cAmount === amt ? 'bg-dark text-gold' : 'bg-transparent border border-dark/20 text-dark hover:border-gold'}`}
                  >
                    {amt}
                  </button>
                ))}
                <button type="button" onClick={() => setO7cAmount('Custom')}
                  className={`col-span-2 px-[24px] py-[16px] text-[14px] font-semibold rounded-[4px] transition-colors ${o7cAmount === 'Custom' ? 'bg-dark text-gold' : 'bg-transparent border border-dark/20 text-dark hover:border-gold'}`}
                >
                  Custom Amount
                </button>
              </div>

              <AnimatePresence>
                {o7cAmount === 'Custom' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-8 overflow-hidden">
                    <input type="text" placeholder="Enter amount (Min $10,000)" value={o7cCustom} onChange={e => setO7cCustom(e.target.value)} required
                      className="w-full bg-transparent border-b-2 border-gold py-2 font-cormorant text-[32px] text-dark text-center focus:outline-none placeholder:text-dark/30"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button type="submit" className="w-full bg-dark text-gold py-[18px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-gold hover:text-dark transition-colors shadow-lg rounded-[4px]">
                Donate to O7C
              </button>
              <p className="text-center font-jost text-[12px] text-dark/60 mt-4">
                O7C is a registered 501(c)(3) non-profit organization.<br/>All contributions are fully tax-deductible to the extent allowed by law.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 13. FILMOGRAPHY */}
      <section className="bg-dark py-[100px] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px] mb-[64px]">
          <span className="text-gold text-[11px] font-semibold uppercase tracking-[4px] block mb-4">Her Legacy</span>
          <h2 className="font-cormorant font-light text-cream text-[48px] md:text-[64px] leading-[1.1] gold-italic-emphasis">
            The Work That Built<br/><em>an Empire</em>
          </h2>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar gap-[24px] px-[6%] lg:px-[5%] md:px-[20px] pb-[40px]">
          {FILMOGRAPHY.map((film, i) => (
            <motion.div key={film.title} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }}
              className="min-w-[260px] bg-dark-2 border border-gold/20 rounded-[4px] p-4 group hover:-translate-y-[6px] hover:border-gold/60 transition-all duration-300"
            >
              <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded-[2px]">
                <img src={EXTRA_IMAGES[i]} alt={film.title} className="w-full h-full object-cover warm-filter group-hover:scale-[1.05] transition-transform duration-500" />
              </div>
              <h3 className="font-cormorant text-gold text-[20px] leading-tight mb-1">{film.title}</h3>
              <p className="font-jost text-[10px] text-cream/60 tracking-[3px] uppercase">{film.type}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center font-jost text-[13px] text-cream/50 mt-4">A career spanning 3 decades and counting.</p>
      </section>

      {/* 14. INVEST WITH REESE */}
      <section id="invest" className="bg-cream text-dark py-[120px]">
        <div className="max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-[64px]">
            <span className="text-gold text-[11px] font-semibold uppercase tracking-[4px] block mb-4">Investment Opportunities</span>
            <h2 className="font-cormorant font-light text-dark text-[48px] md:text-[64px] leading-[1.1] mb-6 gold-italic-emphasis">
              Projects Seeking<br/><em>Visionary Investors</em>
            </h2>
            <p className="font-jost text-[16px] text-muted max-w-[500px]">All inquiries handled privately and professionally.</p>
          </motion.div>

          <div className="grid lg:grid-cols-[60%_auto] gap-[32px]">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-warm-white border-l-[4px] border-gold rounded-r-[4px] p-[40px] shadow-sm hover:shadow-md transition-shadow"
            >
              <i className="ri-film-line text-[40px] text-gold mb-6 block"></i>
              <h3 className="font-cormorant text-dark text-[32px] mb-4">Film Production</h3>
              <p className="font-jost text-[15px] text-muted leading-[1.9] mb-8 max-w-[480px]">
                Join an award-winning production pipeline — from script development to global premiere. Back projects with purpose.
              </p>
              <a href="#contact" className="font-jost text-gold text-[12px] uppercase tracking-[2px] font-semibold hover:text-dark transition-colors">Express Interest →</a>
            </motion.div>

            <div className="flex flex-col gap-[32px]">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="bg-warm-white border-l-[4px] border-gold rounded-r-[4px] p-[40px] shadow-sm hover:shadow-md transition-shadow flex-1"
              >
                <i className="ri-smartphone-line text-[32px] text-gold mb-4 block"></i>
                <h3 className="font-cormorant text-dark text-[28px] mb-3">Media Platform</h3>
                <p className="font-jost text-[15px] text-muted leading-[1.9] mb-6">
                  A next-generation platform for storytellers and creators. Content with culture at its core.
                </p>
                <a href="#contact" className="font-jost text-gold text-[12px] uppercase tracking-[2px] font-semibold hover:text-dark transition-colors">Express Interest →</a>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="bg-warm-white border-l-[4px] border-gold rounded-r-[4px] p-[40px] shadow-sm hover:shadow-md transition-shadow flex-1"
              >
                <i className="ri-shopping-bag-line text-[32px] text-gold mb-4 block"></i>
                <h3 className="font-cormorant text-dark text-[28px] mb-3">Lifestyle Brand</h3>
                <p className="font-jost text-[15px] text-muted leading-[1.9] mb-6">
                  Premium Southern elegance meets modern luxury. A brand the world is ready for.
                </p>
                <a href="#contact" className="font-jost text-gold text-[12px] uppercase tracking-[2px] font-semibold hover:text-dark transition-colors">Express Interest →</a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. SPONSORS */}
      <section className="bg-blush text-dark py-[100px]">
        <div className="max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px] text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-dark opacity-60 text-[11px] uppercase tracking-[4px] font-semibold block mb-4">Our Partners</span>
            <h2 className="font-cormorant font-light text-dark text-[48px] md:text-[64px] leading-[1.1] mb-12 gold-italic-emphasis">
              The Brands Behind<br/><em>the Experience</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px] md:gap-[24px] max-w-[900px] mx-auto mb-[64px]">
            {[1,2,3,4,5,6].map(i => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-cream border border-border h-[100px] rounded-[4px] flex items-center justify-center hover:border-gold hover:shadow-[0_0_15px_rgba(201,169,110,0.3)] transition-all cursor-pointer"
              >
                <span className="font-jost text-[12px] text-muted tracking-[2px] uppercase">Sponsor Logo</span>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.6 }}>
            <p className="font-jost text-[16px] text-dark/80 mb-6">Interested in reaching our exclusive audience?</p>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="bg-dark text-gold px-[36px] py-[14px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-gold hover:text-dark transition-colors rounded-[2px] shadow-lg">
              Become a Sponsor
            </button>
          </motion.div>
        </div>
      </section>

      {/* 16. MEDIA (PHOTOS + VIDEOS) */}
      <section id="media" className="bg-dark py-[120px]">
        <div className="max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 text-center">
            <span className="text-gold text-[11px] uppercase tracking-[4px] font-semibold block mb-4">Media</span>
            <h2 className="font-cormorant font-light text-cream text-[48px] md:text-[64px] leading-[1.1] mb-10 gold-italic-emphasis">
              In the <em>Spotlight</em>
            </h2>
            
            <div className="flex justify-center gap-8 font-jost text-[12px] tracking-[2px] uppercase font-semibold">
              <button onClick={() => setMediaTab('PHOTOS')} className={`pb-2 border-b-2 transition-colors ${mediaTab==='PHOTOS' ? 'text-gold border-gold' : 'text-cream/50 border-transparent hover:text-cream'}`}>PHOTOS</button>
              <button onClick={() => setMediaTab('VIDEOS')} className={`pb-2 border-b-2 transition-colors ${mediaTab==='VIDEOS' ? 'text-gold border-gold' : 'text-cream/50 border-transparent hover:text-cream'}`}>VIDEOS</button>
            </div>
          </motion.div>

          {mediaTab === 'PHOTOS' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="columns-1 md:columns-2 lg:columns-3 gap-[24px] space-y-[24px]">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="relative overflow-hidden border border-transparent hover:border-gold border-[2px] transition-all cursor-zoom-in group rounded-[2px]" onClick={() => setLightbox(EXTRA_IMAGES[3 + i])}>
                  <img src={EXTRA_IMAGES[3 + i]} alt={`Media ${i}`} className="w-full h-auto warm-filter group-hover:scale-[1.03] group-hover:brightness-110 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                </div>
              ))}
            </motion.div>
          )}

          {mediaTab === 'VIDEOS' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-[32px]">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-[2px] overflow-hidden group cursor-pointer border-[2px] border-transparent hover:border-gold transition-colors">
                    <img src={EXTRA_IMAGES[12 + i]} alt={`Video ${i}`} className="w-full h-full object-cover warm-filter group-hover:scale-[1.03] transition-transform duration-500" />
                    <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-[48px] h-[48px] rounded-full bg-cream text-dark flex items-center justify-center pl-1 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(253,246,240,0.3)]">
                        <i className="ri-play-fill text-[24px]"></i>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-cormorant text-[22px] text-cream mb-1">Behind the Scenes: Tour Preparation</h3>
                  <p className="font-jost text-[11px] text-gold uppercase tracking-[1px]">04:23</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-dark/95 backdrop-blur-md flex items-center justify-center p-8">
              <button onClick={() => setLightbox(null)} className="absolute top-8 right-8 text-cream hover:text-gold text-[32px] transition-colors"><i className="ri-close-line"></i></button>
              <img src={lightbox} alt="Lightbox" className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-white/10" />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 17. STAY NOTIFIED */}
      <section className="bg-cream py-[80px] text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-[600px] mx-auto px-[6%] lg:px-[5%] md:px-[20px]">
          <h2 className="font-cormorant font-light text-dark text-[40px] md:text-[52px] leading-[1.1] mb-4 gold-italic-emphasis">
            New Dates Drop<br/><em>Regularly</em>
          </h2>
          <p className="font-jost text-[16px] text-muted mb-8">Be the first to know when your city is announced.</p>
          
          <form onSubmit={e => { e.preventDefault(); alert('Subscribed!'); }} className="flex flex-col md:flex-row gap-4 items-center">
            <input type="email" placeholder="Your email address" required className="w-full bg-transparent border-b border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-dark text-dark placeholder:text-dark/50" />
            <button type="submit" className="w-full md:w-auto whitespace-nowrap bg-dark text-gold px-[40px] py-[16px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-gold hover:text-dark transition-colors shadow-lg">
              Notify Me →
            </button>
          </form>
          <p className="font-jost text-[11px] text-muted italic mt-[12px]">No spam. Just Reese.</p>
        </motion.div>
      </section>

      {/* 18. CONTACT & SUPPORT */}
      <section id="contact" className="bg-blush py-[100px]">
        <div className="max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-[64px]">
            <span className="text-dark opacity-60 text-[11px] uppercase tracking-[4px] font-semibold block mb-4">Get in Touch</span>
            <h2 className="font-cormorant font-light text-dark text-[48px] md:text-[64px] leading-[1.1] gold-italic-emphasis">
              We're Here <em>for You</em>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-[24px]">
            {[
              { i: 'ri-phone-line', t: 'Customer Support', b1: 'Phone: +1 (414) 551-1344', b2: 'Email: support@reesewitherspoonofficial.com', d: 'Mon–Sat · 9am–7pm EST', btn: 'Contact Support' },
              { i: 'ri-whatsapp-line', t: 'WhatsApp', b1: '+1 (414) 551-1344', b2: 'Chat with us directly', d: 'Fastest response time', btn: 'Open WhatsApp' },
              { i: 'ri-telegram-line', t: 'Telegram', b1: '@ReeseTourOfficial', b2: 'Join our official channel for updates', d: 'Community & News', btn: 'Join Telegram' }
            ].map((c, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#FDF6F099] backdrop-blur-[12px] border border-[rgba(201,169,110,0.4)] rounded-[4px] p-[40px_32px] text-center shadow-sm flex flex-col items-center hover:-translate-y-[4px] transition-transform"
              >
                <i className={`${c.i} text-gold text-[36px] mb-4`}></i>
                <h3 className="font-cormorant text-dark text-[26px] mb-3">{c.t}</h3>
                <p className="font-jost text-[14px] text-muted mb-1">{c.b1}</p>
                <p className="font-jost text-[14px] text-muted mb-4">{c.b2}</p>
                <p className="font-jost text-[15px] text-dark font-medium mb-8">{c.d}</p>
                <button onClick={() => {
                  if (c.t === 'WhatsApp') window.open('https://wa.me/14145511344', '_blank');
                  else if (c.t === 'Telegram') window.open('https://t.me/ReeseTourOfficial', '_blank');
                  else window.location.href = 'mailto:support@reesewitherspoonofficial.com';
                }} className="w-full bg-dark text-gold py-[14px] text-[12px] font-semibold tracking-[2.5px] uppercase mt-auto hover:bg-gold hover:text-dark transition-colors rounded-[2px] shadow-md">
                  {c.btn}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 19. FOOTER */}
      <footer className="relative bg-dark py-[80px] pb-[40px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gold opacity-30" />
        
        <div className="relative z-10 max-w-[1280px] mx-auto px-[6%] lg:px-[5%] md:px-[20px]">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[48px] mb-[60px]">
            <div>
              <span className="font-cormorant font-semibold text-[24px] text-cream block leading-none">REESE WITHERSPOON</span>
              <span className="font-jost text-[10px] tracking-[4px] uppercase text-gold mt-2 block">OFFICIAL</span>
              <p className="font-jost text-[13px] text-muted italic mt-[12px]">"Where Icons Meet Their People"</p>
              <div className="flex gap-[16px] mt-[20px]">
                {['ri-instagram-line', 'ri-twitter-x-line', 'ri-facebook-box-line', 'ri-youtube-line'].map(icon => (
                  <i key={icon} className={`${icon} text-cream text-[20px] hover:text-gold cursor-pointer transition-colors`}></i>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-jost text-[12px] tracking-[2px] uppercase text-gold mb-6">Experience</h4>
              <ul className="space-y-3">
                {['About the Event', 'Tour Dates', 'Ticket Tiers', 'Book a Seat'].map(l => (
                  <li key={l}><a href="#" className="font-jost text-[13px] text-cream/60 hover:text-gold transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-jost text-[12px] tracking-[2px] uppercase text-gold mb-6">Connect</h4>
              <ul className="space-y-3">
                {['Customer Support', 'WhatsApp', 'Telegram', 'Invest with Reese'].map(l => (
                  <li key={l}><a href="#" className="font-jost text-[13px] text-cream/60 hover:text-gold transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-jost text-[12px] tracking-[2px] uppercase text-gold mb-6">Legal</h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Refund Policy'].map(l => (
                  <li key={l}><a href="#" className="font-jost text-[13px] text-cream/60 hover:text-gold transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-[24px] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-jost text-[12px] text-cream/40">© 2026 Reese Witherspoon Official. All rights reserved.</p>
            <p className="font-jost text-[12px] text-cream/40">Platform managed by AKA Management</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
