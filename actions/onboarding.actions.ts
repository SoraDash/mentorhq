'use server';

import { revalidatePath } from 'next/cache';

import { getUser } from '@/lib/auth/auth';

export const checkStatus = async () => {
  await getUser();

  revalidatePath('/dashboard');
};
