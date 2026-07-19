import React from 'react';
import { Hotel } from '../types';
import { Sparkles, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface HotelCardProps {
  key?: React.Key | string | number;
  hotel: Hotel;
  onSelectHotel: (hotelName: string) => void;
}

export default function HotelCard({ hotel, onSelectHotel }: HotelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl overflow-hidden shadow-md border border-sky-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image with 4:3 ratio */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sky-50">
        <img
          src={hotel.image}
          alt={hotel.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-semibold text-slate-800">Premium</span>
        </div>
      </div>

      {/* Hotel Info */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h4 className="text-lg font-bold text-slate-800 leading-tight mb-2">
            {hotel.name}
          </h4>
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs">
            <MapPin className="h-3.5 w-3.5 text-sky-400" />
            <span className="capitalize">{hotel.destinationId.replace('-', ' ')} District</span>
          </div>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Experience exceptional luxury, personalized five-star hospitality, and exquisite views tailored perfectly to your Sri Lankan tour.
          </p>
        </div>

        {/* View Details / Book Now Option */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs font-semibold text-sky-500 tracking-wide uppercase">Fully Available</span>
          <button
            onClick={() => onSelectHotel(hotel.name)}
            className="px-5 py-2 text-xs font-bold text-sky-600 bg-sky-50 hover:bg-sky-500 hover:text-white rounded-xl border border-sky-100 transition-all duration-300 transform active:scale-95"
          >
            Select Hotel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
