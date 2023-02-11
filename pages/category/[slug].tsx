import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Category } from '@prisma/client';
import { useRouter } from 'next/router';
import { prisma } from '@/lib/prisma';
import Layout from '@/components/templates/Layout';
import Const from '@/components/atoms/const/Const';
import BaseHead from '@/components/atoms/head/BaseHead';
import PostsListWithPagination from '@/components/organisms/post/PostsListWithPagination';
import CategoryTags from '@/components/molecules/category/CategoryTags';
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
    where: {
      NOT: {
        slug: null,
      },
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
  const category = await prisma.category.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      id: true,
    },
  });
  const categoryId = category.id;

  const posts = await prisma.post.findMany({
    orderBy: {
      id: 'desc',
    },
    where: {
      AND: [{ published: true }, { draft: false }, { categoryId }],
    },
    include: {
      Category: true,
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
    <Layout>
      <BaseHead />
      <CategoryLabel />
      <div className='lg:ml-0 ml-2 mt-4'>
        {posts.length ? (
          <div className='mb-8'>
            <PostsListWithPagination posts={posts} />
          </div>
        ) : (
          <Const message='まだお仕事が投稿されていません。' />
        )}
      </div>
    </Layout>
  );
};

export default CategorySlugPage;
