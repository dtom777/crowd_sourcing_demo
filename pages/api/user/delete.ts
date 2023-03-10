import { compare } from 'bcryptjs';
import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';

type ReqBody = {
  email: string;
  password: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password }: ReqBody = req.body;

  try {
    const session: Session | null = await getSession({ req });
    if (!session) {
      res.status(401).json({ message: 'Unauthorized' });

      return;
    }

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({ message: 'Invalid Data' });

      return;
    }

    const user: User | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'This email is not registered' });

      return;
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      res.status(400).json({ message: 'Email or password is incorrect' });

      return;
    }

    await prisma.user.delete({
      where: {
        email,
      },
    });

    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};
export default handler;
