import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import { testimonialData } from './testimonialData';

export default function TestimonialsBanner() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative mb-16"
        >
          {/* Enhanced glow effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-300">
            Découvrez comment nos clients transforment leur entreprise
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialData.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}