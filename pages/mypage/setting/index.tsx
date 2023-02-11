import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { signOut, getSession, GetSessionOptions } from 'next-auth/client';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import {
  faBan,
  faCheckCircle,
  faSignOutAlt,
  faTimes,
  faUserSlash,
} from '@fortawesome/free-solid-svg-icons';
import Layout from '@/components/templates/Layout';
import BaseHead from '@/components/atoms/head/BaseHead';
import Loading from '@/components/atoms/loading/Loading';
import BaseIcon from '@/components/atoms/icon/BaseIcon';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import Label from '@/components/atoms/input/Label';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import SubmitButton from '@/components/atoms/button/SubmitButton';
import { defaultInputStyle } from 'constants/defaultInputStyle';
import { useSettingPage } from '@/hooks/useSettingPage';

Modal.setAppElement('#__next');

type Props = {
  session: Session;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetSessionOptions
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

const SettingPage: NextPage<Props> = ({ session }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    loading,
    isOpen,
    errorMessage,
    openModal,
    closeModal,
    updateEmail,
    updateTwitter,
    updateFacebook,
    submitEmailData,
    submitTwitterData,
    submitFacebookData,
    deleteUser,
  } = useSettingPage(session);

  return (
    <Layout>
      <BaseHead />
      <Loading loading={loading} />
      <div className='mb-10 max-w-screen-md mx-auto'>
        <section>
          <div className='mt-4 py-2 pl-4 pr-2 bg-black text-white font-bold text-md'>
            メールアドレス設定
          </div>
          <div className='px-8 py-6'>
            {session.user.email ? (
              <div className='flex'>
                <label className='block text-gray-700 font-bold'>
                  メールアドレス
                  <span className='ml-4'>
                    <BaseIcon icon={faCheckCircle} />
                    登録済み
                  </span>
                </label>
                <BaseLinkButton
                  href='/mypage/setting/email'
                  className='underline md:ml-20 ml-10'
                >
                  変更する
                </BaseLinkButton>
              </div>
            ) : (
              <>
                <div className='md:flex'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    メールアドレス
                    <span className='ml-4'>
                      <BaseIcon icon={faBan} />
                      未登録
                    </span>
                  </label>
                  <div className='md:pl-6 font-normal text-sm'>
                    ※未登録の場合、募集・応募ができません。
                  </div>
                </div>
                <form onSubmit={submitEmailData}>
                  <div className='mb-4'>
                    <input
                      onChange={updateEmail}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      type='email'
                      placeholder='tunoru@tunoru.me'
                    />
                    <p className='text-red-600'>{errorMessage}</p>
                    <div className='flex justify-center my-4'>
                      <SubmitButton className='w-52 text-center font-semibold py-3 md:mb-0 mb-2 rounded-3xl'>
                        Emailを登録する
                      </SubmitButton>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </section>
        <section>
          <div className='mt-4 py-2 pl-4 pr-2 bg-black text-white font-bold text-md'>
            ログイン情報
          </div>
          <form onSubmit={submitTwitterData} className='px-8 pt-6'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                連携中のTwitterアカウント
              </label>
              <input
                onChange={updateTwitter}
                defaultValue={session.user.twitter}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='連携中のアカウントがありません'
              />
              <div className='flex justify-center my-4'>
                <SubmitButton className='w-52 text-center font-semibold bg-blue-400 py-3 md:mb-0 mb-2 rounded-3xl'>
                  Twitter連携する
                </SubmitButton>
              </div>
            </div>
          </form>
          <form onSubmit={submitFacebookData} className='px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                連携中のFacebookアカウント
              </label>
              <input
                onChange={updateFacebook}
                defaultValue={session.user.facebook}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='連携中のアカウントがありません'
              />
              <div className='flex justify-center my-4'>
                <SubmitButton className='w-52 text-center font-semibold bg-blue-600 py-3 md:mb-0 mb-2 rounded-3xl'>
                  Facebook連携する
                </SubmitButton>
              </div>
            </div>
          </form>
        </section>
        <section>
          <div className='mt-4 mb-8 py-2 pl-4 pr-2 bg-black text-white font-bold text-md'>
            その他
          </div>
          <div className='px-8'>
            <BaseLinkButton href='#' className='font-bold underline'>
              ブロックユーザー一覧
            </BaseLinkButton>
          </div>
          <div className='flex md:flex-row flex-col items-center justify-center mt-8'>
            <button
              className='flex justify-center items-center py-3 rounded-3xl text-white bg-red-500 focus:outline-none hover:opacity-50 w-48'
              onClick={() => signOut()}
            >
              <BaseIcon icon={faSignOutAlt} className='mr-2' />
              ログアウト
            </button>
            {/* button & Modalでcomp化 */}
            <button
              className='flex justify-center items-center py-3 md:ml-4 md:mt-0 mt-6 rounded-3xl text-red-500 border border-red-500 focus:outline-none hover:opacity-50 w-48'
              onClick={openModal}
            >
              <BaseIcon icon={faUserSlash} className='text-red-500 mr-2' />
              アカウント削除
            </button>
            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <div className='text-right text-lg'>
                <button onClick={closeModal}>
                  <BaseIcon icon={faTimes} />
                </button>
              </div>
              {/* oauthじゃないとき */}
              {!Object.keys(session.user.account).length ? (
                <>
                  <h2 className='text-center text-gray-700 mb-4'>
                    アカウントを削除する場合は入力してください
                  </h2>
                  <form
                    method='post'
                    action='/api/auth/callback/credentials'
                    onSubmit={handleSubmit(deleteUser)}
                  >
                    <Label className='md:ml-0 ml-6 text-left'>
                      メールアドレス
                    </Label>
                    <input
                      {...register('email', { required: true })}
                      type='email'
                      placeholder='tunoru@tunoru.me'
                      className={`w-full ${defaultInputStyle}`}
                    />
                    {errors.email && (
                      <ErrorMessage errorMessage='入力してください。' />
                    )}
                    <Label className='md:ml-0 ml-6 text-left mt-4'>
                      パスワード
                    </Label>
                    {/* ここから */}
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
                      <ErrorMessage
                        errorMessage='8〜12文字で入力してください。'
                        className='text-center font-normal'
                      />
                    )}
                    <Label className='md:ml-0 ml-6text-left mt-4'>
                      パスワード(確認用)
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
                    {errors.confirmationPassword && (
                      <ErrorMessage
                        errorMessage='8〜12文字で入力してください。'
                        className='text-center font-normal'
                      />
                    )}
                    <div className='flex justify-center mt-4'>
                      <SubmitButton className='py-2 px-4 bg-red-500 text-sm rounded-md'>
                        アカウントを削除する
                      </SubmitButton>
                    </div>
                  </form>
                  <ErrorMessage
                    errorMessage={errorMessage}
                    className='mt-4 text-center'
                  />
                </>
              ) : (
                <p className='text-red-600 mt-4 text-center'>
                  oauthのときの処理
                </p>
              )}
            </Modal>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SettingPage;

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
