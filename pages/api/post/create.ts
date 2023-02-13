import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { prisma } from '@/lib/prisma';

// TODO method validation
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  try {
    const session: Session = await getSession({ req });
    if (!session) res.status(401).json({ message: 'Unauthorized' });

    const { id: userId } = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    await prisma.post.create({
      data: {
        ...body,
        userId,
      },
    });
    res.status(201).json({ message: 'Post Created' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
