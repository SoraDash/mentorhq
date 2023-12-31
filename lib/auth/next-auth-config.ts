import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@/lib/db/prisma';
import { splitName } from '@/lib/split-name';
import { IUser } from '@/next-auth';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  callbacks: {
    jwt: async ({ token, user }) => {
      const db_user = await prisma.user.findFirst({
        where: {
          email: token.email as string,
        },
      });

      if (db_user) {
        token.id = db_user.id;
        token.name = db_user.name;
        token.firstName = db_user.firstName!;
        token.lastName = db_user.lastName!;
        token.email = db_user.email;
        token.image = db_user.image;
        token.isOnboarded = db_user.isOnboarded;
        token.isPremium = db_user.isPremium;
        (token.hasKey = !!db_user.ciApiKey), (token.role = db_user.role);
        token.calendly_token = db_user.calendly_token?.toString();
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        if (!session.user) session.user = {} as IUser;
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.isOnboarded = token.isOnboarded;
        session.user.hasKey = token.hasKey;
        session.user.isPremium = token.isPremium;
        session.user.role = token.role;
        session.user.calendly_token = token.calendly_token;
      }

      return session;
    },
  },
  events: {
    async signIn(message) {
      const { firstName, lastName } = splitName(message.user.name!);

      await prisma.user.update({
        data: {
          firstName: firstName,
          image: message.user.image,
          lastName: lastName,
        },
        where: {
          email: message.user.email!,
        },
      });
    },
  },
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: 'jwt',
  },
  theme: {
    logo: '/logos/logo_text_color.png',
  },
};
