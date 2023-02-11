import { faSearch } from '@fortawesome/free-solid-svg-icons';
import BaseIcon from '@/components/atoms/icon/BaseIcon';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import styles from './SearchLink.module.css';
import { memo, VFC } from 'react';

const SearchLink: VFC = () => {
  return (
    <div
      className={`hidden w-full lg:flex items-center ml-8 text-gray-800 ${styles.shine}`}
    >
      <BaseLinkButton
        href={{ pathname: '/category', query: { rewardFree: true } }}
      >
        <BaseIcon icon={faSearch} className='mr-1' />
        <span>仕事をさがす</span>
      </BaseLinkButton>
    </div>
  );
};

export default memo(SearchLink);
