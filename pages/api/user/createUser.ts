import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

const createUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.email.includes('@') ||
    !req.body.password
  ) {
    res.status(422).json({ message: 'Invalid Data' });

    return;
  }

  const hashedPassword: string = await hash(req.body.password, 10);
  req.body.password = hashedPassword;

  try {
    const findUser: User = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (findUser) {
      res.json({ message: 'すでに使用されているEmailです' });
    } else {
      const result: User = await prisma.user.create({
        data: {
          ...req.body,
          // 任意のimage保存できるようになったら修正↑
        },
      });
      delete result['password'];
      res.json(result);
    }
  } catch (err) {
    console.log('ERROR:', err.message);
  }
};
export default createUserHandler;
