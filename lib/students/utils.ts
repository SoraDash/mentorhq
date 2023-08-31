import { Student, User } from '@prisma/client';
import { GoogleSheetStudent } from './types';

export const fieldsToCheck: Array<keyof Student> = ['skype', 'slack', 'github', 'name'];


export const handleFieldPriority = (existingStudent: Student, incomingStudent: Student): Student => {

  fieldsToCheck.forEach(field => {
    if (existingStudent[field] && !incomingStudent[field]) {
      (incomingStudent[field] as any) = existingStudent[field];
    }
  });

  return incomingStudent;
};


export const extractGithubUsername = (url: string): string => {
  const match = url.match(/https?:\/\/github\.com\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : url;
};


export const transformToPrismaStudent = (googleSheetData: GoogleSheetStudent, user: User): Partial<Student> => {
  return {
    name: googleSheetData.name,
    email: googleSheetData.email,
    status: googleSheetData.status || "Unknown",
    courseCode: googleSheetData.courseCode,
    programmeID: googleSheetData.programmeID,
    lmsAccess: googleSheetData.lmsAccess === "Active",
    mentorId: user.id,
    skype: googleSheetData.skype || null,
    slack: googleSheetData.slack || null,
    github: googleSheetData.github || null,
    linkedIn: null,
    contactMethod: 'SLACK',
    lastContact: null,
  };
};



