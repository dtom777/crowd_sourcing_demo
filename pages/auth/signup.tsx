import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useState } from 'react';

import Spinner from '@/components/elements/spinner/Spinner';
import SignUpForm from '@/components/organisms/auth/SignUpForm';

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
      <Spinner loading={loading} />
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
