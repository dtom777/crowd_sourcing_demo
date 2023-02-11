import Image from 'next/image';
import { memo, VFC } from 'react';

type Props = {
  src: string;
  size: number;
};

const BaseAvatar: VFC<Props> = ({ src, size }) => {
  return (
    <>
      {src && (
        <Image
          src={src}
          width={size}
          height={size}
          className='rounded-full'
          alt='user-image'
        />
      )}
    </>
  );
};

export default memo(BaseAvatar);
