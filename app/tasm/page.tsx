'use client';

import dynamic from 'next/dynamic';

const TasmCanvas = dynamic(() => import('./TasmCanvas'), { ssr: false });

export default function TasmPage() {
  return <TasmCanvas />;
}
