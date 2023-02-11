import { Session } from 'next-auth';
import { PostWithTags } from 'types/post.type';
import { useForm } from 'react-hook-form';
import { memo, VFC } from 'react';
import Loading from '@/components/atoms/loading/Loading';
import Label from '@/components/atoms/input/Label';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import SubmitButton from '@/components/atoms/button/SubmitButton';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { categoriesList } from 'constants/categoriesList';
import { useEditPost } from '@/hooks/useEditPost';

type Props = {
  session: Session;
  post: PostWithTags;
};

const PostEditForm: VFC<Props> = ({ session, post }) => {
  const { title, content, categoryId, reward, rewardFree, tags } = post;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { radio, loading, handleRadio, submitData } = useEditPost(
    session,
    rewardFree
  );

  return (
    <>
      <Loading loading={loading} />
      <form
        onSubmit={handleSubmit(submitData)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8'
      >
        <div className='text-center my-6 font-extrabold md:text-3xl text-2xl'>
          <h2>募集内容の編集</h2>
        </div>
        <div className='mb-4'>
          <Label htmlFor='title' className='mb-2'>
            募集タイトル(必須)
          </Label>
          <input
            {...register('title', { required: true })}
            type='text'
            defaultValue={title}
            className={`w-full ${defaultInputStyle}`}
            placeholder='今日はなにを募る？'
          />
          {errors.title && <ErrorMessage errorMessage='入力してください。' />}
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
            id='content'
            rows={6}
            placeholder='募集内容を書いてね！'
            defaultValue={content}
            className={`w-full ${defaultInputStyle}`}
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
            defaultValue={categoryId}
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
            type='text'
            placeholder='ハッシュタグを追加する'
            defaultValue={tags.map((tag) => tag.tag.name).join(' ')}
            className='shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <Label className='mb-2'>報酬金額</Label>
          {/* このdivいる？ */}
          <div>
            <input
              {...register('reward')}
              defaultChecked={rewardFree}
              value='free'
              type='radio'
              className='align-middle'
              onClick={() => handleRadio('free')}
            />
            <label className='text-gray-700 text-sm ml-1'>無料</label>
          </div>
          <div>
            <input
              defaultChecked={!rewardFree}
              name='reward'
              type='radio'
              className='align-middle'
              onClick={() => handleRadio('paid')}
            />
            <label htmlFor='reward' className='text-gray-700 text-sm ml-1'>
              報酬あり
            </label>
            <input
              {...register('reward')}
              disabled={!radio}
              defaultValue={reward === null ? 0 : reward}
              type='number'
              placeholder={String(reward === null ? 0 : reward)}
              className='text-right shadow appearance-none border rounded ml-1 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
            />
            <span className='ml-1'>円</span>
          </div>
        </div>
        <div className='flex justify-center'>
          <SubmitButton
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            growEffect={true}
            shineEffect={true}
          >
            変更する
          </SubmitButton>
        </div>
      </form>
    </>
  );
};

export default memo(PostEditForm);
