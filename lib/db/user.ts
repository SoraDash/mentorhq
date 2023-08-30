"use server"
import { prisma } from '@/lib/db/db';
import { getAuthSession } from '@/lib/auth/auth';

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  });
}

export const getUserBySession = async () => {
  const session = await getAuthSession();
  if (!session || !session.user?.email) {
    console.debug("No session found or email missing from session.");
    return null;
  }
  return getUserByEmail(session.user.email);
}
