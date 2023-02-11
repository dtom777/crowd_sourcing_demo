import { GetStaticProps, NextPage } from 'next';
import { prisma } from '@/lib/prisma';
import Layout from '@/components/templates/Layout';
import BaseHead from '@/components/atoms/head/BaseHead';
import CardsList from '@/components/organisms/card/CardsList';
import { PostWithUser } from 'types/post.type';
import CategoryLabel from '@/components/CategoryLabel';
import PostsListWithPagination from '@/components/organisms/post/PostsListWithPagination';

type Props = {
  posts?: Array<PostWithUser>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 6,
    include: {
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
    <Layout>
      <BaseHead />
      <CategoryLabel />
      <div className='lg:ml-0 ml-2 mt-4'>
        {posts.length && (
          <div className='mb-8'>
            <PostsListWithPagination posts={posts} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
