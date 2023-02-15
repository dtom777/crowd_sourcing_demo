import { ParsedUrlQuery } from 'node:querystring';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import { prisma } from '@/libs/prisma';

import Cards from '@/components/elements/card/Cards';

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
            <div>
              <div className='avatar'>
                <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                  <Image
                    src={image ? image : '/avatar-default.png'}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <p className='lg:text-3xl text-xl font-bold ml-4'>{name}</p>
            </div>
          </div>

          {profile.bio ? (
            <div className='h-40 py-4 px-6 mt-4 mb-8 leading-relaxed break-words border rounded-lg'>
              {profile.bio}
            </div>
          ) : (
            <div className='h-14 py-4 px-6 mt-4 mb-8 leading-relaxed break-words border rounded-lg text-gray-500'>
              No bio yet
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
          <p className='text-center mt-4 text-gray-500'>Not yet</p>
        )}
      </div>
    </>
  );
};

export default UserPage;
