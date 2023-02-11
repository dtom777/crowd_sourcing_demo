import SignInLinkButtonAndSignUpLinkButton from '@/components/molecules/auth/SignInLinkButtonAndSignUpLinkButton';
import { memo, VFC } from 'react';

const ApplicationConst: VFC = () => {
  return (
    <div className='my-4 px-8 pt-6 pb-8 bg-white rounded'>
      <p className='md:text-xl text-lg font-bold'>
        このツノルにメッセージをしよう。
      </p>
      <SignInLinkButtonAndSignUpLinkButton
        containerClassName='my-8'
        signInButtonClassName='py-2 px-4 text-sm border-2 border-black'
        signUpButtonClassName='py-2 px-4 text-sm border-2 border-black ml-4'
      />
    </div>
  );
};

export default memo(ApplicationConst);
