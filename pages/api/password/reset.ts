import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import sgMail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

const resetPasswordHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { email }: { email: string } = req.body;
  if (!email || !email.includes('@')) {
    res.status(422).json({ message: 'Invalid Data' });

    return;
  }

  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      console.log(err);

      return res.redirect('/');
    }

    const findUser: User = await prisma.user.findUnique({
      where: { email },
    });
    if (!findUser) {
      res.json({ message: 'このメールアドレスは登録されていません' });

      return;
    }

    // リセットトークン発行
    const token = buffer.toString('hex');

    const updateUser: User = await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiration: Date.now() + 3600000,
      },
    });

    try {
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
    } catch (err) {
      console.log(err);
    }
  });

  return res.json({ message: 'Message sent successfully.' });
};

export default resetPasswordHandler;
