import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, GetSessionOptions } from 'next-auth/client';

import EmailSettingForm from '@/components/form/mypage/setting/Form';

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

const EmailSettingPage: NextPage<Props> = ({ session }) => {
  return (
    <>
      <EmailSettingForm session={session} />
    </>
  );
};

export default EmailSettingPage;
