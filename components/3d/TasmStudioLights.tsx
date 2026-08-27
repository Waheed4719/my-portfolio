'use client';

type TasmStudioLightsProps = {
  /** World-space point the rig is built around. */
  center?: [number, number, number];
  variant?: 'studio' | 'hero' | 'rooftop';
};

export default function TasmStudioLights({
  center = [0, 0, 0],
  variant = 'studio',
}: TasmStudioLightsProps) {
  const [cx, cy, cz] = center;

  if (variant === 'rooftop') {
    const subjectY = cy + 0.95;

    return (
      <>
        <ambientLight intensity={0.85} color="#f5f8ff" />
        <hemisphereLight args={['#87ceeb', '#9aa8b8', 0.75]} />

        {/* Sun — main daylight */}
        <directionalLight
          position={[cx + 35, 55, cz + 28]}
          intensity={3.4}
          color="#fff9ef"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={80}
          shadow-camera-left={-35}
          shadow-camera-right={35}
          shadow-camera-top={35}
          shadow-camera-bottom={-35}
        />

        {/* Sky bounce / fill */}
        <directionalLight
          position={[cx - 25, 28, cz - 18]}
          intensity={1.1}
          color="#e8f2ff"
        />

        {/* Soft fill toward camera */}
        <directionalLight
          position={[cx - 12, 14, cz + 22]}
          intensity={0.95}
          color="#ffffff"
        />

        {/* Character key — keeps black suit readable in daylight */}
        <spotLight
          position={[cx + 2.5, subjectY + 2.5, cz + 5.5]}
          angle={0.55}
          penumbra={0.7}
          intensity={2.2}
          color="#fffef8"
        >
          <object3D attach="target" position={[cx, subjectY, cz]} />
        </spotLight>

        <pointLight
          position={[cx + 1.2, subjectY + 0.8, cz + 3.5]}
          intensity={1.8}
          color="#ffffff"
          distance={14}
          decay={2}
        />

        {/* Sun visible in sky */}
        <mesh position={[cx + 60, 45, cz + 40]}>
          <sphereGeometry args={[2.8, 24, 24]} />
          <meshBasicMaterial color="#fff6d6" toneMapped={false} />
        </mesh>
      </>
    );
  }

  const isHero = variant === 'hero';
  const subjectY = isHero ? 1.12 : 1.4;

  if (isHero) {
    return (
      <>
        <ambientLight intensity={0.22} />
        <hemisphereLight args={['#c8d4ef', '#08080c', 0.38]} />

        <directionalLight
          position={[cx + 4.2, 7.2, cz + 5.2]}
          intensity={2.65}
          color="#fff1e3"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={24}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
        />

        <spotLight
          position={[cx - 5.5, 2.4, cz + 4.2]}
          angle={0.62}
          penumbra={0.75}
          intensity={1.05}
          color="#e8eeff"
        >
          <object3D attach="target" position={[cx, subjectY, cz]} />
        </spotLight>

        <spotLight
          position={[cx + 1.2, 3.6, cz - 4.8]}
          angle={0.42}
          penumbra={0.6}
          intensity={2.8}
          color="#9ec5ff"
        >
          <object3D attach="target" position={[cx, subjectY, cz]} />
        </spotLight>

        <pointLight
          position={[cx + 2.2, 4.6, cz + 2.4]}
          intensity={1.35}
          color="#ffffff"
          distance={14}
          decay={2}
        />

        <pointLight
          position={[cx + 4.2, 1.75, cz + 2.6]}
          intensity={0.35}
          color="#ff6b7a"
          distance={9}
          decay={2}
        />
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={0.32} />
      <hemisphereLight args={['#dbeafe', '#101015', 0.55]} />

      <directionalLight
        position={[cx + 2.5, 7, cz + 3.5]}
        intensity={1.85}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="#fff4e6"
      />

      <pointLight
        position={[cx - 2.8, 2.8, cz + 2.2]}
        intensity={1.15}
        color="#93c5fd"
      />
      <pointLight
        position={[cx + 2.2, 3.2, cz - 2.4]}
        intensity={0.7}
        color="#ffffff"
      />
      <pointLight
        position={[cx + 1.2, 1.4, cz + 4.2]}
        intensity={1.05}
        color="#ff6b7a"
      />

      <spotLight
        position={[cx + 3.5, 4.5, cz + 5]}
        angle={0.42}
        penumbra={0.55}
        intensity={1.35}
        color="#fff8ef"
        castShadow
      >
        <object3D attach="target" position={[cx, subjectY, cz]} />
      </spotLight>

      <mesh position={[cx + 2.5, 7, cz + 3.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ffd699"
          emissive="#ffb347"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}
