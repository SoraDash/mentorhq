import { prisma } from '@/lib/db/prisma';
import { User } from '@prisma/client';
import { getUser } from '../auth/auth';

export type MentorWithCounts = User & {
  _count: {
    studentSession: number;
    students: number;
    sessions: number;
  }
}

export const getMentors = async () => {
  const user = await getUser();
  if (user?.role !== "ADMIN") return null

  const students = await prisma.user.findMany();

  return students;
};


export const getMentor = async (id: string) => {
  const user = await getUser();
  if (user?.role !== "ADMIN") return null;

  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
}


export const getMentorsWithCount = async () => {
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


export const getMentorWtihCount = async (id: string) => {
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