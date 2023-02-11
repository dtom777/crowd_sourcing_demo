import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

const updateUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.name) {
    res.status(422).json({ message: 'Invalid Data' });

    return;
  }

  const {
    id,
    name,
    profile,
    image,
  }: { id: string; name: string; profile: string; image: string } = req.body;
  try {
    const updateUser: User = await prisma.user.update({
      where: { id },
      data: { name, profile, image },
    });
    delete updateUser['password'];
    res.status(200).json(updateUser);
  } catch (err) {
    console.log('ERROR:', err.message);
  }
};
export default updateUserHandler;
