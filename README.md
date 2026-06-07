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

## Contact form (EmailJS)

1. Copy `.env.example` to `.env.local`
2. Add your [EmailJS](https://www.emailjs.com/) keys
3. Create a template with: `{{from_name}}`, `{{reply_to}}`, `{{message}}`, `{{to_email}}`
4. In EmailJS **Account → Security**, enable **Allow non-browser requests** (for the API route)

```env
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxx
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key
```

## Deploy

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) for best Next.js support.

**Vercel settings (important after migrating from CRA):**
- Framework Preset: **Next.js**
- Build Command: `next build` (or leave default)
- Output Directory: **leave empty** — do not use `build`

The repo includes `vercel.json` so Vercel detects Next.js automatically.

## Stack

- Next.js App Router
- TypeScript + Tailwind CSS
- @react-three/fiber + @react-three/drei
- Framer Motion
