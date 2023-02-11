import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '@/components/atoms/loading/Loading';
import Label from '@/components/atoms/input/Label';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import SubmitButton from '@/components/atoms/button/SubmitButton';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { Session } from 'next-auth';
import { CommentWithUserAndPost } from 'types/comment.type';
import { useExchangeRecruitment } from '@/hooks/useExchangeRecruitment';

type Props = {
  session: Session;
  comment: CommentWithUserAndPost;
};

const ExchangeRecruitmentForm: VFC<Props> = ({ session, comment }) => {
  const { post, user } = comment;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, sendMail } = useExchangeRecruitment(session, post, user);

  return (
    <>
      <Loading loading={loading} />
      <form
        onSubmit={handleSubmit(sendMail)}
        className='flex flex-col px-8 pt-6 pb-8 bg-white rounded'
      >
        <div className='mb-4'>
          <Label htmlFor='message' className='mb-2'>
            メッセージ
          </Label>
          <textarea
            {...register('message', {
              required: true,
              maxLength: 1000,
            })}
            placeholder='例:応募いただきありがとうございます。'
            rows={6}
            className={`w-full ${defaultInputStyle}`}
          />
          {errors.message && (
            <ErrorMessage errorMessage='1〜1000文字で入力してください' />
          )}
        </div>
        <div className='flex justify-center items-center'>
          <SubmitButton className='font-bold py-2 px-12 rounded-3xl'>
            送信する
          </SubmitButton>
        </div>
      </form>
    </>
  );
};

export default memo(ExchangeRecruitmentForm);
