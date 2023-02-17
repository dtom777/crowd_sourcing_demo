import { GetServerSideProps, NextPage } from 'next';
import { getSession, GetSessionOptions } from 'next-auth/client';

import EmailSendForm from '@/components/form/mypage/settings/EmailSendForm';

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
    props: {},
  };
};

const EmailSettingPage: NextPage = () => {
  return (
    <>
      <EmailSendForm />
    </>
  );
};

export default EmailSettingPage;
