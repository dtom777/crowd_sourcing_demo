import sgMail from '@sendgrid/mail';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import crypto from 'crypto-js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

const changeEmailHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const {
      name,
      email,
      changeEmail,
    }: { name: string; email: string; changeEmail: string } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !changeEmail ||
      !changeEmail.includes('@')
    ) {
      res.status(422).json({ message: 'Invalid Data' });

      return;
    }

    const user: User = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // userがいなければエラーを投げる
    if (!user) {
      res.json({ message: 'このメールアドレスは登録されていません' });

      return;
    }

    // URLの作成
    // ①Emailの暗号化
    const encryptedEmail = crypto.AES.encrypt(email, 'key');
    const encryptedChangeEmail = crypto.AES.encrypt(changeEmail, 'key');

    // ②有効期限　一時間以内
    // 「時」＋１をset
    const now: Date = new Date();
    const expiration: number = now.setHours(now.getHours() + 1);

    const content = {
      from: 'douke@fbl.jp',
      to: email,
      subject: '【Crowd Sourcing】メールアドレスの変更手続き',
      html: `<p>${name}様</p><br/>
          <p>以下のURLをクリックし、メールアドレスの変更手続きを完了してください。</p><br/>
          <p>https://www.Crowd Sourcing/mypage/setting/update?email=${encryptedEmail}&changeEmail=${encryptedChangeEmail}&expires=${expiration}</p>`,
    };
    console.log('CONTENT', content);

    try {
      await sgMail.send(content);
      res.status(200).send('Message sent successfully.');
    } catch (error) {
      console.log('ERROR', error);
      res.status(400).send('Message not sent.');
    }
  }

  if (req.method === 'PUT') {
    const {
      encryptedEmail,
      encryptedChangeEmail,
      password,
      expiration,
    }: {
      encryptedEmail: string;
      encryptedChangeEmail: string;
      password: string;
      expiration: number;
    } = req.body;
    if (!encryptedEmail || !encryptedChangeEmail || !password) {
      res.status(422).json({ message: 'Invalid Data' });

      return;
    }

    // 半角スペースを＋に置き換える
    const encryptedEmailReplace: string = encryptedEmail.replace(/ /g, '+');
    const encryptedChangeEmailReplace: string = encryptedChangeEmail.replace(
      / /g,
      '+'
    );

    // 復号化
    const decryptedEmail = crypto.AES.decrypt(encryptedEmailReplace, 'key');
    const decryptedChangeEmail = crypto.AES.decrypt(
      encryptedChangeEmailReplace,
      'key'
    );
    const email: string = decryptedEmail.toString(crypto.enc.Utf8);
    const changeEmail: string = decryptedChangeEmail.toString(crypto.enc.Utf8);

    const now: Date = new Date();
    // 有効期限の確認 => 差が１時間＝3,600,000ミリ秒以内か
    const isExpired: boolean = expiration > now.setHours(now.getHours());
    if (!isExpired) {
      res.json({ message: 'このURLはすでに有効期限切れです' });

      return;
    }

    try {
      const user: User = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) throw new Error('このメールアドレスは登録されていません');

      const isValid = await compare(password, user.password);

      if (!isValid)
        throw new Error('メールアドレスまたはパスワードが正しくありません');

      const updateUser: User = await prisma.user.update({
        where: { email },
        data: { email: changeEmail },
      });
      delete updateUser['password'];
      res.status(200).json(updateUser);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }
};
export default changeEmailHandler;
