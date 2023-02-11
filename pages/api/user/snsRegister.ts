import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

const snsRegisterHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.body.email && !req.body.email.includes('@')) {
    res.status(422).json({ message: 'Invalid Data' });

    return;
  }

  try {
    const updateUser: User = await prisma.user.update({
      where: { id: req.body.id },
      data: { ...req.body },
    });
    delete updateUser['password'];
    res.status(200).json(updateUser);
  } catch (err) {
    console.log('ERROR:', err.message);
  }
};
export default snsRegisterHandler;
