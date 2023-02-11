import SignInLinkButtonAndSignUpLinkButton from '@/components/molecules/auth/SignInLinkButtonAndSignUpLinkButton';
import { memo, VFC } from 'react';

const EventConst: VFC = () => {
  return (
    <div className='text-center inline-block md:rounded md:px-12 pt-6 mb-4'>
      <div className='bg-white py-4 px-12 my-4 rounded-md'>
        <p className='md:text-xl text-lg font-bold'>ツノってみよう。</p>
        <SignInLinkButtonAndSignUpLinkButton
          containerClassName='mt-8 mb-4'
          signInButtonClassName='py-2 px-4 text-sm border-2 border-black'
          signUpButtonClassName='py-2 px-4 text-sm border-2 border-black ml-4'
        />
      </div>
    </div>
  );
};

export default memo(EventConst);
