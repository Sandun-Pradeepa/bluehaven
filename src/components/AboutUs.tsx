import React from 'react';
import { motion } from 'motion/react';

export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight sm:text-4xl">
            About Us
          </h2>
          <div className="h-1 w-20 bg-sky-500 mx-auto mt-4 rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-sky-50/40 border border-sky-100 rounded-[2.5rem] p-8 sm:p-12 shadow-sm text-center hover:shadow-md hover:bg-sky-50/60 transition-all duration-300"
        >
          <div className="space-y-6 max-w-4xl mx-auto">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              BlueHaven is a trusted travel and tourism platform dedicated to creating memorable and stress-free travel experiences. We specialize in providing high-quality services such as hotel reservations, custom tour planning, reliable transport solutions, and professional tour guide services.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Our goal is to make every journey smooth, comfortable, and unforgettable by connecting travelers with the most beautiful and exciting destinations. With a focus on quality, convenience, and customer satisfaction, BlueHaven helps you explore the world with confidence and ease.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
