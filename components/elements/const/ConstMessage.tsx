import Link from 'next/link';
import { memo, VFC } from 'react';

type Props = {
  message: string;
};

const Const: VFC<Props> = ({ message }) => {
  return (
    <div className='my-10 text-center text-sm text-gray-500 md:text-xl'>
      <Link href='/create'>
        <a className='hover:opacity-50'>{message}</a>
      </Link>
    </div>
  );
};

export default memo(Const);
