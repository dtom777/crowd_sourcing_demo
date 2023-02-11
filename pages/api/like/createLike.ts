import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Like } from '@prisma/client';

const createLikeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const {
    like,
    postId,
    userId,
  }: { like: boolean; postId: string; userId: string } = req.body;
  if (like) {
    console.log('いいねをしたとき');
    const findLike: Array<Like> = await prisma.like.findMany({
      where: {
        AND: [{ userId }, { postId }],
      },
    });
    if (findLike.length !== 0) {
      res.json({ message: 'いいね済です' });
    } else {
      const like: Like = await prisma.like.create({
        data: { postId, userId },
      });
      res.json(like);
    }
  } else {
    console.log('いいねを解除するとき');
    const deleteLike = await prisma.like.deleteMany({
      where: {
        AND: [{ userId }, { postId }],
      },
    });
    res.json(deleteLike);
  }
};
export default createLikeHandler;
