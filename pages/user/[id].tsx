import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { prisma } from '@/lib/prisma';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Layout from '@/components/templates/Layout';
import PostsList from '@/components/organisms/post/PostsList';
import BaseHead from '@/components/atoms/head/BaseHead';
import BaseAvatar from '@/components/atoms/avatar/BaseAvatar';
import SnsLinkButton from '@/components/atoms/button/SnsLinkButton';
import { PostWithUser } from 'types/post.type';
import { UserWithPost } from 'types/user.type';
import { ParsedUrlQuery } from 'node:querystring';

type Props = {
  user: UserWithPost;
  posts: Array<PostWithUser>;
};

type Params = ParsedUrlQuery & {
  id: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  const paths = users.map((user: { id: string }) => ({
    params: { id: String(user.id) },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      posts: true,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      userId: params.id,
    },
    take: 5,
    include: {
      user: true,
    },
  });

  return {
    props: {
      posts,
      user,
    },
  };
};

const UserPage: NextPage<Props> = ({ posts, user }) => {
  return (
    <Layout>
      <BaseHead />
      <div className='lg:flex lg:justify-between lg:my-12 lg:px-4 my-4'>
        <div className='lg:w-7/12 lg:mx-2 mx-4 lg:text-left lg:mr-10'>
          <div className='flex items-center'>
            <div>
              <BaseAvatar
                src={user.image ? user.image : '/avatar-default.png'}
                size={70}
              />
            </div>
            <div className='flex flex-col'>
              <p className='lg:text-3xl text-xl font-bold ml-4'>{user.name}</p>
              <div className='text-xl font-bold ml-4'>
                {user.twitter && (
                  <SnsLinkButton
                    href={`https://twitter.com/${user.twitter}`}
                    className='mr-2'
                    iconClassName='text-blue-300'
                    icon={faTwitter}
                  />
                )}
                {user.facebook && (
                  <SnsLinkButton
                    href={`https://www.facebook.com/${user.facebook}`}
                    iconClassName='text-blue-500'
                    icon={faFacebook}
                  />
                )}
              </div>
            </div>
          </div>
          {user.profile ? (
            <div className='h-40 py-4 px-6 mt-4 mb-8 leading-relaxed break-words border rounded-lg'>
              {user.profile}
            </div>
          ) : (
            <div className='h-14 py-4 px-6 mt-4 mb-8 leading-relaxed break-words border rounded-lg text-gray-500'>
              自己紹介文がありません
            </div>
          )}
        </div>
        <div className='lg:w-5/12'>
          <div className=''>
            <h2 className='py-2 px-4 lg:bg-white bg-black lg:text-black text-white lg:border-b lg:border-black lg:text-base text-sm font-bold '>
              最近の募集
            </h2>
            {posts !== undefined && posts.length !== 0 ? (
              <div className='pb-5 px-6'>
                <PostsList posts={posts} display={'list'} />
              </div>
            ) : (
              <p className='text-center mt-4 text-gray-500'>
                まだ募集がありません
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
