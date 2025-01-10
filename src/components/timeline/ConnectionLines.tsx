import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ConnectionLines() {
  const linesRef = useRef();
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2, 0, 0),
    new THREE.Vector3(-1, 0.5, 1),
    new THREE.Vector3(0, 0, 2),
    new THREE.Vector3(1, -0.5, 1),
    new THREE.Vector3(2, 0, 0),
  ]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.1;
      linesRef.current.material.dashOffset = time * 0.5;
    }
  });

  return (
    <group>
      {/* Main connection ring */}
      <mesh>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Animated connection lines */}
      <line ref={linesRef}>
        <bufferGeometry
          attach="geometry"
          {...new THREE.BufferGeometry().setFromPoints(
            curve.getPoints(50)
          )}
        />
        <lineDashedMaterial
          color="#8B5CF6"
          dashSize={0.2}
          gapSize={0.1}
          transparent
          opacity={0.5}
        />
      </line>
    </group>
  );
}