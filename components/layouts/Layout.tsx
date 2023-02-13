import TransitionLoading from '@/components/atoms/loading/TransitionLoading';

import Link from 'next/link';
import CategoriesList from '@/components/molecules/category/CategoriesList';
import CategoryModal from '@/components/molecules/category/CategoryModal';
import SearchLink from '@/components/molecules/search/SearchLink';
import SearchInput from '@/components/molecules/search/SearchInput';
import HeaderMenu from '@/components/molecules/layout/HeaderMenu';
import { FC, memo, ReactNode } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layouts/Navbar';
import DrawerSide from '@/components/layouts/DrawerSide';
import Footer from './Footer';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <TransitionLoading />

      <div className='drawer'>
        <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col'>
          <Navbar />
          <div className='max-w-screen-lg mx-auto'>{children}</div>
          <Footer />
        </div>
        <DrawerSide />
      </div>
    </>
  );
};

export default memo(Layout);
