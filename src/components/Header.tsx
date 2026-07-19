import React from 'react';
import { Compass, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'destination', id?: string) => void;
  onExploreClick: () => void;
}

export default function Header({ onNavigate, onExploreClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    onNavigate('home');
    setMobileMenuOpen(false);

    // Smooth scroll to section
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="text-white rounded-xl shadow-md group-hover:bg-sky-600 transition-all duration-300 transform group-hover:rotate-12">
              {/*Compass className="h-6 w-6" id="logo-icon" />*/}
              <img src="./src/assets/images/logo.png" alt="logo-icon" className="h-15 w-15" id="logo-icon" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800">
              Blue<span className="text-sky-500">Haven</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="text-slate-600 hover:text-sky-500 font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="text-slate-600 hover:text-sky-500 font-medium transition-colors duration-200"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="text-slate-600 hover:text-sky-500 font-medium transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'footer')}
              className="text-slate-600 hover:text-sky-500 font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* Action Button */}
          <div className="hidden md:block">
            <button
              onClick={onExploreClick}
              className="px-6 py-2.5 rounded-full border border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white font-medium transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-sky-100"
            >
              Explore Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-sky-500 p-2 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-sky-100 py-4 px-6 space-y-4 shadow-lg animate-fadeIn">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="block text-lg font-medium text-slate-700 hover:text-sky-500 py-1"
          >
            Home
          </a>
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, 'services')}
            className="block text-lg font-medium text-slate-700 hover:text-sky-500 py-1"
          >
            Services
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            className="block text-lg font-medium text-slate-700 hover:text-sky-500 py-1"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'footer')}
            className="block text-lg font-medium text-slate-700 hover:text-sky-500 py-1"
          >
            Contact
          </a>
          <div className="pt-2 border-t border-sky-50/50">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExploreClick();
              }}
              className="w-full text-center py-2.5 rounded-full bg-sky-500 text-white font-medium shadow-md hover:bg-sky-600 active:scale-95 transition-all"
            >
              Explore Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
