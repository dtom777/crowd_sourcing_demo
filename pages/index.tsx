import { GetStaticProps, NextPage } from 'next';

import { prisma } from '@/libs/prisma';

import CategoryTitle from '@/components/elements/category/CategoryTitle';
import Const from '@/components/elements/const/ConstMessage';
import Posts from '@/components/elements/post/Posts';

import { PostWithUserAndCategory } from '@/types/post.type';

type Props = {
  posts?: Array<PostWithUserAndCategory>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts: Props['posts'] = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
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
    revalidate: 20,
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <CategoryTitle />
      <div className='ml-2 mt-4 lg:ml-0'>
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
