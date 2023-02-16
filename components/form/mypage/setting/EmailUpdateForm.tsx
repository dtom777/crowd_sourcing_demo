import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateEmail } from '@/hooks/useUpdateEmail';

import ErrorMessage from '@/components/elements/error/ErrorMessage';
import Spinner from '@/components/elements/spinner/Spinner';

const EmailUpdateForm: VFC = () => {
  const { loading, errorMessage, changeEmail } = useUpdateEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Spinner loading={loading} />
      <div className='hero min-h-screen'>
        <div className='hero-content flex-col'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold'>Change Email</h1>
          </div>
          <div className='card flex-shrink-0 md:max-w-screen-md md:w-screen w-full shadow-2xl bg-base-100'>
            <form
              className='card-body'
              method='post'
              action='/api/auth/callback/credentials'
              onSubmit={handleSubmit(changeEmail)}
            >
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  {...register('password', {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                  })}
                  type='password'
                  placeholder='***********'
                  className='input input-bordered'
                />
              </div>
              {errors.password && (
                <ErrorMessage errorMessage='Please enter 8 to 12 characters' />
              )}

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>
                    Please enter again to confirm
                  </span>
                </label>
                <input
                  {...register('confirmationPassword', {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                  })}
                  type='password'
                  placeholder='***********'
                  className='input input-bordered'
                />
              </div>
              {errors.confirmationPassword && (
                <ErrorMessage errorMessage='Please enter 8 to 12 characters' />
              )}

              <div className='form-control mt-6'>
                <input
                  className='btn btn-primary'
                  type='submit'
                  value='Change Email'
                />
              </div>
            </form>
            <ErrorMessage
              errorMessage={errorMessage}
              className='my-4 text-center'
              testId='errorMessage'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(EmailUpdateForm);
