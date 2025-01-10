import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface TimelineStepProps {
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  index: number;
  isLast: boolean;
  total: number;
}

export default function TimelineStep({
  title,
  description,
  features,
  icon,
  color,
  index,
  isLast,
  total
}: TimelineStepProps) {
  const angle = (index / total) * Math.PI;
  const radius = 20;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -90 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 50,
        damping: 20
      }}
      className="relative w-[320px] transform-style-3d will-change-transform"
      style={{
        transform: `translateX(${x}px) translateZ(${z}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden"
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 15,
        z: 50,
        transition: { 
          duration: 0.3,
          ease: "easeOut"
        }
      }}
    >
      {/* Connection dot */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform-style-3d will-change-transform">
        <motion.div 
          className={`w-4 h-4 rounded-full ${color} shadow-lg shadow-purple-500/50`}
          initial={{ scale: 0, rotateY: -180 }}
          whileInView={{ scale: 1, rotateY: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: index * 0.1 
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        className="mt-8 h-[400px] bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden transform-style-3d will-change-transform"
        style={{ 
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          perspective: "1000px"
        }}
      >
        <div className="relative p-6 h-full flex flex-col">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent transform translate-z-[-10px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)] transform translate-z-[-5px]" />
          
          {/* Content */}
          <div className="relative transform-style-3d will-change-transform flex flex-col h-full">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${color} bg-opacity-20 mb-4 transform translate-z-[20px]`}>
              <img src={icon} alt={title} className="w-8 h-8" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 transform translate-z-[15px]">{title}</h3>
            <p className="text-gray-300 mb-6 transform translate-z-[10px]">{description}</p>
            
            <ul className="space-y-3 transform-style-3d flex-grow">
              {features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + idx * 0.1,
                    ease: "easeOut"
                  }}
                  className="text-gray-400 flex items-center gap-2 transform translate-z-[5px]"
                >
                  <span className={`w-2 h-2 ${color} rounded-full`} />
                  <span className="text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Connection arrow */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotateY: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.5,
            ease: "easeOut"
          }}
          className="absolute top-0 -right-6 -translate-y-1/2 transform-style-3d will-change-transform"
        >
          <ArrowRight className="w-6 h-6 text-purple-500 transform translate-z-[30px]" />
        </motion.div>
      )}
    </motion.div>
  );
}