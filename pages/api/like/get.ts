import { User, Like } from '@prisma/client';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';


import { getAsString } from '../../../utils/getAsString';

import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = getAsString(req.query.postId);

  try {
    const session: Session | null = await getSession({ req });
    if (!session) res.status(401).json({ message: 'Unauthorized' });

    const user: User | null = await prisma.user.findUnique({
      where: {
        email: session?.user.email,
      },
    });

    const like: Like[] = await prisma.like.findMany({
      where: {
        AND: [{ userId: user?.id }, { postId }],
      },
    });
    res.status(200).json({ like: like.length > 0 });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

export default handler;
