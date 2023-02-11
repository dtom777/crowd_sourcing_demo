import SignInLinkButton from '@/components/atoms/button/SignInLinkButton';
import SignUpLinkButton from '@/components/atoms/button/SignUpLinkButton';
import { VFC } from 'react';

type Props = {
  containerClassName?: string;
  signInButtonClassName?: string;
  signUpButtonClassName?: string;
};

const SignInLinkButtonAndSignUpLinkButton: VFC<Props> = ({
  containerClassName,
  signInButtonClassName,
  signUpButtonClassName,
}) => {
  return (
    <div className={containerClassName}>
      <SignInLinkButton className={signInButtonClassName} />
      <SignUpLinkButton className={signUpButtonClassName} />
    </div>
  );
};

export default SignInLinkButtonAndSignUpLinkButton;
