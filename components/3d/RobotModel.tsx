'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { ROBOT_MODEL_URL } from '@/lib/data';

const ANIM_CYCLE = ['Idle', 'Wave', 'Dance', 'ThumbsUp', 'Walking'];

export default function RobotModel() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(ROBOT_MODEL_URL);
  const { actions } = useAnimations(animations, group);
  const indexRef = useRef(0);

  useEffect(() => {
    const play = (name: string) => {
      const clip =
        actions[name] ??
        actions[name.toLowerCase()] ??
        Object.values(actions)[0];
      if (!clip) return;
      Object.values(actions).forEach((a) => a?.fadeOut(0.4));
      clip.reset().fadeIn(0.4).play();
    };

    const available = ANIM_CYCLE.filter(
      (n) => actions[n] || actions[n.toLowerCase()],
    );
    const sequence = available.length ? available : ['Idle'];
    play(sequence[0]);

    const timer = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % sequence.length;
      play(sequence[indexRef.current]);
    }, 4000);

    return () => clearInterval(timer);
  }, [actions]);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = -0.8 + Math.sin(clock.elapsedTime * 0.8) * 0.08;
    }
  });

  return (
    <group ref={group} position={[0, -0.8, 0]} scale={0.55}>
      <primitive object={scene} />
    </group>
  );
}
