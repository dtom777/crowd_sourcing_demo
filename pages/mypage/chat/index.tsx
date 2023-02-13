import { GetServerSideProps, NextPage } from 'next';
import { getSession, GetSessionOptions } from 'next-auth/client';
import { prisma } from '@/lib/prisma';
import {
  CommentWithPostWithUser,
  CommentWithUserAndPost,
} from 'types/comment.type';
import getRelativeTime from '@/lib/days';
import Image from 'next/image';
import Link from 'next/link';

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

const Chat: NextPage<Props> = ({ myPosts, applicationPosts }) => {
  return (
    <>
      <h1 className='text-2xl font-bold pl-4 pt-10'>Chat</h1>

      <div className='mt-4 mb-8 lg:flex md:max-w-screen-md w-screen'>
        <div className='lg:w-1/2 mx-2 bg-base-200'>
          <h3 className='text-lg font-bold p-4'>Application for your posts</h3>
          {/* chat */}
          {myPosts.map((post) => (
            <>
              {post.comments.length ? (
                <div
                  key={post.id}
                  className='bg-bg-post my-4 mx-2 px-4 rounded-md'
                >
                  <div className='block truncate text-gray-900 font-bold text-xl'>
                    {post.title}
                  </div>
                  <div className='chat chat-start'>
                    <div className='chat-image avatar'>
                      <div className='w-10 rounded-full'>
                        <Link href={`/user/${post.comments[0].user.id}`}>
                          <a className='hover:opacity-50'>
                            <Image
                              src={post.comments[0].user.image}
                              width={60}
                              height={60}
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className='chat-header'>
                      {post.comments[0].user.name}
                      <time className='text-xs opacity-50 ml-4'>
                        {getRelativeTime(post)}
                      </time>
                    </div>
                    <div className='chat-bubble'>
                      {post.comments[0].content}
                    </div>
                  </div>

                  <p className='text-gray-500 text-sm mr-4'></p>
                </div>
              ) : null}
            </>
          ))}
          {/*  */}
        </div>
        <div className='lg:w-1/2 mx-2 lg:mt-0 mt-4 bg-base-200'>
          <h3 className='text-lg font-bold p-4'>Your Application</h3>
          {applicationPosts.map((post) => (
            <>
              {post.comments.length ? (
                <div
                  key={post.id}
                  className='bg-bg-post my-4 mx-2 px-4 rounded-md'
                >
                  <div className='block truncate text-gray-900 font-bold text-xl text-right'>
                    {post.title}
                  </div>
                  <div className='chat chat-end'>
                    <div className='chat-image avatar'>
                      <div className='w-10 rounded-full'>
                        <Link href={`/user/${post.comments[0].userId}`}>
                          <a className='hover:opacity-50'>
                            <Image
                              src={post.comments[0].user.image}
                              width={60}
                              height={60}
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className='chat-header'>
                      you
                      <time className='text-xs opacity-50 ml-4'>
                        {getRelativeTime(post)}
                      </time>
                    </div>
                    <div className='chat-bubble'>
                      {post.comments[0].content}
                    </div>
                  </div>

                  <p className='text-gray-500 text-sm mr-4'></p>
                </div>
              ) : null}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Chat;
