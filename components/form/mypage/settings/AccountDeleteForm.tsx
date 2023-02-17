import { useSettings } from '@/hooks/useSettings';

import ErrorMessage from '@/components/elements/error/ErrorMessage';
import InputField from '@/components/elements/field/InputField';

const AccountDeleteForm = () => {
  const { loading, errorMessage, handleSubmit, fieldValues, errors } =
    useSettings();

  return (
    <>
      <input type='checkbox' id='my-modal-4' className='modal-toggle' />
      <label htmlFor='my-modal-4' className='modal cursor-pointer'>
        <label className='modal-box relative' htmlFor=''>
          <h3 className='text-lg font-bold text-center'>Delete account</h3>
          <p className='py-4 text-center'>Enter your email and password</p>
          <form onSubmit={handleSubmit}>
            <InputField
              {...fieldValues.email}
              errorMessage='Please enter'
              errors={errors.email}
              label='Email'
              type='email'
              placeholder='Type here'
            />

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

            <ErrorMessage errorMessage={errorMessage} className='text-center' />

            <div className='flex justify-center mt-2'>
              <input className='btn btn-error' type='submit' value='Delete' />
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default AccountDeleteForm;
