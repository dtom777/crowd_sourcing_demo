import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { prisma } from '@/lib/prisma';
import { body } from 'msw/lib/types/context';

// TODO method validation
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, ...rest } = req.body;

  try {
    const session: Session = await getSession({ req });
    if (!session) res.status(401).json({ message: 'Unauthorized' });

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });

    res.status(200).json({ message: 'Post Updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
