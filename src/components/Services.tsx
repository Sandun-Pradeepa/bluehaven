import React from 'react';
import { Bed, Map, Car, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'HOTEL RESERVATION',
      description: 'Find and reserve the best hotels at your destination.',
      icon: Bed,
      color: 'text-sky-500 bg-sky-50'
    },
    {
      id: 2,
      title: 'CUSTOM TOUR PLANS',
      description: 'We design a personalized travel plan just for you.',
      icon: Map,
      color: 'text-sky-500 bg-sky-50'
    },
    {
      id: 3,
      title: 'TRANSPORT SERVICE',
      description: 'Safe and comfortable transport throughout your journey.',
      icon: Car,
      color: 'text-sky-500 bg-sky-50'
    },
    {
      id: 4,
      title: 'TOUR GUIDE SERVICE',
      description: 'Get help from experienced local guides.',
      icon: Compass,
      color: 'text-sky-500 bg-sky-50'
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight sm:text-4xl">
            Our Travel Services
          </h2>
          <div className="h-1 w-20 bg-sky-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="bg-sky-50/40 border border-sky-100 rounded-[2.5rem] p-8 shadow-sm flex items-center space-x-6 hover:shadow-md hover:bg-sky-50/75 hover:border-sky-200 transition-all duration-300"
              >
                {/* Icon Circle */}
                <div className={`p-5 rounded-2xl ${service.color} text-sky-500 flex-shrink-0 shadow-sm border border-sky-100`}>
                  <IconComponent className="h-8 w-8" />
                </div>

                {/* Text Description */}
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 tracking-wider mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
