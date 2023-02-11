import Header from '@/components/organisms/layout/Header';
import Footer from '@/components/organisms/layout/Footer';
import TransitionLoading from '@/components/atoms/loading/TransitionLoading';
import { memo, FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <TransitionLoading />
      <div className='max-w-screen-lg mx-auto'>{children}</div>
      <Footer />
    </>
  );
};

export default memo(Layout);
