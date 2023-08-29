import { authOptions } from '@/lib/auth/next-auth-config';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }