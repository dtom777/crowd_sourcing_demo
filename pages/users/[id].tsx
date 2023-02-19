import { ParsedUrlQuery } from 'node:querystring';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { prisma } from '@/libs/prisma';

import Avatar from '@/components/elements/avatar/Avatar';
import Cards from '@/components/elements/card/Cards';
import ConstMessage from '@/components/elements/const/ConstMessage';

import { SpecificUser } from '../../types/user.type';

type Props = {
  user: SpecificUser;
};

type Params = ParsedUrlQuery & {
  id: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
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
      id: params!.id,
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

  return user ? { props: { user } } : { notFound: true };
};

const UserPage: NextPage<Props> = ({ user }) => {
  const { posts, profile, image, name } = user;

  return (
    <>
      <div className='my-4 lg:my-12 lg:px-4'>
        <div className='mx-4 lg:mx-2 lg:mr-10 lg:text-left'>
          <div className='flex items-center'>
            <div className='flex flex-col'>
              <Avatar
                src={image ? image : '/avatar-default.png'}
                size={100}
                className='w-24 ring ring-primary ring-offset-2 ring-offset-base-100'
              />
            </div>

            <div className='flex flex-col'>
              <p className='ml-4 text-xl font-bold lg:text-3xl'>{name}</p>
            </div>
          </div>

          {profile?.bio ? (
            <div className='mt-4 mb-8 h-40 break-words rounded-lg border py-4 px-6 leading-relaxed'>
              {profile.bio}
            </div>
          ) : (
            <div className='mt-4 mb-8 h-14 break-words rounded-lg border py-4 px-6 leading-relaxed text-gray-500'>
              No content
            </div>
          )}
        </div>

        <h2 className='mb-2 border-b bg-white py-2 px-4 text-base font-bold text-black '>
          Recent Posts
        </h2>
        {posts.length ? (
          <div className='px-6 pb-5'>
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
