import sgMail from '@sendgrid/mail';
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import { PostWithUser } from 'types/post.type';

const sendApplicationHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const {
    name,
    email,
    message,
    postId,
  }: { name: string; email: string; message: string; postId: string } =
    req.body;

  const user: User = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const post: PostWithUser = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: true,
    },
  });

  const content = {
    from: 'douke@fbl.jp',
    personalizations: [
      {
        to: [
          {
            email: email,
          },
        ],
        dynamic_template_data: {
          name: name,
          message: message,
          title: post.title,
          content: post.content,
          userName: post.user.name,
          postId: postId,
        },
      },
    ],
    templateId: 'd-abb88d393394461c9aa30aa31ab529f7',
  };

  try {
    await prisma.comment.create({
      data: { content: message, userId: user.id, postId },
    });
    await sgMail.send(content);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send('Message not sent.');
  }
};
export default sendApplicationHandler;
