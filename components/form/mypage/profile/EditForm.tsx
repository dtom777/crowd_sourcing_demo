import Image from 'next/image';
import Link from 'next/link';
import { memo, VFC } from 'react';

import { useEditProfile } from '@/hooks/useEditProfile';
import { useFetch } from '@/hooks/useFetch';

import SubmitButton from '@/components/elements/button/SubmitButton';
import InputField from '@/components/elements/field/InputField';
import TextareaField from '@/components/elements/field/TextareaField';
import FormWrapper from '@/components/form/common/Wrapper';

const ProfileEditForm: VFC = () => {
  const { data, isLoading } = useFetch('/api/user/get');

  const { errorMessage, handleSubmit, fieldValues, errors } = useEditProfile();

  if (isLoading) return <div>Loading...</div>;

  return (
    <FormWrapper title='Edit Profile'>
      <form className='card-body' onSubmit={handleSubmit}>
        <div className='flex w-full flex-col items-center justify-center'>
          <div className='avatar'>
            <div className='w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
              <Image
                src={
                  data?.user.image ? data?.user.image : '/avatar-default.png'
                }
                width={120}
                height={120}
              />
            </div>
          </div>
        </div>
        <InputField
          {...fieldValues.name}
          errorMessage='Please enter 1 to 20 characters'
          errors={errors.name}
          label='Name'
          type='text'
          placeholder='name'
          defaultValue={data?.user.name}
        />
        <TextareaField
          {...fieldValues.profile}
          errorMessage='Please enter 1 to 255 characters'
          errors={errors.profile}
          label='Profile'
          placeholder='profile'
          id='content'
          rows={6}
          defaultValue={data?.user?.profile?.bio}
        />
        <SubmitButton className='mt-6' color='primary' value='Save' />
      </form>
      <div className='mb-4 text-center'>
        <Link href={`/users/${data?.user.id}`}>
          <a className='text-gray-500 hover:opacity-50'>View Profile</a>
        </Link>
      </div>
    </FormWrapper>
  );
};

export default memo(ProfileEditForm);
