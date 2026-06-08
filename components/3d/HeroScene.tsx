'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  Stars,
  ContactShadows,
} from '@react-three/drei';
import RobotModel from './RobotModel';
import HelmetModel from './HelmetModel';
import FloatingShapes from './FloatingShapes';
import FloatingParticles from './FloatingParticles';

function Scene() {
  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="fog" args={['#0a0a0f', 8, 22]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[-4, 2, 2]} intensity={0.6} color="#6366f1" />
      <pointLight position={[4, 1, -2]} intensity={0.5} color="#ff4a57" />

      <Stars
        radius={50}
        depth={40}
        count={3000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      <FloatingParticles count={180} />
      <FloatingShapes />

      <Suspense fallback={null}>
        <RobotModel />
        <HelmetModel />
        <Environment preset="city" />
      </Suspense>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.45}
        scale={12}
        blur={2.5}
        far={4}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.6}
        target={[0, 0.5, 0]}
      />
    </>
  );
}

export default function HeroScene() {
  const [renderActive, setRenderActive] = useState(true);

  useEffect(() => {
    const showcase = document.getElementById('showcase');
    if (!showcase) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setRenderActive(!entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(showcase);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 42 }}
        dpr={[1, 1.25]}
        frameloop={renderActive ? 'always' : 'never'}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
