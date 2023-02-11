import { getSession } from 'next-auth/client';
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { Like } from '@prisma/client';
import { getAsString } from '../../../utils/getAsString';

const getLikeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: Session = await getSession({ req });
  const postId = getAsString(req.query.postId);
  if (session) {
    const like: Array<Like> = await prisma.like.findMany({
      where: {
        AND: [{ userId: session.user.id }, { postId }],
      },
    });
    res.json(like);
  } else {
    res.status(403).json({ message: 'Please login!' });
  }
};

export default getLikeHandler;
