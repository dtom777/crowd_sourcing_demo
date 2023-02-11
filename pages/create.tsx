import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, GetSessionOptions } from 'next-auth/client';
import { useForm } from 'react-hook-form';
import Layout from '@/components/templates/Layout';
import Loading from '@/components/atoms/loading/Loading';
import BaseHead from '@/components/atoms/head/BaseHead';
import Label from '@/components/atoms/input/Label';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import styles from './create.module.css';
import { growEffect } from 'constants/growEffect';
import { categoriesList } from 'constants/categoriesList';
import { useCreatePost } from '@/hooks/useCreatePost';

type Props = {
  session: Session;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetSessionOptions
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    };
  }

  return {
    props: { session },
  };
};

const PostCreatePage: NextPage<Props> = ({ session }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { radio, loading, handleRadio, updateSubmitValue, submitData } =
    useCreatePost(session);

  return (
    <Layout>
      <BaseHead />
      <Loading loading={loading} />
      <form
        onSubmit={handleSubmit(submitData)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8'
      >
        <div className='mb-4'>
          <Label htmlFor='title' className='mb-2'>
            募集タイトル(必須)
          </Label>
          <input
            {...register('title', {
              required: true,
            })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='今日はなにを募る？'
          />
          {errors.title && <ErrorMessage errorMessage='入力してください' />}
        </div>
        <div className='mb-4'>
          <Label htmlFor='content' className='mb-2'>
            募集内容詳細(必須)
          </Label>
          <textarea
            {...register('content', {
              required: true,
              maxLength: 255,
            })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            rows={6}
            id='content'
            placeholder='募集内容を書いてね!'
          />
          {errors.content && (
            <ErrorMessage errorMessage='1〜255文字で入力してください。' />
          )}
        </div>
        <div className='mb-4'>
          <Label htmlFor='categoryId' className='mb-2'>
            カテゴリ(必須)
          </Label>
          <select
            {...register('categoryId', {
              required: true,
            })}
            className='shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline'
          >
            <option value=''>選択してください</option>
            {categoriesList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <ErrorMessage errorMessage='選択してください。' />
          )}
        </div>
        <div className='mb-4'>
          <Label htmlFor='tags' className='mb-2'>
            ハッシュタグ(任意)
          </Label>
          <input
            {...register('tags')}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='ハッシュタグを追加する'
          />
        </div>
        <div className='mb-4'>
          <Label htmlFor='reward' className='mb-2'>
            報酬金額
          </Label>
          <div>
            <input
              {...register('reward', { required: true })}
              defaultChecked
              value='free'
              type='radio'
              className='align-middle'
              onClick={() => handleRadio('free')}
            />
            <label className='text-gray-700 text-sm ml-1'>無料</label>
          </div>
          <div>
            <input
              name='reward'
              type='radio'
              className='align-middle'
              onClick={() => handleRadio('paid')}
            />
            <label htmlFor='reward' className='text-gray-700 text-sm ml-1'>
              報酬あり
            </label>
            <input
              {...register('reward', { required: true })}
              disabled={!radio}
              type='number'
              placeholder='0'
              className='text-right shadow appearance-none border rounded ml-1 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
            />
            <span className='ml-1'>円</span>
            {errors.reward && (
              <ErrorMessage errorMessage='選択してください。' />
            )}
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            className={`justify-center items-center hover:opacity-50 text-white focus:outline-none focus:shadow-outline bg-blue-500 font-bold py-2 px-4 rounded ${growEffect} ${styles.shine}`}
            onClick={() => updateSubmitValue('publish')}
          >
            つのる
          </button>
          <button
            className={`justify-center items-center hover:opacity-50 focus:outline-none focus:shadow-outline bg-white font-bold border-2 border-blue-500 text-blue-500 py-2 px-4 ml-6 rounded ${growEffect} ${styles.shine}`}
            onClick={() => updateSubmitValue('draft')}
          >
            下書きを保存
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default PostCreatePage;
