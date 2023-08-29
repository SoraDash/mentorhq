// user.action.ts
"use server"
import { getAuthSession } from '@/lib/auth/auth';
import { CustomFormData } from '@/types/FormDataTypes';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function onboardUser(rawFormData: Partial<FormData | CustomFormData>) {
  try {
    const session = await getAuthSession();
    if (!session || !session.user?.id) {
      throw new Error('No session found or no user ID in the session');
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...rawFormData as CustomFormData, // Cast rawFormData to CustomFormData
        isOnboarded: true,
        role: 'MENTOR'
      }
    });

    return { success: true, data: updatedUser };

  } catch (error: any) {
    return { success: false, error: error.message };
  }
}