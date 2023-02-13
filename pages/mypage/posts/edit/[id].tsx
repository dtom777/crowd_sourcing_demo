import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { PostWithTags } from 'types/post.type';
import { getSession } from 'next-auth/client';
import { prisma } from '@/lib/prisma';
import BaseHead from '@/components/atoms/head/BaseHead';
import PostEditForm from '@/components/organisms/mypage/posts/PostEditForm';
import { getAsString } from 'utils/getAsString';
import PostForm from '../../../../components/elements/post/Form';

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
