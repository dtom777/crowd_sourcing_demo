import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';

type ReqBody = {
  id: string;
  title: string;
  content: string;
  categorySlug: string;
  reward: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, ...rest }: ReqBody = req.body;

  try {
    const session: Session | null = await getSession({ req });
    if (!session) res.status(401).json({ message: 'Unauthorized' });

    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
