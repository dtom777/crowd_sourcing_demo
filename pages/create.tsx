import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, GetSessionOptions } from 'next-auth/client';
import PostForm from '@/components/elements/post/Form';

type Props = {
  session: Session;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetSessionOptions
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
