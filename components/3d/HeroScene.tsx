'use client';

import { Canvas } from '@react-three/fiber';
import HeroAbstractScene from './HeroAbstractScene';

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-[8]">
      <Canvas
        shadows
        camera={{ fov: 42, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, toneMappingExposure: 1.08 }}
      >
        <HeroAbstractScene />
      </Canvas>
    </div>
  );
}
