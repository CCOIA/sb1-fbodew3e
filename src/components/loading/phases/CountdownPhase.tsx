import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useCountdown } from '../hooks/useCountdown';
import SupernovaEffect from '../effects/SupernovaEffect';

export default function CountdownPhase() {
  const count = useCountdown(3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center"
    >
      <div className="relative w-full h-96">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <SupernovaEffect progress={60} />
        </Canvas>
      </div>

      <motion.div
        key={count}
        initial={{ scale: 2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl md:text-8xl font-bold text-white mb-8"
      >
        {count}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-4xl font-bold text-white"
      >
        Décollage dans...
      </motion.h2>
    </motion.div>
  );
}