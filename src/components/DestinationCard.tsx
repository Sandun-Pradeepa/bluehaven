import React from 'react';
import { Destination } from '../types';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface DestinationCardProps {
  key?: React.Key | string | number;
  destination: Destination;
  onClick: (id: string) => void;
  index: number;
}

export default function DestinationCard({ destination, onClick, index }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ 
        y: -8,
        scale: 1.05,
        transition: { duration: 0.25, ease: "easeOut" }
      }}
      onClick={() => onClick(destination.id)}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-sky-50 cursor-pointer group flex flex-col h-full transform transition-all duration-300"
    >
      {/* Image Container with aspect ratio 4:3 for card thumbnail as in image-generation skill */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sky-50">
        <img
          src={destination.thumbnail}
          alt={destination.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-sky-500 transition-colors duration-200 leading-snug">
            {destination.title}
          </h3>
          <p className="text-slate-500 text-sm mt-2 line-clamp-2 leading-relaxed">
            {destination.tagline}
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center text-sky-500 font-semibold text-sm mt-4 group/btn">
          <span className="mr-1.5 group-hover/btn:mr-2.5 transition-all duration-200">Book A Tour</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );
}
