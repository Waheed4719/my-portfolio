'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function SpiralGalaxy({
  count = 4000,
  radius = 18,
  color = '#8b5cf6',
  rotationSpeed = 0.02,
  position = [0, -2, -12] as [number, number, number],
}) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * radius;
      const spin = r * 0.35;
      const branch = (i % 3) * ((Math.PI * 2) / 3);
      const angle = spin + branch + (Math.random() - 0.5) * 0.4;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * rotationSpeed;
    }
  });

  return (
    <points ref={ref} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NebulaGlow({
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
      ref.current.rotation.z = clock.elapsedTime * 0.05;
      const pulse = 1 + Math.sin(clock.elapsedTime * 0.3) * 0.08;
      ref.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.06}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function GalaxyBackground() {
  return (
    <group>
      <Stars
        radius={120}
        depth={80}
        count={6000}
        factor={4}
        saturation={0.2}
        fade
        speed={0.4}
      />
      <Stars
        radius={60}
        depth={40}
        count={2500}
        factor={2}
        saturation={0}
        fade
        speed={0.2}
      />

      <SpiralGalaxy
        count={5000}
        radius={20}
        color="#7c3aed"
        position={[4, -1, -14]}
        rotationSpeed={0.015}
      />
      <SpiralGalaxy
        count={3000}
        radius={14}
        color="#ff4a57"
        position={[-6, 1, -18]}
        rotationSpeed={-0.01}
      />
      <SpiralGalaxy
        count={2000}
        radius={10}
        color="#38bdf8"
        position={[0, 3, -22]}
        rotationSpeed={0.008}
      />

      <NebulaGlow position={[5, 0, -16]} color="#6366f1" scale={14} />
      <NebulaGlow position={[-4, 2, -20]} color="#ff4a57" scale={10} />
      <NebulaGlow position={[0, -1, -12]} color="#a78bfa" scale={18} />

      <Sparkles
        count={120}
        scale={[30, 12, 20]}
        size={3}
        speed={0.3}
        opacity={0.35}
        color="#ffffff"
        position={[0, 0, -8]}
      />
    </group>
  );
}
