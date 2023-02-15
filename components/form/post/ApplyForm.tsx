import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';

import { useApplyPost } from '@/hooks/useApplyPost';

import ErrorMessage from '@/components/elements/error/ErrorMessage';
import Spinner from '@/components/elements/spinner/Spinner';

type Props = {
  post: { id: string };
};

const ApplyForm: VFC<Props> = ({ post }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, sendMail } = useApplyPost(post);

  return (
    <>
      <Spinner loading={loading} />
      <form
        onSubmit={handleSubmit(sendMail)}
        className='flex flex-col px-8 pb-8 bg-white rounded'
      >
        <div className='mb-4'>
          <label className='label'>
            <span className='label-text font-bold'>Message</span>
          </label>
          <textarea
            className='textarea textarea-bordered w-full mb-3'
            rows={6}
            {...register('message', {
              required: true,
              maxLength: 1000,
            })}
            placeholder='message'
          ></textarea>
          {errors.message && (
            <ErrorMessage errorMessage='1〜1000文字で入力してください。' />
          )}
        </div>
        <div className='flex justify-center items-center'>
          <button className='btn btn-primary'>Send Message</button>
        </div>
      </form>
    </>
  );
};

export default memo(ApplyForm);
