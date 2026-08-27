'use client';

import Image from 'next/image';
import {
  SiNextdotjs,
  SiNuxt,
  SiNodedotjs,
  SiReact,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { stacks, technologies } from '@/lib/data';

const stackIcons: Record<string, React.ReactNode> = {
  react: <SiReact size={28} />,
  typescript: <SiTypescript size={28} />,
  node: <SiNodedotjs size={28} />,
  nuxt: <SiNuxt size={28} />,
  next: <SiNextdotjs size={28} />,
  vue: <SiVuedotjs size={28} />,
};

export default function StackSection() {
  return (
    <section id="stack" className="section-shell">
      <SectionHeading
        eyebrow="Stack"
        title="Tools I reach for daily"
        description="Modern JavaScript across frontend, backend, and 3D."
      />

      <div className="mb-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stacks.map((stack, index) => (
          <Reveal
            key={stack.title}
            delay={index * 0.05}
            scale={0.96}
            y={0}
            className="glass flex gap-4 rounded-2xl p-5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-brand">
              {stackIcons[stack.icon]}
            </div>
            <div>
              <h3 className="type-card-title">{stack.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {stack.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal y={16} className="glass rounded-3xl p-8">
        <p className="type-label mb-6 text-white/40">Full toolkit</p>
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 transition group-hover:bg-brand/10">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-white/45">{tech.name}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
