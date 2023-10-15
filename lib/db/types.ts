import { Prisma } from '@prisma/client';

export type UserWithCount = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: {
        studentSession: true;
        students: true;
        sessions: true;
      };
    };
  };
}>;
