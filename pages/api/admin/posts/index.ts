import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PostWithUserAndCategoryAndTags } from 'types/post.type';
import { getAsString } from '../../../../utils/getAsString';

const fetchAllPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const range = getAsString(req.query.range);
  const positions = range.slice(1, -1).split(',');
  const start = parseInt(positions[0]);
  const end = parseInt(positions[1]);
  const perPage = end - start + 1;

  try {
    const totalPosts: number = await prisma.post.count();
    const posts: Array<PostWithUserAndCategoryAndTags> =
      await prisma.post.findMany({
        skip: start,
        take: perPage,
        include: {
          Category: true,
          user: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    // console.log(posts);

    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('X-Total-Count', `${totalPosts}`);
    res.status(200).json(posts);
  } catch (err) {
    console.log('ERROR:', err.message);
  }
};
export default fetchAllPosts;
