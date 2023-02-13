import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, profile } = req.body;
  if (!req.body.name) {
    res.status(422).json({ message: 'Invalid Data' });

    return;
  }

  try {
    // TODO session validation
    const session: Session = await getSession({ req });
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    // TODO user validation

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        profile: {
          upsert: {
            create: {
              bio: profile,
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
