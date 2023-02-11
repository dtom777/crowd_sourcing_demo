import { useForm } from 'react-hook-form';
import { memo, VFC } from 'react';
import Loading from '@/components/atoms/loading/Loading';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import Label from '@/components/atoms/input/Label';
import SubmitButton from '@/components/atoms/button/SubmitButton';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { usePasswordReset } from '@/hooks/usePasswordReset';

const PasswordResetForm: VFC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, errorMessage, resetPassword } = usePasswordReset();

  return (
    <>
      <Loading loading={loading} />
      <div className='md:w-96 text-center md:mx-auto my-12'>
        <h2 className='font-bold text-xl'>パスワードをお忘れですか？</h2>
        <div className='text-sm text-gray-500 my-6'>
          <p>登録済みのメールアドレスを入力してください。</p>
          <p>パスワードリセット用のリンクをメールで送信します。</p>
        </div>
        <form
          method='post'
          action='/api/auth/callback/credentials'
          onSubmit={handleSubmit(resetPassword)}
        >
          <Label htmlFor='email' className='md:ml-0 ml-6 text-left'>
            メールアドレス
          </Label>
          <input
            {...register('email', { required: true })}
            type='email'
            placeholder='tunoru@tunoru.me'
            className={`md:w-96 w-11/12 ${defaultInputStyle}`}
          />
          {errors.email && (
            <ErrorMessage
              errorMessage='入力してください。'
              className='text-center font-normal'
            />
          )}
          <SubmitButton className='w-60 font-semibold mt-4 px-4 py-3 md:text-base text-sm rounded-3xl'>
            リセットメールを送信する
          </SubmitButton>
        </form>
        <ErrorMessage errorMessage={errorMessage} className='my-4' />
      </div>
    </>
  );
};

export default memo(PasswordResetForm);
