import { memo, VFC } from 'react';

import { useResetPassword } from '@/hooks/useResetPassword';

import ErrorMessage from '@/components/elements/error/ErrorMessage';
import InputField from '@/components/elements/field/InputField';
import Spinner from '@/components/elements/spinner/Spinner';

const PasswordResetForm: VFC = () => {
  const { loading, errorMessage, handleSubmit, fieldValues, errors } =
    useResetPassword();

  return (
    <>
      <Spinner loading={loading} />
      <div className='md:w-96 md:mx-auto my-12'>
        <h2 className='font-bold text-2xl text-center'>
          Forgot your password?
        </h2>
        <div className='text-gray-500 my-6 text-center'>
          <p>Enter your registered email</p>
          <p>A password reset message will send to your email</p>
        </div>
        <form method='post' onSubmit={handleSubmit}>
          <InputField
            {...fieldValues.email}
            errors={errors.email}
            errorMessage='Please enter'
            label='Email'
            type='email'
            placeholder='email'
          />
          <ErrorMessage errorMessage={errorMessage} />
          <div className='form-control mt-2'>
            <input
              className='btn btn-primary'
              type='submit'
              value='Sent Reset Mail'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(PasswordResetForm);
