import { getSession } from 'next-auth/client';
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { User } from '@prisma/client';

const getSessionHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: Session = await getSession({ req });
  if (session) {
    const findUser: User = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    const { name, image, role } = findUser;
    const user = { name, image, role };

    res.json(user);
  } else {
    res.status(403).json({ message: 'Please login!' });
  }
};

export default getSessionHandler;
