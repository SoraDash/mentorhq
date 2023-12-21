import { z } from 'zod';

export const NameValidation = z.object({
  firstName: z.string().max(30).optional(),
  lastName: z.string().max(30).optional(),
});
