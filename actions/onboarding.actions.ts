"use server"

import { getUser } from '@/lib/auth/auth';
import { revalidatePath } from 'next/cache';

export const checkStatus = async () => {
  await getUser();

  revalidatePath("/dashboard")
};