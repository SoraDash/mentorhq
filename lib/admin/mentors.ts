"use server"
import { isAdmin } from '@/components/server/routeguards';
import { prisma } from '@/lib/db/prisma';
import { User } from '@prisma/client';

export type MentorWithCounts = User & {
  _count: {
    studentSession: number;
    students: number;
    sessions: number;
  }
}

export const getAllMentorsAdmin = async () => {
  if (!await isAdmin()) return [] as User[];
  const mentors = await prisma.user.findMany();
  if (!mentors) return [] as User[];
  return mentors
};

export const getMentorByIdAdmin = async (id: string) => {
  if (!await isAdmin()) return {} as User;

  const mentor = await prisma.user.findUnique({
    where: { id }
  });
  if (!mentor) return {} as User;
  return mentor;
};

export const getAllMentorsWithCountAdmin = async () => {
  if (!await isAdmin()) return [] as MentorWithCounts[];

  const mentors = await prisma.user.findMany({
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
  if (!mentors) return [] as MentorWithCounts[];
  return mentors
};

export const getMentorByIdWithCountAdmin = async (id: string) => {
  if (!await isAdmin()) return {} as MentorWithCounts;
  const mentor = await prisma.user.findUnique({
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
  if (!mentor) return {} as MentorWithCounts;
};