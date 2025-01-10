import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

function ParticleField() {
  const count = 2000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      positions[i * 3] = 20 * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = 20 * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = 20 * Math.cos(theta);
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8B5CF6"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 25], fov: 60 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ParticleField />
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </Sphere>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}