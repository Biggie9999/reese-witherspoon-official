import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuoteStrip from './components/QuoteStrip';
import About from './components/About';
import Gallery from './components/Gallery';
import Tour from './components/Tour';
import Tickets from './components/Tickets';
import BookingForm from './components/BookingForm';
import Donations from './components/Donations';
import Sponsors from './components/Sponsors';
import Invest from './components/Invest';
import Notify from './components/Notify';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          {/* Scroll Progress Bar */}
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

          <Navbar />

          <main>
            <Hero />
            <QuoteStrip />
            <About />
            <Gallery />
            <Tour />
            <Tickets />
            <BookingForm />
            <Donations />
            <Sponsors />
            <Invest />
            <Notify />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
