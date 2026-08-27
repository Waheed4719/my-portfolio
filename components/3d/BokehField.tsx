'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeCircleTexture } from '@/components/3d/sprite';

const CYAN = new THREE.Color('#4cc3ff');
const PALE = new THREE.Color('#bfe9ff');
const AMBER = new THREE.Color('#ffb24d');

function buildCloud(
  count: number,
  spread: [number, number, number],
  zRange: [number, number],
  amberChance: number,
) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread[0];
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread[1] + spread[1] * 0.05;
    positions[i * 3 + 2] =
      zRange[0] + Math.random() * (zRange[1] - zRange[0]);
    if (Math.random() < amberChance) c.copy(AMBER);
    else c.copy(CYAN).lerp(PALE, Math.random());
    const b = 0.4 + Math.random() * 0.6;
    colors[i * 3] = c.r * b;
    colors[i * 3 + 1] = c.g * b;
    colors[i * 3 + 2] = c.b * b;
  }
  return { positions, colors };
}

export default function BokehField() {
  const sprite = useMemo(makeCircleTexture, []);

  const bokeh = useMemo(
    () => buildCloud(34, [20, 11, 1], [-7, -2], 0.12),
    [],
  );
  const dust = useMemo(() => buildCloud(280, [22, 13, 8], [-4, 3], 0.08), []);

  const bokehRef = useRef<THREE.Points>(null);
  const dustRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (bokehRef.current) bokehRef.current.position.y = Math.sin(t * 0.1) * 0.3;
    if (dustRef.current) {
      dustRef.current.rotation.z = t * 0.015;
      dustRef.current.position.y = Math.sin(t * 0.18) * 0.2;
    }
  });

  return (
    <group>
      {/* soft out-of-focus background blobs */}
      <points ref={bokehRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[bokeh.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[bokeh.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          size={2.6}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>

      {/* fine drifting particles */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dust.positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[dust.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          size={0.09}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          alphaTest={0.01}
        />
      </points>
    </group>
  );
}
