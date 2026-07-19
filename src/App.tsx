import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DestinationCard from './components/DestinationCard';
import HotelCard from './components/HotelCard';
import BookingForm from './components/BookingForm';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import { Destination, Hotel, Booking } from './types';
import { DESTINATIONS } from './data/destinationsData'; // client side fallback data
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Info,
  Check,
  ChevronsRight,
  Compass,
  Bookmark,
  ChevronRight,
  Sparkles,
  Award,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Navigation / Detail state
  const [view, setView] = useState<'home' | 'destination'>('home');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeData, setActiveData] = useState<{ destination: Destination; hotels: Hotel[] } | null>(null);
  const [loadingActive, setLoadingActive] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<string>('');

  // Back to Top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Refs for smooth scrolling
  const hotelsRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const destinationsGridRef = useRef<HTMLDivElement>(null);

  // Fetch all destinations on mount
  useEffect(() => {
    async function fetchDestinations() {
      try {
        const response = await fetch('/api/destinations');
        if (!response.ok) {
          throw new Error('Could not fetch destinations');
        }
        const data = await response.json();
        setDestinations(data);
      } catch (err: any) {
        console.warn('Backend API not ready yet or failed, falling back to static local data.', err);
        //setDestinations(DESTINATIONS);
        setError("Database connection failed!");
      } finally {
        setLoading(false);
      }
    }

    fetchDestinations();
  }, []);

  // Fetch single destination details when activeId changes
  useEffect(() => {
    if (!activeId) return;

    async function fetchDestinationDetails() {
      setLoadingActive(true);
      setSelectedHotel('');
      try {
        const response = await fetch(`/api/destinations/${activeId}`);
        if (!response.ok) {
          throw new Error('Could not fetch destination details');
        }
        const data = await response.json();
        setActiveData(data);
      } catch (err) {
        console.warn('Backend API fetch details failed, falling back to local filter.', err);
        /* Fallback local matching
        const foundDest = DESTINATIONS.find(d => d.id === activeId);
        if (foundDest) {
          // Mock local hotels for this destination
          const localHotels = [
            {
              id: `h-${activeId}-1`,
              name: activeId === 'ella' ? 'Dream Cliff Hotel' :
                activeId === 'galle' ? 'Radisson Blu Resort' :
                  activeId === 'nuwara-eliya' ? "Jetwing St. Andrew's Hotel" :
                    activeId === 'sigiriya' ? 'Aliya Resort & Spa' :
                      activeId === 'mirissa' ? 'Mandara Resort' :
                        activeId === 'yala' ? 'Uga Chena Huts' :
                          activeId === 'yapahuwa' ? 'Paradise Hotel' : 'Diyaluma INN',
              image: activeId === 'ella' ? 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80' :
                activeId === 'galle' ? 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80' :
                  activeId === 'nuwara-eliya' ? 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80' :
                    activeId === 'sigiriya' ? 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80' :
                      activeId === 'mirissa' ? 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=600&q=80' :
                        activeId === 'yala' ? 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80' :
                          activeId === 'yapahuwa' ? 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=600&q=80' : 'https://images.unsplash.com/photo-1432303491130-c3a529368953?auto=format&fit=crop&w=600&q=80',
              destinationId: activeId
            },
            {
              id: `h-${activeId}-2`,
              name: activeId === 'ella' ? 'EKHO Hotel' :
                activeId === 'galle' ? 'Amangalla Hotel' :
                  activeId === 'nuwara-eliya' ? 'Araliya Green Hills Hotel' :
                    activeId === 'sigiriya' ? 'Jetwing Vil Uyana' :
                      activeId === 'mirissa' ? 'Randiya Sea View Hotel' :
                        activeId === 'yala' ? 'Wild Coast Tented Lodge' :
                          activeId === 'yapahuwa' ? 'Ranweli Holiday Village' : 'Living Heritage',
              image: activeId === 'ella' ? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' :
                activeId === 'galle' ? 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80' :
                  activeId === 'nuwara-eliya' ? 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=80' :
                    activeId === 'sigiriya' ? 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80' :
                      activeId === 'mirissa' ? 'https://images.unsplash.com/photo-1529290130-4ca3753253ae?auto=format&fit=crop&w=600&q=80' :
                        activeId === 'yala' ? 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80' :
                          activeId === 'yapahuwa' ? 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80' : 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80',
              destinationId: activeId
            }
          ];
          setActiveData({ destination: foundDest, hotels: localHotels });
        }*/
      } finally {
        setLoadingActive(false);
      }
    }

    fetchDestinationDetails();
  }, [activeId]);

  // Monitor scroll height for floating back to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (newView: 'home' | 'destination', id?: string) => {
    setView(newView);
    if (id) {
      setActiveId(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveId(null);
      setActiveData(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectHotel = (hotelName: string) => {
    setSelectedHotel(hotelName);
    // Smooth scroll to the booking form
    setTimeout(() => {
      scrollToSection(bookingRef);
    }, 150);
  };

  const handleBookingSuccess = (booking: any) => {
    console.log('Booking was successful', booking);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-800 flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Header */}
      <Header
        onNavigate={handleNavigate}
        onExploreClick={() => {
          if (view === 'home') {
            scrollToSection(destinationsGridRef);
          } else {
            handleNavigate('home');
            setTimeout(() => {
              scrollToSection(destinationsGridRef);
            }, 300);
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <section id="hero" className="relative bg-gradient-to-br from-sky-50/70 via-white to-sky-50/20 py-16 sm:py-24 overflow-hidden border-b border-sky-100/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Typography Area */}
                    <div className="lg:col-span-6 space-y-8 text-center lg:text-left z-10">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="space-y-4"
                      >
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-100/80 text-sky-600 text-xs font-bold uppercase tracking-wider shadow-sm border border-sky-200">
                          <Sparkles className="h-3 w-3 fill-sky-500 text-sky-500" />
                          <span>Elite Sri Lankan Expeditions</span>
                        </span>

                        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
                          Explore the World, <br />
                          <span className="text-sky-500 inline-block relative my-1">
                            One Journey
                          </span> <br />
                          at a Time
                        </h1>

                        <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                          Discover pristine beaches, misty tea plantations, ancient citadel rocks, and luxury forest lodges. Seamless booking, fully personalized for you.
                        </p>
                      </motion.div>

                      {/* Explore Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <button
                          onClick={() => scrollToSection(destinationsGridRef)}
                          className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-sky-100 hover:shadow-sky-200 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                        >
                          Explore Now
                        </button>
                      </motion.div>
                    </div>

                    {/* Traveler Image Column */}
                    <div className="lg:col-span-6 relative flex justify-center lg:justify-end z-10">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                        className="relative w-full max-w-md sm:max-w-lg aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white bg-sky-100"
                      >
                        {/* Premium high-quality traveler girl background matching description */}
                        <img
                          src="./src/assets/images/beautifulseaview.gif"
                          alt="Traveler with backpack exploring map"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transform scale-105 hover:scale-100 duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/10 via-transparent to-transparent" />
                      </motion.div>

                      {/* Accent Floating Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="absolute bottom-6 left-6 sm:left-12 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-sky-100 flex items-center space-x-3"
                      >
                        <div className="bg-sky-500 text-white p-2.5 rounded-xl">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Top Rated</p>
                          <p className="text-sm font-bold text-slate-800">#1 Sri Lankan Travel Agency</p>
                        </div>
                      </motion.div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Popular Destinations Grid Section */}
              <section
                id="destinations"
                ref={destinationsGridRef}
                className="py-20 sm:py-28 bg-white"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16 space-y-3">
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight sm:text-4xl">
                      Popular Destinations
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
                      Select your favorite getaway. Explore historic forts, hike steep cliffs, or track rare leopards in the safari.
                    </p>
                    <div className="h-1 w-20 bg-sky-500 mx-auto rounded-full mt-2" />
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                      <div className="h-12 w-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-slate-400 font-medium">Loading premium getaways...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {destinations.map((destination, index) => (
                        <DestinationCard
                          key={destination.id}
                          destination={destination}
                          onClick={(id) => handleNavigate('destination', id)}
                          index={index}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Travel Services Section */}
              <Services />

              {/* About Us */}
              <AboutUs />
            </motion.div>
          ) : (
            /* Dynamic Destination Details View */
            <motion.div
              key="destination-details-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white"
            >
              {loadingActive || !activeData ? (
                <div className="flex flex-col items-center justify-center py-40 space-y-4 min-h-[60vh]">
                  <div className="h-12 w-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-slate-400 font-medium">Loading destination catalog & bookings...</p>
                </div>
              ) : (
                <div className="space-y-16 pb-24">
                  {/* Hero Banner Section */}
                  <div className="relative h-[50vh] sm:h-[65vh] bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={activeData.destination.coverImage}
                      alt={activeData.destination.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 filter brightness-90 saturate-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/30" />

                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
                      <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-md"
                      >
                        {activeData.destination.title}
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-sky-100 text-base sm:text-xl font-medium tracking-wide max-w-2xl mx-auto drop-shadow-sm"
                      >
                        "{activeData.destination.tagline}"
                      </motion.p>

                      {/* Panoramic Banner Action Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap justify-center items-center gap-4 pt-4"
                      >
                        <button
                          onClick={() => scrollToSection(hotelsRef)}
                          className="px-6 py-2.5 rounded-full bg-white text-slate-800 font-bold text-sm shadow hover:bg-slate-50 transition-all duration-200 transform active:scale-95"
                        >
                          View Hotel Options
                        </button>
                        <button
                          onClick={() => scrollToSection(bookingRef)}
                          className="px-6 py-2.5 rounded-full bg-sky-500 text-white font-bold text-sm shadow-md hover:bg-sky-600 transition-all duration-200 transform active:scale-95"
                        >
                          Book A Tour
                        </button>
                        <button
                          onClick={() => handleNavigate('home')}
                          className="px-6 py-2.5 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-200 font-bold text-sm shadow hover:bg-slate-800 transition-all duration-200 transform active:scale-95 flex items-center space-x-1"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          <span>Go Back</span>
                        </button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Destination Content Details Body */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                    {/* About the Destination text block */}
                    <div className="space-y-4 max-w-4xl">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                        About the Destination
                      </h2>
                      <p className="text-slate-600 text-base leading-relaxed font-medium">
                        {activeData.destination.description}
                      </p>
                    </div>

                    {/* Two Column Structure: Highlights (Timeline) & Travel Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">

                      {/* Left: Highlights (Timeline) */}
                      <div className="lg:col-span-6 space-y-8">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Highlights</h3>
                          <div className="h-0.5 w-12 bg-sky-500 rounded-full" />
                        </div>

                        <div className="relative pl-8 border-l-2 border-sky-100 space-y-8 ml-3">
                          {activeData.destination.highlights.map((highlight, idx) => (
                            <div key={idx} className="relative">
                              {/* Circle indicator node */}
                              <span className="absolute -left-[41px] top-1.5 bg-sky-500 border-4 border-white h-6 w-6 rounded-full flex items-center justify-center shadow-sm">
                                <Check className="h-2.5 w-2.5 text-white stroke-[3px]" />
                              </span>
                              <div className="space-y-1">
                                <h4 className="font-bold text-slate-800 text-base">{highlight}</h4>
                                <p className="text-xs text-slate-400 font-medium">Top recommendation for travelers looking to experience {activeData.destination.title.replace(', Sri Lanka', '')}'s finest treasures.</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Travel Info */}
                      <div className="lg:col-span-6 space-y-8">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Travel Info</h3>
                          <div className="h-0.5 w-12 bg-sky-500 rounded-full" />
                        </div>

                        <div className="relative pl-8 border-l-2 border-sky-100 space-y-8 ml-3">
                          {/* Distance */}
                          <div className="relative">
                            <span className="absolute -left-[41px] top-1.5 bg-sky-500 border-4 border-white h-6 w-6 rounded-full shadow-sm" />
                            <div className="space-y-1">
                              <h4 className="font-extrabold text-slate-400 text-xs uppercase tracking-wider">Distance from Colombo</h4>
                              <p className="font-bold text-slate-800 text-base">{activeData.destination.travelInfo.distance}</p>
                            </div>
                          </div>

                          {/* Best Time to Visit */}
                          <div className="relative">
                            <span className="absolute -left-[41px] top-1.5 bg-sky-500 border-4 border-white h-6 w-6 rounded-full shadow-sm" />
                            <div className="space-y-1">
                              <h4 className="font-extrabold text-slate-400 text-xs uppercase tracking-wider">Best time to visit</h4>
                              <p className="font-bold text-slate-800 text-base">{activeData.destination.travelInfo.bestTime}</p>
                            </div>
                          </div>

                          {/* Ideal For */}
                          <div className="relative">
                            <span className="absolute -left-[41px] top-1.5 bg-sky-500 border-4 border-white h-6 w-6 rounded-full shadow-sm" />
                            <div className="space-y-1">
                              <h4 className="font-extrabold text-slate-400 text-xs uppercase tracking-wider">Ideal for</h4>
                              <p className="font-bold text-slate-800 text-base leading-relaxed">{activeData.destination.travelInfo.idealFor}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Available Hotels Grid */}
                    <div id="hotels" ref={hotelsRef} className="space-y-8 pt-10">
                      <div className="text-center sm:text-left space-y-2">
                        <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                          Available Hotels
                        </h3>
                        <div className="h-1 w-16 bg-sky-500 rounded-full" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                        {activeData.hotels.map((hotel) => (
                          <HotelCard
                            key={hotel.id}
                            hotel={hotel}
                            onSelectHotel={handleSelectHotel}
                          />
                        ))}
                      </div>

                      <div className="text-center pt-4">
                        <button
                          onClick={() => {
                            alert("Contact our BlueHaven Travel Desk to see additional 5-star hotel partners for this location!");
                          }}
                          className="px-6 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition-colors"
                        >
                          Explore More Hotels
                        </button>
                      </div>
                    </div>

                    {/* Booking Form Block */}
                    <div id="booking-form" ref={bookingRef} className="pt-8">
                      <BookingForm
                        destinationId={activeData.destination.id}
                        destinationTitle={activeData.destination.title}
                        hotelOptions={activeData.hotels.map(h => h.name)}
                        selectedHotel={selectedHotel}
                        onSuccess={handleBookingSuccess}
                      />
                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating back-to-top button on bottom right */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1, y: -4 }}
          onClick={handleBackToTop}
          className="fixed bottom-6 right-6 p-3 bg-sky-500 text-white rounded-full shadow-xl hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300 z-50 transform hover:-translate-y-1 transition-all cursor-pointer"
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}

      {/* Footer */}
      <Footer onBackToTop={handleBackToTop} />
    </div>
  );
}
