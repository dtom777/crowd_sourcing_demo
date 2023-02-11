import { GetServerSideProps, NextPage } from 'next';
import { getSession, GetSessionOptions } from 'next-auth/client';
import { Session } from 'next-auth';
import Layout from '@/components/templates/Layout';
import BaseHead from '@/components/atoms/head/BaseHead';
import ProfileEditForm from '@/components/organisms/mypage/ProfileEditForm';

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
    props: {
      session,
    },
  };
};

const ProfilePage: NextPage<Props> = ({ session }) => {
  return (
    <Layout>
      <BaseHead />
      <ProfileEditForm session={session} />
    </Layout>
  );
};

export default ProfilePage;
