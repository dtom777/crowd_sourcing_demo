import Image from 'next/image';
import Link from 'next/link';
import { memo, VFC } from 'react';

import { useEditProfile } from '@/hooks/useEditProfile';
import { useFetch } from '@/hooks/useFetch';

import InputField from '@/components/elements/field/InputField';
import TextareaField from '@/components/elements/field/TextareaField';
import Spinner from '@/components/elements/spinner/Spinner';

const ProfileEditForm: VFC = () => {
  const { data, isLoading } = useFetch('/api/user/get');

  const { loading, errorMessage, handleSubmit, fieldValues, errors } =
    useEditProfile();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Spinner loading={loading} />
      <div className='hero min-h-screen'>
        <div className='hero-content flex-col'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold'>Edit Profile</h1>
          </div>
          <div className='card flex-shrink-0 md:max-w-screen-md md:w-screen w-full shadow-2xl bg-base-100'>
            <form className='card-body' onSubmit={handleSubmit}>
              <div className='flex flex-col w-full items-center justify-center'>
                <div className='avatar'>
                  <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                    <Image src={data?.user.image} width={120} height={120} />
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
              <div className='form-control mt-6'>
                <input className='btn btn-primary' type='submit' value='Save' />
              </div>
            </form>
            <div className='text-center mb-4'>
              <Link href={`/users/${data?.user.id}`}>
                <a className='text-gray-500 hover:opacity-50'>View Profile</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProfileEditForm);
