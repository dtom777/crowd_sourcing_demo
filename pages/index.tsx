import { GetStaticProps, NextPage } from 'next';
import { prisma } from '@/lib/prisma';
import BaseHead from '@/components/atoms/head/BaseHead';
import { PostWithUser } from 'types/post.type';
import CategoryLabel from '@/components/CategoryLabel';
import PostsListWithPagination from '@/components/organisms/post/PostsListWithPagination';
import Const from '@/components/atoms/const/Const';

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
      <CategoryLabel />
      <div className='lg:ml-0 ml-2 mt-4'>
        {posts.length ? (
          <div className='mb-8'>
            <PostsListWithPagination posts={posts} />
          </div>
        ) : (
          <Const message='Not yet' />
        )}
      </div>
    </>
  );
};

export default Home;
