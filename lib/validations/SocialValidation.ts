import { z } from "zod";

export const SocialValidation = z.object({
  github: z.string().optional(),
  slack: z.string().optional(),
  linkedIn: z.string().optional(),
  website: z.string().optional(),
  skype: z.string().optional(),
  twitter: z.string().optional(),
})


