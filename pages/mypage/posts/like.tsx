import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, GetSessionOptions } from 'next-auth/client';
import { useState } from 'react';

import { prisma } from '@/libs/prisma';

import Const from '@/components/elements/const/ConstMessage';
import Spinner from '@/components/elements/spinner/Spinner';
import PostsLikeList from '@/components/organisms/mypage/posts/PostsLikeList';

import { PostWithUserAndLikeAndComment } from 'types/post.type';

type Props = {
  posts: Array<PostWithUserAndLikeAndComment>;
  session: Session;
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

  // TODO delete password
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const likePosts = await prisma.post.findMany({
    where: {
      likes: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      user: true,
      likes: true,
      comments: true,
    },
  });

  return {
    props: {
      posts: likePosts,
      user,
    },
  };
};

const LikePostsListPage: NextPage<Props> = ({ posts, user }) => {
  const [loading] = useState<boolean>(false);

  return (
    <>
      <Spinner loading={loading} />
      <h1 className='text-2xl font-bold pl-4 pt-10'>Like Posts</h1>
      <div className='mt-4 mb-8'>
        {posts.length ? (
          <PostsLikeList posts={posts} user={user} />
        ) : (
          <Const message='Not yet' />
        )}
      </div>
    </>
  );
};

export default LikePostsListPage;
