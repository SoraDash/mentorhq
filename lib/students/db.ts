import { prisma } from '@/lib/db/prisma';
import { Student, User } from '@prisma/client';
import { getUser } from '../auth/auth';
import { GoogleSheetStudent, PartialGoogleSheetStudent } from './types';
import { transformToPrismaStudent, handleFieldPriority } from './utils';


export const updateOrCreateStudent = async (
  student: PartialGoogleSheetStudent,
  user: User
): Promise<{ action: 'added' | 'updated' | 'unchanged', changes?: string[] }> => {

  console.log("Incoming student data:", student);

  const existingStudent = await prisma.student.findUnique({
    where: {
      email: student.email!,
    },
  });

  let prismaStudentData: Student = transformToPrismaStudent(student as GoogleSheetStudent, user) as Student;

  if (existingStudent) {
    prismaStudentData = handleFieldPriority(existingStudent, prismaStudentData); // Use the function here

    const changes = (Object.keys(existingStudent) as Array<keyof typeof existingStudent>)
      .filter(key => prismaStudentData[key] !== undefined && prismaStudentData[key] !== existingStudent[key]);

    if (changes.length > 0) {
      await prisma.student.update({
        where: {
          email: student.email!,
        },
        data: prismaStudentData
      });

      return { action: 'updated', changes };
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
  if (!user?.email) throw new Error('Invalid user data');

  const students = await prisma.student.findMany({
    where: {
      mentorId: user.id,
    },
  });

  return students;
};

export const getStudent = async (id: string): Promise<Student | null> => {
  const user = await getUser();
  if (!user?.email) throw new Error('Invalid user data');

  const student = await prisma.student.findUnique({
    where: {
      id: id,
      mentorId: user.id,
    },
  });

  if (!student) return null;
  return student;
};
