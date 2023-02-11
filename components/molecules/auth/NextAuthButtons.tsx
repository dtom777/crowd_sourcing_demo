import NextAuthButton from '@/components/atoms/button/NextAuthButton';
import { memo, VFC } from 'react';

type Props = {
  twitterButtonTitle: string;
  facebookButtonTitle: string;
};

const NextAuthButtons: VFC<Props> = ({
  twitterButtonTitle,
  facebookButtonTitle,
}) => {
  return (
    <div className='md:flex justify-center'>
      <div className='justify-center'>
        <NextAuthButton
          className='bg-blue-400 md:mr-4 md:mb-0 mb-2 w-52'
          provider='twitter'
          callbackUrl='/'
        >
          {twitterButtonTitle}
        </NextAuthButton>
      </div>
      <div>
        <NextAuthButton
          className='bg-blue-600 w-52'
          provider='facebook'
          callbackUrl='/'
        >
          {facebookButtonTitle}
        </NextAuthButton>
      </div>
    </div>
  );
};

export default memo(NextAuthButtons);
