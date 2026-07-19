import React from 'react';
import { Phone, Mail, Globe, Facebook, Instagram, ArrowUp } from 'lucide-react';

interface FooterProps {
  onBackToTop: () => void;
}

export default function Footer({ onBackToTop }: FooterProps) {
  return (
    <footer id="footer" className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-sky-500 relative">
      {/* Decorative Back to Top Button inside footer or floating 
      <div className="absolute right-8 top-0 transform -translate-y-1/2">
        <button
          onClick={onBackToTop}
          className="p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          title="Back to Top"
        >
          <ArrowUp className="h-5 w-5 animate-bounce group-hover:animate-none" />
        </button>
      </div>*/}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-wider flex items-center space-x-2">
              <span className="text-sky-400">Blue</span>Haven
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Crafting extraordinary journeys and unforgettable stays across Sri Lanka's finest gems. Explore Ella, Galle, Sigiriya, and beyond with complete convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#hero" className="hover:text-sky-400 transition-colors duration-200">Home</a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-sky-400 transition-colors duration-200">Destinations</a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors duration-200">Our Services</a>
              </li>
              <li>
                <a href="#about" className="hover:text-sky-400 transition-colors duration-200">About Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">Contact Information</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3 text-slate-400 hover:text-sky-400 transition-colors">
                <Phone className="h-4 w-4 text-sky-400 flex-shrink-0" />
                <span>+04 11 123 456</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400 hover:text-sky-400 transition-colors">
                <Phone className="h-4 w-4 text-sky-400 flex-shrink-0" />
                <span>+94 77 789 321</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400 hover:text-sky-400 transition-colors">
                <Mail className="h-4 w-4 text-sky-400 flex-shrink-0" />
                <span>info@bluehaven.lk</span>
              </li>
            </ul>
          </div>

          {/* Location details */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">Headquarters</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              BlueHaven Travel & Tourism Ltd.<br />
              110 Coast Road, Galle Fort,<br />
              Sri Lanka
            </p>
          </div>
        </div>

        {/* Inner social and contact strip from image_cef6ba.jpg */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-slate-400">
            <span className="flex items-center space-x-1.5 hover:text-sky-400 transition-colors">
              <Phone className="h-3.5 w-3.5 text-sky-400" />
              <span>+04 11 123 456</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-sky-400 transition-colors">
              <Phone className="h-3.5 w-3.5 text-sky-400" />
              <span>+94 77 789 321</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-sky-400 transition-colors">
              <Globe className="h-3.5 w-3.5 text-sky-400" />
              <span>bluehaven.lk</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-sky-400 transition-colors">
              <Facebook className="h-3.5 w-3.5 text-sky-400" />
              <span>Bluehaven</span>
            </span>
          </div>

          <div className="text-slate-500 font-medium tracking-wide">
            &copy; 2026 Hasini Muthumala. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
