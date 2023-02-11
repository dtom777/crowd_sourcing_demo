import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CategoryWithPost } from 'types/category.type';
import { getAsString } from '../../../../utils/getAsString';

const fetchAllCategories = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const range = getAsString(req.query.range);
  const positions = range.slice(1, -1).split(',');
  const start = parseInt(positions[0]);
  const end = parseInt(positions[1]);
  const perPage = end - start + 1;

  try {
    const totalCategories: number = await prisma.category.count();
    const categories: Array<CategoryWithPost> = await prisma.category.findMany({
      skip: start,
      take: perPage,
      include: {
        posts: true,
      },
    });

    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('X-Total-Count', `${totalCategories}`);
    res.status(200).json(categories);
  } catch (err) {
    console.log('ERROR:', err.message);
  }
};
export default fetchAllCategories;
