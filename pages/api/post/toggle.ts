import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '@prisma/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, published } = req.body;
  console.log(id, published);

  try {
    await prisma.post.update({
      where: { id },
      data: { published },
    });
    res.status(200).json({ message: 'Success!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
