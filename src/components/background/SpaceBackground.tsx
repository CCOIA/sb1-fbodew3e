import React from 'react';
import { Canvas } from '@react-three/fiber';
import SpaceScene from './SpaceScene';
import { ScrollControls, Preload } from '@react-three/drei';

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'black' }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 30, 60]} />
        <ScrollControls pages={2} damping={0.3}>
          <SpaceScene />
        </ScrollControls>
        <Preload all />
      </Canvas>
    </div>
  );
}