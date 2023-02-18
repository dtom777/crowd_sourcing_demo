import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';

type ReqBody = {
  title: string;
  content: string;
  categorySlug: string;
  reward: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body: ReqBody = req.body;

  try {
    const session: Session | null = await getSession({ req });
    if (!session) res.status(401).json({ message: 'Unauthorized' });

    const user: User | null = await prisma.user.findUnique({
      where: {
        email: session?.user.email,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    await prisma.post.create({
      data: {
        ...body,
        userId: user.id,
      },
    });

    res.status(201).json({ message: 'Created' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
