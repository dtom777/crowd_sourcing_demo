import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import getUserWithProfile from '@/utils/api/user/getUserWithProfile';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session: Session | null = await getSession({ req });
    if (!session) {
      res.status(401).json({ message: 'Unauthorized' });

      return;
    }

    const user = await getUserWithProfile(prisma, session);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
