'use client';

import { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FaFacebook, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import SectionHeading from '@/components/ui/SectionHeading';
import { socialLinks } from '@/lib/data';

const iconMap: Record<string, React.ReactNode> = {
  linkedin: <FaLinkedinIn size={18} />,
  github: <FaGithub size={18} />,
  upwork: <SiUpwork size={18} />,
  facebook: <FaFacebook size={18} />,
};

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.get('name'),
          reply_to: formData.get('email'),
          message: formData.get('message'),
        },
        publicKey,
      );
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-shell pb-32">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something bold"
        description="Have a project in mind? Drop a message — I typically reply within a day."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
        <motion.form
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass space-y-5 rounded-3xl p-8"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-white/50">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-brand"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-white/50">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-brand"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm text-white/50"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-brand"
              placeholder="Tell me about your project…"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full rounded-full bg-brand py-3.5 text-sm font-semibold text-white transition hover:bg-brand-glow disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
          {status === 'sent' && (
            <p className="text-center text-sm text-emerald-400">
              Message sent — thank you!
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-sm text-brand">
              Could not send. Configure EmailJS env vars or reach out on LinkedIn.
            </p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass flex flex-col justify-between rounded-3xl p-8"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand">
              Connect
            </p>
            <p className="mt-4 text-white/60">
              Prefer socials? Find me on any of these platforms.
            </p>
          </div>

          <div className="my-8 grid grid-cols-2 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/70 transition hover:border-brand/40 hover:text-white"
              >
                <span className="text-brand">{iconMap[link.icon]}</span>
                {link.name}
              </a>
            ))}
          </div>

          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center">
            <p className="font-display text-2xl font-bold">Available for work</p>
            <p className="mt-2 text-sm text-white/45">
              Freelance & full-time opportunities
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
