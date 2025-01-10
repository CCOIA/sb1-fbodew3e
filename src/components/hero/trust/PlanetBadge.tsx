import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Planet from './Planet';

interface PlanetBadgeProps {
  icon: any;
  title: string;
  description: string;
  color: string;
  texture: string;
  rings?: boolean;
  moons?: number;
  flag?: boolean;
  atmosphere?: {
    color: string;
    intensity: number;
  };
  glow?: {
    color: string;
    intensity: number;
  };
  index: number;
}

export default function PlanetBadge({
  icon: Icon,
  title,
  description,
  color,
  texture,
  rings,
  moons,
  flag,
  atmosphere,
  glow,
  index
}: PlanetBadgeProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        scale: 0,
        rotate: -180
      }}
      animate={{ 
        opacity: 1,
        scale: 1,
        rotate: 0
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="relative w-40 h-40"
    >
      {/* Planet Canvas */}
      <div className="absolute inset-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Planet
            texture={texture}
            color={color}
            rings={rings}
            moons={moons}
            atmosphere={atmosphere}
            glow={glow}
          />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: index * 0.2 + 0.3,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="relative mb-2"
        >
          <div className="relative bg-white/20 p-3 rounded-full backdrop-blur-sm">
            <Icon className="w-8 h-8 text-white" />
            {flag && (
              <motion.img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Quebec.svg"
                alt="Drapeau du Québec"
                className="absolute -right-2 -top-2 w-6 h-6 rounded-full border-2 border-white/20 bg-black/40 p-1"
                animate={{
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            )}
          </div>
        </motion.div>

        <div className="text-center z-10">
          <h3 className="text-sm font-bold text-white mb-1">
            {title}
          </h3>
          <p className="text-xs text-white/80">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}