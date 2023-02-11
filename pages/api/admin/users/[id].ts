import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import { Session } from 'next-auth';
import { getAsString } from '../../../../utils/getAsString';

const fetchUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getAsString(req.query.id);

  if (req.method === 'GET') {
    try {
      const user: User = await prisma.user.findUnique({
        where: { id },
      });
      delete user['password'];
      res.status(200).json(user);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }

  if (req.method === 'PUT') {
    const body = req.body;
    const session: Session = await getSession({ req });

    // 管理権限をupdateするとき
    if (body.role) {
      // masterAdminか確認
      if (session.user.role !== 'masterAdmin') {
        return res
          .status(403)
          .json({ message: 'あなたの管理権限が不足しています。' });
      }

      if (body.role === 'normal') body.role = null;
    }

    // adminではmasterAdminの編集をさせない
    if (body.role === 'masterAdmin' && session.user.role !== 'masterAdmin') {
      return res
        .status(403)
        .json({ message: 'あなたの管理権限が不足しています。' });
    }

    delete body['createdAt'];

    try {
      const updateUser: User = await prisma.user.update({
        where: { id },
        data: { ...req.body, updatedAt: new Date() },
      });
      delete updateUser['password'];
      res.status(200).json(updateUser);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deleteUser: User = await prisma.user.delete({
        where: { id },
      });
      delete deleteUser['password'];
      res.status(200).json(deleteUser);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }
};
export default fetchUser;
