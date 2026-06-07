'use client';

import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mb-14 max-w-2xl"
    >
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
    </motion.div>
  );
}
