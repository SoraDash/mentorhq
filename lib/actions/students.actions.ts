"use server";

import { Student } from '@prisma/client';
import { getUser } from '../auth';
import nodeCache from '../cache';
import { prisma } from '../db';
import { User } from 'next-auth';

export const studentsFromGoogleSheets = async (): Promise<Student[]> => {
  const user = await getUser();

  if (!user?.email || !user?.ciApiKey) {
    console.debug('Missing user email or ciApiKey');
    throw new Error('Invalid user data');
  }

  const cacheKey = `students:${user?.email}`;

  // 1. Check cache first
  const cachedData = nodeCache.get(cacheKey);
  if (cachedData) {
    console.debug(`Cache HIT for key: ${cacheKey}`);
    return cachedData as Student[];
  }
  console.debug(`Cache MISS for key: ${cacheKey}`);


  // 2. If not present in cache, fetch from the API
  try {
    const res = await fetch(
      `${process.env.CI_API_URL}?email=${user?.ciEmail || user?.email}&key=${user?.ciApiKey}&students=true`
    );

    if (!res.ok) {
      throw new Error(`Failed fetching data. Status: ${res.status}`);
    }

    const data = await res.json();

    if (data?.status === 'error' || data?.status === 'empty') {
      console.debug(`Error response from CI API: ${data?.message}`);
      throw new Error(data?.message);
    }

    // 3. Cache the data and return
    nodeCache.set(cacheKey, data.students as Student[]);
    return data.students;

  } catch (error) {
    console.error(`Failed fetching students: ${error}`);
    throw error;
  }
};

export const syncStudentsWithDatabase = async (): Promise<{ newStudents: Student[], unassignedStudents: Student[] }> => {
  const { id } = await getUser() as User;
  // Fetch all students associated with the user from the database
  const currentStudents = await prisma.student.findMany({
    where: {
      mentorId: id,
    },
  });

  // Get students from Google Sheets
  const sheetStudents = await studentsFromGoogleSheets();

  // Create an array of student IDs (or some unique property) from the database
  const currentStudentIds = currentStudents.map((s: Student) => s.id);

  // Create an array of student IDs from Google Sheets data
  const sheetStudentIds = sheetStudents.map((s: Student) => s.id);  // Assuming 'id' is a unique property present in the sheet data

  // Identify new students: those in the Google Sheets list but not in the database
  const newStudents = sheetStudents.filter((sheetStudent: Student) => !currentStudentIds.includes(sheetStudent.id));
  if (newStudents.length > 0) {
    for (const student of newStudents) {
      console.log(`Upserting student: ${student.name}`)
      await upsertStudent(student);
    }

  }

  // Identify students to unassign: those in the database but not in the Google Sheets list
  const unassignedStudents = currentStudents.filter((currentStudent: Student) => !sheetStudentIds.includes(currentStudent.id));
  return {
    newStudents,
    unassignedStudents
  };
};

const upsertStudent = async (student: Student) => {
  const { id } = await getUser() as User;
  await prisma.student.upsert({
    where: {
      email: student.email,
    },
    update: {
      name: student.name,
      status: student.status,
      courseCode: student.courseCode,
      programmeID: student.programmeID,
      mentorId: id,
      skype: student.skype,
      slack: student.slack,
      github: student.github,
      linkedIn: student.linkedIn,
    },
    create: {
      name: student.name,
      status: student.status,
      courseCode: student.courseCode,
      programmeID: student.programmeID,
      mentorId: id,
      skype: student.skype,
      slack: student.slack,
      github: student.github,
      email: student.email,
      linkedIn: student.linkedIn,
    },
  });
};