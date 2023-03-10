import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

import PostForm from '@/components/form/posts/Form';

type Props = {
  session: Session;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    };
  }

  return {
    props: { session },
  };
};

const PostCreatePage: NextPage<Props> = ({ session }) => {
  return (
    <>
      <PostForm session={session} type='CREATE' />
    </>
  );
};

export default PostCreatePage;
