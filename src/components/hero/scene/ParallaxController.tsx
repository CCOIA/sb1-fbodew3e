import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

export default function ParallaxController({ children }) {
  const groupRef = useRef();
  const scroll = useScroll();

  useFrame((state) => {
    if (groupRef.current) {
      const scrollProgress = scroll.offset;
      const mouseX = state.mouse.x * 0.1;
      const mouseY = state.mouse.y * 0.1;
      
      groupRef.current.rotation.y += (mouseX - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (mouseY - groupRef.current.rotation.x) * 0.1;
      groupRef.current.position.z = -scrollProgress * 20;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}