import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '@prisma/client';

const togglePostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    id,
    draft,
    published,
  }: { id: string; draft: boolean; published: boolean } = req.body;
  if (published) {
    try {
      const togglePost: Post = await prisma.post.update({
        where: { id },
        data: { published, draft },
      });
      res.status(200).json(togglePost);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  } else {
    try {
      const togglePost: Post = await prisma.post.update({
        where: { id },
        data: { draft },
      });
      res.status(200).json(togglePost);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }
};
export default togglePostHandler;
