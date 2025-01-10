import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { timelineData } from './timelineData';
import TimelineNode3D from './TimelineNode3D';
import ConnectionLines from './ConnectionLines';
import TimelineOrbit from './TimelineOrbit';

export default function TimelineScene() {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <spotLight position={[-10, -10, -10]} intensity={0.5} />
      
      <group ref={groupRef}>
        <TimelineOrbit />
        <ConnectionLines />
        {timelineData.map((item, index) => (
          <TimelineNode3D
            key={item.id}
            {...item}
            index={index}
            total={timelineData.length}
          />
        ))}
        
        {/* Center text */}
        <Text
          position={[0, 0, 0]}
          fontSize={0.3}
          color="#8B5CF6"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          textAlign="center"
          outlineWidth={0.02}
          outlineColor="#4C1D95"
        >
          VoiceAI
        </Text>
      </group>
    </>
  );
}