import CredentialsProvider from 'next-auth/providers/credentials';

import { NextAuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth/next';
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error('Missing email or password');
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error('Invalid email or password');
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (token.sub) {
        const dbUser = await prisma.user.findFirst({
          where: {
            id: token.sub,
          },
        });
        token.name = dbUser?.username;
        return token;
      }
      throw new Error('Invalid token');
    },

    async session({ session, token }) {
      if (session.user && token.sub && token.name) {
        session.user.id = token.sub;
        session.user.username = token.name;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
