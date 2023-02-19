import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import Const from '@/components/elements/const/ConstMessage';
import LikePostList from '@/components/elements/post/LikeList';

import { UserSelectId } from '@/types/user.type';
import { PostWithUserAndLikeAndComment } from 'types/post.type';

type Props = {
  posts?: Array<PostWithUserAndLikeAndComment>;
  user?: UserSelectId;
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

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!user) return { props: {} };

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
  return (
    <>
      <h1 className='pl-4 pt-10 text-2xl font-bold'>Like Posts</h1>
      <div className='mt-4 mb-8'>
        {posts?.length ? (
          <LikePostList posts={posts} user={user} />
        ) : (
          <Const message='Not yet' />
        )}
      </div>
    </>
  );
};

export default LikePostsListPage;
