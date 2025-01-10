import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpeedLines() {
  const linesRef = useRef();
  
  const { positions, colors } = useMemo(() => {
    const positions = [];
    const colors = [];
    const color = new THREE.Color('#1a1a1a');
    
    for (let i = 0; i < 100; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 10;
      const length = 2 + Math.random() * 4;
      
      positions.push(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius,
        -length
      );
      
      positions.push(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius,
        length
      );
      
      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    linesRef.current.rotation.z = time * 0.1;
    
    const scroll = state.clock.elapsedTime * 0.5;
    linesRef.current.material.opacity = 0.15 + Math.sin(scroll) * 0.1;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}