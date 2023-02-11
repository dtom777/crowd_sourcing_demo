import BaseLinkButton from './BaseLinkButton';
import { memo, VFC } from 'react';

type Props = {
  className?: string;
};

const SignInLinkButton: VFC<Props> = ({ className }) => {
  return (
    <BaseLinkButton
      href='/auth/signin'
      className={`rounded-md hover:bg-blue-500 hover:border-blue-500
      hover:text-white ${className}`}
      squareStyle={true}
      growEffect={true}
    >
      ログイン
    </BaseLinkButton>
  );
};

export default memo(SignInLinkButton);
