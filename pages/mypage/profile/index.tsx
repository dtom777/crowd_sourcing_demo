import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';

import ProfileEditForm from '@/components/form/mypage/profile/EditForm';

export const getServerSideProps: GetServerSideProps = async (context) => {
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
    props: {},
  };
};

const ProfilePage: NextPage = () => {
  return (
    <>
      <ProfileEditForm />
    </>
  );
};

export default ProfilePage;
