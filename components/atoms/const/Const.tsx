import Link from 'next/link';
import { memo, VFC } from 'react';

type Props = {
  message: string;
};

const Const: VFC<Props> = ({ message }) => {
  return (
    <div className='md:text-xl text-sm text-gray-500 text-center my-10'>
      <Link href='/create'>
        <a className='hover:opacity-50'>{message}</a>
      </Link>
    </div>
  );
};

export default memo(Const);
