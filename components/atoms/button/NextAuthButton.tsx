import { signIn } from 'next-auth/client';
import { memo, FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
  provider?: string;
  callbackUrl?: string;
  testId?: string;
};

const NextAuthButton: FC<Props> = ({
  children,
  type,
  className,
  provider,
  callbackUrl,
  testId,
}) => {
  return (
    <>
      {provider ? (
        <button
          className={`justify-center items-center font-semibold text-white py-3 rounded-3xl ${className}`}
          onClick={() => signIn(provider, { callbackUrl })}
          data-testid={testId}
        >
          {children}
        </button>
      ) : (
        <button
          type={type}
          className={`justify-center items-center font-semibold text-white py-3 rounded-3xl ${className}`}
          data-testid={testId}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default memo(NextAuthButton);
