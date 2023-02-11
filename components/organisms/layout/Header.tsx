import Link from 'next/link';
import CategoriesList from '@/components/molecules/category/CategoriesList';
import CategoryModal from '@/components/molecules/category/CategoryModal';
import SearchLink from '@/components/molecules/search/SearchLink';
import SearchInput from '@/components/molecules/search/SearchInput';
import HeaderMenu from '@/components/molecules/layout/HeaderMenu';
import { memo, VFC } from 'react';

const Header: VFC = () => {
  return (
    <>
      <div className='pt-4 bg-gray-50'>
        <div className='flex justify-between items-center max-w-screen-lg mx-auto'>
          <div className='flex items-center md:px-4 px-2'>
            <div className='md:text-2xl text-lg font-bold tracking-wide'>
              <Link href='/'>
                <a>Crowd Sourcing</a>
              </Link>
            </div>
          </div>
          <HeaderMenu />
        </div>
        <div className='max-w-screen-lg mx-auto'>
          <CategoriesList />
        </div>
        <div className='lg:hidden h-14 flex flex-wrap flex-row mt-2 ml-4'>
          <SearchInput />
          <CategoryModal />
        </div>
      </div>
    </>
  );
};

export default memo(Header);
