'use client';

import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import TasmPreviewScene from '@/components/3d/TasmPreviewScene';

export default function TasmCanvas() {
  return (
    <div className="fixed inset-0 z-40 bg-[#101015]">
      <div className="pointer-events-none absolute inset-x-0 top-20 z-50 flex items-start justify-between px-4 md:top-24 md:px-6">
        <div className="pointer-events-auto rounded-lg border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            TASM2 preview
          </p>
          <p className="mt-1 text-sm text-white/80">
            Studio lighting · drag to orbit
          </p>
        </div>
        <Link
          href="/"
          className="pointer-events-auto rounded-full border border-white/15 bg-black/60 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/80 backdrop-blur-sm transition-colors hover:border-brand hover:text-brand"
        >
          Back home
        </Link>
      </div>

      <Canvas shadows camera={{ fov: 45, near: 0.1, far: 100 }} dpr={[1, 1.5]}>
        <TasmPreviewScene />
      </Canvas>
    </div>
  );
}
