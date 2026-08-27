'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useGsapMount } from '@/hooks/useGsapMount';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-[#040810] via-surface to-surface-raised" />
  ),
});

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGsapMount(titleRef, { delay: 0.1 });
  useGsapMount(copyRef, { delay: 0.25 });
  useGsapMount(ctaRef, { delay: 0.4 });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <HeroScene />

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[9] w-[58%] max-w-4xl bg-gradient-to-r from-[#040810] from-25% via-[#040810]/88 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[9] h-32 w-[55%] bg-gradient-to-t from-surface to-transparent" />

      <div className="section-shell relative z-10">
        <div className="max-w-2xl">
          <p className="type-eyebrow mb-5">Portfolio · 2026</p>

          <h1 ref={titleRef}>
            <span className="type-hero-title block">Waheed Uddin Ahmed</span>
            <span className="type-hero-role mt-3 block text-gradient">
              Software Engineer
            </span>
          </h1>

          <p ref={copyRef} className="type-hero-lead mt-7 max-w-xl">
            I build fast, polished web products — from full-stack apps to immersive
            3D experiences with React, Next.js, and Three.js.
          </p>

          <div ref={ctaRef} className="pointer-events-auto mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="type-cta inline-flex items-center rounded-full bg-brand px-7 py-3.5 text-white transition-colors hover:bg-brand-glow"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="type-cta inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
