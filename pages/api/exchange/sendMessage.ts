import sgMail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import { PostWithUser } from 'types/post.type';

const sendMessageHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('BODY', req.body);
  const {
    message,
    appUser,
    post,
  }: { message: string; appUser: User; post: PostWithUser } = req.body;

  const content = {
    from: 'douke@fbl.jp',
    to: appUser.email,
    subject: '【Crowd Sourcing】募集者からメッセージが届きました。',
    html: `<p>${appUser.name}様</p><br/>
          <p>${post.user.name}様からメッセージが届きました。</p><br/>
          <p>応募した募集内容</p><br/>
          <p>${post.title}</p><br/>
          <p>${post.content}</p><br/>
          <p>メッセージ内容</p><br/>
          <p>${message}</p>`,
  };
  console.log('content', content);

  try {
    await sgMail.send(content);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send('Message not sent.');
  }
};
export default sendMessageHandler;
