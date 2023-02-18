import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import MyPosts from '@/components/elements/post/MyPosts';

import { PostWithComment } from 'types/post.type';

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
      <h1 className='pl-4 pt-10 text-2xl font-bold'>My Posts</h1>

      <div className='mt-4 mb-8'>
        <div className='mx-4 md:mx-16 lg:mx-0 lg:w-full'>
          {posts.length ? (
            <MyPosts posts={posts} />
          ) : (
            <p className='my-10 text-center text-sm text-gray-500 md:text-xl'>
              Not posts
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PostsListPage;
