import { hash } from 'bcryptjs';

import { prisma } from '@/libs/prisma';

import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type ReqBody = {
  password: string;
  token: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { password, token }: ReqBody = req.body;

  try {
    const user: User | null = await prisma.user.findFirst({
      where: {
        resetToken: token,
      },
    });
    if (!user) {
      res.status(404).json({ message: 'Not found' });

      return;
    }

    if (!user.resetTokenExpiration) {
      res.status(400).json({ message: 'Bad Request' });

      return;
    }

    // 有効期限の確認
    const isExpired: boolean = user.resetTokenExpiration > Date.now();
    if (!isExpired) {
      res.status(422).json({ message: 'Invalid Data' });

      return;
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiration: null,
      },
    });
    res.status(200).json({ message: 'Password Reset' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

export default handler;
