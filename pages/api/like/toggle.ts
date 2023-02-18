import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';

type ReqBody = {
  like: boolean;
  postId: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { like, postId }: ReqBody = req.body;

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

    if (like) {
      await prisma.like.create({
        data: { postId, userId: user.id },
      });

      res.status(201).json({ message: 'Created' });
    } else {
      await prisma.like.deleteMany({
        where: {
          AND: [{ postId }, { userId: user.id }],
        },
      });

      res.status(200).json({ message: 'Deleted' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
