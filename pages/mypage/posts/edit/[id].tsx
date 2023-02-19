import { ParsedUrlQuery } from 'querystring';

import { Post } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import PostForm from '@/components/form/posts/Form';

type Props = {
  session: Session;
  post?: Post;
};

type Params = ParsedUrlQuery & {
  id: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const session: Session | null = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: context.params!.id,
    },
  });

  return {
    props: {
      session,
      post,
    },
  };
};

const PostEditPage: NextPage<Props> = ({ session, post }) => {
  return (
    <>
      <PostForm session={session} type='UPDATE' post={post} />
    </>
  );
};

export default PostEditPage;
