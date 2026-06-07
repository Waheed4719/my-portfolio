'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { gsap } from '@/lib/gsap';
import { navItems } from '@/lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (y > 72) return true;
        if (y < 16) return false;
        return prev;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (open) {
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' },
      );
    } else {
      gsap.to(menu, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
    }
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border transition-[background-color,box-shadow,padding] duration-300 ${
        scrolled
          ? 'border-white/10 bg-surface-glass py-3 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'border-transparent bg-transparent py-5 shadow-none backdrop-blur-none'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-8">
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-white"
        >
          W<span className="text-brand">.</span>AHMED
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-brand"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full border border-brand/50 bg-brand/10 px-5 py-2 font-mono text-xs uppercase tracking-wider text-brand transition-all hover:bg-brand hover:text-white md:inline-block"
        >
          Hire Me
        </a>

        <button
          type="button"
          className="text-2xl text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      <div
        ref={menuRef}
        className={`glass overflow-hidden md:hidden ${open ? '' : 'h-0 opacity-0'}`}
      >
        <ul className="flex flex-col gap-4 px-6 py-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block font-mono text-sm uppercase tracking-widest text-white/70 hover:text-brand"
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-block rounded-full border border-brand px-5 py-2 font-mono text-xs uppercase tracking-wider text-brand"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
