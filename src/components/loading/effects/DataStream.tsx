import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DataStream() {
  const streamRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = streamRef.current.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const idx = i / 3;
      positions[i + 1] -= 0.05;
      
      if (positions[i + 1] < -5) {
        positions[i + 1] = 5;
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
      }
    }

    streamRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={streamRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={new Float32Array(600).map(() => (Math.random() - 0.5) * 10)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#8B5CF6"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}