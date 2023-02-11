import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { PostWithTags } from 'types/post.type';
import { getSession } from 'next-auth/client';
import { prisma } from '@/lib/prisma';
import Layout from '@/components/templates/Layout';
import BaseHead from '@/components/atoms/head/BaseHead';
import PostEditForm from '@/components/organisms/mypage/posts/PostEditForm';
import { getAsString } from 'utils/getAsString';

type Props = {
  session: Session;
  post: PostWithTags;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = getAsString(context.query.id);
  const session: Session = await getSession(context);
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
      id,
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
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
    <Layout>
      <BaseHead />
      <PostEditForm session={session} post={post} />
    </Layout>
  );
};

export default PostEditPage;
