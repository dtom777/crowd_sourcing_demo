import Link from 'next/link';
import { memo, VFC } from 'react';

import { useSignIn } from '@/hooks/useSignIn';

import SubmitButton from '@/components/elements/button/SubmitButton';
import ErrorMessage from '@/components/elements/error/ErrorMessage';
import InputField from '@/components/elements/field/InputField';

import FormWrapper from '../common/Wrapper';

const SignInForm: VFC = () => {
  const { errorMessage, handleSubmit, fieldValues, errors } = useSignIn();

  return (
    <FormWrapper title='Sign In'>
      <form
        className='card-body'
        method='post'
        action='/api/auth/callback/credentials'
        onSubmit={handleSubmit}
      >
        <InputField
          {...fieldValues.email}
          errorMessage='Please Enter'
          errors={errors.email}
          label='Email'
          type='email'
          placeholder='email'
        />
        <InputField
          {...fieldValues.password}
          errorMessage='Please enter 8 to 12 characters'
          errors={errors.password}
          label='Password'
          id='password'
          type='password'
          placeholder='password'
        />
        <label className='label'>
          <Link href='/auth/password'>
            <a className='link-hover label-text-alt link'>Forgot password?</a>
          </Link>
        </label>
        <ErrorMessage
          errorMessage={errorMessage}
          className='text-center'
          testId='errorMessage'
        />

        <SubmitButton className='mt-2' color='primary' value='Sign In' />

        <div className='mt-4'>
          <p className='text-sm text-gray-400'>
            Do you have an account yet?
            <Link href='/auth/signup'>
              <a className='underline'>Sign Up</a>
            </Link>
          </p>
        </div>
      </form>
    </FormWrapper>
  );
};

export default memo(SignInForm);
