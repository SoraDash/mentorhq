import { Student } from '@prisma/client';

export const fieldsToCheck = ['skype', 'slack', 'github'];

export const getCacheKey = (userEmail: string) => `students:${userEmail}`;

export const handleFieldPriority = (existingStudent: Student, incomingStudent: Student): Student => {
  const fieldsToCheck = ['skype', 'slack', 'github'];

  fieldsToCheck.forEach(field => {
    if (existingStudent[field as keyof Student] && !(incomingStudent as any)[field]) {
      (incomingStudent as any)[field] = existingStudent[field as keyof Student];
    }
  });

  return incomingStudent;
};
