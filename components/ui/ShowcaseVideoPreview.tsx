'use client';

import { forwardRef, useEffect, useRef } from 'react';

export const SHOWCASE_VIDEO_WIDTH = 1920;
export const SHOWCASE_VIDEO_HEIGHT = 1080;

type ShowcaseVideoPreviewProps = {
  title: string;
  className?: string;
};

const ShowcaseVideoPreview = forwardRef<HTMLVideoElement, ShowcaseVideoPreviewProps>(
  function ShowcaseVideoPreview({ title, className = '' }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef.current;
      const video =
        ref && 'current' in ref ? ref.current : null;
      if (!container || !video) return;

      const updateScale = () => {
        const { offsetWidth, offsetHeight } = container;
        if (offsetWidth === 0 || offsetHeight === 0) return;

        const scale = Math.min(
          offsetWidth / SHOWCASE_VIDEO_WIDTH,
          offsetHeight / SHOWCASE_VIDEO_HEIGHT,
        );
        video.style.transform = `translate(-50%, -50%) scale(${scale})`;
      };

      updateScale();
      const observer = new ResizeObserver(updateScale);
      observer.observe(container);

      return () => observer.disconnect();
    }, [ref]);

    return (
      <div
        ref={containerRef}
        className={`relative h-full w-full overflow-hidden bg-neutral-200 contain-paint ${className}`}
      >
        <video
          ref={ref}
          title={title}
          width={SHOWCASE_VIDEO_WIDTH}
          height={SHOWCASE_VIDEO_HEIGHT}
          loop
          muted
          playsInline
          preload="auto"
          className="pointer-events-none absolute left-1/2 top-1/2 border-0 shadow-lg"
          style={{
            width: SHOWCASE_VIDEO_WIDTH,
            height: SHOWCASE_VIDEO_HEIGHT,
            transform: 'translate(-50%, -50%) scale(1)',
            transformOrigin: 'center center',
          }}
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-neutral-300/80" />
      </div>
    );
  },
);

export default ShowcaseVideoPreview;
