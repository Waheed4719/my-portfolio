'use client';

import Reveal from '@/components/ui/Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-14 max-w-2xl" y={24} start="top 88%">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-brand">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-white/55 md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
