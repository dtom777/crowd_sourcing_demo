import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import Chat from '@/components/elements/chat/Chat';

import { ApplicationPosts, MyPosts } from '@/types/post.type';
import { UserSelectId } from '@/types/user.type';

type Props = {
  myPosts?: Array<MyPosts>;
  applicationPosts?: Array<ApplicationPosts>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session: Session | null = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    };
  }

  const user: UserSelectId | null = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!user) return { props: {} };

  // 自分の投稿
  const myPosts = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  // 自分以外の投稿でコメントした投稿
  const applicationPosts = await prisma.post.findMany({
    where: {
      NOT: { userId: user.id },
    },
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      comments: {
        where: {
          userId: user.id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
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
      <h1 className='pl-4 pt-10 text-2xl font-bold'>Chat</h1>

      <div className='mt-4 mb-8 w-screen md:max-w-screen-md lg:flex'>
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
