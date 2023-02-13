import { getSession } from 'next-auth/client';
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getAsString } from '../../../utils/getAsString';

const getLikeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = getAsString(req.query.postId);

  try {
    const session: Session = await getSession({ req });
    if (!session) res.status(401).json({ message: 'Unauthorized' });

    const { id: userId } = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    const like = await prisma.like.findMany({
      where: {
        AND: [{ userId }, { postId }],
      },
    });
    res.status(200).json({ like: like.length > 0 });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

export default getLikeHandler;
