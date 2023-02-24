import { memo, VFC } from 'react';

import { useSendEmail } from '@/hooks/useSendEmail';

import SubmitButton from '@/components/elements/button/SubmitButton';
import ErrorMessage from '@/components/elements/error/ErrorMessage';
import InputField from '@/components/elements/field/InputField';
import FormWrapper from '@/components/form/common/Wrapper';

const EmailSendForm: VFC = () => {
  const { errorMessage, handleSubmit, fieldValues, errors, currentEmail } =
    useSendEmail();

  return (
    <FormWrapper title='Change Email'>
      <form className='card-body' onSubmit={handleSubmit}>
        <InputField
          label='Current Email'
          type='email'
          defaultValue={currentEmail}
          disabled
        />

        <InputField
          {...fieldValues.changingEmail}
          errors={errors.changingEmail}
          label='Email after change'
          type='email'
          placeholder='email'
        />

        <InputField
          {...fieldValues.confirmationChangingEmail}
          errors={errors.confirmationChangingEmail}
          label='Please enter again to confirm'
          type='email'
          placeholder='email'
        />

        <SubmitButton
          className='mt-6'
          color='primary'
          value='Send confirmation email'
        />
      </form>
      <ErrorMessage
        errorMessage={errorMessage}
        className='my-4 text-center'
        testId='errorMessage'
      />
    </FormWrapper>
  );
};

export default memo(EmailSendForm);
