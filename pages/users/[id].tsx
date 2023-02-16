import { ParsedUrlQuery } from 'node:querystring';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { prisma } from '@/libs/prisma';

import Avatar from '@/components/elements/avatar/Avatar';
import Cards from '@/components/elements/card/Cards';
import ConstMessage from '@/components/elements/const/ConstMessage';

import { UserWithPost } from 'types/user.type';

type Props = {
  user: UserWithPost;
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
  // TODO パスワードとってこない select つかう
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      posts: {
        include: {
          category: true,
          user: true,
        },
        take: 4,
      },
      profile: true,
    },
  });
  console.log(user);

  return {
    props: {
      user,
    },
  };
};

const UserPage: NextPage<Props> = ({ user }) => {
  const { posts, profile, image, name } = user;

  return (
    <>
      <div className='lg:my-12 lg:px-4 my-4'>
        <div className='lg:mx-2 mx-4 lg:text-left lg:mr-10'>
          <div className='flex items-center'>
            <div className='flex flex-col'>
              <Avatar
                src={image ? image : '/avatar-default.png'}
                size={100}
                className='w-24 ring ring-primary ring-offset-base-100 ring-offset-2'
              />
            </div>

            <div className='flex flex-col'>
              <p className='lg:text-3xl text-xl font-bold ml-4'>{name}</p>
            </div>
          </div>

          {profile?.bio ? (
            <div className='h-40 py-4 px-6 mt-4 mb-8 leading-relaxed break-words border rounded-lg'>
              {profile.bio}
            </div>
          ) : (
            <div className='h-14 py-4 px-6 mt-4 mb-8 leading-relaxed break-words border rounded-lg text-gray-500'>
              No content
            </div>
          )}
        </div>

        <h2 className='mb-2 py-2 px-4 bg-white text-black border-b text-base font-bold '>
          Recent Posts
        </h2>
        {posts.length ? (
          <div className='pb-5 px-6'>
            <Cards posts={posts} className='grid gap-4 md:grid-cols-2' />
          </div>
        ) : (
          <ConstMessage message='Not yet' />
        )}
      </div>
    </>
  );
};

export default UserPage;
