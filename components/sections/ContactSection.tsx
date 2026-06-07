'use client';

import { useForm, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SocialLinks from '@/components/ui/SocialLinks';
import {
  contactSchema,
  type ContactFormValues,
} from '@/lib/contact-schema';

const MY_EMAIL = 'dmc4719@gmail.com';

function fieldClass(hasError: boolean) {
  return `w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white outline-none transition disabled:opacity-60 ${
    hasError
      ? 'border-brand/80 focus:border-brand'
      : 'border-white/10 focus:border-brand'
  }`;
}

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      from_name: '',
      reply_to: '',
      message: '',
      company: '',
    },
    mode: 'onTouched',
  });

  const onInvalid = (fieldErrors: FieldErrors<ContactFormValues>) => {
    const firstError = Object.values(fieldErrors)[0]?.message;
    toast.error(
      typeof firstError === 'string'
        ? firstError
        : 'Please fix the highlighted fields.',
    );
  };

  const onSubmit = async (values: ContactFormValues) => {
    const toastId = toast.loading('Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.from_name,
          email: values.reply_to,
          message: values.message,
          company: values.company,
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok) {
        toast.error(data.error ?? 'Could not send your message.', {
          id: toastId,
        });
        return;
      }

      toast.success("Message sent! I'll get back to you soon.", { id: toastId });
      reset();
    } catch {
      toast.error(`Could not reach the server. Email me at ${MY_EMAIL}.`, {
        id: toastId,
      });
    }
  };

  return (
    <section id="contact">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a project in mind? Drop me a message and I'll get back to you."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal x={-20} y={0}>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold text-white">
                Get in touch
              </h3>
              <p className="mt-3 text-white/60">
                I&apos;m open to freelance projects, full-time roles, and
                collaborations on interesting web and 3D experiences.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-white/70">
                  <HiMail className="text-brand" />
                  <a
                    href={`mailto:${MY_EMAIL}`}
                    className="text-sm transition-colors hover:text-brand"
                  >
                    {MY_EMAIL}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <HiLocationMarker className="text-brand" />
                  <span className="text-sm">Available worldwide · Remote</span>
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/40">
                  Connect
                </p>
                <SocialLinks />
              </div>
            </div>
          </Reveal>

          <Reveal x={20} y={0}>
            <form
              onSubmit={handleSubmit(onSubmit, onInvalid)}
              noValidate
              className="glass space-y-5 rounded-2xl p-8"
            >
              <p className="text-sm leading-relaxed text-white/55">
                Fill in <span className="text-white/80">your</span> name and
                email so I know who to reply to.
              </p>

              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
                {...register('company')}
              />

              <div>
                <label
                  htmlFor="from_name"
                  className="mb-2 block font-mono text-xs uppercase tracking-wider text-white/50"
                >
                  Your name
                </label>
                <input
                  id="from_name"
                  type="text"
                  autoComplete="name"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.from_name)}
                  aria-describedby={
                    errors.from_name ? 'from_name-error' : undefined
                  }
                  className={fieldClass(Boolean(errors.from_name))}
                  placeholder="Your name"
                  {...register('from_name')}
                />
                {errors.from_name && (
                  <p
                    id="from_name-error"
                    role="alert"
                    className="mt-2 text-xs text-brand"
                  >
                    {errors.from_name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="reply_to"
                  className="mb-2 block font-mono text-xs uppercase tracking-wider text-white/50"
                >
                  Your email
                </label>
                <input
                  id="reply_to"
                  type="email"
                  autoComplete="email"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.reply_to)}
                  aria-describedby={
                    errors.reply_to ? 'reply_to-error' : undefined
                  }
                  className={fieldClass(Boolean(errors.reply_to))}
                  placeholder="you@email.com"
                  {...register('reply_to')}
                />
                {errors.reply_to && (
                  <p
                    id="reply_to-error"
                    role="alert"
                    className="mt-2 text-xs text-brand"
                  >
                    {errors.reply_to.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-xs uppercase tracking-wider text-white/50"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                  className={`${fieldClass(Boolean(errors.message))} resize-none`}
                  placeholder="Tell me about your project..."
                  {...register('message')}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    role="alert"
                    className="mt-2 text-xs text-brand"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-brand py-3.5 font-mono text-sm uppercase tracking-wider text-white transition hover:bg-brand-glow disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
