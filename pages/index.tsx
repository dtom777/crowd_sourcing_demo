import { GetStaticProps, NextPage } from 'next';

import { prisma } from '@/libs/prisma';

import CategoryTitle from '@/components/elements/category/CategoryTitle';
import Const from '@/components/elements/const/ConstMessage';
import Posts from '@/components/elements/post/Posts';

import { PostWithUser } from 'types/post.type';

type Props = {
  posts?: Array<PostWithUser>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: 'desc',
    },
    where: {
      AND: [{ published: true }, { draft: false }],
    },
    take: 24,
    include: {
      category: true,
      user: true,
    },
  });

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <CategoryTitle />
      <div className='lg:ml-0 ml-2 mt-4'>
        {posts?.length ? (
          <div className='mb-8'>
            <Posts posts={posts} />
          </div>
        ) : (
          <Const message='Not yet' />
        )}
      </div>
    </>
  );
};

export default Home;
