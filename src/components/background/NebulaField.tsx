import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NebulaField({ count = 5 }) {
  const nebulae = useRef([]);

  useFrame((state) => {
    nebulae.current.forEach((nebula, i) => {
      if (nebula) {
        const time = state.clock.elapsedTime;
        nebula.rotation.z += 0.0001 * (i + 1);
        // Reduce opacity and make it more subtle
        nebula.material.opacity = 0.05 + Math.sin(time * 0.5 + i) * 0.02;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        // Calculate positions to avoid the center area
        const angle = (i / count) * Math.PI * 2;
        const radius = 15 + Math.random() * 5; // Push nebulae further out
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 20;

        return (
          <mesh
            key={i}
            ref={(el) => (nebulae.current[i] = el)}
            position={[x, y, z]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            <planeGeometry args={[15, 15]} />
            <meshBasicMaterial
              color="#1a1a1a"
              transparent
              opacity={0.05}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}