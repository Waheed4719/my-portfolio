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
      <p className="type-eyebrow mb-4">{eyebrow}</p>
      <h2 className="type-section-title">{title}</h2>
      {description && (
        <p className="type-section-copy mt-5">{description}</p>
      )}
    </Reveal>
  );
}
