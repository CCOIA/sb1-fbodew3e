import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function ParallaxController({ children }) {
  const groupRef = useRef();
  const scroll = useScroll();
  const lastScrollY = useRef(0);
  const velocityY = useRef(0);
  const targetRotation = useRef(new THREE.Euler());
  const currentRotation = useRef(new THREE.Euler());

  useFrame((state) => {
    const scrollOffset = scroll.offset;
    const deltaY = scrollOffset - lastScrollY.current;
    
    // Update velocity with smooth damping
    velocityY.current += (deltaY - velocityY.current) * 0.1;
    
    if (groupRef.current) {
      // Calculate target rotation based on scroll velocity
      targetRotation.current.x = velocityY.current * Math.PI * 0.5;
      
      // Smoothly interpolate current rotation towards target
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.1;
      groupRef.current.rotation.x = currentRotation.current.x;
      
      // Move camera through space based on scroll
      const scrollDepth = scrollOffset * 30;
      groupRef.current.position.z = scrollDepth;
      
      // Add vertical movement
      const verticalOffset = -scrollOffset * 15;
      groupRef.current.position.y = verticalOffset + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      
      // Scale and transform effects
      const parallaxScale = 1 + scrollOffset * 0.3;
      groupRef.current.scale.setScalar(parallaxScale);
      
      // Apply different parallax speeds to children
      const childrenArray = groupRef.current.children;
      childrenArray.forEach((child, index) => {
        if (child.material) {
          // StarField parallax
          if (index === 0) {
            child.position.y = scrollOffset * -5;
            child.material.opacity = Math.max(0.6 - scrollOffset * 0.5, 0.1);
          }
          // NebulaField parallax
          else if (index === 1) {
            child.position.y = scrollOffset * -10;
            child.material.opacity = Math.min(0.15 + scrollOffset * 0.2, 0.3);
          }
          // WormholeEffect parallax
          else if (index === 2) {
            child.position.y = scrollOffset * -15;
            if (child.material) {
              child.material.opacity = 0.2 + scrollOffset * 0.3;
            }
          }
        }
      });
      
      // Add subtle rotation based on mouse position
      const mouseX = (state.mouse.x * 0.2);
      const mouseY = (state.mouse.y * 0.2);
      groupRef.current.rotation.y += (mouseX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.z += (mouseY - groupRef.current.rotation.z) * 0.05;
    }
    
    lastScrollY.current = scrollOffset;
  });

  return <group ref={groupRef}>{children}</group>;
}