import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Label from '@/components/atoms/input/Label';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import SubmitButton from '@/components/atoms/button/SubmitButton';
import Loading from '@/components/atoms/loading/Loading';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { useApplyPost } from '@/hooks/useApplyPost';

type Props = {
  post: { id: string };
};

const ApplicationForm: VFC<Props> = ({ post }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, sendMail } = useApplyPost(post);

  return (
    <>
      <Loading loading={loading} />
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

export default memo(ApplicationForm);
