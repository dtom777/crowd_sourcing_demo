import Link from 'next/link';
import { memo, VFC } from 'react';

const ConstApplication: VFC = () => {
  return (
    <div className='my-4 rounded bg-white px-8 pt-6 pb-8'>
      <p className='text-lg font-bold md:text-xl'>Please Apply!</p>
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

export default memo(ConstApplication);
