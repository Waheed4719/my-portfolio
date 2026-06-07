'use client';

import Image from 'next/image';
import { HiExternalLink } from 'react-icons/hi';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { projects } from '@/lib/data';

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-surface-raised/30">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="From 3D showcases to full-stack SaaS — a sample of what I've shipped."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              as="article"
              delay={(i % 3) * 0.1}
              y={30}
              start="top 90%"
              className="glass group flex flex-col overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-bold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-white/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand transition-colors hover:text-brand-glow"
                  >
                    Live Demo
                    <HiExternalLink />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
