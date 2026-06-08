'use client';

import dynamic from 'next/dynamic';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ServicesSection from '@/components/sections/ServicesSection';
import StackSection from '@/components/sections/StackSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

const HeroSection = dynamic(
  () => import('@/components/sections/HeroSection'),
  { ssr: false },
);

const ShowcaseSection = dynamic(
  () => import('@/components/sections/ShowcaseSection'),
  { ssr: false },
);

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ServicesSection />
      <StackSection />
      <ShowcaseSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
