import { NextPage } from 'next';
import { useState } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import LayoutAuth from '@/components/templates/LayoutAuth';
import BaseHead from '@/components/atoms/head/BaseHead';
import Loading from '@/components/atoms/loading/Loading';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import NextAuthButtons from '@/components/molecules/auth/NextAuthButtons';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import SignUpForm from '@/components/organisms/auth/SignUpForm';

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const [session] = useSession();
  const [loading] = useState<boolean>(false);
  const [errorMessage] = useState<string>('');
  if (session) {
    router.push('/');

    return null;
  }

  // errorMessageを発生させるfunctionない

  return (
    <LayoutAuth>
      <BaseHead />
      <Loading loading={loading} />
      <div className='md:w-96 text-center md:mx-auto'>
        <h1 className='mt-12 mb-6 font-bold text-3xl'>
          Crowd Sourcingへようこそ!
        </h1>
        <ErrorMessage errorMessage={errorMessage} className='my-4' />
        <SignUpForm />
        <p className='text-xs text-gray-400 mt-6'>
          メールアドレスは他のユーザーに公開されることはありません。
          <br />
          利用規約に同意いただいた上、ご登録ください。
        </p>
        <div className='my-12'>
          <p className='text-sm text-gray-400'>
            すでにアカウントをお持ちの方は
            <BaseLinkButton href='/auth/signin' className='underline'>
              ログイン
            </BaseLinkButton>
          </p>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default SignUpPage;
