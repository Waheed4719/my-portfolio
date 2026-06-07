'use client';

import { AiOutlineBug } from 'react-icons/ai';
import {
  HiGlobeAlt,
  HiColorSwatch,
  HiServer,
  HiLightningBolt,
} from 'react-icons/hi';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { services } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: HiGlobeAlt,
  design: HiColorSwatch,
  api: HiServer,
  chart: HiLightningBolt,
  bug: AiOutlineBug,
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-surface-raised/30">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Services"
          title="What I can do for you"
          description="End-to-end development from concept to deployment."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? HiGlobeAlt;
            return (
              <Reveal
                key={service.title}
                delay={i * 0.08}
                className="glass group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(255,74,87,0.12)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon className="text-xl" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {service.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
