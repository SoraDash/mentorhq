import { Prisma } from '@prisma/client';

export type UserWithCount = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: {
        sessions: true;
        studentSession: true;
        students: true;
      };
    };
  };
}>;
