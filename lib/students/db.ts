"use server"
import { prisma } from '@/lib/db/prisma';
import { Student, User } from '@prisma/client';
import { getUser } from '../auth/auth';
import { GoogleSheetStudent, PartialGoogleSheetStudent } from './types';
import { handleFieldPriority, transformToPrismaStudent } from './utils';


export const updateOrCreateStudent = async (
  student: PartialGoogleSheetStudent,
  user: User
): Promise<{ action: 'added' | 'updated' | 'unchanged', changes?: string[] }> => {


  const existingStudent = await prisma.student.findUnique({
    where: {
      email: student.email!,
    },
  });

  let prismaStudentData: Student = transformToPrismaStudent(student as GoogleSheetStudent, user) as Student;

  if (existingStudent) {
    const initialChanges = (Object.keys(existingStudent) as Array<keyof typeof existingStudent>)
      .filter(key => prismaStudentData[key] !== undefined && prismaStudentData[key] !== existingStudent[key]);

    prismaStudentData = handleFieldPriority(existingStudent, prismaStudentData);

    if (initialChanges.length > 0) {
      await prisma.student.update({
        where: {
          email: student.email!,
        },
        data: prismaStudentData
      });

      return { action: 'updated', changes: initialChanges };
    }

    return { action: 'unchanged' };
  }


  await prisma.student.create({
    data: prismaStudentData
  });

  return { action: 'added' };
};

export const unassignStudent = async (studentId: string) => {
  return await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      mentorId: null,
    },
  });
};

export const getStudents = async (): Promise<Student[]> => {
  const user = await getUser();
  if (!user) return [] as Student[]
  const students = await prisma.student.findMany({
    where: {
      mentorId: user.id,
    },
  });
  if (!students) return [] as Student[];
  return students

};


export const getStudent = async (id: string): Promise<Student> => {
  const user = await getUser();
  if (!user) return {} as Student;

  const student = await prisma.student.findUnique({
    where: {
      id: id,
    },
    include: {
      deadline: true,
      projects: true,
    }
  });

  if (!student) return {} as Student;
  return student;
};



export const getAllStudentsAdmin = async () => {
  return await prisma.student.findMany();
};

export const getStudentByIdAdmin = async (id: string) => {
  return await prisma.student.findUnique({
    where: { id }
  });
};

export const getAllStudentsWithCountAdmin = async () => {
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

export const getStudentByIdWithCountAdmin = async (id: string) => {
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