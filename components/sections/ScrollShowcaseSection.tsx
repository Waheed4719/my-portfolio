'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { HiExternalLink } from 'react-icons/hi';
import ShowcaseVideoPreview from '@/components/ui/ShowcaseVideoPreview';
import Reveal from '@/components/ui/Reveal';
import { ScrollTrigger } from '@/lib/gsap';
import { showcaseApps } from '@/lib/data';

function getSectionProgress(section: HTMLElement) {
  const scrollable = section.offsetHeight - window.innerHeight;
  if (scrollable <= 0) return 0;

  const progress = -section.getBoundingClientRect().top / scrollable;
  return Math.max(0, Math.min(1, progress));
}

function resolveShowcaseIndex(progress: number, current: number) {
  const count = showcaseApps.length;
  if (count <= 1) return 0;

  if (progress < 0.34) return 0;
  if (progress > 0.66) return count - 1;
  return current;
}

export default function ScrollShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeIndexRef = useRef(0);
  const loadedSrcRef = useRef('');

  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaReady, setMediaReady] = useState(false);

  const active = showcaseApps[activeIndex];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;
    const info = infoRef.current;
    if (!section) return;

    const progressBars = progress
      ? Array.from(progress.querySelectorAll<HTMLElement>('[data-progress]'))
      : [];

    const updateInfoPanel = (index: number) => {
      const app = showcaseApps[index];
      if (!info) return;

      const subtitle = info.querySelector('[data-info-subtitle]');
      const title = info.querySelector('[data-info-title]');
      const description = info.querySelector('[data-info-description]');
      const counter = info.querySelector('[data-info-counter]');
      const link = info.querySelector<HTMLAnchorElement>('[data-info-link]');

      if (subtitle instanceof HTMLElement) {
        subtitle.textContent = app.subtitle;
        subtitle.style.color = app.color;
      }
      if (title) title.textContent = app.title;
      if (description) description.textContent = app.description;
      if (counter) {
        counter.textContent = `${index + 1} / ${showcaseApps.length}`;
      }
      if (link) link.href = app.url;
    };

    const loadVideo = (index: number) => {
      const video = videoRef.current;
      if (!video) return;

      const nextSrc = showcaseApps[index].previewVideo;
      if (loadedSrcRef.current === nextSrc) return;

      loadedSrcRef.current = nextSrc;
      video.src = nextSrc;
      video.load();
      video.play().catch(() => {});
    };

    const applyIndex = (index: number) => {
      if (index === activeIndexRef.current) return;

      activeIndexRef.current = index;
      setActiveIndex(index);
      loadVideo(index);

      progressBars.forEach((bar, i) => {
        const app = showcaseApps[i];
        bar.style.backgroundColor =
          i === index ? app.color : 'rgba(255,255,255,0.45)';
        bar.style.boxShadow =
          i === index ? `0 0 10px ${app.color}` : 'none';
      });

      updateInfoPanel(index);
    };

    const syncFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const inSection = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inSection) return;

      const nextIndex = resolveShowcaseIndex(
        getSectionProgress(section),
        activeIndexRef.current,
      );
      applyIndex(nextIndex);
    };

    const initialIndex = resolveShowcaseIndex(getSectionProgress(section), 0);
    activeIndexRef.current = initialIndex;
    setActiveIndex(initialIndex);
    updateInfoPanel(initialIndex);

    progressBars.forEach((bar, i) => {
      const app = showcaseApps[i];
      bar.style.backgroundColor =
        i === initialIndex ? app.color : 'rgba(255,255,255,0.45)';
      bar.style.boxShadow =
        i === initialIndex ? `0 0 10px ${app.color}` : 'none';
    });

    const enterTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        setMediaReady(true);
        requestAnimationFrame(() => loadVideo(activeIndexRef.current));
      },
    });

    window.addEventListener('scroll', syncFromScroll, { passive: true });
    window.addEventListener('resize', syncFromScroll);

    return () => {
      enterTrigger.kill();
      window.removeEventListener('scroll', syncFromScroll);
      window.removeEventListener('resize', syncFromScroll);
    };
  }, []);

  useLayoutEffect(() => {
    if (!mediaReady) return;

    const video = videoRef.current;
    if (!video) return;

    const nextSrc = showcaseApps[activeIndexRef.current].previewVideo;
    if (loadedSrcRef.current === nextSrc) {
      video.play().catch(() => {});
      return;
    }

    loadedSrcRef.current = nextSrc;
    video.src = nextSrc;
    video.load();
    video.play().catch(() => {});
  }, [mediaReady]);

  return (
    <section id="showcase" ref={sectionRef} className="relative bg-neutral-100">
      <div className="section-shell pb-6 pt-24">
        <Reveal className="mb-8 max-w-2xl" y={24}>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-brand">
            3D Showcase
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Live previews of my 3D work
          </h2>
        </Reveal>
      </div>

      <div className="relative h-[350vh]">
        <div className="sticky top-[var(--nav-height)] flex h-[calc(100vh-var(--nav-height))] w-full flex-col px-3 pb-3 pt-3 md:px-6 md:pb-5 md:pt-4">
          <div className="relative min-h-0 flex-1 contain-paint">
            {mediaReady ? (
              <ShowcaseVideoPreview
                ref={videoRef}
                title={active.title}
                className="h-full w-full rounded-2xl md:rounded-3xl"
              />
            ) : (
              <div className="h-full w-full animate-pulse rounded-2xl bg-neutral-300 md:rounded-3xl" />
            )}

            <div className="pointer-events-none absolute inset-x-4 top-4 z-20 md:inset-x-6 md:top-5">
              <div ref={progressRef} className="mx-auto flex max-w-xl gap-2">
                {showcaseApps.map((app, i) => (
                  <div
                    key={app.title}
                    data-progress
                    className="h-1 flex-1 rounded-full"
                    style={{
                      backgroundColor:
                        i === 0 ? app.color : 'rgba(255,255,255,0.45)',
                      boxShadow: i === 0 ? `0 0 10px ${app.color}` : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-3 shrink-0 md:mt-4">
            <div
              ref={infoRef}
              className="mx-auto flex max-w-6xl flex-col gap-4 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.12)] backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-5"
            >
              <div className="min-w-0 flex-1">
                <span
                  data-info-subtitle
                  className="mb-1 inline-block font-mono text-[10px] uppercase tracking-[0.3em] md:text-xs"
                  style={{ color: active.color }}
                >
                  {active.subtitle}
                </span>
                <h3
                  data-info-title
                  className="font-display text-xl font-bold text-neutral-900 md:text-2xl"
                >
                  {active.title}
                </h3>
                <p
                  data-info-description
                  className="mt-1 hidden text-sm text-neutral-600 sm:block"
                >
                  {active.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <span
                  data-info-counter
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400"
                >
                  {activeIndex + 1} / {showcaseApps.length}
                </span>
                <a
                  data-info-link
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-brand"
                >
                  Open full site
                  <HiExternalLink />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
