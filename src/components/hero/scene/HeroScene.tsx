import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import StarField from './StarField';
import NebulaField from './NebulaField';
import ParallaxController from './ParallaxController';

export default function HeroScene() {
  const scroll = useScroll();
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      const scrollProgress = scroll.offset;
      groupRef.current.position.y = -scrollProgress * 10;
    }
  });

  return (
    <ParallaxController>
      <group ref={groupRef}>
        <StarField count={5} radius={50} />
        <NebulaField count={5} />
      </group>
    </ParallaxController>
  );
}