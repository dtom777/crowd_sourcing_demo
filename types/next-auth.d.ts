import { Session } from 'next-auth';
import { Prisma } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    expires: string;
    user: {
      name: string;
      email: string;
      image: string;
    };
  }
}
