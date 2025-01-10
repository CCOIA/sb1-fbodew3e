import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NebulaField({ count = 5 }) {
  const nebulae = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    nebulae.current.forEach((nebula, i) => {
      if (nebula) {
        nebula.rotation.z = time * 0.05 + i * Math.PI / count;
        nebula.material.opacity = 0.1 + Math.sin(time * 0.5 + i) * 0.05;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (nebulae.current[i] = el)}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial
            color="#1a1a1a"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}