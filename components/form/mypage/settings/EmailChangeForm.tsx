import { memo, VFC } from 'react';

import { useChangeEmail } from '@/hooks/useChangeEmail';

import SubmitButton from '@/components/elements/button/SubmitButton';
import ErrorMessage from '@/components/elements/error/ErrorMessage';
import InputField from '@/components/elements/field/InputField';
import FormWrapper from '@/components/form/common/Wrapper';

const EmailChangeForm: VFC = () => {
  const { errorMessage, handleSubmit, fieldValues, errors } = useChangeEmail();

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

        <SubmitButton className='mt-2' color='primary' value='Change Email' />
      </form>
    </FormWrapper>
  );
};

export default memo(EmailChangeForm);
