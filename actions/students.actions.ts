"use server";

import { Student, User } from '@prisma/client';
import { getUser } from '../lib/auth/auth';
import nodeCache from '../cache';
import { prisma } from '../lib/db';
import { signOut } from 'next-auth/react';
const AsyncLock = require("async-lock");

const lock = new AsyncLock();

const isCachingEnabled = process.env.NODE_ENV !== 'production';

export const getCacheKey = (userEmail: string) => `students:${userEmail}`;

export const fetchStudentsFromApi = async (user: User) => {
  const res = await fetch(
    `${process.env.CI_API_URL}?email=${user?.ciEmail || user?.email}&key=${user?.ciApiKey}&students=true`
  );

  if (!res.ok) {
    throw new Error(`Failed fetching data. Status: ${res.status}`);
  }

  const data = await res.json();

  if (data?.status === 'error' || data?.status === 'empty') {
    console.log(data)
    throw new Error(data?.message || 'Failed fetching data');
  }

  return data.students as Student[];
};

export const studentsFromGoogleSheets = async (): Promise<Student[]> => {
  const user = await getUser();

  if (!user?.email || !user?.ciApiKey) {
    console.debug('Missing user email or ciApiKey');
    console.log(user?.email, user?.ciApiKey);
    throw new Error('Invalid user data');
  }

  const cacheKey = getCacheKey(user.email);

  if (isCachingEnabled) {
    const cachedData = nodeCache.get(cacheKey);
    if (cachedData) {
      console.debug(`Cache HIT for key: ${cacheKey}`);
      return cachedData as Student[];
    }
    console.debug(`Cache MISS for key: ${cacheKey}`);
  }

  const fetchedStudents = await lock.acquire(cacheKey, async () => {
    // This section will be locked, ensuring only one request at a time executes it
    const students = await fetchStudentsFromApi(user);
    isCachingEnabled && nodeCache.set(cacheKey, students);
    return students;
  });

  return fetchedStudents;
};

export const syncStudentsWithDatabase = async (): Promise<void> => {
  const user = await getUser();
  if (!user?.email) throw new Error('Invalid user data')
  const cacheKey = getCacheKey(user.email);
  const currentStudents = await prisma.student.findMany({
    where: {
      mentorId: user.id,
    },
  });

  const sheetStudents = await studentsFromGoogleSheets();
  const currentStudentIds = currentStudents.map(s => s.id);
  const sheetStudentIds = sheetStudents.map(s => s.id);

  const newStudents = sheetStudents.filter(sheetStudent => !currentStudentIds.includes(sheetStudent.id));
  const unassignedStudents = currentStudents.filter(currentStudent => !sheetStudentIds.includes(currentStudent.id));

  if (newStudents.length > 0 && !nodeCache.get(cacheKey)) {
    for (const student of newStudents) {
      console.log(`Upserting student ${student.name}`);
      await upsertStudent(student, user);
    }
    console.log(`Upserted ${newStudents.length} students`);
  }
};

const upsertStudent = async (student: Student, user: User) => {
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