// user.action.ts
"use server"
import { getAuthSession } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import { CustomFormData } from '@/types/FormDataTypes';


export async function onboardUser(rawFormData: Partial<FormData | CustomFormData>, onboarding: boolean = false) {
  try {
    const session = await getAuthSession();
    if (!session || !session.user?.id) {
      throw new Error('No session found or no user ID in the session');
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...rawFormData as CustomFormData,
        isOnboarded: onboarding,
        role: 'MENTOR'
      }
    });

    return { success: true, data: updatedUser };

  } catch (error: any) {
    return { success: false, error: error.message };
  }
}