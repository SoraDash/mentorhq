import { z } from 'zod';

import { MiscValidation } from '@/lib/validations/MiscValidation';
import { NameValidation } from '@/lib/validations/NameValidation';
import { SocialValidation } from '@/lib/validations/SocialValidation';
import { UserValidation } from '@/lib/validations/UserValidation';

export type NameFormData = z.infer<typeof NameValidation>;

export type MiscFormData = z.infer<typeof MiscValidation>;

export type SocialFormData = z.infer<typeof SocialValidation>;

export type CustomFormData = z.infer<typeof UserValidation>;
