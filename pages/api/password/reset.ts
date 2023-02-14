import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import sgMail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

type ReqBody = {
  email: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email }: ReqBody = req.body;
  try {
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid Data' });

      return;
    }

    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(404).json({ message: 'This email is not registered' });

      return;
    }

    // リセットトークン
    const token = crypto.randomBytes(32).toString('hex');

    const updateUser: User = await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiration: Date.now() + 3600000,
      },
    });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    const content = {
      from: 'douke@fbl.jp',
      to: email,
      subject: 'パスワードリセット',
      html: `<p>${updateUser.name}様</p><br/>
              <p>パスワードリセットを受け付けました。</p><br/>
              <p>以下のURLをクリックし、パスワードの再設定を行ってください。</p>
              <a href="${process.env.WEBAPP_URL}/auth/password/change?token=${token}">Click this</a>`,
    };
    await sgMail.send(content);

    res.status(200).json({ message: 'Send message' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

export default handler;
