import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import BaseIcon from '@/components/atoms/icon/BaseIcon';
import styles from './SearchInput.module.css';
import { memo, VFC } from 'react';

const SearchInput: VFC = () => {
  const { register, handleSubmit } = useForm();

  const searchPosts = async (data: { query: string }): Promise<void> => {
    Router.push({
      pathname: '/search',
      query: { ...data },
    });
  };

  return (
    <div className='md:w-5/6 w-4/6 flex items-center'>
      <form
        onSubmit={handleSubmit(searchPosts)}
        className='w-full relative flex items-center'
      >
        <span className='absolute left-2 bg-gray-200'>
          <BaseIcon icon={faSearch} className='text-gray-400 ml-2' />
        </span>
        <input
          {...register('query')}
          type='search'
          className={`w-full h-8 pl-10 pr-1 bg-gray-200 border rounded-md focus:outline-none ${styles.search}`}
          placeholder='募集をさがす'
        />
      </form>
    </div>
  );
};

export default memo(SearchInput);
