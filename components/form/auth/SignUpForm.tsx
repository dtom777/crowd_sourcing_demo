import Link from 'next/link';
import { memo, VFC } from 'react';

import { useSignUp } from '@/hooks/useSignUp';

import Avatar from '@/components/elements/avatar/Avatar';
import SubmitButton from '@/components/elements/button/SubmitButton';
import ErrorMessage from '@/components/elements/error/ErrorMessage';
import InputField from '@/components/elements/field/InputField';
import SelectField from '@/components/elements/field/SelectField';

import { avatars } from '@/constants/auth';

import FormWrapper from '../common/Wrapper';

const SignUpForm: VFC = () => {
  const {
    image,
    errorMessage,
    updateImage,
    handleSubmit,
    fieldValues,
    errors,
  } = useSignUp();

  return (
    <FormWrapper title='Sign Up'>
      <form className='card-body' onSubmit={handleSubmit}>
        <div className='flex w-full flex-col items-center justify-center'>
          <Avatar
            src={image}
            size={120}
            className='w-24 ring ring-primary ring-offset-2 ring-offset-base-100'
          />
        </div>
        <SelectField
          {...fieldValues.image}
          errors={errors.image}
          label='Avatar'
          onChange={updateImage}
        >
          <option value='/avatar-default.png'>Default</option>
          {avatars.map((avatar) => (
            <option key={avatar.id} value={avatar.url}>
              {avatar.name}
            </option>
          ))}
        </SelectField>
        <InputField
          {...fieldValues.name}
          errors={errors.name}
          label='Name'
          type='text'
          placeholder='name'
        />
        <InputField
          {...fieldValues.email}
          errors={errors.email}
          label='Email'
          type='email'
          placeholder='email'
        />
        <InputField
          {...fieldValues.password}
          errors={errors.password}
          label='Password'
          type='password'
          placeholder='password'
        />
        <ErrorMessage
          errorMessage={errorMessage}
          className='text-center'
          testId='errorMessage'
        />

        <SubmitButton className='mt-2' color='primary' value='Sign Up' />

        <div className='mt-4'>
          <p className='text-sm text-gray-400'>
            Do you have an account yet?
            <Link href='/auth/signin'>
              <a className='underline'>Sign In</a>
            </Link>
          </p>
        </div>
      </form>
    </FormWrapper>
  );
};

export default memo(SignUpForm);
