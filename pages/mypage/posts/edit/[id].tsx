import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

import { prisma } from '@/libs/prisma';

import { PostWithTags } from 'types/post.type';
import { getAsString } from 'utils/getAsString';

import PostForm from '../../../../components/form/post/Form';

type Props = {
  session: Session;
  post: PostWithTags;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: Session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    };
  }

  const id = getAsString(context.query.id);
  const post = await prisma.post.findUnique({
    where: {
      id,
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
