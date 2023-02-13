import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Like } from '@prisma/client';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { like, postId } = req.body;

  try {
    const session: Session = await getSession({ req });
    if (!session) res.status(401).json({ message: 'Unauthorized' });

    const { id: userId } = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (like) {
      await prisma.like.create({
        data: { postId, userId },
      });

      res.status(201).json({ message: 'Create Like' });
    } else {
      await prisma.like.deleteMany({
        where: {
          AND: [{ userId }, { postId }],
        },
      });

      res.status(200).json({ message: 'Delete Like' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
