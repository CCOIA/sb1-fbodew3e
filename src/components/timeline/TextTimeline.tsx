import React from 'react';
import { motion } from 'framer-motion';
import { timelineData } from './timelineData';

export default function TextTimeline() {
  return (
    <div className="mt-20 relative">
      <div className="relative overflow-x-auto py-8 px-4">
        <div className="flex items-stretch gap-8 max-w-7xl mx-auto">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex-1 min-w-[280px]"
            >
              {/* Card Container */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative h-full bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
                
                {/* Enhanced glass effect */}
                <div className="absolute inset-0 backdrop-blur-md" />

                {/* Content */}
                <div className="relative p-6 flex flex-col h-full z-10">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: index * 0.1
                    }}
                    className="mb-4"
                  >
                    <div className="relative inline-block">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-20 flex items-center justify-center relative z-10`}>
                        <img src={item.icon} alt={item.title} className="w-6 h-6" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex-grow">
                    <ul className="space-y-3">
                      {item.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.1 }}
                          className="flex items-center gap-3 text-sm text-gray-300"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item.color.split(' ')[1]} shadow-glow flex-shrink-0`} />
                          <span className="leading-tight">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Connection Line */}
                  {index < timelineData.length - 1 && (
                    <motion.div
                      className="absolute -right-4 top-1/2 w-8"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="h-0.5 w-full bg-gradient-to-r from-white/30 to-transparent" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
}