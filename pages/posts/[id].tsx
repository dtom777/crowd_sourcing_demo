import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useSession } from 'next-auth/client';
import { prisma } from '@/lib/prisma';
import createOgp from '../../utils/server/ogpUtils';
import BaseHead from '@/components/atoms/head/BaseHead';
import Layout from '@/components/templates/Layout';
import ApplicationInformation from '@/components/atoms/const/ApplicationInformation';
import RelationPostList from '@/components/organisms/post/RelationPostList';
import LinkAvatarWithNameAndCreatedAt from '@/components/molecules/avatar/LinkAvatarWithNameAndCreatedAt';
import ApplicationForm from '@/components/organisms/post/ApplicationForm';
import ApplicationConst from '@/components/atoms/const/ApplicationConst';
import SnsButtonAndLikeButton from '@/components/organisms/post/SnsButtonAndLikeButton';
import PostDetails from '@/components/organisms/post/PostDetails';
import { PostWithUserAndCategoryAndTags, PostWithUser } from 'types/post.type';
import { ParsedUrlQuery } from 'node:querystring';

type Props = {
  findPost: PostWithUserAndCategoryAndTags;
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
  const findPost = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      Category: true,
      user: true,
      tags: {
        include: { tag: true },
      },
    },
  });

  const post = {
    ...findPost,
    tags: findPost.tags.map((tag: { tag: any }) => tag.tag),
  };

  const relationPosts = await prisma.post.findMany({
    where: {
      categoryId: post.categoryId,
      NOT: {
        id: params.id,
      },
    },
    take: 3,
    include: {
      user: true,
    },
  });

  createOgp(params.id);
  // await fetch(`${process.env.WEBAPP_URL}/api/ogp/${params.id}`);

  return {
    props: {
      findPost,
      post,
      relationPosts,
    },
    revalidate: 20,
  };
};

const PostPage: NextPage<Props> = ({ post, relationPosts }) => {
  const [session] = useSession();

  return (
    <Layout>
      <BaseHead post={post} />
      <div className='lg:flex lg:mx-4'>
        <div className='lg:w-7/12 lg:mr-4'>
          <PostDetails post={post} />
          <LinkAvatarWithNameAndCreatedAt post={post} />
          <SnsButtonAndLikeButton post={post} session={session} />
          <div className='text-center -mt-3'>
            {!session ? (
              <ApplicationConst />
            ) : (
              <ApplicationForm user={session.user} post={post} />
            )}
          </div>
          <ApplicationInformation />
        </div>
        <div className='lg:w-5/12'>
          <RelationPostList posts={relationPosts} />
        </div>
      </div>
    </Layout>
  );
};

export default PostPage;
