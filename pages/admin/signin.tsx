import { signIn } from 'next-auth/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Loading from '@/components/atoms/loading/Loading';
import SubmitButton from '@/components/atoms/button/SubmitButton';
import { NextPage } from 'next';

const AdminSignInPage: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signInByEmailAndPassword = async (data: {
    email: string;
    password: string;
  }): Promise<void> => {
    setLoading(true);
    const { email, password } = data;
    signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/admin',
    })
      .then((res) => {
        setLoading(false);
        setErrorMessage(res.error);
      })
      .catch((res) => {
        router.push('/admin');
        setLoading(false);
      });
  };

  return (
    <>
      <Loading loading={loading} />
      <div className='md:w-96 text-center md:mx-auto'>
        <h1 className='mt-12 mb-6 font-bold text-3xl'>管理者ログイン</h1>
        <form
          method='post'
          action='/api/auth/callback/credentials'
          onSubmit={handleSubmit(signInByEmailAndPassword)}
        >
          <label className='block md:ml-0 ml-6 text-gray-700 text-sm font-bold text-left'>
            メールアドレス
          </label>
          <input
            {...register('email', {
              required: true,
            })}
            type='email'
            placeholder='tunoru@tunoru.me'
            className='shadow appearance-none border rounded md:w-96 w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.email && (
            <p className='text-center text-red-600 font-normal'>
              入力してください。
            </p>
          )}
          <label className='block md:ml-0 ml-6 text-gray-700 text-sm font-bold text-left mt-4'>
            パスワード
          </label>
          <input
            {...register('password', {
              required: true,
              minLength: 8,
              maxLength: 12,
            })}
            type='password'
            placeholder='******'
            className='shadow appearance-none border rounded md:w-96 w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.password && (
            <p className='text-center text-red-600 font-normal'>
              8〜12文字で入力してください。
            </p>
          )}
          <SubmitButton className='w-60 mt-4 px-4 py-3 font-semibold md:text-base text-sm rounded-3xl'>
            ログイン
          </SubmitButton>
        </form>
        <p className='text-red-600 my-4'>{errorMessage}</p>
      </div>
    </>
  );
};

export default AdminSignInPage;
