'use client';

import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const stats = [
  { label: 'Years Experience', value: '5+' },
  { label: 'Projects Shipped', value: '30+' },
  { label: '3D Web Builds', value: '10+' },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-shell">
      <SectionHeading
        eyebrow="About"
        title="Building products that feel premium"
        description="Full stack developer with a passion for clean UX, real-time apps, and immersive 3D on the web."
      />

      <div className="grid items-center gap-12 lg:grid-cols-[280px_1fr]">
        <Reveal className="relative mx-auto lg:mx-0" scale={0.92} y={0}>
          <div className="absolute -inset-4 rounded-full bg-brand-dim/12 blur-2xl" />
          <div className="relative size-[260px] shrink-0 rounded-full bg-gradient-to-br from-brand-dim via-brand-dim/90 to-brand/70 p-[3px] shadow-[0_0_14px_rgba(204,59,70,0.22)]">
            <div className="relative size-full overflow-hidden rounded-full bg-surface">
              <Image
                src="/images/me.jpg"
                alt="Waheed Uddin Ahmed"
                fill
                sizes="260px"
                className="object-cover object-[center_28%]"
                priority
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="space-y-6" x={24} y={0} delay={0.1}>
          <p className="text-lg leading-relaxed text-white/70">
            I&apos;m Waheed — a web developer with 5+ years of experience
            creating responsive, user-friendly products. I specialize in React and
            Next.js ecosystems, real-time backends, and pushing the browser with
            Three.js experiences like Collect Car and Fizzi.
          </p>
          <p className="leading-relaxed text-white/55">
            From healthcare SaaS to 3D marketing sites, I care about performance,
            accessibility, and polish. I debug fast, ship reliably, and love
            turning ambitious ideas into interfaces people remember.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-5">
                <p className="font-display text-3xl font-bold text-brand">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
