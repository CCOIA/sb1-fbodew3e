import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function PlanetSurface() {
  const surfaceRef = useRef();
  const scroll = useScroll();

  // Create a noise texture for the terrain
  const noiseTexture = new THREE.DataTexture(
    new Uint8Array(256 * 256 * 4).map(() => Math.random() * 255),
    256,
    256,
    THREE.RGBAFormat
  );
  noiseTexture.needsUpdate = true;

  useFrame((state) => {
    const scrollProgress = scroll.offset;
    if (surfaceRef.current) {
      // Move the surface up as user scrolls down
      surfaceRef.current.position.y = -20 + scrollProgress * 15;
      // Rotate slightly for dynamic effect
      surfaceRef.current.rotation.x = -Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={surfaceRef} position={[0, -20, 0]}>
      {/* Main surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100, 64, 64]} />
        <meshPhongMaterial
          color="#1a1a1a"
          emissive="#4a1a4a"
          shininess={10}
          displacementMap={noiseTexture}
          displacementScale={2}
          bumpMap={noiseTexture}
          bumpScale={0.5}
        />
      </mesh>

      {/* Atmospheric glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          color="#4a1a4a"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Surface details */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 80,
            0.5,
            (Math.random() - 0.5) * 80
          ]}
          rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          ]}
        >
          <boxGeometry args={[1, Math.random() * 2 + 0.5, 1]} />
          <meshPhongMaterial
            color="#2a1a2a"
            emissive="#4a1a4a"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}