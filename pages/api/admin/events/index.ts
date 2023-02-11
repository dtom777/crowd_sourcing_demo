import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Event } from '@prisma/client';
import { getAsString } from '../../../../utils/getAsString';

const fetchAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const range = getAsString(req.query.range);
  const positions = range.slice(1, -1).split(',');
  const start = parseInt(positions[0]);
  const end = parseInt(positions[1]);
  const perPage = end - start + 1;

  try {
    const totalEvents: number = await prisma.event.count();
    const events: Array<Event> = await prisma.event.findMany({
      skip: start,
      take: perPage,
    });

    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('X-Total-Count', `${totalEvents}`);
    res.status(200).json(events);
  } catch (err) {
    console.log('ERROR:', err.message);
  }
};
export default fetchAllUsers;
