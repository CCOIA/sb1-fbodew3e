import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from './useTexture';

interface PlanetProps {
  texture: string;
  color: string;
  rings?: boolean;
  moons?: number;
  atmosphere?: {
    color: string;
    intensity: number;
  };
  glow?: {
    color: string;
    intensity: number;
  };
}

export default function Planet({ 
  texture, 
  color, 
  rings, 
  moons, 
  atmosphere,
  glow = { color: '#8B5CF6', intensity: 0.5 } // Default glow values
}: PlanetProps) {
  const planetRef = useRef();
  const ringsRef = useRef();
  const atmosphereRef = useRef();
  const glowRef = useRef();
  const moonsRef = useRef([]);
  
  const planetTexture = useTexture(texture);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.2;
      planetRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
    }
    
    if (ringsRef.current) {
      ringsRef.current.rotation.z = time * 0.1;
      ringsRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.05);
    }
    
    if (atmosphereRef.current && atmosphere) {
      atmosphereRef.current.scale.setScalar(1 + Math.sin(time) * 0.1);
      atmosphereRef.current.material.opacity = atmosphere.intensity * (0.5 + Math.sin(time * 0.5) * 0.2);
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.2 + Math.sin(time * 0.3) * 0.1);
      glowRef.current.material.opacity = glow.intensity * (0.6 + Math.sin(time * 0.7) * 0.2);
    }
    
    moonsRef.current.forEach((moon, i) => {
      if (moon) {
        const angle = time * 0.5 + (i * Math.PI * 2) / moonsRef.current.length;
        const verticalOffset = Math.sin(time * 0.3 + i) * 0.2;
        const radius = 1.5;
        moon.position.x = Math.cos(angle) * radius;
        moon.position.y = verticalOffset;
        moon.position.z = Math.sin(angle) * radius;
        moon.rotation.y = time * 0.5;
      }
    });
  });

  const baseColor = color.split(' ')[2].split('-')[0];

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <spotLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color={glow.color}
          transparent
          opacity={glow.intensity}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhysicalMaterial
          map={planetTexture}
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.7}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </mesh>

      {/* Atmosphere */}
      {atmosphere && (
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshBasicMaterial
            color={atmosphere.color}
            transparent
            opacity={atmosphere.intensity}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Rings */}
      {rings && (
        <group ref={ringsRef} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <ringGeometry args={[1.2, 1.5, 64]} />
            <meshBasicMaterial
              color={baseColor}
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.3, 1.4, 64]} />
            <meshBasicMaterial
              color={atmosphere?.color || baseColor}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      )}

      {/* Moons */}
      {moons && Array.from({ length: moons }).map((_, i) => (
        <mesh
          key={i}
          ref={el => (moonsRef.current[i] = el)}
          position={[1.5, 0, 0]}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhongMaterial
            color={atmosphere?.color || "#ffffff"}
            emissive={atmosphere?.color || "#ffffff"}
            emissiveIntensity={0.3}
            shininess={100}
          />
        </mesh>
      ))}
    </group>
  );
}