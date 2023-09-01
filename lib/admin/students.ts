import { prisma } from '@/lib/db/prisma';
import { Student } from '@prisma/client';
import { getUser } from '../auth/auth';

export type StudentWithCounts = Student & {
  _count: {
    studentSession: number;
    students: number;
    sessions: number;
  }
}

export const getStudents = async () => {
  const user = await getUser();
  if (user?.role !== "ADMIN") return null

  const students = await prisma.user.findMany();

  return students;
};


export const getStudent = async (id: string) => {
  const user = await getUser();
  if (user?.role !== "ADMIN") return null;

  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
}


export const getStudentsWithCount = async () => {
  const user = await getUser();
  if (user?.role !== "ADMIN") return null

  return await prisma.user.findMany({
    include: {
      _count: {
        select: {
          studentSession: true,
          students: true,
          sessions: true,
        }
      }
    }
  });
};


export const getStudentWithCount = async (id: string) => {
  const user = await getUser();
  if (user?.role !== "ADMIN") return null;

  return await prisma.user.findUnique({
    where: {
      id: id,
    },

    include: {
      _count: {
        select: {
          studentSession: true,
          students: true,
          sessions: true,
        }
      }
    }
  })
}