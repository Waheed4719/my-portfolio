'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import SectionHeading from '@/components/ui/SectionHeading';
import { projects } from '@/lib/data';

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        description="SaaS platforms, 3D experiences, and high-polish marketing sites."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: (index % 4) * 0.06 }}
            className="glass group overflow-hidden rounded-3xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80 backdrop-blur"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold">
                  {project.title}
                </h3>
                <div className="flex shrink-0 gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-brand hover:text-brand"
                    >
                      <FaGithub size={14} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live site`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-brand hover:text-brand"
                    >
                      <FaExternalLinkAlt size={12} />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/55">
                {project.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
