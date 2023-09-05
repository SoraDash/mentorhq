"use server"
import { prisma } from '@/lib/db/prisma';
import { Project, Session, Student, User } from '@prisma/client';
import { getUser } from '../auth/auth';
import { GoogleSheetStudent, PartialGoogleSheetStudent } from './types';
import { handleFieldPriority, transformToPrismaStudent } from './utils';
import { isAdmin } from '@/components/server/routeguards';
import { getCourseByProgrammeID, generateProjectsForStudent } from '../course/courseUtils';
import { splitName } from '../split-name';

type UnifiedStudent = Student & {
  sessions?: Session[]; // Assuming Session is a type you have
  projects?: Project[]; // Assuming Project is a type you have
}

type UnifiedUser = User & {
  mentoredStudents?: UnifiedStudent[];
}

export type StudentWithCounts = Student & {
  _count: {
    studentSession: number;
    students: number;
    sessions: number;
  }
}

type FetchConditions = {
  id: string;
  mentorId?: string;
}

const updateStudent = async (existingStudent: Student, prismaStudentData: Student): Promise<Student> => {
  const { firstName, lastName } = splitName(prismaStudentData.name!);
  return await prisma.student.update({
    where: {
      email: existingStudent.email,
    },
    data: { ...prismaStudentData, firstName, lastName }
  });
};

const createStudent = async (prismaStudentData: Student): Promise<Student> => {
  const { firstName, lastName } = splitName(prismaStudentData.name!);
  return await prisma.student.create({
    data: { ...prismaStudentData, firstName, lastName }
  });
};

export const updateOrCreateStudent = async (
  student: PartialGoogleSheetStudent,
  user: User
): Promise<{ action: 'added' | 'updated' | 'unchanged', changes?: string[], error?: string }> => {
  try {
    console.log("🔍 Searching for existing student using email...");
    const existingStudent = await prisma.student.findUnique({
      where: {
        email: student.email!,
      },
    });

    let prismaStudentData: Student = transformToPrismaStudent(student as GoogleSheetStudent, user) as Student;

    if (existingStudent) {
      console.log("✅ Found an existing student.");

      const initialChanges = (Object.keys(existingStudent) as Array<keyof typeof existingStudent>)
        .filter(key => prismaStudentData[key] !== undefined && prismaStudentData[key] !== existingStudent[key]);

      prismaStudentData = handleFieldPriority(existingStudent, prismaStudentData);

      if (initialChanges.length > 0) {
        console.log("🔄 Updating existing student with new data...");
        await updateStudent(existingStudent, prismaStudentData);
        console.log("✅ Student updated successfully.");
        return { action: 'updated', changes: initialChanges };
      }

      console.log("ℹ️ No changes detected for the student.");
      return { action: 'unchanged' };
    }

    console.log("🆕 Creating a new student...");
    const createdStudent = await createStudent(prismaStudentData);
    console.log("✅ New student created successfully.");

    // Generate projects for the student if they have a course code
    if (createdStudent.programmeID) {
      console.log("🔍 Looking up course code for generating projects...");
      const courseWithTemplates = await getCourseByProgrammeID(createdStudent.programmeID);
      console.log("✅ Course code found. Generating projects...");
      await generateProjectsForStudent(courseWithTemplates, createdStudent.id);
      console.log("✅ Projects generated and assigned to the student.");
    }

    return { action: 'added' };

  } catch (error: any) {
    console.error("❌ Error in updateOrCreateStudent:", error);
    return { action: 'unchanged', error: error.message };
  }
};


export const unassignStudent = async (studentId: string) => {
  return await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      mentorId: null,
    },
  });
};

const fetchStudentByCondition = async (conditions: FetchConditions) => {
  const student = await prisma.student.findUnique({
    where: conditions,
    include: {
      projects: true,
    }
  });

  return student || {} as Student;
};

export const getAllStudents = async (): Promise<Student[]> => {
  const user = await getUser();
  if (!user) return [];

  const userIsAdmin = await isAdmin();

  // If the user is an ADMIN, fetch all students.
  if (userIsAdmin) {
    return prisma.student.findMany() || [];
  }

  // If not, fetch students associated with the user.
  return prisma.student.findMany({ where: { mentorId: user.id } }) || [];
};

export const getStudent = async (id: string): Promise<Student> => {
  const user = await getUser();
  if (!user) return {} as Student;

  let fetchConditions: FetchConditions = { id: id };

  const userIsAdmin = await isAdmin();

  if (userIsAdmin) {
    fetchConditions.mentorId = user.id;
  }

  return fetchStudentByCondition(fetchConditions);
};

export const getAllStudentsAdmin = async () => {
  return await prisma.student.findMany();
};

export const getStudentByIdAdmin = async (id: string) => {
  return await prisma.student.findUnique({
    where: { id }
  });
};

export const getAllStudentsWithCountAdmin = async () => {
  const students = await prisma.user.findMany({
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
  if (!students) return [] as StudentWithCounts[];
  return students;
};

export const getStudentByIdWithCountAdmin = async (id: string) => {
  const student = await prisma.user.findUnique({
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
  if (!student) return null;
  return student;
};
