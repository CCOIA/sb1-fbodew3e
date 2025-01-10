import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import StarField from './StarField';
import NebulaField from './NebulaField';
import WormholeEffect from './WormholeEffect';
import ParallaxController from './ParallaxController';
import SpeedLines from './SpeedLines';
import PlanetSurface from './PlanetSurface';

export default function SpaceScene() {
  const wormholeRef = useRef();
  const scroll = useScroll();

  useFrame((state) => {
    if (wormholeRef.current) {
      const scrollIntensity = scroll.offset;
      
      // Intensify wormhole effect based on scroll position
      wormholeRef.current.rotation.z += 0.001;
      wormholeRef.current.scale.setScalar(1 + scrollIntensity * 0.5);
      
      // Adjust opacity and distortion based on timeline section proximity
      const timelineProximity = Math.max(0, Math.min(1, (scrollIntensity - 0.5) * 2));
      if (wormholeRef.current.material) {
        wormholeRef.current.material.opacity = 0.2 + timelineProximity * 0.3;
        wormholeRef.current.material.distortion = 0.5 + timelineProximity * 0.5;
      }
    }
  });

  return (
    <ParallaxController>
      <StarField count={20} radius={50} />
      <NebulaField count={8} />
      <group ref={wormholeRef}>
        <WormholeEffect />
      </group>
      <SpeedLines />
      <PlanetSurface />
    </ParallaxController>
  );
}