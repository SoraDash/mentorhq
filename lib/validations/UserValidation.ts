import { z } from 'zod';

import { CustomFormData } from '@/types/FormDataTypes';

export const UserValidation = z.object({
  firstName: z
    .string()
    .min(3, { message: 'Minimum 3 characters for name' })
    .max(30)
    .default('')
    .optional(),
  lastName: z
    .string()
    .min(3, { message: 'Minimum 3 characters for name' })
    .max(30)
    .default('')
    .optional(),
  paidPerHour: z.number().min(0).max(100).default(0).optional(),
  github: z.string().default('').optional(),
  slack: z.string().default('').optional(),
  linkedIn: z.string().default('').optional(),
  website: z.string().default('').optional(),
  skype: z.string().default('').optional(),
  twitter: z.string().default('').optional(),
  ciApiKey: z.string().default('').optional(),
  ciEmail: z.string().email().default('').optional(),
  sendWelcomeEmail: z.boolean().default(false).optional(),
});

export const INITIAL_DATA: CustomFormData = {
  firstName: '',
  lastName: '',
  paidPerHour: 0,
  github: '',
  slack: '',
  linkedIn: '',
  website: '',
  skype: '',
  twitter: '',
  ciApiKey: '',
  ciEmail: '',
  sendWelcomeEmail: false,
};
