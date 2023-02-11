import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '@/components/atoms/loading/Loading';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import Label from '@/components/atoms/input/Label';
import NextAuthButton from '@/components/atoms/button/NextAuthButton';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { useSignIn } from '@/hooks/useSignIn';

const SignInForm: VFC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, errorMessage, signInByEmailAndPassword } = useSignIn();

  return (
    <>
      <Loading loading={loading} />
      <div className='md:w-96 text-center md:mx-auto'>
        <h1 className='mt-12 mb-6 font-bold text-3xl' data-testid='login'>
          ログイン
        </h1>
        <form
          method='post'
          action='/api/auth/callback/credentials'
          onSubmit={handleSubmit(signInByEmailAndPassword)}
        >
          <Label htmlFor='email' className='md:ml-0 ml-6 text-left'>
            メールアドレス
          </Label>
          <input
            {...register('email', {
              required: true,
            })}
            id='email'
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
          <Label htmlFor='password' className='md:ml-0 ml-6 text-left mt-4'>
            パスワード
          </Label>
          <input
            {...register('password', {
              required: true,
              minLength: 8,
              maxLength: 12,
            })}
            id='password'
            type='password'
            placeholder='******'
            className={`md:w-96 w-11/12 ${defaultInputStyle}`}
          />
          {errors.password && (
            <ErrorMessage
              errorMessage='8〜12文字で入力してください。'
              className='text-center font-normal'
            />
          )}
          <NextAuthButton
            type='submit'
            className='bg-black mt-4 px-4 md:text-base text-sm w-60'
            testId='signInByEmailAndPassword'
          >
            メールアドレスでログイン
          </NextAuthButton>
        </form>
        <ErrorMessage
          errorMessage={errorMessage}
          className='my-4'
          testId='errorMessage'
        />
        <div className='my-4'>
          <p className='text-sm text-gray-400' data-testid='passwordRemainder'>
            ログインでお困りの時は
            <BaseLinkButton href='/auth/password' className='underline'>
              こちら
            </BaseLinkButton>
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(SignInForm);
