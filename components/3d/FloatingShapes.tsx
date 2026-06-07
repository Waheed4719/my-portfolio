'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Shape({
  position,
  color,
  scale,
  speed,
  distort,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  distort: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * speed * 0.3;
      ref.current.rotation.z = clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  return (
    <>
      <Shape
        position={[-1, 1.5, -3]}
        color="#6366f1"
        scale={0.2}
        speed={1.2}
        distort={0.35}
      />
      <Shape
        position={[3, 0.5, -4]}
        color="#ff4a57"
        scale={0.18}
        speed={1.8}
        distort={0.5}
      />
      <Shape
        position={[0.5, 2.5, -6]}
        color="#38bdf8"
        scale={0.15}
        speed={2}
        distort={0.4}
      />
    </>
  );
}
