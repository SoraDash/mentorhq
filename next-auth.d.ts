import { Role } from '@prisma/client';
import { DefaultUser } from 'next-auth';

interface IUser extends DefaultUser {
  calendly_token?: string | null | undefined;
  firstName: string;
  hasKey?: boolean;
  id: string;
  isOnboarded: boolean;
  isPremium: boolean;
  lastName: string;
  role: Role;
}
declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}
