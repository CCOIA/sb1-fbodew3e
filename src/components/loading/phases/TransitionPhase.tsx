import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import SupernovaEffect from '../effects/SupernovaEffect';

export default function TransitionPhase({ progress }: { progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full relative"
    >
      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <SupernovaEffect progress={progress} />
      </Canvas>

      {/* Loading Text */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-white mb-4"
        >
          Initialisation du système
        </motion.div>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}