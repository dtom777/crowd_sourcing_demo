import BaseButton from './BaseButton';
import { memo, FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  growEffect?: boolean;
  shineEffect?: boolean;
  testId?: string;
};

const SubmitButton: FC<Props> = ({
  children,
  className,
  growEffect,
  shineEffect,
  testId,
}) => {
  return (
    <BaseButton
      type='submit'
      className={`justify-center items-center bg-black hover:opacity-50 text-white focus:outline-none focus:shadow-outline font-bold rounded-xl ${className}`}
      growEffect={growEffect}
      shineEffect={shineEffect}
      testId={testId}
    >
      {children}
    </BaseButton>
  );
};

export default memo(SubmitButton);
