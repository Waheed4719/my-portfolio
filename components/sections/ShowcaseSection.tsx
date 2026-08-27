'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiExternalLink } from 'react-icons/hi';
import ShowcaseVideoPreview from '@/components/ui/ShowcaseVideoPreview';
import SectionHeading from '@/components/ui/SectionHeading';
import { ScrollTrigger } from '@/lib/gsap';
import { showcaseApps } from '@/lib/data';

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaReady, setMediaReady] = useState(false);

  const active = showcaseApps[activeIndex];
  const count = showcaseApps.length;

  const selectIndex = (index: number) => {
    setActiveIndex((index + count) % count);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const enterTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      once: true,
      onEnter: () => setMediaReady(true),
    });

    return () => enterTrigger.kill();
  }, []);

  useLayoutEffect(() => {
    if (!mediaReady) return;

    const video = videoRef.current;
    if (!video) return;

    const nextSrc = active.previewVideo;
    if (video.getAttribute('src') !== nextSrc) {
      video.src = nextSrc;
      video.load();
    }
    video.play().catch(() => {});
  }, [mediaReady, active.previewVideo]);

  return (
    <section id="showcase" ref={sectionRef} className="relative bg-surface-raised/30">
      <div className="section-shell">
        <SectionHeading
          eyebrow="3D Showcase"
          title="Live previews of my 3D work"
          description="Tap a project to watch a captured walkthrough — no extra scrolling required."
        />

        <div className="mb-5 flex flex-wrap gap-2">
          {showcaseApps.map((app, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={app.title}
                type="button"
                onClick={() => selectIndex(i)}
                className={`type-label rounded-full border px-4 py-2 transition-all md:text-xs ${
                  isActive
                    ? 'border-white/20 bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]'
                    : 'border-white/5 bg-white/[0.03] text-white/45 hover:border-white/10 hover:text-white/75'
                }`}
                style={
                  isActive
                    ? {
                        borderColor: `${app.color}55`,
                        boxShadow: `0 0 24px ${app.color}22`,
                      }
                    : undefined
                }
                aria-pressed={isActive}
              >
                {app.title}
              </button>
            );
          })}
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:rounded-3xl">
          {mediaReady ? (
            <ShowcaseVideoPreview
              ref={videoRef}
              title={active.title}
              className="h-full w-full"
            />
          ) : (
            <div className="h-full w-full animate-pulse bg-white/[0.04]" />
          )}
        </div>

        <div className="glass mt-5 flex flex-col gap-4 rounded-2xl p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div className="min-w-0 flex-1">
            <span
              className="type-label mb-1 inline-block md:text-xs"
              style={{ color: active.color }}
            >
              {active.subtitle}
            </span>
            <h3 className="type-card-title text-xl text-white md:text-2xl">
              {active.title}
            </h3>
            <p className="mt-1 hidden text-sm leading-relaxed text-white/55 sm:block">
              {active.description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => selectIndex(activeIndex - 1)}
                className="rounded-full border border-white/10 p-2 text-white/60 transition-colors hover:border-white/20 hover:text-white"
                aria-label="Previous project"
              >
                <HiChevronLeft className="size-4" />
              </button>
              <span className="type-label min-w-[3.5rem] text-center text-white/40">
                {activeIndex + 1} / {count}
              </span>
              <button
                type="button"
                onClick={() => selectIndex(activeIndex + 1)}
                className="rounded-full border border-white/10 p-2 text-white/60 transition-colors hover:border-white/20 hover:text-white"
                aria-label="Next project"
              >
                <HiChevronRight className="size-4" />
              </button>
            </div>

            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="type-cta inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-white transition-colors hover:bg-brand-glow"
            >
              Open full site
              <HiExternalLink />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
