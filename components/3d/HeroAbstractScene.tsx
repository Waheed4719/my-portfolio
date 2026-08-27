'use client';

import { Suspense, useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { BlackSpModel } from '@/components/3d/BlackSpModel';
import TasmStudioLights from '@/components/3d/TasmStudioLights';
import BokehField from '@/components/3d/BokehField';
import Glow from '@/components/3d/Glow';

const CAMERA_POSITION: [number, number, number] = [0.35, 1.0, 4.9];
const LOOK_TARGET: [number, number, number] = [1.05, 0.9, 0];
const MODEL_CENTER: [number, number, number] = [1.95, 0, 0];

function HeroCamera() {
  const camera = useThree((state) => state.camera);
  const { pointer } = useThree();
  const lookAt = useRef(new THREE.Vector3(...LOOK_TARGET));

  useLayoutEffect(() => {
    camera.position.set(...CAMERA_POSITION);
    camera.lookAt(...LOOK_TARGET);
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame(() => {
    camera.position.x = CAMERA_POSITION[0] + pointer.x * 0.18;
    camera.position.y = CAMERA_POSITION[1] + pointer.y * 0.1;
    lookAt.current.set(
      LOOK_TARGET[0] + pointer.x * 0.06,
      LOOK_TARGET[1] + pointer.y * 0.04,
      LOOK_TARGET[2],
    );
    camera.lookAt(lookAt.current);
  });

  return null;
}

export default function HeroAbstractScene() {
  return (
    <>
      <color attach="background" args={['#06070d']} />
      <fog attach="fog" args={['#06070d', 11, 28]} />

      <HeroCamera />

      <TasmStudioLights center={MODEL_CENTER} variant="hero" />

      {/* soft rim glow behind the character for depth */}
      <Glow position={[2.6, 1.0, -2.2]} scale={7} color="#2b6cff" opacity={0.22} />
      <BokehField />

      <Suspense fallback={null}>
        <group position={MODEL_CENTER} rotation={[0, -0.5, 0]}>
          <BlackSpModel targetHeight={1.85} />
        </group>
      </Suspense>

      <ContactShadows
        position={[MODEL_CENTER[0], 0.01, MODEL_CENTER[2]]}
        opacity={0.6}
        scale={7}
        blur={2.6}
        far={4}
      />
    </>
  );
}
