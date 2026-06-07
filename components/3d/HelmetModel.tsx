'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { HELMET_MODEL_URL } from '@/lib/data';

useGLTF.preload(HELMET_MODEL_URL);

export default function HelmetModel() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(HELMET_MODEL_URL);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.3;
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.15 + 1.2;
    }
  });

  return (
    <group ref={ref} position={[2.5, 1, -1]} scale={0.012}>
      <primitive object={scene} />
    </group>
  );
}
