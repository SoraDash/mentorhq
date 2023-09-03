"use server"
import { prisma } from '@/lib/db/prisma';
import { User } from '@prisma/client';

export type MentorWithCounts = User & {
  _count: {
    studentSession: number;
    students: number;
    sessions: number;
  }
}

export const getAllMentors = async () => {
  return await prisma.user.findMany();
};

export const getMentorById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id }
  });
};

export const getAllMentorsWithCount = async () => {
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

export const getMentorByIdWithCount = async (id: string) => {
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