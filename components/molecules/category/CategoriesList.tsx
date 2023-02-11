import ActiveLink from '@/components/atoms/link/ActiveLink';
import styles from './CategoriesList.module.css';
import { memo, VFC } from 'react';
import { categoriesLinkList } from 'constants/categoriesList';

const CategoriesList: VFC = () => {
  return (
    <>
      <div className='hidden w-full relative lg:flex items-center justify-center py-2 bg-gray-50 text-gray-500 text-sm'>
        {categoriesLinkList.map((category) => (
          <ActiveLink
            href={category.link}
            activeClassName='w-1/2 flex justify-center items-center mx-1 py-2 border-b-2 border-black text-black font-bold'
            key={category.name}
          >
            <a className={styles.nav}>{category.name}</a>
          </ActiveLink>
        ))}
      </div>
    </>
  );
};

export default memo(CategoriesList);
