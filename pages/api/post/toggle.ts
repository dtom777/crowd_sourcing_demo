import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

type ReqBody = {
  id: string;
  published: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, published }: ReqBody = req.body;

  try {
    const session: Session | null = await getSession({ req });
    if (!session) res.status(401).json({ message: 'Unauthorized' });

    await prisma.post.update({
      where: { id },
      data: { published },
    });
    res.status(200).json({ message: 'Changed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
