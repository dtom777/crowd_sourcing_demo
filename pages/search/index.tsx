import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';

import { prisma } from '@/libs/prisma';

import Const from '@/components/elements/const/ConstMessage';
import Posts from '@/components/elements/post/Posts';

import { PostWithUser } from 'types/post.type';

type Query = {
  query?: string;
};

type Props = {
  posts: Array<PostWithUser>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const { query }: Query = context.query;
  const posts = await prisma.post.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              title: {
                contains: query,
              },
            },
            {
              content: {
                contains: query,
              },
            },
          ],
        },
        {
          published: true,
        },
        {
          draft: false,
        },
      ],
    },
    take: 20,
    include: { user: true },
  });

  return {
    props: { posts },
  };
};

const SearchPage: NextPage<Props> = ({ posts }) => {
  const router = useRouter();
  const { query }: Query = router.query;

  return (
    <>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold pl-4 pt-4 flex items-center'>
          {query ? (
            <h2>Search results for &quot;{query}&quot;</h2>
          ) : (
            <h2>Recommend Posts</h2>
          )}
          <p className='ml-6 lg:text-lg'>{posts.length} posts</p>
        </h1>
        <div className='lg:ml-0 ml-2 mt-4'>
          {posts.length ? (
            <div className='mb-8'>
              <Posts posts={posts} />
            </div>
          ) : (
            <Const message='Not yet' />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
