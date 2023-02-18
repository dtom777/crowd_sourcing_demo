import { faCog, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Post } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Session } from 'next-auth';
import { getSession, GetSessionOptions } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import Avatar from '@/components/elements/avatar/Avatar';
import Icon from '@/components/elements/icon/Icon';
import RecentActivity from '@/components/elements/mypage/RecentActivity';
import RecentPosts from '@/components/elements/mypage/RecentPosts';

import { CommentWithUserAndPostWithCategoryAndUser } from 'types/comment.type';

type Props = {
  session: Session;
  posts: Post[]; //TODO  include fix
  comments: Array<CommentWithUserAndPostWithCategoryAndUser>;
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

  const { id: userId } = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // 最近の募集
  const recentPosts = await prisma.post.findMany({
    where: {
      AND: [
        { userId: userId },
        {
          published: true,
        },
        {
          draft: false,
        },
      ],
    },
    take: 2,
    orderBy: {
      createdAt: 'desc',
    },
    include: { comments: true, likes: true },
  });

  //　応募したもの
  const recentComments = await prisma.comment.findMany({
    where: {
      userId,
    },
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      post: {
        include: {
          user: true,
        },
      },
    },
  });

  return {
    props: {
      session,
      posts: recentPosts,
      comments: recentComments,
    },
  };
};

const MyPage: NextPage<Props> = ({ session, posts, comments }) => {
  return (
    <>
      <div className='mt-8 mb-6 flex justify-between px-2 md:mt-16 md:mb-10 md:px-4'>
        <div className='mr-2'>
          <div className='flex items-center'>
            {session && (
              <Avatar
                src={session.user.image}
                size={120}
                className='w-24 ring ring-primary ring-offset-2 ring-offset-base-100'
              />
            )}
            <div>
              <p className='ml-4 text-2xl font-semibold text-gray-900 md:text-3xl'>
                {session ? session.user.name : ''}
              </p>
              <Link href='/mypage/profile'>
                <a className='ml-4 text-sm text-gray-500 hover:opacity-50'>
                  Profile
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-4 flex items-center justify-end text-lg md:mt-0 md:justify-center'>
          <div className='mr-4 text-red-500'>
            <Link href={'/mypage/posts/like'}>
              <a>
                <Icon icon={faHeart} className='mr-1' />
                Like Posts
              </a>
            </Link>
          </div>
          <div className='text-gray-700'>
            <Link href='/mypage/settings'>
              <a>
                <Icon icon={faCog} className='mr-1' />
                Settings
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className='mb-4 justify-between bg-base-200 pb-4 md:mb-20 md:flex md:w-screen md:max-w-screen-lg md:px-4'>
        <RecentActivity comments={comments} />
        <div className='divider lg:divider-horizontal'></div>
        <RecentPosts posts={posts} />
      </div>
    </>
  );
};

export default MyPage;
