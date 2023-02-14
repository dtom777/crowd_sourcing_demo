import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';

type ReqBody = {
  message: string;
  postId: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message, postId }: ReqBody = req.body;

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

    await prisma.comment.create({
      data: {
        content: message,
        postId,
        userId: user.id,
      },
    });

    res.status(201).json({ message: 'Applied' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
