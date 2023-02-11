import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';

const options = {
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Providers.Credentials({
      name: 'Email',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // @ts-ignore [Object: null prototype]
        const {
          email,
          password,
          callbackUrl,
        }: { email: string; password: string; callbackUrl: string } =
          credentials;

        if (!email || !email.includes('@') || !password) {
          // @ts-ignore
          res.status(422).json({ message: 'Invalid Data' });

          return;
        }
        // Cypress
        if (process.env.CYPRESS === 'true') {
          const user = {
            id: 'ab65491e-c41e-b28d-813a-1c0b5f868624',
            name: 'e2e',
            email: 'e2e@example.com',
            password: '11111111',
            active: true,
          };

          if (email !== user.email)
            throw new Error('このメールアドレスは登録されていません');
          if (user.active === false)
            throw new Error('このユーザーはログインを許可されていません');
          if (password !== user.password)
            throw new Error('メールアドレスまたはパスワードが正しくありません');

          return Promise.resolve(user);
        } else {
          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user) throw new Error('このメールアドレスは登録されていません');

          if (user.active === false)
            throw new Error('このユーザーはログインを許可されていません');

          const isValid = await compare(password, user.password);
          if (!isValid)
            throw new Error('メールアドレスまたはパスワードが正しくありません');

          // admin用
          if (
            callbackUrl === '/admin' &&
            user.role !== 'admin' &&
            user.role !== 'masterAdmin'
          ) {
            throw new Error('あなたは管理ユーザーではありません');
          }

          return Promise.resolve(user);
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }

      return token;
    },
    session: async (session: any, user) => {
      // Cypress
      if (process.env.CYPRESS === 'true') {
        session.user = {
          id: 'ab65491e-c41e-b28d-813a-1c0b5f868624',
          name: 'e2e',
          email: 'e2e@example.com',
          image: '/avatar-1.jpg',
        };
      } else {
        const findUser = await prisma.user.findUnique({
          where: { id: user.sub },
          include: {
            account: true,
          },
        });

        const { id, name, email, image, profile, twitter, facebook, role } =
          findUser;
        session.user = {
          id,
          name,
          email,
          image,
          profile,
          twitter,
          facebook,
          role,
          account: {
            ...findUser.account[0],
          },
        };
        // console.log('SESSION', session);
      }

      return Promise.resolve(session);
    },
    redirect: async (url: string, baseUrl: string) => {
      if (url) return Promise.resolve(url);

      return Promise.resolve(baseUrl);
    },
  },
  events: {
    async signIn(arg) {
      // console.log('SIGN-IN', arg);
      // const { user, account, isNewUser } = arg;
      // if (isNewUser == true) {
      //   const u = await prisma.user.findUnique({
      //     where: {
      //       id: user.id,
      //     },
      //     include: {
      //       account: true,
      //     },
      //   });
      //   console.log('U', u);
      // }
    },
    async signOut(message) {},
    async updateUser(message) {},
    async linkAccount(message) {
      // console.log('LINK-ACCOUNT', message);
    },
    async createUser(message) {
      // console.log('CREATE-USER', message);
    },
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    encryption: true,
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
  },
};

export default (req, res) => NextAuth(req, res, options);
