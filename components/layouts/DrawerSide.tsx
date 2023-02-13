import { categories } from 'constants/category';
import { FC } from 'react';
import Link from 'next/link';
import SearchForm from '../elements/SearchForm';

const DrawerSide: FC = () => {
  return (
    <div className='drawer-side'>
      <label htmlFor='my-drawer-3' className='drawer-overlay'></label>
      <ul className='menu p-4 w-80 bg-base-100'>
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
