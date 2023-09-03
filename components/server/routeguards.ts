"use server"
import { getUser } from '@/lib/auth/auth';
import { Student } from '@prisma/client';

export const isAdmin = async (): Promise<boolean> => {
  const user = await getUser();
  return user?.role === 'ADMIN';
}

export const isMentorOfStudent = async (student: Student): Promise<boolean> => {
  const user = await getUser();
  if (!user) return false;
  return user.id === student.mentorId;
}

export const canAccessStudentPage = async (student: Student): Promise<boolean> => {
  if (await isAdmin()) return true;
  return await isMentorOfStudent(student);
}
