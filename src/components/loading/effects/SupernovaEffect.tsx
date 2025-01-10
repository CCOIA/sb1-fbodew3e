import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SupernovaEffect({ progress }: { progress: number }) {
  const coreRef = useRef();
  const shockwaveRef = useRef();
  const particlesRef = useRef();
  const energyRingsRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const intensity = progress / 100;

    // Core pulsation
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.2 * intensity);
      coreRef.current.material.emissiveIntensity = 2 + Math.sin(time * 5) * intensity;
    }

    // Shockwave expansion
    if (shockwaveRef.current) {
      shockwaveRef.current.scale.setScalar(1 + intensity * 2);
      shockwaveRef.current.material.opacity = Math.max(0, 0.5 - intensity * 0.5);
    }

    // Particle movement
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const angle = time + i;
        const distance = (1 + intensity) * (1 + Math.sin(time + i) * 0.5);
        positions[i] = Math.cos(angle) * distance;
        positions[i + 1] = Math.sin(angle * 0.5) * distance;
        positions[i + 2] = Math.sin(angle) * distance;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Energy rings rotation
    if (energyRingsRef.current) {
      energyRingsRef.current.rotation.z = time * 0.5;
      energyRingsRef.current.rotation.x = Math.sin(time * 0.2) * 0.5;
    }
  });

  return (
    <group>
      {/* Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhongMaterial
          color="#8B5CF6"
          emissive="#4C1D95"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Shockwave */}
      <mesh ref={shockwaveRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.5}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Energy particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={500}
            array={new Float32Array(1500).map(() => (Math.random() - 0.5) * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#8B5CF6"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Energy rings */}
      <group ref={energyRingsRef}>
        {[1, 1.5, 2].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 4 * i, 0, 0]}>
            <ringGeometry args={[radius, radius + 0.1, 64]} />
            <meshBasicMaterial
              color="#8B5CF6"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}