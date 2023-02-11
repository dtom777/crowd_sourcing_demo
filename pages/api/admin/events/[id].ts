import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Event } from '@prisma/client';

const fetchUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const event: Event = await prisma.event.findUnique({
        where: { id: Number(id) },
      });
      res.status(200).json(event);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }

  if (req.method === 'PUT') {
    const body = req.body;
    delete body['createdAt'];

    try {
      const updateEvent: Event = await prisma.event.update({
        where: { id: Number(id) },
        data: { ...req.body, updatedAt: new Date() },
      });
      res.status(200).json(updateEvent);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deleteEvent: Event = await prisma.event.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(deleteEvent);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }
};
export default fetchUser;
