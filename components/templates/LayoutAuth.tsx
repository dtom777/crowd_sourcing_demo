import Header from '@/components/organisms/layout/Header';
import Footer from '@/components/organisms/layout/Footer';
import { memo, FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LayoutAuth: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className='max-w-screen-lg mx-auto'>{children}</div>
      <Footer />
    </>
  );
};

export default memo(LayoutAuth);
