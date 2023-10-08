import { Project, Session, Student, User } from '@prisma/client';

export type GoogleSheetStudent = {
  name: string;
  email: string;
  status: string;
  courseCode: string;
  programmeID: string;
  mentor: string;
  lmsAccess: string;
  skype: string;
  slack: string;
  github: string;
  deadlines: Deadline[];
};
export type Deadline =
  | { '1': string }
  | { '2': string }
  | { '3': string }
  | { '4': string }
  | { '5': string };


export type PartialGoogleSheetStudent = Partial<GoogleSheetStudent>;


export type UnifiedStudent = Student & {
  sessions?: Session[];
  projects?: Project[];
}

export type UnifiedUser = User & {
  mentoredStudents?: UnifiedStudent[];
}