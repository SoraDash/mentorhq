import { Role } from '@prisma/client';
import { DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  id: string;
  firstName: string;
  lastName: string;
  isOnboarded: boolean;
  isPremium: boolean;
  hasKey?: boolean;
  role: Role
}
declare module "next-auth" {
  interface User extends IUser { }
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser { }
}