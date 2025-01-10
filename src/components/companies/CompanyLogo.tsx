import React from 'react';
import { motion } from 'framer-motion';

interface CompanyLogoProps {
  name: string;
  description: string;
  logo: string;
  color: string;
  index: number;
}

export default function CompanyLogo({ name, description, logo, color, index }: CompanyLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="inline-flex flex-col items-center justify-center p-6 min-w-[200px] group relative"
    >
      {/* Enhanced background effects */}
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r ${color}`}
        style={{
          filter: 'blur(20px)',
          transform: 'scale(0.8)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Logo container with enhanced effects */}
      <motion.div 
        className="relative mb-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm"
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.5 }}
      >
        {/* Dynamic glow effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${color} rounded-xl opacity-0 group-hover:opacity-20`}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ filter: 'blur(10px)' }}
        />

        {/* Logo image with enhanced effects */}
        <motion.img
          src={logo}
          alt={`${name} logo`}
          className="w-12 h-12 relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          style={{ filter: 'brightness(1.2) contrast(1.2)' }}
          whileHover={{
            scale: 1.1,
            rotate: 360,
            transition: { duration: 0.8 }
          }}
        />
      </motion.div>

      {/* Text content with enhanced animations */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h3 
          className="text-white font-semibold mb-1"
          whileHover={{ scale: 1.05 }}
        >
          {name}
        </motion.h3>
        <motion.p 
          className="text-purple-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        >
          {description}
        </motion.p>
      </motion.div>

      {/* Particle effects on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 50%)',
            'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.1), transparent 50%)',
            'radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1), transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 50%)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
}