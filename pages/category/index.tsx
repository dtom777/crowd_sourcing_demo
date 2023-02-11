import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import Layout from '@/components/templates/Layout';
import SearchForm from '@/components/organisms/search/SearchForm';
import BaseHead from '@/components/atoms/head/BaseHead';
import PostsListWithPagination from '@/components/organisms/post/PostsListWithPagination';
import { PostWithUser } from 'types/post.type';

type Props = {
  posts: Array<PostWithUser>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await prisma.post.findMany({
    where: {
      AND: [{ published: true }, { draft: false }],
    },
    orderBy: {
      id: 'desc',
    },
    take: 30,
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

const CategoryPage: NextPage<Props> = ({ posts }) => {
  return (
    <Layout>
      <BaseHead />
      <div className='lg:pb-6 lg:px-4'>
        <section className='mb-6'>
          <div className='flex justify-between lg:mt-20 py-2 lg:px-0 pl-4 pr-2 lg:bg-white bg-black lg:text-black text-white lg:font-extrabold font-bold lg:text-3xl text-sm'>
            <h2>新着のお仕事</h2>
          </div>

          <div className='lg:mx-0 mx-4'>
            <PostsListWithPagination posts={posts} />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CategoryPage;
