import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '@/components/atoms/loading/Loading';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import { Session } from 'next-auth';
import { useEditProfile } from '@/hooks/useEditProfile';
import { useFetch } from '../../../hooks/useFetch';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  session: Session;
};

const ProfileEditForm: VFC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, isLoading } = useFetch('/api/user/get');

  const { loading, updateUser } = useEditProfile();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Loading loading={loading} />
      <div className='hero min-h-screen'>
        <div className='hero-content flex-col'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold'>Edit Profile</h1>
          </div>
          <div className='card flex-shrink-0 md:max-w-screen-md md:w-screen w-full shadow-2xl bg-base-100'>
            <form className='card-body' onSubmit={handleSubmit(updateUser)}>
              <div className='flex flex-col w-full items-center justify-center'>
                <div className='avatar'>
                  <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                    <Image src={data?.user.image} width={120} height={120} />
                  </div>
                </div>
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  {...register('name', {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                  })}
                  type='text'
                  placeholder='name'
                  defaultValue={data?.user.name}
                  className='input input-bordered'
                />
              </div>
              {errors.name && (
                <ErrorMessage errorMessage='Please enter 1 to 20 characters' />
              )}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Profile</span>
                </label>
                <textarea
                  {...register('profile', {
                    maxLength: 255,
                  })}
                  className='textarea textarea-bordered'
                  placeholder='profile'
                  id='content'
                  rows={6}
                  defaultValue={data?.user.bio}
                ></textarea>
                {errors.profile && (
                  <ErrorMessage errorMessage='Please enter 1 to 255 characters' />
                )}
              </div>
              <div className='form-control mt-6'>
                <input className='btn btn-primary' type='submit' value='Save' />
              </div>
            </form>
            <div className='text-center mb-4'>
              <Link href={`/user/${data?.user.id}`}>
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
