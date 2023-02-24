import { ParsedUrlQuery } from 'node:querystring';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { prisma } from '@/libs/prisma';

import CategoryTitle from '@/components/elements/category/CategoryTitle';
import Const from '@/components/elements/const/ConstMessage';
import Posts from '@/components/elements/post/Posts';

import { PostWithUser } from 'types/post.type';

type Props = {
  posts: Array<PostWithUser>;
};

type Params = ParsedUrlQuery & {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await prisma.category.findMany({
    select: {
      slug: true,
    },
  });

  const paths = categories.map((category) => ({
    params: { slug: String(category.slug) },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: 'desc',
    },
    where: {
      AND: [
        { published: true },
        { draft: false },
        { categorySlug: params!.slug },
      ],
    },
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

const CategorySlugPage: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <CategoryTitle />
      <div className='ml-2 mt-4 lg:ml-0'>
        {posts?.length ? (
          <div className='mb-8'>
            <Posts posts={posts} />
          </div>
        ) : (
          <Const message='No posts yet' />
        )}
      </div>
    </>
  );
};

export default CategorySlugPage;
