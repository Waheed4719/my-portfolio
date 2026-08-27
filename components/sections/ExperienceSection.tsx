'use client';

import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { experiences } from '@/lib/data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-shell">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've shipped"
        description="A track record across healthcare, infrastructure monitoring, and agency work."
      />

      <div className="relative space-y-10 before:absolute before:-top-8 before:left-[19px] before:h-[calc(100%+4rem)] before:w-px before:bg-[linear-gradient(180deg,transparent_0%,rgba(255,74,87,0.6)_12%,rgba(255,255,255,0.1)_50%,transparent_100%)] md:space-y-6 md:before:left-1/2 md:before:-translate-x-1/2">
        {experiences.map((exp, index) => (
          <Reveal
            key={`${exp.company_name}-${exp.date}`}
            as="article"
            delay={index * 0.08}
            start="top 90%"
            className={`relative grid gap-6 pl-10 md:grid-cols-2 md:gap-10 md:pl-0 ${
              index % 2 === 0 ? '' : 'md:[&>.timeline-spacer]:order-2'
            }`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-[19px] top-10 z-10 size-3 -translate-x-1/2 rounded-full border-2 border-brand bg-surface md:left-1/2 md:top-8 md:size-4"
            />

            <div className="timeline-spacer hidden md:block" />
            <div className="glass relative rounded-2xl p-6 md:p-8">
              <div className="mb-5 flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10"
                  style={{ backgroundColor: exp.iconBg }}
                >
                  <Image
                    src={exp.icon}
                    alt={exp.company_name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="type-card-title text-xl">{exp.title}</h3>
                  <p className="font-body font-medium text-brand">{exp.company_name}</p>
                  <p className="type-label mt-1 text-white/45">{exp.date}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {exp.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-relaxed text-white/60"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
