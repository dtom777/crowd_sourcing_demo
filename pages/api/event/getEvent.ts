import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Event } from '@prisma/client';

const getEventHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const events: Array<Event> = await prisma.event.findMany();
  res.json(events);
};

export default getEventHandler;
