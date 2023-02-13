import { memo, FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LayoutAuth: FC<Props> = ({ children }) => {
  return (
    <>
      <div className='max-w-screen-lg mx-auto'>{children}</div>
    </>
  );
};

export default memo(LayoutAuth);
