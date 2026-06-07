'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function HeroCamera() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(1.2, 0.6, 0));

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime;
    const radius = 3.4;
    const angle = t * 0.18 + mouse.x * 0.25;
    const height = 1.25 + Math.sin(t * 0.35) * 0.15 + mouse.y * 0.2;

    camera.position.x = target.current.x + Math.sin(angle) * radius * 0.55;
    camera.position.y = height;
    camera.position.z = target.current.z + Math.cos(angle) * radius;
    camera.lookAt(target.current);
  });

  return null;
}
