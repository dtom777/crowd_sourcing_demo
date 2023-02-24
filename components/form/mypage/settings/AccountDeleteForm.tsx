import { useSettings } from '@/hooks/useSettings';

import SubmitButton from '@/components/elements/button/SubmitButton';
import ErrorMessage from '@/components/elements/error/ErrorMessage';
import InputField from '@/components/elements/field/InputField';

const AccountDeleteForm = () => {
  const { errorMessage, handleSubmit, fieldValues, errors } = useSettings();

  return (
    <>
      <input type='checkbox' id='my-modal-4' className='modal-toggle' />
      <label htmlFor='my-modal-4' className='modal cursor-pointer'>
        <label className='modal-box relative' htmlFor=''>
          <h3 className='text-center text-lg font-bold'>Delete account</h3>
          <p className='py-4 text-center'>Enter your email and password</p>
          <form onSubmit={handleSubmit}>
            <InputField
              {...fieldValues.email}
              errors={errors.email}
              label='Email'
              type='email'
              placeholder='Type here'
            />

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

            <ErrorMessage errorMessage={errorMessage} className='text-center' />

            <SubmitButton
              className='mt-2 items-center'
              color='error'
              value='Delete'
            />
          </form>
        </label>
      </label>
    </>
  );
};

export default AccountDeleteForm;
