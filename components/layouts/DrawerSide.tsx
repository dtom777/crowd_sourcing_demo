import Link from 'next/link';
import { FC } from 'react';

import { categories } from 'constants/category';

import SearchForm from '../form/search/Form';

const DrawerSide: FC = () => {
  return (
    <div className='drawer-side'>
      <label htmlFor='my-drawer-3' className='drawer-overlay'></label>
      <ul className='menu w-80 bg-base-100 p-4'>
        <li className='md:hidden'>
          <SearchForm />
        </li>
        {categories.map(({ slug, link }) => (
          <li key={slug}>
            <Link href={link}>
              <a>{slug.toUpperCase()}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrawerSide;
