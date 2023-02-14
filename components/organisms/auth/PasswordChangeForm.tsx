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
        <h1 className='mb-6 font-bold text-2xl'>Reset password</h1>
        <form
          method='post'
          action='/api/auth/callback/credentials'
          onSubmit={handleSubmit(changePassword)}
        >
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
              <span className='label-text'>Confirmation password</span>
            </label>
            <input
              {...register('confirmationPassword', {
                required: true,
                minLength: 8,
                maxLength: 12,
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
              value='Reset Password'
            />
          </div>
        </form>
        <ErrorMessage errorMessage={errorMessage} className='my-4' />
      </div>
    </>
  );
};

export default memo(PasswordChangeForm);
