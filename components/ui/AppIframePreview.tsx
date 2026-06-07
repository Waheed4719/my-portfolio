'use client';

import { useEffect, useRef, useState } from 'react';

const IFRAME_WIDTH = 1920;
const IFRAME_HEIGHT = 1080;

type AppIframePreviewProps = {
  src: string;
  title: string;
  className?: string;
};

export default function AppIframePreview({
  src,
  title,
  className = '',
}: AppIframePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const el = containerRef.current;
      if (!el) return;

      const { offsetWidth, offsetHeight } = el;
      const scaleX = offsetWidth / IFRAME_WIDTH;
      const scaleY = offsetHeight / IFRAME_HEIGHT;
      setFitScale(Math.min(scaleX, scaleY));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden bg-neutral-200 ${className}`}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        width={IFRAME_WIDTH}
        height={IFRAME_HEIGHT}
        className="pointer-events-none absolute left-1/2 top-1/2 border-0 shadow-lg"
        style={{
          width: IFRAME_WIDTH,
          height: IFRAME_HEIGHT,
          transform: `translate(-50%, -50%) scale(${fitScale})`,
          transformOrigin: 'center center',
        }}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-neutral-300/80" />
    </div>
  );
}
