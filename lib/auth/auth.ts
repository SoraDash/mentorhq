'use server';

import { Role, User } from '@prisma/client';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/db/prisma';

import { authOptions } from './next-auth-config';
import { CalendlyToken } from '../calendly/types';

export type ExtendedUser = User & {
  calendly_token?: CalendlyToken | null;
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};

export const getUserRole = async () => {
  const user = await getUser();

  return user?.role;
};

export const getUser = async (): Promise<User | null> => {
  const session = await getAuthSession();

  if (!session?.user) return null;
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return user;
};

export const updateRole = async (id: string, role: Role) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });

  return user;
};
