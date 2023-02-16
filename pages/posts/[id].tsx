import { ParsedUrlQuery } from 'node:querystring';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { prisma } from '@/libs/prisma';

import PostDetails from '@/components/elements/post/Details';
import RelatedPosts from '@/components/elements/post/RelatedPosts';

import { PostWithUserAndCategoryAndTags, PostWithUser } from 'types/post.type';

type Props = {
  post: PostWithUserAndCategoryAndTags;
  relationPosts: Array<PostWithUser>;
};

type Params = ParsedUrlQuery & {
  id: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  const paths = posts.map((post: { id: string }) => ({
    params: { id: String(post.id) },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      category: true,
      user: true,
    },
  });

  const relationPosts = await prisma.post.findMany({
    where: {
      categorySlug: post.categorySlug,
      NOT: {
        id: params.id,
      },
    },
    take: 4,
    include: {
      user: true,
    },
  });

  return {
    props: {
      post,
      relationPosts,
    },
    revalidate: 20,
  };
};

const PostPage: NextPage<Props> = ({ post, relationPosts }) => {
  return (
    <>
      <div className='lg:flex lg:mx-4'>
        <div className='lg:w-7/12 lg:mr-4'>
          <PostDetails post={post} />
        </div>
        <div className='lg:w-5/12'>
          <RelatedPosts posts={relationPosts} />
        </div>
      </div>
    </>
  );
};

export default PostPage;
