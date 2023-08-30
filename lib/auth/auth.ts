"use server"
import { prisma } from '@/lib/db/prisma';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from './next-auth-config';

export const getAuthSession = () => {
  return getServerSession(authOptions);
};

export const getUserRole = async () => {
  const user = await getUser()
  return user?.role
}
export const getUser = async (): Promise<User | null> => {
  const session = await getAuthSession()
  if (!session?.user) return null
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },

  })
  return user
}


