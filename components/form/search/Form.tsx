import { useRouter } from 'next/router';
import { VFC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  query?: string;
};

const SearchForm: VFC = () => {
  const router = useRouter();
  const { query }: Inputs = router.query;

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { query },
  });

  const searchPosts: SubmitHandler<Inputs> = async (data) => {
    router.push({
      pathname: '/search',
      query: { ...data },
    });
  };

  return (
    <form className='form-control' onSubmit={handleSubmit(searchPosts)}>
      <div className='input-group'>
        <input
          {...register('query')}
          type='search'
          placeholder='Search…'
          className='input-bordered input'
        />
        <button className='btn-square btn' type='submit'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
