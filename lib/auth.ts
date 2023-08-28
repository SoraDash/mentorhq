import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { IUser } from '@/next-auth';
import { NextAuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./db";
import { splitName } from './split-name';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  theme: {
    "logo": "/logo_only.png"
  },
  events: {
    async signIn(message) {
      const name = splitName(message.user.name!)
      await prisma.user.update({
        where: {
          email: message.user.email!
        },
        data: {
          firstName: name.firstName,
          lastName: name.lastName,
          image: message.user.image
        }
      })
    }
  },
  callbacks: {
    jwt: async ({ token }) => {
      const db_user = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (db_user) {
        token.id = db_user.id
        token.name = db_user.name
        token.firstName = db_user.firstName!
        token.lastName = db_user.lastName!
        token.email = db_user.email
        token.image = db_user.image
        token.isOnboarded = db_user.isOnboarded
        token.isPremium = db_user.isPremium
        token.role = db_user.role
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        if (!session.user) session.user = {} as IUser
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.isOnboarded = token.isOnboarded;
        session.user.isPremium = token.isPremium;
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    })
  ],
};

export const getAuthSession = () => {

  return getServerSession(authOptions);
};

export const getUserRole = async () => {
  const session = await getAuthSession()
  if (!session?.user) return null
  const role = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }, select: {
      role: true
    }
  })
  return role?.role
}
export const getUser = async () => {
  const session = await getAuthSession()
  if (!session?.user) return null
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  })
  return user
}


