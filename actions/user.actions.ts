// user.action.ts
'use server';

import { getAuthSession } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import { CustomFormData } from '@/types/FormDataTypes';

export async function onboardUser(
  rawFormData: Partial<FormData | CustomFormData>,
  onboarding: boolean = false,
) {
  try {
    const session = await getAuthSession();

    if (!session || !session.user?.id) {
      throw new Error('No session found or no user ID in the session');
    }

    const updatedUser = await prisma.user.update({
      data: {
        ...(rawFormData as CustomFormData),
        isOnboarded: onboarding,
        role: 'MENTOR',
      },
      where: { id: session.user.id },
    });

    return { data: updatedUser, success: true };
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}
