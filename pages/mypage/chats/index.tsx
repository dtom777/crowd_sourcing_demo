import { GetServerSideProps, NextPage } from 'next';
import { getSession, GetSessionOptions } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import Chat from '@/components/elements/chat/Chat';

import {
  CommentWithPostWithUser,
  CommentWithUserAndPost,
} from 'types/comment.type';

type Props = {
  myPosts: Array<CommentWithUserAndPost>;
  applicationPosts: Array<CommentWithPostWithUser>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetSessionOptions
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    };
  }

  // TODO select need data
  const { id: userId } = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // 自分の投稿
  const myPosts = await prisma.post.findMany({
    where: {
      userId,
    },
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      comments: {
        include: {
          user: true,
        },
      },
      user: true,
    },
  });

  // 自分以外の投稿でコメントした投稿
  const applicationPosts = await prisma.post.findMany({
    where: {
      NOT: { userId },
    },
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      comments: {
        where: {
          userId,
        },
        include: {
          user: true, // TODO select need data
        },
      },
      user: true,
    },
  });

  return {
    props: {
      myPosts,
      applicationPosts,
    },
  };
};

const Chats: NextPage<Props> = ({ myPosts, applicationPosts }) => {
  return (
    <>
      <h1 className='text-2xl font-bold pl-4 pt-10'>Chat</h1>

      <div className='mt-4 mb-8 lg:flex md:max-w-screen-md w-screen'>
        <Chat
          title='Application for your posts'
          posts={myPosts}
          position='left'
        />
        <Chat
          title='Your Application'
          posts={applicationPosts}
          position='right'
        />
      </div>
    </>
  );
};

export default Chats;
