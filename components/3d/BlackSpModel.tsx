'use client';

import { useEffect, useMemo } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib';
import {
  BLACK_SP_ANIMATION,
  BLACK_SP_MODEL_URL,
} from '@/lib/data';

export function BlackSpModel({ targetHeight: _targetHeight = 1.85 }: { targetHeight?: number }) {
  const { scene, animations } = useGLTF(BLACK_SP_MODEL_URL);

  const model = useMemo(() => {
    const clone = SkeletonUtils.clone(scene);
    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;
    });
    return clone;
  }, [scene]);

  const { actions, names } = useAnimations(animations, model);

  useEffect(() => {
    if (!names.length) return;

    const clipName =
      names.find((name) => name === BLACK_SP_ANIMATION) ?? names[0];
    const action = actions[clipName];
    if (!action) return;

    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.clampWhenFinished = false;
    action.fadeIn(0.2).play();

    return () => {
      action.fadeOut(0.2);
    };
  }, [actions, names]);

  return <primitive object={model} />;
}

useGLTF.preload(BLACK_SP_MODEL_URL);
