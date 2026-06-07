import { z } from 'zod';

export const contactSchema = z.object({
  from_name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be under 80 characters'),
  reply_to: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .max(120, 'Email must be under 120 characters'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
  company: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
