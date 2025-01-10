import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WormholeEffect() {
  const tubeRef = useRef();
  
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    tubeRef.current.rotation.z = time * 0.2;
    tubeRef.current.scale.setScalar(1 + Math.sin(time) * 0.1);
    
    if (tubeRef.current.material) {
      tubeRef.current.material.opacity = 0.2 + Math.sin(time * 0.5) * 0.1;
      tubeRef.current.material.emissiveIntensity = 0.3 + Math.sin(time) * 0.1;
    }
  });

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, -20),
    new THREE.Vector3(2, 2, -10),
    new THREE.Vector3(-2, -2, 0),
    new THREE.Vector3(2, 2, 10),
    new THREE.Vector3(0, 0, 20)
  ]);

  return (
    <mesh ref={tubeRef}>
      <tubeGeometry args={[curve, 64, 3, 8, false]} />
      <meshPhongMaterial
        color="#0a0a0a"
        emissive="#1a1a1a"
        transparent
        opacity={0.2}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}