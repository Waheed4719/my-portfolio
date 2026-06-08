'use client';

import { forwardRef } from 'react';

type ShowcaseVideoPreviewProps = {
  title: string;
  className?: string;
};

const ShowcaseVideoPreview = forwardRef<HTMLVideoElement, ShowcaseVideoPreviewProps>(
  function ShowcaseVideoPreview({ title, className = '' }, ref) {
    return (
      <div
        className={`relative h-full w-full overflow-hidden bg-black contain-paint ${className}`}
      >
        <video
          ref={ref}
          title={title}
          loop
          muted
          playsInline
          preload="auto"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
      </div>
    );
  },
);

export default ShowcaseVideoPreview;
