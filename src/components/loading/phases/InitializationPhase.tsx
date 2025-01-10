import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import SupernovaEffect from '../effects/SupernovaEffect';

export default function InitializationPhase() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center"
    >
      <div className="relative w-full h-96">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <SupernovaEffect progress={30} />
        </Canvas>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-4xl font-bold text-white mt-8"
      >
        Initialisation du Système
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex gap-4"
      >
        {['Connexion', 'Analyse', 'Configuration'].map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-purple-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            />
            <span className="text-gray-400 text-sm">{step}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}