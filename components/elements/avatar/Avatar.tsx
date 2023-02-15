import Image from 'next/image';
import { memo, VFC } from 'react';

type Props = {
  src: string;
  size: number;
  className?: string;
};

const Avatar: VFC<Props> = ({ src, size, className }) => {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <div className='avatar'>
        <div className={`rounded-full ${className}`}>
          <Image src={src} width={size} height={size} />
        </div>
      </div>
    </div>
  );
};

export default memo(Avatar);
