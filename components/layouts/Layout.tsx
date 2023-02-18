import { FC, memo, ReactNode } from 'react';

import DrawerSide from '@/components/layouts/DrawerSide';
import Navbar from '@/components/layouts/Navbar';

import Footer from './Footer';
import Head from '../head/Head';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head />
      <div className='drawer'>
        <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col'>
          <Navbar />
          <div className='mx-auto min-h-fit max-w-screen-lg md:min-h-full'>
            {children}
          </div>
          <Footer />
        </div>
        <DrawerSide />
      </div>
    </>
  );
};

export default memo(Layout);
