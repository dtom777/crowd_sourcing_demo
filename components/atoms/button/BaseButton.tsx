import styles from './BaseButton.module.css';
import { memo, FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
  growEffect?: boolean;
  headerStyle?: boolean;
  shineEffect?: boolean;
  testId?: string;
};

const BaseButton: FC<Props> = ({
  children,
  type,
  className,
  growEffect,
  headerStyle,
  shineEffect,
  testId,
}) => {
  const childrenClassName = growEffect
    ? `${className} transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`
    : `${className}`;
  const headerMenuStyle = headerStyle && 'md:mr-6 mr-3';
  const shineStyles = shineEffect && styles.shine;

  return (
    <button
      type={type}
      className={`${childrenClassName} ${headerMenuStyle} ${shineStyles}`}
      data-testid={testId}
    >
      {children}
    </button>
  );
};

export default memo(BaseButton);
