import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import RocketScene from '../rocket/RocketScene';
import AudioWaveLoader from '../loaders/AudioWaveLoader';

interface LaunchPhaseProps {
  progress: number;
}

export default function LaunchPhase({ progress }: LaunchPhaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full relative"
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <RocketScene progress={progress} />
      </Canvas>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-md">
        <AudioWaveLoader />
      </div>
    </motion.div>
  );
}