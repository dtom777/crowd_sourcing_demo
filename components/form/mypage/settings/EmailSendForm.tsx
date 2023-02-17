import { memo, VFC } from 'react';

import { useSendEmail } from '@/hooks/useSendEmail';

import ErrorMessage from '@/components/elements/error/ErrorMessage';
import InputField from '@/components/elements/field/InputField';
import FormWrapper from '@/components/form/common/Wrapper';

const EmailSendForm: VFC = () => {
  const {
    loading,
    errorMessage,
    handleSubmit,
    fieldValues,
    errors,
    currentEmail,
  } = useSendEmail();

  return (
    <FormWrapper title='Change Email'>
      <form className='card-body' onSubmit={handleSubmit}>
        <InputField
          errorMessage=''
          label='Current Email'
          type='email'
          defaultValue={currentEmail}
          disabled
        />

        <InputField
          {...fieldValues.changingEmail}
          errorMessage='Please enter'
          errors={errors.changingEmail}
          label='Email after change'
          type='email'
          placeholder='email'
        />

        <InputField
          {...fieldValues.confirmationChangingEmail}
          errorMessage='Please enter'
          errors={errors.confirmationChangingEmail}
          label='Please enter again to confirm'
          type='email'
          placeholder='email'
        />

        <div className='form-control mt-6'>
          <input
            className='btn btn-primary'
            type='submit'
            value='Send confirmation email'
          />
        </div>
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
