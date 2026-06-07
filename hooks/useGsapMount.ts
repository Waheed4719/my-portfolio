'use client';

import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from '@/lib/gsap';

type MountOptions = {
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
};

export function useGsapMount(
  ref: RefObject<HTMLElement | null>,
  { delay = 0, y = 30, x = 0, duration = 0.7 }: MountOptions = {},
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y, x },
      { opacity: 1, y: 0, x: 0, duration, delay, ease: 'power2.out' },
    );
  }, [delay, y, x, duration]);
}
