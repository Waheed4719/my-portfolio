'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section' | 'form';
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  once?: boolean;
  start?: string;
};

export default function Reveal({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  y = 24,
  x = 0,
  scale,
  duration = 0.6,
  once = true,
  start = 'top 85%',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from: gsap.TweenVars = { opacity: 0 };
    const to: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
    };

    if (y) {
      from.y = y;
      to.y = 0;
    }
    if (x) {
      from.x = x;
      to.x = 0;
    }
    if (scale) {
      from.scale = scale;
      to.scale = 1;
    }

    const tween = gsap.fromTo(el, from, {
      ...to,
      scrollTrigger: {
        trigger: el,
        start,
        once,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y, x, scale, duration, once, start]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
