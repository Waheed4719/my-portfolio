# My Portfolio — Next.js + Three.js

Interactive 3D portfolio built with **Next.js 15**, **React Three Fiber**, and **Framer Motion**.

## Features

- Full-screen 3D hero with animated robot & flight helmet (Khronos glTF samples via CDN)
- Procedural floating geometry, stars, and sparkles
- Glassmorphism UI with scroll animations
- All original portfolio content preserved

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## EmailJS (optional)

Create `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Deploy

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) for best Next.js support.

## Stack

- Next.js App Router
- TypeScript + Tailwind CSS
- @react-three/fiber + @react-three/drei
- Framer Motion
