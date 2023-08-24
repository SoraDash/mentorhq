import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z.string().min(3, { message: "Minimum 3 characters for name" }).max(30),
  username: z.string().min(3, { message: "Minimum 3 characters for username" }).max(30),
  paidPerHour: z.number().min(0).max(100).default(0).optional(),
  github: z.string().optional(),
  slack: z.string().optional(),
  linkedIn: z.string().optional(),
  website: z.string().optional(),
  skype: z.string().optional(),
  twitter: z.string().optional(),
  ciApiKey: z.string().optional(),
  ciEmail: z.string().email().optional(),
  isMentor: z.boolean().default(false).optional(),
  sendWelcomeEmail: z.boolean().default(false).optional(),
})