import Link from 'next/link';
import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';

import { useSignUp } from '@/hooks/useSignUp';

import ErrorMessage from '@/components/elements/error/ErrorMessage';
import Spinner from '@/components/elements/spinner/Spinner';
import Avatar from '@/components/elements/avatar/Avatar';

import { avatars } from 'constants/auth';

const SignUpForm: VFC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { image, loading, errorMessage, updateImage, submitData } = useSignUp();

  return (
    <>
      <Spinner loading={loading} />
      <div className='hero min-h-screen'>
        <div className='hero-content flex-col'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold'>Sign Up</h1>
          </div>
          <div className='card flex-shrink-0 md:max-w-screen-md md:w-screen w-full shadow-2xl bg-base-100'>
            <form
              className='card-body'
              method='post'
              action='/api/auth/callback/credentials'
              onSubmit={handleSubmit(submitData)}
            >
              <Avatar
                src={image}
                size={120}
                className='w-24 ring ring-primary ring-offset-base-100 ring-offset-2'
              />
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Avatar</span>
                </label>
                <select
                  className='select select-bordered w-full max-w-xs'
                  {...register('image', {
                    required: true,
                  })}
                  onChange={updateImage}
                >
                  <option value='/avatar-default.png'>Please select</option>
                  {avatars.map((avatar) => (
                    <option key={avatar.id} value={avatar.url}>
                      {avatar.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  {...register('name', {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                  })}
                  type='text'
                  className='input input-bordered'
                  placeholder='name'
                />
                {errors.name && (
                  <ErrorMessage errorMessage='Please enter 2 to 20 characters' />
                )}
              </div>
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
              <Link href='/auth/signin'>
                <a className='underline'>Sign In</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(SignUpForm);
