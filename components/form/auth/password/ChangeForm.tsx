import { memo, VFC } from 'react';

import { useChangePassword } from '@/hooks/useChangePassword';

import SubmitButton from '@/components/elements/button/SubmitButton';
import ErrorMessage from '@/components/elements/error/ErrorMessage';
import InputField from '@/components/elements/field/InputField';

const PasswordChangeForm: VFC = () => {
  const { errorMessage, handleSubmit, fieldValues, errors } =
    useChangePassword();

  return (
    <>
      <div className='my-12 text-center md:mx-auto md:w-96'>
        <h1 className='mb-6 text-2xl font-bold'>Reset password</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            {...fieldValues.password}
            errors={errors.password}
            label='Password'
            type='password'
            placeholder='***********'
          />

          <InputField
            {...fieldValues.confirmationPassword}
            errors={errors.confirmationPassword}
            label='Confirmation Password'
            type='password'
            placeholder='***********'
          />
          <ErrorMessage errorMessage={errorMessage} className='mt-2' />

          <SubmitButton
            className='mt-2'
            color='primary'
            value='Reset Password'
          />
        </form>
      </div>
    </>
  );
};

export default memo(PasswordChangeForm);
