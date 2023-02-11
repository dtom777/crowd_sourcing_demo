import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAsString } from '../../../../utils/getAsString';

const fetchAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const range = getAsString(req.query.range);
  const positions = range.slice(1, -1).split(',');
  const start = parseInt(positions[0]);
  const end = parseInt(positions[1]);
  const perPage = end - start + 1;

  try {
    const totalUsers: number = await prisma.user.count();
    const users: Array<User> = await prisma.user.findMany({
      skip: start,
      take: perPage,
    });

    users.forEach((user) => {
      delete user['password'];
    });

    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('X-Total-Count', `${totalUsers}`);
    res.status(200).json(users);
  } catch (err) {
    console.log('ERROR:', err.message);
  }
};
export default fetchAllUsers;
