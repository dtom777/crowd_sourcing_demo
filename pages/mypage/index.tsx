import { faCog, faHeart } from '@fortawesome/free-solid-svg-icons';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Session } from 'next-auth';
import { getSession, GetSessionOptions } from 'next-auth/client';

import getRelativeTime from '@/libs/days';
import { prisma } from '@/libs/prisma';

import Icon from '@/components/elements/icon/Icon';
import Avatar from '@/components/elements/avatar/Avatar';
import Card from '@/components/elements/card/Card';

import { CommentWithUserAndPostWithCategoryAndUser } from 'types/comment.type';
import { PostWithCommentAndLike } from 'types/post.type';

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
        <div className='md:w-1/2 w-full py-4 lg:px-6 px-4'>
          <div className='flex justify-between items-baseline'>
            <h2 className='text-lg font-bold'>Recent Activity</h2>
            <Link href='/mypage/chat'>
              <a className='text-gray-400 text-sm hover:opacity-50'>View all</a>
            </Link>
          </div>
          {/* TODO コンポーネント化 */}
          {comments.length ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className='bg-white my-4 p-4'>
                  <Link href={`/posts/${comment.post.id}`}>
                    <a className='flex justify-between hover:opacity-50'>
                      <div className='flex'>
                        <Avatar
                          src={comment.post.user.image}
                          size={100}
                          className='w-14'
                        />
                        <div className='ml-6'>
                          <p className='w-40 truncate text-gray-900 text-md font-bold'>
                            {comment.post.title}
                          </p>
                          <p className='text-gray-700 font-medium'>
                            {comment.post.user.name}
                          </p>
                          <p className='text-gray-500 md:text-sm text-xs'>
                            You applied for this post
                          </p>
                        </div>
                      </div>
                      <p className='text-gray-500 md:text-sm text-xs'>
                        {getRelativeTime(comment)}
                      </p>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className='flex justify-center items-center'>
              <p className='text-gray-500 my-10'>No recent activity</p>
            </div>
          )}
        </div>
        {/*  */}
        <div className='md:w-1/2 w-full py-4 lg:px-6 px-4'>
          <div className='flex justify-between items-baseline'>
            <h2 className='text-lg font-bold'>Your recent post</h2>
            <Link href='/mypage/posts'>
              <a className='text-gray-400 text-sm hover:opacity-50'>
                View all your posts
              </a>
            </Link>
          </div>
          {post ? (
            <div className='pt-4 pr-4'>
              <Card post={post} />
            </div>
          ) : (
            <div className='flex justify-center items-center'>
              <p className='text-gray-500 my-10'>No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPage;
