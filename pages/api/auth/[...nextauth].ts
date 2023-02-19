import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';

import { prisma } from '@/libs/prisma';

import { verifyPassword } from '@/utils/auth';

import type { NextAuthOptions } from 'next-auth';

const options: NextAuthOptions = {
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Providers.Credentials({
      authorize: async (credentials: { email: string; password: string }) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) throw new Error('User does not exist');

        if (!user.active) throw new Error('This user is unavailable');

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error('Email or password is incorrect');

        return Promise.resolve(user);
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
  jwt: {
    encryption: true,
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
  },
};

export default NextAuth(options);
