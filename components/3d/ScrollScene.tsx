'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import GalaxyBackground from './GalaxyBackground';

type ScrollSceneProps = {
  scrollOffset: number;
};

function ScrollShape({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * 0.25;
      ref.current.rotation.y = clock.elapsedTime * 0.35;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          roughness={0.15}
          metalness={0.85}
          distort={0.45}
          speed={2.5}
        />
      </mesh>
    </Float>
  );
}

function ScrollRig({ scrollOffset }: { scrollOffset: number }) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = scrollOffset * Math.PI * 1.5;
      group.current.position.y = -scrollOffset * 2;
    }

    if (ring.current) {
      ring.current.rotation.z = scrollOffset * Math.PI * 2;
      ring.current.scale.setScalar(1 + scrollOffset * 0.4);
    }
  });

  return (
    <group ref={group}>
      <ScrollShape position={[-2, 0.3, -1]} color="#ff4a57" scale={0.45} />
      <ScrollShape position={[2, -0.2, -2]} color="#6366f1" scale={0.35} />
      <ScrollShape position={[0.5, 1, -3]} color="#38bdf8" scale={0.3} />

      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={0.6}
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  );
}

function Scene({ scrollOffset }: ScrollSceneProps) {
  return (
    <>
      <color attach="background" args={['#050508']} />
      <fog attach="fog" args={['#050508', 8, 28]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#6366f1" />
      <pointLight position={[3, 1, -1]} intensity={0.5} color="#ff4a57" />

      <GalaxyBackground />
      <ScrollRig scrollOffset={scrollOffset} />
      <Environment preset="night" />
    </>
  );
}

export default function ScrollScene({ scrollOffset }: ScrollSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 7], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      className="h-full w-full"
    >
      <Scene scrollOffset={scrollOffset} />
    </Canvas>
  );
}
