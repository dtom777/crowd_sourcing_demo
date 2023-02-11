import { useForm } from 'react-hook-form';
import { memo, VFC } from 'react';
import Loading from '@/components/atoms/loading/Loading';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import Label from '@/components/atoms/input/Label';
import SubmitButton from '@/components/atoms/button/SubmitButton';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { usePasswordChange } from '@/hooks/usePasswordChange';

const PasswordChangeForm: VFC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, errorMessage, changePassword } = usePasswordChange();

  return (
    <>
      <Loading loading={loading} />
      <div className='md:w-96 text-center md:mx-auto my-12'>
        <h1 className='mb-6 font-bold text-xl'>
          ユーザーIDの確認・パスワードの再設定
        </h1>
        <form
          method='post'
          action='/api/auth/callback/credentials'
          onSubmit={handleSubmit(changePassword)}
        >
          <Label htmlFor='password' className='md:ml-0 ml-6 text-left mt-4'>
            パスワード
          </Label>
          <input
            {...register('password', {
              required: true,
              minLength: 8,
              maxLength: 12,
            })}
            type='password'
            placeholder='***********'
            className={`md:w-96 w-11/12 ${defaultInputStyle}`}
          />
          {errors.password && (
            <ErrorMessage
              errorMessage='8〜12文字で入力してください。'
              className='text-center font-normal'
            />
          )}
          <Label htmlFor='confirmationPassword' className='text-left my-2'>
            確認のため、もう一度入力してください。
          </Label>
          <input
            {...register('confirmationPassword', {
              required: true,
              minLength: 8,
              maxLength: 12,
            })}
            type='password'
            placeholder='***********'
            className={`md:w-96 w-11/12 ${defaultInputStyle}`}
          />
          {errors.confirmationPassword && (
            <ErrorMessage
              errorMessage='8〜12文字で入力してください。'
              className='text-center font-normal'
            />
          )}
          <SubmitButton className='w-60 font-semibold mt-4 px-4 py-3 md:text-base text-sm rounded-3xl'>
            パスワードを再設定する
          </SubmitButton>
        </form>
        <ErrorMessage errorMessage={errorMessage} className='my-4' />
      </div>
    </>
  );
};

export default memo(PasswordChangeForm);
