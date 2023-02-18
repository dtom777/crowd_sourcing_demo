import { memo, VFC } from 'react';

import { useResetPassword } from '@/hooks/useResetPassword';

import SubmitButton from '@/components/elements/button/SubmitButton';
import ErrorMessage from '@/components/elements/error/ErrorMessage';
import InputField from '@/components/elements/field/InputField';

const PasswordResetForm: VFC = () => {
  const { errorMessage, handleSubmit, fieldValues, errors } =
    useResetPassword();

  return (
    <>
      <div className='my-12 md:mx-auto md:w-96'>
        <h2 className='text-center text-2xl font-bold'>
          Forgot your password?
        </h2>
        <div className='my-6 text-center text-gray-500'>
          <p>Enter your registered email</p>
          <p>A password reset message will send to your email</p>
        </div>
        <form onSubmit={handleSubmit}>
          <InputField
            {...fieldValues.email}
            errors={errors.email}
            errorMessage='Please enter'
            label='Email'
            type='email'
            placeholder='email'
          />
          <ErrorMessage errorMessage={errorMessage} />

          <SubmitButton
            className='mt-2'
            color='primary'
            value='Sent Reset Mail'
          />
        </form>
      </div>
    </>
  );
};

export default memo(PasswordResetForm);
