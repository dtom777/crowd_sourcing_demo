import { useState, memo, VFC, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '@/components/atoms/loading/Loading';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import BaseAvatar from '@/components/atoms/avatar/BaseAvatar';
import Label from '@/components/atoms/input/Label';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import SubmitButton from '@/components/atoms/button/SubmitButton';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { Session } from 'next-auth';
import { useEditProfile } from '@/hooks/useEditProfile';

type Props = {
  session: Session;
};

const ProfileEditForm: VFC<Props> = ({ session }) => {
  const { id, name, profile, image } = session.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, img, updateImg, submitData } = useEditProfile(id, image);

  return (
    <>
      <Loading loading={loading} />
      <div className='mb-10 max-w-screen-md mx-auto'>
        <div className='mt-4 py-2 pl-4 pr-2 bg-black text-white font-bold text-md'>
          プロフィール編集
        </div>
        <form
          onSubmit={handleSubmit(submitData)}
          className='bg-white px-8 pt-6 pb-8 mb-4'
        >
          <div className='mb-4'>
            <div className='flex flex-col w-full items-center justify-center'>
              <BaseAvatar src={img} size={120} />
            </div>
            <Label htmlFor='image' className='mb-2'>
              アバター
            </Label>
            <select
              {...register('image', {
                required: true,
              })}
              onChange={updateImg}
              className='shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline'
            >
              <option value={img}>選択してください</option>
              {avatarImageList.map((image) => (
                <option key={image.id} value={image.url}>
                  {image.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-4'>
            <Label htmlFor='name' className='mb-2'>
              ニックネーム
            </Label>
            <input
              {...register('name', {
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
              type='text'
              placeholder='お名前'
              defaultValue={name}
              className={`w-full ${defaultInputStyle}`}
            />
            {errors.name && (
              <ErrorMessage errorMessage='2〜20文字で入力してください。' />
            )}
          </div>
          <div className='mb-10'>
            <Label htmlFor='name' className='mb-2'>
              プロフィール
            </Label>
            <textarea
              {...register('profile', {
                maxLength: 255,
              })}
              id='content'
              placeholder='できること、してほしいこと、やりたいこと、あなた自身のことを教えてください。'
              rows={6}
              className={`w-full ${defaultInputStyle}`}
              defaultValue={profile}
            />
            {errors.profile && (
              <ErrorMessage errorMessage='255文字以内で入力してください。' />
            )}
          </div>
          <div className='flex justify-center mt-10'>
            <SubmitButton className='py-2 px-12 text-base font-bold rounded-3xl'>
              更新する
            </SubmitButton>
          </div>
          <div className='text-center mt-10'>
            <BaseLinkButton href={`/user/${id}`} className='hover:opacity-50'>
              プロフィールを確認する
            </BaseLinkButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(ProfileEditForm);

const avatarImageList = [
  { id: 1, url: '/avatar-1.jpg', name: 'ねこ１' },
  { id: 2, url: '/avatar-2.jpg', name: 'ねこ２' },
  { id: 3, url: '/avatar-3.jpg', name: 'きつね１' },
  { id: 4, url: '/avatar-4.jpg', name: 'うさぎ' },
  { id: 5, url: '/avatar-5.png', name: 'きつね２' },
];
