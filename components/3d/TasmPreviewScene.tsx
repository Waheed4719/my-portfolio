'use client';

import { Suspense, useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import { BlackSpModel } from '@/components/3d/BlackSpModel';
import TasmStudioLights from '@/components/3d/TasmStudioLights';

const CAMERA_POSITION: [number, number, number] = [0, 1.1, 5.4];
const LOOK_TARGET: [number, number, number] = [0, 0.92, 0];
const MODEL_POSITION: [number, number, number] = [0, 0, 0];
const MODEL_ROTATION: [number, number, number] = [0, -0.45, 0];

function StaticCamera() {
  const camera = useThree((state) => state.camera);

  useLayoutEffect(() => {
    camera.position.set(...CAMERA_POSITION);
    camera.lookAt(...LOOK_TARGET);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

type TasmPreviewSceneProps = {
  lockControls?: boolean;
};

export default function TasmPreviewScene({
  lockControls = false,
}: TasmPreviewSceneProps) {
  return (
    <>
      <color attach="background" args={['#101015']} />

      <StaticCamera />

      <TasmStudioLights center={[0, 0, 0]} variant="studio" />

      <Suspense fallback={null}>
        <group position={MODEL_POSITION} rotation={MODEL_ROTATION}>
          <BlackSpModel targetHeight={1.85} />
        </group>
      </Suspense>

      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.5}
        scale={6}
        blur={2.2}
        far={3.5}
      />

      <OrbitControls
        enableDamping={false}
        enableZoom={!lockControls}
        enablePan={false}
        enableRotate={!lockControls}
        target={LOOK_TARGET}
        minDistance={2.5}
        maxDistance={9}
      />
    </>
  );
}
