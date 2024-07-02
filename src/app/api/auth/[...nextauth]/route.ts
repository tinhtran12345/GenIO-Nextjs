import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import * as m from '@/paraglide/messages';
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error(m.missing_email_password());
        }
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        // if user doesn't exist or password doesn't match
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error(m.invalid_email_password());
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
      throw new Error(m.invalid_token());
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
