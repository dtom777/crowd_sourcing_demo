import { ParsedUrlQuery } from 'node:querystring';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import LikeButton from '@/components/elements/button/LikeButton';
import ConstApllicaiton from '@/components/elements/const/ConstApplication';
import PostDetails from '@/components/elements/post/PostDetails';
import RelatedPosts from '@/components/elements/post/RelatedPosts';
import ApplyForm from '@/components/form/post/ApplyForm';

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
  const [session] = useSession();

  return (
    <>
      <div className='lg:flex lg:mx-4'>
        <div className='lg:w-7/12 lg:mr-4'>
          <div className='border'>
            <PostDetails post={post} />
            <LikeButton post={post} session={session} />
            <div className='text-center -mt-3'>
              {session ? <ApplyForm post={post} /> : <ConstApllicaiton />}
            </div>
          </div>
        </div>
        <div className='lg:w-5/12'>
          <RelatedPosts posts={relationPosts} />
        </div>
      </div>
    </>
  );
};

export default PostPage;
