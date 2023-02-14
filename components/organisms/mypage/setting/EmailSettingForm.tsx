import { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '@/components/atoms/loading/Loading';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import { Session } from 'next-auth';
import { useEmailSetting } from '@/hooks/useEmailSetting';

type Props = {
  session: Session;
};

const EmailSettingForm: VFC<Props> = ({ session }) => {
  const { email } = session.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, errorMessage, sendConfirmationEmail } =
    useEmailSetting(email);

  return (
    <>
      <Loading loading={loading} />
      <div className='hero min-h-screen'>
        <div className='hero-content flex-col'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold'>Change Email</h1>
          </div>
          <div className='card flex-shrink-0 md:max-w-screen-md md:w-screen w-full shadow-2xl bg-base-100'>
            <form
              className='card-body'
              method='post'
              action='/api/auth/callback/credentials'
              onSubmit={handleSubmit(sendConfirmationEmail)}
            >
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Current Email</span>
                </label>
                <input
                  type='email'
                  placeholder='email'
                  defaultValue={email}
                  className='input input-bordered'
                  disabled
                />
              </div>

              <div className='form-control mt-8'>
                <label className='label'>
                  <span className='label-text'>Email after change</span>
                </label>
                <input
                  {...register('changingEmail', {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                  })}
                  type='email'
                  placeholder='email'
                  className='input input-bordered'
                />
              </div>
              {errors.changingEmail && (
                <ErrorMessage errorMessage='Please Enter' />
              )}

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>
                    Please enter again to confirm
                  </span>
                </label>
                <input
                  {...register('confirmationChangingEmail', {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                  })}
                  type='email'
                  placeholder='email'
                  className='input input-bordered'
                />
              </div>
              {errors.confirmationChangingEmail && (
                <ErrorMessage errorMessage='Please Enter' />
              )}

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
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(EmailSettingForm);
