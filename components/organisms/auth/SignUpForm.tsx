import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '@/components/atoms/loading/Loading';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import Label from '@/components/atoms/input/Label';
import BaseAvatar from '@/components/atoms/avatar/BaseAvatar';
import SubmitButton from '@/components/atoms/button/SubmitButton';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { useSignUp } from '@/hooks/useSignUp';

const SignUpForm: VFC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { image, loading, errorMessage, updateImage, submitData } = useSignUp();

  return (
    <>
      <Loading loading={loading} />
      <div className='mb-20'>
        <div className='lg:text-center lg:mt-4 py-2 lg:px-0 pl-4 pr-2  lg:bg-white bg-black lg:text-black text-white lg:font-extrabold font-bold lg:text-3xl text-sm'>
          新規ユーザー登録
        </div>
        <form
          onSubmit={handleSubmit(submitData)}
          className='bg-white px-8 pt-6 pb-8 mb-4'
        >
          <div className='mb-4'>
            <div className='flex flex-col w-full items-center justify-center'>
              <BaseAvatar src={image} size={120} />
            </div>
            <Label htmlFor='image' className='mb-2'>
              Avatar
            </Label>
            <select
              {...register('image', {
                required: true,
              })}
              onChange={updateImage}
              className='shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline'
            >
              <option value='/avatar-default.png'>選択してください</option>
              {avatarImageList.map((image) => (
                <option key={image.id} value={image.url}>
                  {image.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-4'>
            <Label htmlFor='name' className='mb-2'>
              TUNORUで表示される名前
            </Label>
            <input
              {...register('name', {
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
              type='text'
              placeholder='お名前'
              className={`w-full ${defaultInputStyle}`}
            />
            {errors.name && (
              <ErrorMessage errorMessage='2〜20文字で入力してください。' />
            )}
          </div>
          <div className='mb-4'>
            <Label htmlFor='email' className='mb-2'>
              Email
            </Label>
            <input
              {...register('email', { required: true })}
              type='email'
              placeholder='tunoru@tunoru.me'
              className={`w-full ${defaultInputStyle}`}
            />
          </div>
          {errors.email && <ErrorMessage errorMessage='入力してください。' />}
          <ErrorMessage errorMessage={errorMessage} className='my-4' />
          <div className='mb-10'>
            <Label htmlFor='password' className='mb-2'>
              Password
            </Label>
            <input
              {...register('password', {
                required: true,
                minLength: 8,
                maxLength: 12,
              })}
              type='password'
              placeholder='***********'
              className={`w-full ${defaultInputStyle}`}
            />
            {errors.password && (
              <ErrorMessage errorMessage='8〜12文字で入力してください' />
            )}
          </div>
          <label className='flex items-center'>
            <input
              {...register('check', { required: true })}
              type='checkbox'
              className='mr-2'
            />
            <div className='lg:text-base text-xs' data-testid='checkbox'>
              <span className='underline'>利用規約</span>と
              <span className='underline'>プライバシーポリシー</span>
              に同意する。
            </div>
          </label>
          {errors.check && (
            <ErrorMessage
              errorMessage='チェックしてください。'
              className='block'
              testId='errorMessage'
            />
          )}
          <div className='flex justify-center mt-10'>
            <SubmitButton
              className='py-2 px-12 font-bold rounded-3xl'
              testId='signUp'
            >
              登録する
            </SubmitButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(SignUpForm);

const avatarImageList = [
  { id: 1, url: '/avatar-1.jpg', name: 'ねこ１' },
  { id: 2, url: '/avatar-2.jpg', name: 'ねこ２' },
  { id: 3, url: '/avatar-3.jpg', name: 'きつね１' },
  { id: 4, url: '/avatar-4.jpg', name: 'うさぎ' },
  { id: 5, url: '/avatar-5.png', name: 'きつね２' },
];
