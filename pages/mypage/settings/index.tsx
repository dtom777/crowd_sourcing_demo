import { faEnvelope, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Session } from 'next-auth';
import { getSession, GetSessionOptions } from 'next-auth/client';

import Icon from '@/components/elements/icon/Icon';
import AccountDeleteForm from '@/components/form/mypage/settings/AccountDeleteForm';

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
    props: {},
  };
};

const SettingsPage: NextPage = () => {
  return (
    <div className='hero min-h-screen'>
      <div className='hero-content flex-col'>
        <div className='text-center'>
          <h1 className='text-5xl font-bold'>Settings</h1>
        </div>
        <div className='mt-8 mb-12'>
          <div className='flex flex-col w-full'>
            <div className='flex justify-between px-2 items-center'>
              <p className='text-xl font-bold mr-4'>Email</p>
              <Link href='/mypage/settings/email'>
                <a className='btn bg-white hover:bg-white flex justify-center items-center py-3 md:ml-4 rounded-3xl text-blue-500 border border-blue-500 focus:outline-none hover:opacity-50 w-48'>
                  <Icon icon={faEnvelope} className='text-blue-500 mr-2' />
                  Change Email
                </a>
              </Link>
            </div>

            <div className='divider'></div>

            <div className='flex justify-between px-2 items-center'>
              <p className='text-xl font-bold mr-4'>Account</p>
              <label
                htmlFor='my-modal-4'
                className='btn flex justify-center items-center py-3 md:ml-4 rounded-3xl text-red-500 border border-red-500 focus:outline-none hover:opacity-50 w-48  bg-white hover:bg-white'
              >
                <Icon icon={faUserSlash} className='text-red-500 mr-2' />
                Delete Account
              </label>

              <AccountDeleteForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
