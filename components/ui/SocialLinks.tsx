'use client';

import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import { socialLinks } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  upwork: SiUpwork,
};

type SocialLinksProps = {
  className?: string;
  size?: 'sm' | 'md';
};

export default function SocialLinks({
  className = '',
  size = 'md',
}: SocialLinksProps) {
  const dim = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const iconSize = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className={`group flex ${dim} items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:border-brand hover:bg-brand hover:shadow-[0_0_24px_rgba(255,74,87,0.4)]`}
          >
            <Icon
              className={`${iconSize} text-white/70 transition-colors group-hover:text-white`}
            />
          </a>
        );
      })}
    </div>
  );
}
