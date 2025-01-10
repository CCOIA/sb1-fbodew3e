import React from 'react';
import { motion } from 'framer-motion';

interface TimelineNodeProps {
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  index: number;
  isLast: boolean;
  total: number;
}

export default function TimelineNode({
  title,
  description,
  features,
  icon,
  color,
  index,
  total
}: TimelineNodeProps) {
  return (
    <motion.div
      className="relative flex-1 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Connection line to next node */}
      {index < total - 1 && (
        <motion.div
          className="absolute top-1/2 right-0 h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent"
          style={{ width: '100%', transform: 'translateX(50%)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        />
      )}

      {/* Node content */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Icon circle */}
        <motion.div
          className={`relative w-16 h-16 mx-auto mb-4 rounded-full ${color} bg-opacity-20 flex items-center justify-center group`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img src={icon} alt={title} className="w-8 h-8 relative z-10" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-400 mb-3">{description}</p>
          
          {/* Features */}
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <motion.li
                key={idx}
                className="text-xs text-gray-500"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.1 }}
              >
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}