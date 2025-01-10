import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useTexture } from '../hero/trust/useTexture';

export default function TimelineNode3D({ title, color, index, total }) {
  const nodeRef = useRef();
  const planetRef = useRef();
  const ringsRef = useRef();
  const glowRef = useRef();
  
  const angle = (index / total) * Math.PI * 2;
  const radius = 3;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  
  const texture = useTexture(`noise-${(index % 4) + 1}`);

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
    
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.2 + Math.sin(time * 0.3) * 0.1);
      glowRef.current.material.opacity = 0.5 + Math.sin(time * 0.7) * 0.2;
    }
  });

  return (
    <group position={[x, 0, z]}>
      <group ref={nodeRef}>
        {/* Planet */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshPhysicalMaterial
            map={texture}
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            metalness={0.5}
            roughness={0.7}
            clearcoat={0.5}
            clearcoatRoughness={0.3}
          />
        </mesh>

        {/* Glow effect */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Rings */}
        <group ref={ringsRef} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <ringGeometry args={[0.4, 0.5, 64]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>

        {/* Title Text */}
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#4C1D95"
        >
          {title}
        </Text>
      </group>
    </group>
  );
}