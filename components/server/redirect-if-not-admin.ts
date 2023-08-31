import { Student, User } from '@prisma/client';

export const redirectIfNotAdmin = (user: User | null, student: Student | null) => {
  return user?.id !== student?.mentorId && user?.role !== 'ADMIN' ? true : false;

}
