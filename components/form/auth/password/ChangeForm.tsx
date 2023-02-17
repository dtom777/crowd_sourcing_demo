import { memo, VFC } from 'react';

import { useChangePassword } from '@/hooks/useChangePassword';

import ErrorMessage from '@/components/elements/error/ErrorMessage';
import InputField from '@/components/elements/field/InputField';

const PasswordChangeForm: VFC = () => {
  const { loading, errorMessage, handleSubmit, fieldValues, errors } =
    useChangePassword();

  return (
    <>
      <div className='md:w-96 text-center md:mx-auto my-12'>
        <h1 className='mb-6 font-bold text-2xl'>Reset password</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            {...fieldValues.password}
            errorMessage='Please enter 8 to 12 characters'
            errors={errors.password}
            label='Password'
            type='password'
            placeholder='***********'
          />

          <InputField
            {...fieldValues.confirmationPassword}
            errorMessage='Please enter 8 to 12 characters'
            errors={errors.confirmationPassword}
            label='Confirmation Password'
            type='password'
            placeholder='***********'
          />
          <ErrorMessage errorMessage={errorMessage} className='mt-2' />
          <div className='form-control mt-2'>
            <input
              className='btn btn-primary'
              type='submit'
              value='Reset Password'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(PasswordChangeForm);
