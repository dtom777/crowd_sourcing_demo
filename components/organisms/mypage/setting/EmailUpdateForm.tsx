import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '@/components/atoms/loading/Loading';
import Label from '@/components/atoms/input/Label';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import BaseButton from '@/components/atoms/button/BaseButton';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { useUpdateEmail } from '@/hooks/useUpdateEmail';

const EmailUpdateForm: VFC = () => {
  const { loading, errorMessage, submitData } = useUpdateEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Loading loading={loading} />
      <div className='mb-10 max-w-screen-md mx-auto'>
        <div>
          {/* comp化できそう */}
          <div className='mt-4 py-2 pl-4 pr-2 bg-black text-white font-bold text-md'>
            メールアドレスの変更
          </div>
          <div className='px-8 pb-8 mb-4'>
            <form onSubmit={handleSubmit(submitData)}>
              <div className='mt-12'>
                <Label htmlFor='password' className='mb-2'>
                  パスワードを入力してください。
                </Label>
                <input
                  {...register('password', {
                    required: true,
                    minLength: 8,
                    maxLength: 12,
                  })}
                  type='password'
                  placeholder='*********'
                  className={`w-full ${defaultInputStyle}`}
                />
                {errors.password && (
                  <ErrorMessage errorMessage='8〜12文字で入力してください。' />
                )}
                <Label htmlFor='confirmationPassword' className='my-2'>
                  確認のため、もう一度入力してください。
                </Label>
                <input
                  {...register('confirmationPassword', {
                    required: true,
                    minLength: 8,
                    maxLength: 12,
                  })}
                  type='password'
                  placeholder='***********'
                  className={`w-full ${defaultInputStyle}`}
                />
              </div>
              {errors.confirmationPassword && (
                <ErrorMessage errorMessage='8〜12文字で入力してください。' />
              )}
              <ErrorMessage errorMessage={errorMessage} />
              <div className='flex justify-center mt-8'>
                <BaseButton className='font-semibold  py-3 md:mr-4 md:mb-0 mb-2 rounded-3xl w-40'>
                  登録する
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(EmailUpdateForm);
