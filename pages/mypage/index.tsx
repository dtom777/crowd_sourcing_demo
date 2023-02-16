import { faCog, faHeart } from '@fortawesome/free-solid-svg-icons';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Session } from 'next-auth';
import { getSession, GetSessionOptions } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import Avatar from '@/components/elements/avatar/Avatar';
import Icon from '@/components/elements/icon/Icon';
import RecentActivity from '@/components/elements/mypage/RecentActivity';

import { CommentWithUserAndPostWithCategoryAndUser } from 'types/comment.type';
import { PostWithCommentAndLike } from 'types/post.type';

import RecentPost from '../../components/elements/mypage/RecentPost';

type Props = {
  session: Session;
  post: Array<PostWithCommentAndLike>;
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
  const latestPost = await prisma.post.findFirst({
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
    take: 1,
    orderBy: {
      createdAt: 'desc',
    },
    include: { comments: true, likes: true },
  });

  //　応募したもの
  const latestComment = await prisma.comment.findMany({
    where: {
      userId,
    },
    take: 3,
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
      post: latestPost,
      comments: latestComment,
    },
  };
};

const MyPage: NextPage<Props> = ({ session, post, comments }) => {
  return (
    <>
      <div className='flex justify-between md:px-4 px-2 md:mt-16 mt-8 md:mb-10 mb-6'>
        <div className='mr-2'>
          <div className='flex items-center'>
            {session && (
              <Avatar
                src={session.user.image}
                size={120}
                className='w-24 ring ring-primary ring-offset-base-100 ring-offset-2'
              />
            )}
            <div>
              <p className='text-gray-900 font-semibold md:text-3xl text-2xl ml-4'>
                {session ? session.user.name : ''}
              </p>
              <Link href='/mypage/profile'>
                <a className='text-gray-500 text-sm ml-4 hover:opacity-50'>
                  Profile
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className='flex md:justify-center justify-end items-center text-lg md:mt-0 mt-4'>
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

      <div className='md:flex justify-between bg-base-200 md:mb-20 mb-4 pb-4'>
        <RecentActivity comments={comments} />
        <RecentPost post={post} />
      </div>
    </>
  );
};

export default MyPage;
