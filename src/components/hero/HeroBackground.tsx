import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import HeroScene from './scene/HeroScene';

export default function HeroBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'black' }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 30, 60]} />
        <ScrollControls pages={3} damping={0.3}>
          <HeroScene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}