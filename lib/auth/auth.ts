import { getServerSession } from 'next-auth';
import { authOptions } from './next-auth-config';
import { User } from '@prisma/client';

export const getAuthSession = () => {
  return getServerSession(authOptions);
};

export const getUserRole = async () => {
  const session = await getAuthSession()
  if (!session?.user) return
  const role = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }, select: {
      role: true
    }
  })
  return role?.role
}
export const getUser = async (): Promise<User | null> => {
  const session = await getAuthSession()
  if (!session?.user) return null
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  })
  return user
}


