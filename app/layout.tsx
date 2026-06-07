import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackgroundMusic from '@/components/ui/BackgroundMusic';
import AppToaster from '@/components/ui/AppToaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'Waheed Uddin Ahmed — Full Stack Developer',
  description:
    'Portfolio of Waheed Uddin Ahmed — full stack developer specializing in React, Next.js, Three.js, and immersive web experiences.',
  openGraph: {
    title: 'Waheed Uddin Ahmed — Full Stack Developer',
    description:
      'Interactive 3D portfolio showcasing modern web development projects.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <div className="noise-overlay" aria-hidden />
        <Navbar />
        {children}
        <Footer />
        <BackgroundMusic />
        <AppToaster />
      </body>
    </html>
  );
}
