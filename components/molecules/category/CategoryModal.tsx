import { useState, useEffect, memo, VFC } from 'react';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import BaseIcon from '@/components/atoms/icon/BaseIcon';
import ActiveLink from '@/components/atoms/link/ActiveLink';
import styles from './CategoryModal.module.css';
import { categories } from 'constants/category';

const CategoryModal: VFC = () => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const handleClick = (e): void => {
      if (e.target.closest('.popUp')) {
        if (show) {
          setShow(false);
        } else {
          setShow(true);
        }
      } else {
        setShow(false);
      }
    };
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [show]);

  return (
    <>
      <div className='popUp lg:hidden md:w-1/6 w-2/6 relative flex items-center justify-center text-gray-500'>
        <button onClick={() => setShow(!show)}>
          カテゴリ一覧
          <span>
            <BaseIcon icon={faAngleDoubleDown} className='ml-1 text-sm' />
          </span>
        </button>
        {show && (
          <div className='absolute top-12 right-0 flex justify-center items-center mr-2 z-20'>
            <div className='w-72 flex flex-wrap z-10 bg-white shadow-2xl rounded-xl p-2'>
              {categories.map((category) => (
                <div className='w-1/2' key={category.name}>
                  <ActiveLink
                    href={category.link}
                    activeClassName='flex justify-center items-center py-2 border-b-2 border-black text-black font-bold'
                  >
                    <a className={styles.nav}>{category.name}</a>
                  </ActiveLink>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(CategoryModal);
