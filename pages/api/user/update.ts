import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

type ReqBody = {
  name: string;
  profile?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, profile }: ReqBody = req.body;
  if (!name) {
    res.status(422).json({ message: 'Invalid Data' });

    return;
  }

  try {
    const session: Session | null = await getSession({ req });
    if (!session) res.status(401).json({ message: 'Unauthorized' });

    const user: User | null = await prisma.user.findUnique({
      where: {
        email: session?.user.email,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        profile: {
          upsert: {
            create: {
              bio: profile ? profile : '',
            },
            update: {
              bio: profile,
            },
          },
        },
      },
    });
    res.status(200).json({ message: 'Updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
