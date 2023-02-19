import { faEnvelope, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

import Icon from '@/components/elements/icon/Icon';
import AccountDeleteForm from '@/components/form/mypage/settings/AccountDeleteForm';

type Props = {
  session: Session;
};

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

const SettingsPage: NextPage = () => {
  return (
    <div className='hero min-h-screen'>
      <div className='hero-content flex-col'>
        <div className='text-center'>
          <h1 className='text-5xl font-bold'>Settings</h1>
        </div>
        <div className='mt-8 mb-12'>
          <div className='flex w-full flex-col'>
            <div className='flex items-center justify-between px-2'>
              <p className='mr-4 text-xl font-bold'>Email</p>
              <Link href='/mypage/settings/email'>
                <a className='btn flex w-48 items-center justify-center rounded-3xl border border-blue-500 bg-white py-3 text-blue-500 hover:bg-white hover:opacity-50 focus:outline-none md:ml-4'>
                  <Icon icon={faEnvelope} className='mr-2 text-blue-500' />
                  Change Email
                </a>
              </Link>
            </div>

            <div className='divider'></div>

            <div className='flex items-center justify-between px-2'>
              <p className='mr-4 text-xl font-bold'>Account</p>
              <label
                htmlFor='my-modal-4'
                className='btn flex w-48 items-center justify-center rounded-3xl border border-red-500 bg-white py-3 text-red-500 hover:bg-white hover:opacity-50  focus:outline-none md:ml-4'
              >
                <Icon icon={faUserSlash} className='mr-2 text-red-500' />
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
