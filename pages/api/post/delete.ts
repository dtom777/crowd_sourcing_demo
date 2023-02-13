import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '@prisma/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const deletePost: Post = await prisma.post.delete({
      where: { id: req.body },
    });
    res.status(200).json(deletePost);
  } catch (err) {
    console.log('ERROR:', err.message);
  }
};
export default handler;
