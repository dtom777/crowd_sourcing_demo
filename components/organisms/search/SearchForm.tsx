import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import SubmitButton from '@/components/atoms/button/SubmitButton';
import { memo, VFC } from 'react';
import { categories } from 'constants/category';

const SearchForm: VFC = () => {
  const router = useRouter();
  const { query } = router.query;

  const { register, handleSubmit, reset } = useForm();

  const searchPosts = async (data: { query: string }): Promise<void> => {
    router.push({
      pathname: '/search',
      query: { ...data },
    });
  };

  return (
    <div className='block mb-4'>
      <div className='bg-gray-50 lg:mt-6 lg:top-0 lg:sticky md:text-base text-sm'>
        <form onSubmit={handleSubmit(searchPosts)} className='p-6'>
          <h2 className='text-lg font-extrabold mb-6'>キーワード検索</h2>
          <div className='mb-6 flex'>
            <input
              {...register('query')}
              defaultValue={query}
              type='search'
              placeholder='キーワードを入力してください'
              className='w-10/12 max-w-full h-11 py-2 px-4 bg-white border border-gray-600 rounded-l-md leading-loose md:text-sm text-xs'
            />
            <input
              type='submit'
              value='検索する'
              className='bg-black text-white rounded-r-md w-2/12'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(SearchForm);
