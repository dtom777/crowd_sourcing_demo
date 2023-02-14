import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '@prisma/client';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

type ReqBody = {
  id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: ReqBody = req.body;
  try {
    const session: Session | null = await getSession({ req });
    if (!session) res.status(401).json({ message: 'Unauthorized' });

    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
