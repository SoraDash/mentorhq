"use server"
import { prisma } from '@/lib/db/prisma';
import { Student, User } from '@prisma/client';
import { getUser } from '../auth/auth';
import { GoogleSheetStudent, PartialGoogleSheetStudent } from './types';
import { handleFieldPriority, transformToPrismaStudent } from './utils';
import { isAdmin } from '@/components/server/routeguards';

export type StudentWithCounts = Student & {
  _count: {
    studentSession: number;
    students: number;
    sessions: number;
  }
}

type FetchConditions = {
  id: string;
  mentorId?: string;
}

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

const fetchStudentByCondition = async (conditions: FetchConditions) => {
  const student = await prisma.student.findUnique({
    where: conditions,
    include: {
      deadline: true,
      projects: true,

    }
  });

  return student || {} as Student;
};

export const getAllStudents = async (): Promise<Student[]> => {
  const user = await getUser();
  if (!user) return [];

  // If the user is an ADMIN, fetch all students.
  if (await isAdmin()) {
    return prisma.student.findMany() || [];
  }

  // If not, fetch students associated with the user.
  return prisma.student.findMany({ where: { mentorId: user.id } }) || [];
};

export const getStudent = async (id: string): Promise<Student> => {
  const user = await getUser();
  if (!user) return {} as Student;

  let fetchConditions: FetchConditions = { id: id };


  if (await isAdmin()) {
    fetchConditions.mentorId = user.id;
  }

  return fetchStudentByCondition(fetchConditions);
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
  const students = await prisma.user.findMany({
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
  if (!students) return [] as StudentWithCounts[];
  return students;
};


export const getStudentByIdWithCountAdmin = async (id: string) => {
  const student = await prisma.user.findUnique({
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
  if (!student) return null;
  return student;
};
