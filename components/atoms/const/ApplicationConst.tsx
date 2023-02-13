import SignInLinkButtonAndSignUpLinkButton from '@/components/molecules/auth/SignInLinkButtonAndSignUpLinkButton';
import { memo, VFC } from 'react';
import Link from 'next/link';

const ApplicationConst: VFC = () => {
  return (
    <div className='my-4 px-8 pt-6 pb-8 bg-white rounded'>
      <p className='md:text-xl text-lg font-bold'>Please Apply!</p>
      <div className='mt-4'>
        <Link href='/auth/signin'>
          <a className='btn mr-4'>Sign In</a>
        </Link>
        <Link href='/auth/signup'>
          <a className='btn bg-white text-gray-600'>Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default memo(ApplicationConst);
