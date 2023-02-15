import { faEnvelope, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Session } from 'next-auth';
import { getSession, GetSessionOptions } from 'next-auth/client';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import { useSettingPage } from '@/hooks/useSettingPage';

import ErrorMessage from '@/components/elements/error/ErrorMessage';
import Icon from '@/components/elements/icon/Icon';
import Spinner from '@/components/elements/spinner/Spinner';

Modal.setAppElement('#__next');

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

const SettingPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, errorMessage, deleteUser } = useSettingPage();

  return (
    <>
      <Spinner loading={loading} />
      <h1 className='text-2xl font-bold pl-4 pt-10'>Settings</h1>
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

            {/* TODO components */}
            <input type='checkbox' id='my-modal-4' className='modal-toggle' />
            <label htmlFor='my-modal-4' className='modal cursor-pointer'>
              <label className='modal-box relative' htmlFor=''>
                <h3 className='text-lg font-bold'>Delete you account</h3>
                <p className='py-4'>Enter your email and password</p>
                <form
                  method='post'
                  action='/api/auth/callback/credentials'
                  onSubmit={handleSubmit(deleteUser)}
                >
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input
                    {...register('email', { required: true })}
                    type='email'
                    placeholder='Type here'
                    className='input input-bordered w-full'
                  />
                  {errors.email && <ErrorMessage errorMessage='Please enter' />}
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input
                    {...register('password', {
                      required: true,
                      minLength: 8,
                      maxLength: 12,
                    })}
                    type='password'
                    placeholder='***********'
                    className='input input-bordered w-full'
                  />
                  {errors.password && (
                    <ErrorMessage errorMessage='Please enter 8 to 12 characters' />
                  )}
                  <label className='label'>
                    <span className='label-text'>Confirmation Password</span>
                  </label>
                  <input
                    {...register('confirmationPassword', {
                      required: true,
                      minLength: 8,
                      maxLength: 12,
                    })}
                    type='password'
                    placeholder='***********'
                    className='input input-bordered w-full'
                  />
                  {errors.confirmationPassword && (
                    <ErrorMessage errorMessage='Please enter 8 to 12 characters' />
                  )}
                  <div className='flex justify-center mt-4'>
                    <input
                      className='btn btn-error'
                      type='submit'
                      value='Delete'
                    />
                  </div>
                </form>
                <ErrorMessage
                  errorMessage={errorMessage}
                  className='mt-4 text-center'
                />
              </label>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPage;
