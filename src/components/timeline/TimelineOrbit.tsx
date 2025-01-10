import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TimelineOrbit() {
  const orbitRef = useRef();
  const particlesRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (orbitRef.current) {
      orbitRef.current.rotation.z = time * 0.1;
      orbitRef.current.material.opacity = 0.3 + Math.sin(time * 0.5) * 0.1;
    }
    
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const angle = (i / positions.length) * Math.PI * 2 + time * 0.2;
        const radius = 3 + Math.sin(time + i) * 0.1; // Reduced from 4
        positions[i] = Math.cos(angle) * radius;
        positions[i + 2] = Math.sin(angle) * radius;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Orbit ring */}
      <mesh ref={orbitRef}>
        <ringGeometry args={[2.8, 3.2, 128]} /> {/* Reduced from [3.8, 4.2] */}
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbit particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={new Float32Array(300).map((_, i) => {
              const angle = (i / 100) * Math.PI * 2;
              const radius = 3; // Reduced from 4
              return i % 3 === 1 ? 0 : Math.cos(angle) * radius * (i % 3 === 0 ? 1 : Math.sin(angle));
            })}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03} // Reduced from 0.05
          color="#8B5CF6"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}