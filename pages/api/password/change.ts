import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

const changePasswordHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { password, passwordToken } = req.body;

  const findUser: User = await prisma.user.findFirst({
    where: {
      resetToken: passwordToken,
    },
  });

  if (!findUser) {
    res.json({ message: 'URLが間違っています。' });

    return;
  }

  // 有効期限の確認
  const isExpired: boolean = findUser.resetTokenExpiration > Date.now();
  if (!isExpired) {
    res.json({ message: 'このURLは有効期限切れです' });

    return;
  }

  const hashedPassword = await hash(password, 10);

  try {
    const updateUser: User = await prisma.user.update({
      where: {
        email: findUser.email,
      },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiration: null,
      },
    });
    delete updateUser['password'];
    res.status(200).json(updateUser);
  } catch (err) {
    console.log(err);
  }
};

export default changePasswordHandler;
