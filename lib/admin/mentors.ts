'use server';

import { User } from '@prisma/client';

import { isAdmin } from '@/components/server/routeguards';
import { prisma } from '@/lib/db/prisma';

export const getAllMentorsAdmin = async () => {
  if (!(await isAdmin())) return [] as User[];
  const mentors = await prisma.user.findMany();

  if (!mentors) return [] as User[];

  return mentors;
};

export const getMentorByIdAdmin = async (id: string) => {
  if (!(await isAdmin())) return {} as User;

  const mentor = await prisma.user.findUnique({
    where: { id },
  });

  if (!mentor) return {} as User;

  return mentor;
};

export const getMentorById = async (id?: string) => {
  if (!id) return null;
  const mentor = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      _count: {
        select: {
          studentSession: true,
          students: true,
          sessions: true,
        },
      },
    },
  });

  if (!mentor) null;

  return mentor;
};

export const getAllMentorsWithCountAdmin = async () => {
  if (!(await isAdmin())) return [];

  const mentors = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          studentSession: true,
          students: true,
          sessions: true,
        },
      },
    },
  });

  if (!mentors) return [];

  return mentors;
};

export const getMentorByIdWithCountAdmin = async (id: string) => {
  if (!(await isAdmin())) null;
  const mentor = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          studentSession: true,
          students: true,
          sessions: true,
        },
      },
    },
  });

  if (!mentor) null;

  return mentor;
};
