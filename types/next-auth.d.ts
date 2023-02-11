import { Session } from 'next-auth';
import { Prisma } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    expires?: string;
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      profile?: string;
      twitter?: string;
      facebook?: string;
      role?: string;
      account?: {};
    };
  }
}
