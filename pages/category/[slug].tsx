import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Category } from '@prisma/client';
import { useRouter } from 'next/router';
import { prisma } from '@/lib/prisma';
import Const from '@/components/atoms/const/Const';
import BaseHead from '@/components/atoms/head/BaseHead';
import PostsListWithPagination from '@/components/organisms/post/PostsListWithPagination';
import { PostWithUser } from 'types/post.type';
import { ParsedUrlQuery } from 'node:querystring';
import CategoryLabel from '@/components/CategoryLabel';

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

  const paths = categories.map((category: Category) => ({
    params: { slug: String(category.slug) },
  }));

  return {
    paths,
    fallback: true,
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
        { categorySlug: params.slug },
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
  };
};

const CategorySlugPage: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <CategoryLabel />
      <div className='lg:ml-0 ml-2 mt-4'>
        {posts.length ? (
          <div className='mb-8'>
            <PostsListWithPagination posts={posts} />
          </div>
        ) : (
          <Const message='No posts yet' />
        )}
      </div>
    </>
  );
};

export default CategorySlugPage;
