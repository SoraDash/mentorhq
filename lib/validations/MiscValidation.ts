import { z } from 'zod';

export const MiscValidation = z.object({
  paidPerHour: z.number().min(0).max(100).default(0).optional(),
  ciApiKey: z.string().optional(),
  ciEmail: z.string().email().optional(),
  sendWelcomeEmail: z.boolean().default(false).optional(),
});
