import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import TimelineScene from './TimelineScene';
import TextTimeline from './TextTimeline';

export default function IntegrationTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          {/* Left theatrical fog */}
          <motion.div
            className="absolute -left-32 top-0 bottom-0 w-64"
            animate={{
              opacity: [0.4, 0.6, 0.4],
              x: [-10, 0, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.2), transparent)',
                filter: 'blur(40px)',
                transform: 'skewY(-45deg)',
              }}
            />
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at left, rgba(139, 92, 246, 0.15), transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
          </motion.div>

          {/* Right theatrical fog */}
          <motion.div
            className="absolute -right-32 top-0 bottom-0 w-64"
            animate={{
              opacity: [0.4, 0.6, 0.4],
              x: [10, 0, 10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1, // Offset for asynchronous movement
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(-90deg, rgba(139, 92, 246, 0.2), transparent)',
                filter: 'blur(40px)',
                transform: 'skewY(45deg)',
              }}
            />
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at right, rgba(139, 92, 246, 0.15), transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
          </motion.div>

          {/* Center glow (existing) */}
          <div className="absolute inset-0 -top-20 -bottom-20">
            <div 
              className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-purple-500/5 to-transparent"
              style={{
                background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2), transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
          </div>

          {/* Animated center glow (existing) */}
          <motion.div
            className="absolute inset-0 -top-20 -bottom-20"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <div 
              className="absolute inset-0 bg-purple-500/10"
              style={{
                background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15), transparent 60%)',
                filter: 'blur(30px)',
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h2 className="text-4xl font-bold text-white mb-4 text-shadow-lg">
              Notre Architecture d'Intégration
            </h2>
            <p className="text-xl text-gray-300">
              Une solution complète et interconnectée
            </p>
          </motion.div>
        </div>

        <div className="relative h-[800px] rounded-2xl overflow-hidden">
          {/* 3D Scene */}
          <Canvas
            camera={{ position: [0, 2, 5], fov: 75 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <TimelineScene />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>

        {/* Text-based timeline */}
        <TextTimeline />
      </div>
    </section>
  );
}