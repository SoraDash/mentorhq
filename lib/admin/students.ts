import { prisma } from '@/lib/db/prisma';
import { Student } from '@prisma/client';

export type StudentWithCounts = Student & {
  _count: {
    studentSession: number;
    students: number;
    sessions: number;
  }
}

export const getAllStudents = async () => {
  return await prisma.student.findMany();
};

export const getStudentById = async (id: string) => {
  return await prisma.student.findUnique({
    where: { id }
  });
};

export const getAllStudentsWithCount = async () => {
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

export const getStudentByIdWithCount = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
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