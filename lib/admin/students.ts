import { Student } from '@prisma/client';
import { getUser } from '../auth/auth';
import { prisma } from '@/lib/db/prisma';

export const getStudents = async (): Promise<Student[]> => {
  const user = await getUser();
  if (user?.role !== "ADMIN") throw new Error('Not an Admin');

  const students = await prisma.student.findMany({
    include: {
      mentor: true,
      projects: true,

    }
  });

  return students;
};