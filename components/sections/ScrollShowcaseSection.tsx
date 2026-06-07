'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExternalLink } from 'react-icons/hi';
import AppIframePreview from '@/components/ui/AppIframePreview';
import { showcaseApps } from '@/lib/data';

function useSectionScroll(ref: React.RefObject<HTMLElement | null>) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;

      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setOffset(0);
        return;
      }

      const progress = -el.getBoundingClientRect().top / scrollable;
      setOffset(Math.max(0, Math.min(1, progress)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);

  return offset;
}

export default function ScrollShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollOffset = useSectionScroll(sectionRef);
  const activeIndex = Math.min(
    showcaseApps.length - 1,
    Math.floor(scrollOffset * showcaseApps.length + 0.001),
  );
  const active = showcaseApps[activeIndex];

  return (
    <section id="showcase" ref={sectionRef} className="relative bg-neutral-100">
      <div className="section-shell pb-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 max-w-2xl"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-brand">
            3D Showcase
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Live previews of my 3D work
          </h2>
        </motion.div>
      </div>

      <div className="relative h-[350vh]">
        <div className="sticky top-[var(--nav-height)] flex h-[calc(100vh-var(--nav-height))] w-full flex-col px-3 pb-3 pt-3 md:px-6 md:pb-5 md:pt-4">
          <div className="relative min-h-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="h-full w-full"
              >
                <AppIframePreview
                  src={active.url}
                  title={active.title}
                  className="h-full w-full rounded-2xl md:rounded-3xl"
                />
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-4 top-4 z-10 md:inset-x-6 md:top-5">
              <div className="mx-auto flex max-w-xl gap-2">
                {showcaseApps.map((app, i) => (
                  <div
                    key={app.title}
                    className="h-1 flex-1 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor:
                        i === activeIndex ? app.color : 'rgba(255,255,255,0.45)',
                      boxShadow:
                        i === activeIndex
                          ? `0 0 10px ${app.color}`
                          : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-3 shrink-0 md:mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35 }}
                className="mx-auto flex max-w-6xl flex-col gap-4 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.12)] backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-5"
              >
                <div className="min-w-0 flex-1">
                  <span
                    className="mb-1 inline-block font-mono text-[10px] uppercase tracking-[0.3em] md:text-xs"
                    style={{ color: active.color }}
                  >
                    {active.subtitle}
                  </span>
                  <h3 className="font-display text-xl font-bold text-neutral-900 md:text-2xl">
                    {active.title}
                  </h3>
                  <p className="mt-1 hidden text-sm text-neutral-600 sm:block">
                    {active.description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                    {activeIndex + 1} / {showcaseApps.length}
                  </span>
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-brand"
                  >
                    Open full site
                    <HiExternalLink />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
