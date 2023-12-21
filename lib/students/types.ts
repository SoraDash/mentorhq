import { Project, Session, Student, User } from '@prisma/client';

export type GoogleSheetStudent = {
  courseCode: string;
  deadlines: Deadline[];
  email: string;
  github: string;
  lmsAccess: string;
  mentor: string;
  name: string;
  programmeID: string;
  skype: string;
  slack: string;
  status: string;
};

export type Deadline =
  | { '1': string }
  | { '2': string }
  | { '3': string }
  | { '4': string }
  | { '5': string };

export type PartialGoogleSheetStudent = Partial<GoogleSheetStudent>;

export type UnifiedStudent = Student & {
  _count?: {
    course: number;
    mentor: number;
    projects: number;
    sessions: number;
  };
  projects?: Project[];
  sessions?: Session[];
};

export type UnifiedUser = User & {
  _count?: {
    mentoredStudents: number;
  };
  mentoredStudents?: UnifiedStudent[];
};
