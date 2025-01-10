import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarField({ count = 500, radius = 50 }) {
  const points = useRef();
  
  // Create three separate star fields for parallax effect
  const { distantStars, midStars, nearStars } = useMemo(() => {
    const distantCount = Math.floor(count * 0.5); // 50% distant stars
    const midCount = Math.floor(count * 0.3); // 30% mid-distance stars
    const nearCount = count - distantCount - midCount; // 20% near stars
    
    const distantStars = new Float32Array(distantCount * 3);
    const midStars = new Float32Array(midCount * 3);
    const nearStars = new Float32Array(nearCount * 3);
    
    // Distant stars (small, slow-moving)
    for (let i = 0; i < distantCount; i++) {
      const r = (Math.random() * 0.2 + 0.8) * radius; // Stars between 80-100% of radius
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      distantStars[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      distantStars[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      distantStars[i * 3 + 2] = r * Math.cos(phi);
    }
    
    // Mid-distance stars
    for (let i = 0; i < midCount; i++) {
      const r = (Math.random() * 0.3 + 0.5) * radius; // Stars between 50-80% of radius
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      midStars[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      midStars[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      midStars[i * 3 + 2] = r * Math.cos(phi);
    }
    
    // Near stars (larger, faster-moving)
    for (let i = 0; i < nearCount; i++) {
      const r = Math.random() * 0.5 * radius; // Stars within 50% of radius
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      nearStars[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      nearStars[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      nearStars[i * 3 + 2] = r * Math.cos(phi);
    }
    
    return { distantStars, midStars, nearStars };
  }, [count, radius]);

  useFrame((state) => {
    if (!points.current) return;
    
    const time = state.clock.getElapsedTime();
    const [distantPoints, midPoints, nearPoints] = points.current.children;
    
    // Slow rotation for distant stars
    distantPoints.rotation.y += 0.0001;
    distantPoints.rotation.z = Math.sin(time * 0.05) * 0.005;
    
    // Medium rotation for mid-distance stars
    midPoints.rotation.y += 0.0002;
    midPoints.rotation.z = Math.sin(time * 0.1) * 0.01;
    
    // Faster rotation for near stars
    nearPoints.rotation.y += 0.0003;
    nearPoints.rotation.z = Math.sin(time * 0.15) * 0.015;
  });

  return (
    <group ref={points}>
      {/* Distant stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={distantStars.length / 3}
            array={distantStars}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#FFFFFF"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Mid-distance stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={midStars.length / 3}
            array={midStars}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#B8C6DB"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Near stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nearStars.length / 3}
            array={nearStars}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#E2E8F0"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}