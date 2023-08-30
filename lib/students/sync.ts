"use server"
import { Student } from '@prisma/client';
import { getUser } from '../auth/auth';
import { lock } from '../utils/asyncLock';
import { fetchStudentsFromApi } from '@/lib/students';
import { upsertStudent } from './db'
import CacheConfig from '../utils/cacheConfig';

export const studentsFromGoogleSheets = async (): Promise<Student[]> => {
  const user = await getUser();

  if (!user?.email || !user?.ciApiKey) {
    console.debug('Missing user email or ciApiKey');
    console.log(user?.email, user?.ciApiKey);
    throw new Error('Invalid user data');
  }

  // Use the type-safe approach
  const cachedStudents = await CacheConfig.get<Student[]>('students', user.email);
  if (cachedStudents) return cachedStudents;

  const fetchedStudents = await lock.acquire(`students:${user.email}`, async () => {
    const students = await fetchStudentsFromApi(user);

    if (CacheConfig.config.students.enabled) {
      await CacheConfig.set('students', user.email, students);
    }

    return students;
  });

  return fetchedStudents;
};

export const syncStudentsWithDatabase = async (): Promise<void> => {
  const user = await getUser();
  if (!user?.email) throw new Error('Invalid user data')

  const currentStudents = await prisma.student.findMany({
    where: {
      mentorId: user.id,
    },
  });

  const sheetStudents = await studentsFromGoogleSheets();
  const currentStudentIds = currentStudents.map((s: Student) => s.id);
  const sheetStudentIds = sheetStudents.map((s: Student) => s.id);

  const newStudents = sheetStudents.filter((sheetStudent: Student) => !currentStudentIds.includes(sheetStudent.id));
  const unassignedStudents = currentStudents.filter((currentStudent: Student) => !sheetStudentIds.includes(currentStudent.id));

  // Assuming you want to check if the students are cached before upserting.
  if (newStudents.length > 0) {
    for (const student of newStudents) {
      console.log(`Upserting student ${student.name}`);
      await upsertStudent(student, user);
    }
    console.log(`Upserted ${newStudents.length} students`);
  }
};
