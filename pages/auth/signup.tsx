import { NextPage } from 'next';
import { useState } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Loading from '@/components/atoms/loading/Loading';
import SignUpForm from '@/components/organisms/auth/SignUpForm';
import Link from 'next/link';

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const [session] = useSession();
  const [loading] = useState<boolean>(false);
  if (session) {
    router.push('/');

    return null;
  }

  return (
    <>
      <Loading loading={loading} />
      <SignUpForm />
      <div className='my-4'>
        <p className='text-sm text-gray-400'>
          Already have an account?
          <Link href='/auth/signin'>
            <a className='underline'>Sign In</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUpPage;
