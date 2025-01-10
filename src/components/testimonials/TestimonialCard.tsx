import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  companyLogo: string;
  avatar: string;
  quote: string;
  rating: number;
  index: number;
  metrics?: {
    label: string;
    value: string;
  };
}

export default function TestimonialCard({
  name,
  role,
  company,
  companyLogo,
  avatar,
  quote,
  rating,
  index,
  metrics
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      {/* Card Background with Enhanced Effects */}
      <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 h-full border border-purple-500/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_70%)]" />
        
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative">
          {/* Quote Icon */}
          <div className="absolute -top-2 -left-2">
            <Quote className="w-8 h-8 text-purple-500/20" />
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-purple-500/20">
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-transparent" />
            </motion.div>

            {/* Name and Role */}
            <div>
              <h3 className="text-lg font-semibold text-white">{name}</h3>
              <p className="text-sm text-gray-400">{role}</p>
              <div className="flex items-center gap-2 mt-1">
                <img
                  src={companyLogo}
                  alt={company}
                  className="h-4 object-contain"
                />
                <span className="text-xs text-gray-500">{company}</span>
              </div>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="text-gray-300 mb-6">
            "{quote}"
          </blockquote>

          {/* Metrics */}
          {metrics && (
            <div className="bg-purple-500/5 rounded-xl p-4 mb-6">
              <div className="text-2xl font-bold text-white mb-1">
                {metrics.value}
              </div>
              <div className="text-sm text-gray-400">
                {metrics.label}
              </div>
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.svg
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + i * 0.1 }}
                className={`w-5 h-5 ${i < rating ? 'text-purple-500' : 'text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}