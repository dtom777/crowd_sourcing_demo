import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Label from '@/components/atoms/input/Label';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import SubmitButton from '@/components/atoms/button/SubmitButton';
import Loading from '@/components/atoms/loading/Loading';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { useApplicationPost } from '@/hooks/useApplicationPost';

type Props = {
  user: {
    name?: string;
    email?: string;
  };
  post: { id: string };
};

const ApplicationForm: VFC<Props> = ({ user, post }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, sendMail } = useApplicationPost(user, post);

  return (
    <>
      <Loading loading={loading} />
      <form
        onSubmit={handleSubmit(sendMail)}
        className='flex flex-col px-8 pt-6 pb-8 bg-white rounded'
      >
        <div className='mb-4'>
          <Label className='mb-2'>メッセージ</Label>
          <textarea
            {...register('message', {
              required: true,
              maxLength: 1000,
            })}
            className={`w-full mb-3 ${defaultInputStyle}`}
            rows={6}
            placeholder='例:興味あります。よければメッセージお待ちしています!'
          />
          {errors.message && (
            <ErrorMessage errorMessage='1〜1000文字で入力してください。' />
          )}
        </div>
        <div className='flex justify-center items-center'>
          <SubmitButton
            className='font-bold py-2 px-12 focus:outline-none focus:shadow-outline rounded-md'
            growEffect={true}
            shineEffect={true}
          >
            応募する
          </SubmitButton>
        </div>
        <p className='text-gray-500 mt-4 text-sm md:text-base'>
          応募状況は他ユーザーには公開されません。
        </p>
      </form>
    </>
  );
};

export default memo(ApplicationForm);
