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
        <h2 className='font-bold text-2xl'>Forgot your password?</h2>
        <div className='text-gray-500 my-6'>
          <p>Enter your registered email</p>
          <p>A password reset message will send to your email</p>
        </div>
        <form
          method='post'
          action='/api/auth/callback/credentials'
          onSubmit={handleSubmit(resetPassword)}
        >
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              {...register('email', { required: true })}
              type='email'
              placeholder='email'
              className='input input-bordered w-full'
            />
          </div>
          {errors.email && (
            <ErrorMessage
              errorMessage='入力してください。'
              className='text-center font-normal'
            />
          )}
          <div className='form-control mt-6'>
            <input
              className='btn btn-primary'
              type='submit'
              value='Sent Reset Mail'
            />
          </div>
        </form>
        <ErrorMessage errorMessage={errorMessage} className='my-4' />
      </div>
    </>
  );
};

export default memo(PasswordResetForm);
