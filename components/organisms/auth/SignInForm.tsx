import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '@/components/atoms/loading/Loading';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import Label from '@/components/atoms/input/Label';
import NextAuthButton from '@/components/atoms/button/NextAuthButton';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { useSignIn } from '@/hooks/useSignIn';
import Link from 'next/link';

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
      <div className='hero min-h-screen'>
        <div className='hero-content flex-col'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold'>Sign In</h1>
          </div>
          <div className='card flex-shrink-0 md:max-w-screen-md md:w-screen w-full shadow-2xl bg-base-100'>
            <form
              className='card-body'
              method='post'
              action='/api/auth/callback/credentials'
              onSubmit={handleSubmit(signInByEmailAndPassword)}
            >
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  {...register('email', {
                    required: true,
                  })}
                  id='email'
                  type='email'
                  placeholder='email'
                  className='input input-bordered'
                />
              </div>
              {errors.email && (
                <ErrorMessage
                  errorMessage='Please Enter.'
                  className='text-center font-normal'
                />
              )}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  {...register('password', {
                    required: true,
                    minLength: 8,
                    maxLength: 12,
                  })}
                  id='password'
                  type='password'
                  placeholder='password'
                  className='input input-bordered'
                />
                {errors.password && (
                  <ErrorMessage
                    errorMessage='Please enter 8 to 12 characters'
                    className='text-center font-normal'
                  />
                )}
                <label className='label'>
                  <Link href='/auth/password'>
                    <a className='label-text-alt link link-hover'>
                      Forgot password?
                    </a>
                  </Link>
                </label>
              </div>
              <div className='form-control mt-6'>
                <input
                  className='btn btn-primary'
                  type='submit'
                  value='Sign In'
                />
              </div>
            </form>
            <ErrorMessage
              errorMessage={errorMessage}
              className='my-4 text-center'
              testId='errorMessage'
            />
          </div>
          <div className='my-4'>
            <p className='text-sm text-gray-400'>
              Do you have an account yet?
              <Link href='/auth/signup'>
                <a className='underline'>Sign Up</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(SignInForm);
