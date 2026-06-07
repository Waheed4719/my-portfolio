'use client';

import SocialLinks from '@/components/ui/SocialLinks';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-surface-raised/50">
      <div className="section-shell flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-display text-lg font-bold text-white">
            Waheed Uddin Ahmed
          </p>
          <p className="mt-1 text-sm text-white/50">
            Full Stack Developer · 3D Web Experiences
          </p>
        </div>

        <SocialLinks size="sm" />

        <p className="font-mono text-xs text-white/40">
          © {year} · Built with Next.js & Three.js
        </p>
      </div>
    </footer>
  );
}
