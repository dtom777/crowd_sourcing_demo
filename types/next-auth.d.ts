import { Session } from 'next-auth';

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
