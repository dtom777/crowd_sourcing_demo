import { useForm } from 'react-hook-form';
import { memo, VFC } from 'react';
import SubmitButton from '@/components/atoms/button/SubmitButton';
import { useSearchMyPage } from '@/hooks/useSearchMyPage';

const SearchFormMyPage: VFC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { query, published, draft, end, errorMessage, searchPosts } =
    useSearchMyPage();

  return (
    <>
      <div className='h-96 bg-gray-50 lg:mt-6 lg:top-0 lg:sticky md:text-base text-sm'>
        <form onSubmit={handleSubmit(searchPosts)} className='p-6'>
          <h2 className='text-lg font-extrabold mb-6'>絞り込み</h2>
          <div className='mb-6'>
            <label htmlFor='query' className='block font-extrabold'>
              検索ワード
            </label>
            <input
              {...register('query')}
              defaultValue={query}
              type='search'
              placeholder='キーワードを入力してください'
              className='w-full max-w-full h-11 py-2 px-4 bg-white border border-gray-600 rounded leading-loose md:text-sm text-xs'
            />
          </div>
          <div className='mb-6'>
            <h3 className='font-extrabold'>募集状況</h3>
            <div className='flex mt-3 mb-6'>
              <label className='ml-6 mt-4'>
                <input
                  type='checkbox'
                  {...register('published')}
                  defaultChecked={published == 'true' ? true : false}
                />
                <span className='ml-1'>募集中</span>
              </label>
              <label className='ml-6 mt-4'>
                <input
                  type='checkbox'
                  {...register('draft')}
                  defaultChecked={draft == 'true' ? true : false}
                />
                <span className='ml-1'>下書き</span>
              </label>
              <label className='ml-6 mt-4'>
                <input
                  type='checkbox'
                  {...register('end')}
                  defaultChecked={end == 'true' ? true : false}
                />
                <span className='ml-1'>終了</span>
              </label>
            </div>
            {errorMessage && (
              <p className='text-red-600 text-center mb-2'>
                １つ以上は選択してください
              </p>
            )}
            <div className='py-2 text-center'>
              <SubmitButton className='h-10 w-44 py-2 px-4 rounded-3xl'>
                検索する
              </SubmitButton>
              <button
                type='button'
                onClick={() =>
                  reset({
                    query: '',
                    published: true,
                    draft: true,
                    end: true,
                  })
                }
                className='h-10 w-44 mt-4 py-2 px-4 text-gray-900 bg-white border border-gray-900 rounded-3xl hover:opacity-50'
              >
                条件をリセット
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(SearchFormMyPage);
