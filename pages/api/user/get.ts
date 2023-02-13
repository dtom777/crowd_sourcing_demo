import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { prisma } from '@/lib/prisma';
import image from 'next/image';

// TODO method validation
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // TODO session validation
    const session: Session = await getSession({ req });
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        profile: true,
      },
    });

    const {
      id,
      name,
      image,
      profile: { bio },
    } = user;

    res.status(200).json({ user: { id, name, image, bio } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
