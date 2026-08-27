'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { makeCircleTexture } from '@/components/3d/sprite';

type GlowProps = {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  opacity?: number;
};

/** A soft camera-facing additive glow blob — fakes a bloom / light source. */
export default function Glow({
  position = [0, 0, 0],
  scale = 8,
  color = '#1f73ff',
  opacity = 0.22,
}: GlowProps) {
  const tex = useMemo(makeCircleTexture, []);
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={tex}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </sprite>
  );
}
