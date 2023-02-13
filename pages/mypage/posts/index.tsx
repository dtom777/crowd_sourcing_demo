import { GetServerSideProps, NextPage } from 'next';
import { PostWithComment } from 'types/post.type';
import { Session } from 'next-auth';
import { useState } from 'react';
import { getSession } from 'next-auth/client';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import SearchFormMyPage from '@/components/organisms/mypage/SearchFormMyPage';
import BaseHead from '@/components/atoms/head/BaseHead';
import PostsListWithPaginationMyPage from '@/components/organisms/mypage/posts/PostsListWithPaginationMyPage';
import { ParsedUrlQuery } from 'node:querystring';

type Props = {
  posts: Array<PostWithComment>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: Session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    };
  }

  // TODO delete password
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const posts = await prisma.post.findMany({
    where: { userId: user.id },
    take: 5,
    orderBy: {
      id: 'desc',
    },
    include: { comments: true },
  });

  return {
    props: { posts },
  };
};

const PostsListPage: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <h1 className='text-2xl font-bold pl-4 pt-10'>Like Posts</h1>

      <div className='mt-4 mb-8'>
        <div className='lg:w-full lg:mx-0 md:mx-16 mx-4'>
          {posts.length ? (
            <PostsListWithPaginationMyPage posts={posts} />
          ) : (
            <p className='md:text-xl text-sm text-gray-500 text-center my-10'>
              Not posts
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PostsListPage;
