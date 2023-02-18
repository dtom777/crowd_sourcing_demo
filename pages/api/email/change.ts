import { User } from '@prisma/client';
import sgMail from '@sendgrid/mail';
import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import { encryptEmail, verifyPassword } from 'utils/auth';

import { getExpires, expiredIsValid, decodeEmail } from '../../../utils/auth';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';

type PostReqBody = {
  email: string;
  changingEmail: string;
};

type PutReqBody = {
  encryptedEmail: string;
  encryptedChangingEmail: string;
  password: string;
  expires: string;
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

  const { email, changingEmail }: PostReqBody = req.body;
  if (
    !email ||
    !email.includes('@') ||
    !changingEmail ||
    !changingEmail.includes('@')
  ) {
    res.status(422).json({ message: 'Invalid Data' });

    return;
  }

  try {
    const session: Session | null = await getSession({ req });
    if (!session) res.status(401).json({ message: 'Unauthorized' });

    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(404).json({ message: 'This email is not registered' });

      return;
    }

    const encryptedEmail = encryptEmail(email);
    const encryptedChangingEmail = encryptEmail(changingEmail);
    const expires = getExpires();

    const content = {
      from: 'no-reply@test.jp',
      to: email,
      subject: '【Crowd Sourcing】Procedure for changing your e-mail address',
      html: `<p>${user.name}様</p><br/>
          <p>Click on the URL below to complete the process of changing your e-mail address.</p><br/>
          <p>https://www.Crowd Sourcing/mypage/setting/update?email=${encryptedEmail}&changingEmail=${encryptedChangingEmail}&expires=${expires}</p>`,
    };

    await sgMail.send(content);
    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (err) {
    console.error(err.meesage);
    res.status(500).json(err.message);
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    encryptedEmail,
    encryptedChangingEmail,
    password,
    expires,
  }: PutReqBody = req.body;

  if (!encryptedEmail || !encryptedChangingEmail || !password) {
    res.status(422).json({ message: 'Invalid Data' });

    return;
  }

  const email = decodeEmail(encryptedEmail);
  const changingEmail = decodeEmail(encryptedChangingEmail);

  if (!expiredIsValid(expires)) {
    res.status(422).json({ message: 'This URL has already expired' });

    return;
  }

  try {
    const session: Session | null = await getSession({ req });
    if (!session) res.status(401).json({ message: 'Unauthorized' });

    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: 'This email is not registered' });

      return;
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) throw new Error('Email or password is incorrect');

    await prisma.user.update({
      where: { email },
      data: { email: changingEmail },
    });

    res.status(200).json({ message: 'Updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return await handlePost(req, res);
    case 'PUT':
      return await handlePut(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
