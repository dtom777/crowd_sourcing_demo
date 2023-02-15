import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

import { prisma } from '@/libs/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';


type ReqBody = {
  name: string;
  email: string;
  password: string;
  image: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password, image }: ReqBody = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: 'Invalid Data' });

    return;
  }

  try {
    const hashedPassword = await hash(password, 10);

    const user: User | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      res.status(400).json({ message: 'Email already used' });

      return;
    }

    await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Created' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
export default handler;
