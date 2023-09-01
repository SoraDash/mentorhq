import { getUser } from '@/lib/auth/auth';
import { Student } from '@prisma/client';

export const redirectIfNotAdmin = async (student: Student | null) => {
  const user = await getUser();
  if (!user) return false;
  return user.id !== student?.mentorId && user?.role !== 'ADMIN' ? true : false;

}

export const redirectAdminPage = async () => {
  const user = await getUser();
  if (!user) return false;
  return user?.role !== 'ADMIN' ? true : false;
}