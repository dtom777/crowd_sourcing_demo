import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

const deleteUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password }: { email: string; password: string } = req.body;
  // 異常なデータであればreturn
  if (!email || !email.includes('@') || !password) {
    res.status(422).json({ message: 'Invalid Data' });

    return;
  }

  // emailからuserを見つける
  const user: User = await prisma.user.findUnique({
    where: { email },
  });

  // userがいなければエラーを投げる
  if (!user) {
    res.json({ message: 'このメールアドレスは登録されていません' });

    return;
  }

  // passwordがあっているか比較
  const isValid: boolean = await compare(password, user.password);

  // passwordが間違っていればエラーを投げる
  if (!isValid) {
    res.json({ message: 'メールアドレスまたはパスワードが正しくありません' });

    return;
  }

  // 削除する;
  try {
    await prisma.user.delete({
      where: { email },
    });
    res.status(200).json({ message: 'true' });
  } catch (err) {
    console.log('ERROR:', err.message);
  }
};
export default deleteUserHandler;
