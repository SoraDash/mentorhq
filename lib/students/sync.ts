"use server"
import { prisma } from '@/lib/db/prisma';
import { GoogleSheetStudent, extractGithubUsername, fetchStudentsFromApi, unassignStudent, updateOrCreateStudentFromGoogle } from '@/lib/students';
import { Student } from '@prisma/client';
import { getUser } from '../auth/auth';
import { lock } from '../utils/asyncLock';
import CacheConfig from '../utils/cacheConfig';

export const studentsFromGoogleSheets = async (): Promise<GoogleSheetStudent[]> => {
  const user = await getUser();
  if (!user?.email || !user?.ciApiKey) {
    console.debug('Missing user email or ciApiKey');
    console.log(user?.email, user?.ciApiKey);
    throw new Error('Invalid user data');
  }

  const cachedStudents = await CacheConfig.get<GoogleSheetStudent[]>('students', user.email);
  if (cachedStudents) {
    console.log("Returning cached students");
    return cachedStudents;
  }

  const fetchedStudents = await lock.acquire(`students:${user.email}`, async () => {
    const students = await fetchStudentsFromApi(user);

    if (CacheConfig.config.students.enabled) {
      await CacheConfig.set('students', user.email, students);
    }

    return students;
  });

  return fetchedStudents;
};

export const syncStudentsWithDatabase = async (): Promise<{ added: string[], removed: string[], updated: string[] }> => {
  const user = await getUser();
  if (!user?.email) throw new Error('Invalid user data')

  const currentStudents = await prisma.student.findMany({
    where: {
      mentorId: user.id,
    },
  });

  const sheetStudents = await studentsFromGoogleSheets();
  const currentStudentEmails = currentStudents.map((s: Student) => s.email);
  const sheetStudentEmails = sheetStudents.map((s: Student | GoogleSheetStudent) => s.email);

  const newStudents = sheetStudents.filter((sheetStudent: Student | GoogleSheetStudent) => !currentStudentEmails.includes(sheetStudent.email));
  const unassignedStudents = currentStudents.filter((currentStudent: Student) => !sheetStudentEmails.includes(currentStudent.email));

  const added: string[] = [];
  const removed: string[] = [];
  const updated: string[] = [];

  if (newStudents.length > 0) {
    for (const student of newStudents) {
      student.github = student.github ? extractGithubUsername(student.github) : student.github;
      const result = await updateOrCreateStudentFromGoogle(student, user);
      if (result.action === 'added') added.push(student.name);
      if (result.action === 'updated') updated.push(student.name);
    }
  }

  for (const sheetStudent of sheetStudents) {

    if (currentStudentEmails.includes(sheetStudent.email)) {
      sheetStudent.github = sheetStudent.github ? extractGithubUsername(sheetStudent.github) : sheetStudent.github;
      const result = await updateOrCreateStudentFromGoogle(sheetStudent, user);

      if (result.action === 'updated') updated.push(sheetStudent.name);
    }
  }

  for (const student of unassignedStudents) {
    await unassignStudent(student.id);
    removed.push(student.name);
  }

  return { added, removed, updated };
};
