import { GetServerSideProps, NextPage } from 'next';
import { getSession, GetSessionOptions } from 'next-auth/client';
import { Session } from 'next-auth';
import EmailSettingForm from '@/components/organisms/mypage/setting/EmailSettingForm';

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

  console.log(session);

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
