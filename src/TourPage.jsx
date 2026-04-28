import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ASSETS ---
const HERO_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Reese_Witherspoon_2023.jpg/800px-Reese_Witherspoon_2023.jpg";
const VIP_IMG_1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Reese_Witherspoon_2019_by_Glenn_Francis.jpg/800px-Reese_Witherspoon_2019_by_Glenn_Francis.jpg";
const VIP_IMG_2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Reese_Witherspoon_at_the_2012_Vanity_Fair_Oscar_Party.jpg/800px-Reese_Witherspoon_at_the_2012_Vanity_Fair_Oscar_Party.jpg";

// --- DATA ---
const TOUR_DATA = [
  {
    state: "CALIFORNIA", emoji: "🌴", month: "June 2026",
    cities: [
      { name: "Los Angeles", seats: 42 },
      { name: "Beverly Hills", seats: 38 },
      { name: "San Diego", seats: 52 },
      { name: "San Francisco", seats: 45 },
      { name: "Malibu", seats: 40 }
    ]
  },
  {
    state: "NEW YORK", emoji: "🗽", month: "June 2026",
    cities: [
      { name: "Manhattan", seats: 50 },
      { name: "Brooklyn", seats: 48 },
      { name: "The Hamptons", seats: 39 },
      { name: "Buffalo", seats: 51 },
      { name: "Harlem", seats: 44 }
    ]
  },
  {
    state: "FLORIDA", emoji: "🌊", month: "July 2026",
    cities: [
      { name: "Miami", seats: 22 },
      { name: "Orlando", seats: 35 },
      { name: "Tampa", seats: 40 },
      { name: "Fort Lauderdale", seats: 28 },
      { name: "Jacksonville", seats: 42 }
    ]
  },
  {
    state: "TEXAS", emoji: "⭐", month: "July 2026",
    cities: [
      { name: "Houston", seats: 25 },
      { name: "Dallas", seats: 20 },
      { name: "Austin", seats: 32 },
      { name: "San Antonio", seats: 41 },
      { name: "Fort Worth", seats: 30 }
    ]
  },
  {
    state: "NEVADA", emoji: "🎰", month: "August 2026",
    cities: [
      { name: "Las Vegas", seats: 8 },
      { name: "Henderson", seats: 15 },
      { name: "Reno", seats: 22 },
      { name: "Lake Tahoe", seats: 12 },
      { name: "Carson City", seats: 28 }
    ]
  }
];

const FILTERS = ["All States", "June 2026", "July 2026", "August 2026"];

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function TourPage() {
  const [activeFilter, setActiveFilter] = useState("All States");
  const [expandedState, setExpandedState] = useState(null);

  const filteredData = TOUR_DATA.filter(state => 
    activeFilter === "All States" ? true : state.month === activeFilter
  );

  const getSeatColor = (seats) => {
    if (seats > 30) return "bg-green-100 text-green-800 border border-green-200";
    if (seats >= 15) return "bg-amber-100 text-amber-800 border border-amber-200";
    return "bg-red-100 text-red-800 border border-red-200 animate-pulse";
  };

  return (
    <div className="bg-cream font-jost text-dark w-full overflow-hidden">
      
      {/* PART 1: TOUR HERO BANNER */}
      <section className="relative min-h-[70vh] flex flex-col justify-end pb-[80px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0" 
          style={{ backgroundImage: `url(${HERO_IMG})`, filter: 'sepia(8%) brightness(1.05) contrast(1.04)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C0E0E4D] to-[#1C0E0EBF] z-0" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[6%] text-center flex flex-col items-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center w-full">
            <motion.span variants={fadeUp} className="bg-transparent border border-gold text-gold px-[20px] py-[8px] rounded-[2px] text-[11px] uppercase tracking-[3px] mb-[24px]">
              2026 National Tour
            </motion.span>
            
            <motion.h1 variants={fadeUp} className="font-cormorant font-light text-[80px] text-cream leading-[0.9] flex flex-col items-center mb-[24px]">
              An Evening With
              <em className="text-gold italic font-cormorant">Reese Witherspoon</em>
            </motion.h1>
            
            <motion.div variants={fadeUp} className="w-[100px] h-[1px] bg-gold mb-[24px]" />
            
            <motion.p variants={fadeUp} className="text-[14px] text-cream opacity-80 uppercase tracking-[3px] mb-[40px]">
              5 States · 5 Cities Each · May – August 2026
            </motion.p>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-[#1C0E0ECC] backdrop-blur-[8px] py-[20px] px-[6%] flex flex-wrap justify-between items-center gap-6 z-20 border-t border-white/10"
        >
          {[
            { num: "55", label: "Seats Per City" },
            { num: "25", label: "Total Events" },
            { num: "4", label: "Months" },
            { num: "3", label: "Ticket Tiers" }
          ].map(stat => (
            <div key={stat.label} className="flex items-baseline gap-3">
              <span className="font-cormorant text-gold text-[36px] font-light">{stat.num}</span>
              <span className="text-[11px] text-cream uppercase tracking-[2px]">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* PART 2: VIP EXPERIENCE BANNER */}
      <section className="bg-dark py-[80px] px-[6%]">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[60%_40%] gap-[64px] items-center">
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span variants={fadeUp} className="text-gold text-[11px] uppercase tracking-[4px] font-semibold block mb-4">
              Exclusive VIP Packages
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-cormorant font-light text-[56px] text-cream leading-[1.1] mb-6">
              Upgrade Your <em className="text-gold italic font-cormorant">Experience</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[16px] text-cream opacity-75 leading-[1.9] max-w-[540px] mb-10">
              Go beyond the standard experience. VIP and VVIP guests enjoy private access, intimate moments, after-party exclusivity, and personalized awards — all in a room of just 55 people.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-6 md:gap-8 mb-10">
              {[
                { icon: "ri-movie-2-line", label: "Private Meet & Greet" },
                { icon: "ri-camera-lens-line", label: "Photo + Video Access" },
                { icon: "ri-trophy-line", label: "Personal Award Ceremony" }
              ].map(feat => (
                <div key={feat.label} className="flex items-center gap-3">
                  <i className={`${feat.icon} text-gold text-[20px]`}></i>
                  <span className="text-cream text-[13px] font-medium tracking-[1px]">{feat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button className="bg-gold text-dark px-[36px] py-[16px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-[#E8D5B0] transition-colors rounded-[2px] shadow-[0_8px_24px_rgba(201,169,110,0.3)]">
                Get VIP Tickets
              </button>
              <button className="bg-transparent border border-gold text-gold px-[36px] py-[16px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-gold hover:text-dark transition-colors rounded-[2px]">
                See All Ticket Tiers
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full hidden md:block"
          >
            <img 
              src={VIP_IMG_1} alt="Reese Stage" 
              className="absolute top-0 right-0 w-[75%] h-[80%] object-cover rounded-[4px] border-[3px] border-gold shadow-[0_20px_60px_rgba(0,0,0,0.4)] z-10 filter sepia-[8%] brightness-105 contrast-105" 
            />
            <img 
              src={VIP_IMG_2} alt="Reese Portrait" 
              className="absolute bottom-[-40px] left-0 w-[55%] h-[60%] object-cover rounded-[4px] border-[3px] border-gold shadow-[0_12px_40px_rgba(0,0,0,0.3)] z-20 filter sepia-[8%] brightness-105 contrast-105" 
            />
          </motion.div>
        </div>
      </section>

      {/* PART 3: TOUR DATES LIST */}
      <section className="bg-blush relative pt-[80px]">
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        <div className="relative z-10 max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="px-[6%] mb-[32px]">
            <span className="text-gold text-[11px] font-semibold uppercase tracking-[4px] block mb-2">Tour Schedule</span>
            <h2 className="font-cormorant font-light text-[64px] text-dark leading-[1.1] mb-2">
              Find Your <em className="text-gold italic font-cormorant">City</em>
            </h2>
            <p className="text-[14px] text-muted">Click any date to expand cities and book your seat.</p>
          </div>

          {/* Filters */}
          <div className="px-[6%] flex gap-3 overflow-x-auto hide-scrollbar pb-4 mb-8 border-b border-border">
            {FILTERS.map(f => (
              <button 
                key={f} onClick={() => setActiveFilter(f)}
                className={`whitespace-nowrap px-[20px] py-[10px] text-[11px] uppercase tracking-[2px] font-semibold rounded-[2px] transition-all duration-300 ${
                  activeFilter === f ? 'bg-dark text-gold shadow-md' : 'bg-transparent border border-border text-muted hover:border-gold hover:text-dark'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Dates Container */}
          <div className="px-[6%] pb-[80px] flex flex-col gap-[32px]">
            <AnimatePresence mode="popLayout">
              {filteredData.map((state, i) => (
                <motion.div 
                  key={state.state} layout
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  {/* State Header */}
                  <div 
                    onClick={() => setExpandedState(expandedState === state.state ? null : state.state)}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center py-[24px] border-b border-border cursor-pointer group"
                  >
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center gap-3">
                        <span className="text-[32px]">{state.emoji}</span>
                        <h3 className="font-cormorant text-[42px] font-light text-dark group-hover:text-gold transition-colors duration-200">
                          {state.state}
                        </h3>
                      </div>
                      <p className="font-jost text-[12px] text-muted tracking-[2px] uppercase mt-1">
                        5 Cities · {state.month}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="bg-gold text-dark text-[11px] uppercase font-semibold px-[20px] py-[6px] rounded-[2px] tracking-[1px]">
                        {state.month}
                      </span>
                      <span className="bg-dark text-cream text-[10px] uppercase font-semibold px-[12px] py-[4px] rounded-[2px] tracking-[1px] hidden sm:block">
                        55 Seats Per City
                      </span>
                      <motion.i 
                        animate={{ rotate: expandedState === state.state ? 180 : 0 }}
                        className="ri-arrow-down-s-line text-gold text-[24px] ml-2"
                      />
                    </div>
                  </div>

                  {/* Cities List Accordion */}
                  <AnimatePresence>
                    {expandedState === state.state && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }}
                        className="overflow-hidden bg-cream border border-t-0 border-border rounded-b-[4px]"
                      >
                        {state.cities.map((city, idx) => (
                          <div key={city.name} className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-[20px_20px_20px_40px] border-b border-border hover:bg-blush transition-colors duration-150 gap-4">
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-[6px] h-[6px] rounded-full bg-gold" />
                                <h4 className="font-jost text-[16px] text-dark font-medium">{city.name}</h4>
                              </div>
                              <p className="font-jost text-[11px] text-muted tracking-[1px] pl-[14px]">
                                Meet & Greet · Limited to 55 Guests
                              </p>
                            </div>

                            <div className="flex-1 flex flex-col lg:items-center text-left lg:text-center">
                              <span className="font-jost text-[13px] text-muted italic">Venue TBA</span>
                              <span className="font-jost text-[12px] text-gold">{state.month} · Date TBA</span>
                            </div>

                            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end mt-2 lg:mt-0">
                              <span className={`text-[11px] px-[10px] py-[4px] rounded-[2px] font-semibold whitespace-nowrap ${getSeatColor(city.seats)}`}>
                                {city.seats} seats left
                              </span>
                              <button className="bg-dark text-gold px-[20px] py-[10px] text-[11px] uppercase tracking-[2px] rounded-[2px] hover:bg-gold hover:text-dark transition-all hover:scale-[1.02] shadow-md whitespace-nowrap font-semibold">
                                Get Tickets →
                              </button>
                            </div>

                          </div>
                        ))}
                        
                        {/* Notify Strip */}
                        <div className="bg-[#FFFAF7] p-[16px_40px] flex items-center">
                          <a href="#" className="flex items-center gap-2 text-gold font-jost text-[12px] uppercase tracking-[1px] font-semibold hover:text-dark transition-colors">
                            <i className="ri-notification-3-line text-[14px]"></i>
                            Notify me when {state.state} dates are confirmed →
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* PART 4: TICKET TIER REMINDER */}
      <section className="bg-[#2A1515] py-[60px] px-[6%] text-cream border-t border-gold/10">
        <div className="max-w-[1280px] mx-auto flex flex-col xl:flex-row justify-between items-center gap-10">
          
          <div className="flex-1 w-full text-center xl:text-left border-b xl:border-b-0 border-white/10 pb-8 xl:pb-0">
            <span className="text-gold text-[11px] uppercase tracking-[4px] font-semibold block mb-2">Choose Your Tier</span>
            <h2 className="font-cormorant font-light text-[52px] leading-tight">
              Every Seat is <em className="text-gold italic font-cormorant">Extraordinary</em>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-0 w-full xl:w-auto overflow-x-auto hide-scrollbar">
            {[
              { t: 'REGULAR', p: '$25–$50', b: 'Meet & personal photo' },
              { t: 'VIP', p: '$70–$100', b: 'Photo, video & after-party' },
              { t: 'VVIP', p: '$150–$200', b: 'Private contact + unlimited VC' }
            ].map((tier, i, arr) => (
              <div key={tier.t} className={`flex flex-col justify-center px-0 md:px-[40px] lg:px-[48px] border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 ${i === arr.length - 1 ? 'md:border-r-0 md:pr-0' : ''}`}>
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="font-cormorant text-gold text-[28px] leading-none">{tier.t}</h3>
                  <span className="font-jost text-[14px] text-cream font-light">{tier.p}</span>
                </div>
                <p className="font-jost text-[12px] text-cream opacity-60 mb-3">{tier.b}</p>
                <a href="#" className="font-jost text-gold text-[11px] uppercase tracking-[2px] font-semibold flex items-center gap-1 hover:text-white transition-colors w-max">
                  Book {tier.t} <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            ))}
          </div>

          <div className="w-full xl:w-auto flex justify-center mt-6 xl:mt-0">
            <button className="bg-gold text-dark px-[40px] py-[18px] text-[12px] font-semibold tracking-[2.5px] uppercase rounded-[2px] hover:bg-cream transition-colors shadow-lg whitespace-nowrap">
              View Full Ticket Details →
            </button>
          </div>
          
        </div>
      </section>

      {/* PART 5: VIP SUPPORT STRIP */}
      <section className="bg-cream py-[48px] px-[6%] border-t border-border">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-4 text-center md:text-left">
            <i className="ri-customer-service-2-line text-gold text-[32px]"></i>
            <div>
              <h3 className="font-cormorant text-dark text-[28px] md:text-[32px] leading-none mb-1">Need Help With Your Booking?</h3>
              <p className="font-jost text-[13px] text-muted">Our team is available Mon–Sat, 9am–7pm EST</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="bg-dark text-gold px-[28px] py-[14px] text-[12px] font-semibold tracking-[2.5px] uppercase rounded-[2px] hover:bg-gold hover:text-dark transition-colors shadow-md text-center">
              Contact Support
            </button>
            <button className="bg-transparent border border-dark text-dark px-[28px] py-[14px] text-[12px] font-semibold tracking-[2.5px] uppercase rounded-[2px] hover:bg-dark hover:text-gold transition-colors flex items-center justify-center gap-2">
              <i className="ri-whatsapp-line text-[16px]"></i> WhatsApp Us
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
