'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import SocialLinks from '@/components/ui/SocialLinks';
import { useGsapMount } from '@/hooks/useGsapMount';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface to-surface-raised" />
  ),
});

export default function HeroSection() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGsapMount(badgeRef, { delay: 0 });
  useGsapMount(titleRef, { delay: 0.1 });
  useGsapMount(copyRef, { delay: 0.2 });
  useGsapMount(ctaRef, { delay: 0.3 });
  useGsapMount(socialRef, { delay: 0.5, y: 0 });
  useGsapMount(scrollRef, { delay: 1.2, y: 0 });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <HeroScene />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

      <div className="section-shell relative z-10 pt-28">
        <div className="max-w-2xl">
          <div ref={badgeRef}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-white/70 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
              Available for freelance work
            </span>
          </div>

          <h1
            ref={titleRef}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Crafting{' '}
            <span className="bg-gradient-to-r from-brand via-brand-glow to-indigo-400 bg-clip-text text-transparent">
              immersive
            </span>{' '}
            web experiences
          </h1>

          <p
            ref={copyRef}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/65"
          >
            I&apos;m Waheed Uddin Ahmed — a full stack developer with 5+ years
            building products with React, Next.js, and Three.js. I turn ideas
            into fast, beautiful, interactive experiences.
          </p>

          <div
            ref={ctaRef}
            className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="rounded-full bg-brand px-8 py-3.5 font-mono text-sm uppercase tracking-wider text-white shadow-[0_0_32px_rgba(255,74,87,0.35)] transition-all hover:bg-brand-glow hover:shadow-[0_0_48px_rgba(255,74,87,0.5)]"
            >
              View Projects
            </a>
            <a
              href="/files/Waheed Uddin Ahmed - Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-8 py-3.5 font-mono text-sm uppercase tracking-wider text-white/80 transition-all hover:border-brand hover:text-brand"
            >
              Resume
            </a>
          </div>

          <div ref={socialRef} className="pointer-events-auto mt-10">
            <SocialLinks />
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-brand to-transparent" />
        </div>
      </div>
    </section>
  );
}
