import { FC, memo, ReactNode } from 'react';

import DrawerSide from '@/components/layouts/DrawerSide';
import Navbar from '@/components/layouts/Navbar';

import Footer from './Footer';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className='drawer'>
        <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col'>
          <Navbar />
          <div className='max-w-screen-lg mx-auto min-h-fit md:min-h-full'>
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
