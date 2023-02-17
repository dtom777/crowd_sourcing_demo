import { memo, VFC } from 'react';

import { useChangeEmail } from '@/hooks/useChangeEmail';

import ErrorMessage from '@/components/elements/error/ErrorMessage';
import InputField from '@/components/elements/field/InputField';
import FormWrapper from '@/components/form/common/Wrapper';

const EmailChangeForm: VFC = () => {
  const { loading, errorMessage, handleSubmit, fieldValues, errors } =
    useChangeEmail();

  return (
    <FormWrapper title='Change Email'>
      <form className='card-body' onSubmit={handleSubmit}>
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

        <ErrorMessage
          errorMessage={errorMessage}
          className='text-center'
          testId='errorMessage'
        />
        <div className='form-control mt-2'>
          <input
            className='btn btn-primary'
            type='submit'
            value='Change Email'
          />
        </div>
      </form>
    </FormWrapper>
  );
};

export default memo(EmailChangeForm);
