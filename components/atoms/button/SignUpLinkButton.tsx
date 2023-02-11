import BaseLinkButton from './BaseLinkButton';
import { memo, VFC } from 'react';

type Props = {
  className?: string;
};

const SignUpLinkButton: VFC<Props> = ({ className }) => {
  return (
    <BaseLinkButton
      href='/auth/signup'
      className={`bg-black text-white rounded-md hover:bg-pink-500 hover:border-pink-500 hover:opacity-70 ${className}`}
      squareStyle={true}
      growEffect={true}
    >
      新規登録
    </BaseLinkButton>
  );
};

export default memo(SignUpLinkButton);
