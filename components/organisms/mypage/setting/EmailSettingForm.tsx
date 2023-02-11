import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '@/components/atoms/loading/Loading';
import Label from '@/components/atoms/input/Label';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { Session } from 'next-auth';
import { useEmailSetting } from '@/hooks/useEmailSetting';

type Props = {
  session: Session;
};

const EmailSettingForm: VFC<Props> = ({ session }) => {
  const { id, name, email } = session.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, errorMessage, submitData } = useEmailSetting(
    id,
    name,
    email
  );

  return (
    <>
      <Loading loading={loading} />
      <div className='mb-10 max-w-screen-md mx-auto'>
        <section>
          <div className='mt-4 py-2 pl-4 pr-2 bg-black text-white font-bold text-md'>
            メールアドレスの変更
          </div>
          <div className='px-8 pt-6 pb-8 mb-4'>
            <div>
              <Label htmlFor='email' className='mb-2'>
                現在のメールアドレス
              </Label>
              <input
                name='email'
                type='email'
                placeholder='tonoru@Crowd Sourcing'
                defaultValue={email}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <form onSubmit={handleSubmit(submitData)}>
              <div className='mt-12'>
                <Label htmlFor='changeEmail' className='mb-2'>
                  変更後のメールアドレス
                </Label>
                <input
                  {...register('changeEmail', {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                  })}
                  type='email'
                  placeholder='tonoru@Crowd Sourcing'
                  className={`w-full ${defaultInputStyle}`}
                />
                {errors.changeEmail && (
                  <ErrorMessage errorMessage='入力してください。' />
                )}
                <Label htmlFor='confirmationChangeEmail' className='my-2'>
                  確認のため、もう一度入力してください。
                </Label>
                <input
                  {...register('confirmationChangeEmail', {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                  })}
                  type='email'
                  placeholder='tonoru@Crowd Sourcing'
                  className={`w-full ${defaultInputStyle}`}
                />
              </div>
              {errors.confirmationChangeEmail && (
                <ErrorMessage errorMessage='入力してください。' />
              )}
              <ErrorMessage errorMessage={errorMessage} />
              <div className='flex justify-center mt-8'>
                {/* comp化できるかも */}
                <button className='justify-center items-center font-semibold text-white bg-black py-3 md:mr-4 md:mb-0 mb-2 rounded-3xl w-52 hover:opacity-50'>
                  確認メールを送信する
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default memo(EmailSettingForm);
