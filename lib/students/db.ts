"use server"
import { Student } from '@prisma/client';
import { User } from '@prisma/client';
import { handleFieldPriority } from './utils';
import { getUser } from '../auth/auth';
import { prisma } from '@/lib/db/db';
export const upsertStudent = async (student: Student, user: User) => {
  const existingStudent = await prisma.student.findUnique({
    where: {
      email: student.email,
    },
  });

  if (existingStudent) {
    student = handleFieldPriority(existingStudent, student);
  }

  await prisma.student.upsert({
    where: {
      email: student.email,
    },
    update: {
      name: student.name,
      status: student.status,
      courseCode: student.courseCode,
      programmeID: student.programmeID?.toUpperCase(),
      mentorId: user.id,
      skype: student.skype,
      slack: student.slack,
      github: student.github,
      linkedIn: student.linkedIn,
    },
    create: {
      name: student.name,
      status: student.status,
      courseCode: student.courseCode,
      programmeID: student.programmeID?.toUpperCase(),
      mentorId: user.id,
      skype: student.skype,
      slack: student.slack,
      github: student.github,
      email: student.email,
      linkedIn: student.linkedIn,
    },
  });
};

export const getStudents = async (): Promise<Student[]> => {
  const user = await getUser();
  if (!user?.email) throw new Error('Invalid user data')

  const students = await prisma.student.findMany({
    where: {
      mentorId: user.id,
    },
  });

  return students;
}

export const getStudent = async (id: string): Promise<Student | null> => {
  const user = await getUser();
  if (!user?.email) throw new Error('Invalid user data')

  const student = await prisma.student.findUnique({
    where: {
      id: id,
      mentorId: user.id,
    },
  });
  if (!student) return null;

  return student;
}
