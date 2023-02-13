import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { verifyPassword } from 'utils/auth';
import password from 'pages/auth/password';
import { email } from 'react-admin';

const options = {
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Providers.Credentials({
      authorize: async (credentials) => {
        console.log(credentials);

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) throw new Error('ユーザが存在しません');

        if (!user.active) throw new Error('このユーザーは使用できません');

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid)
          throw new Error('メールアドレスまたはパスワードが正しくありません');

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

export default (req, res) => NextAuth(req, res, options);
