import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    if (!email || !email.includes('@') || !password) {
      res.status(422).json({ message: 'Invalid Data' });

      return;
    }

    const user: User = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: 'This email is not registered' });

      return;
    }

    const isValid: boolean = await compare(password, user.password);

    if (!isValid) {
      res.status(400).json({ message: 'Email or password is incorrect' });

      return;
    }

    await prisma.user.delete({
      where: { email },
    });

    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};
export default handler;
