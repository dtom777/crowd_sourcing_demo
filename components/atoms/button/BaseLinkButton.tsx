import Link from 'next/link';
import { memo, ReactNode, FC } from 'react';

type Props = {
  children?: ReactNode;
  href?: {};
  className?: string;
  growEffect?: boolean;
  squareStyle?: boolean;
  headerStyle?: boolean;
  testId?: string;
};

const BaseLinkButton: FC<Props> = ({
  children,
  href,
  className,
  growEffect,
  squareStyle,
  headerStyle,
  testId,
}) => {
  const childrenClassName = growEffect
    ? `${className} transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`
    : `${className}`;
  const squareButtonStyle =
    squareStyle && 'inline-block py-1 px-2 text-xs border-2 border-black';
  const headerMenuStyle = headerStyle && 'md:mr-6 mr-3';

  return (
    <Link href={href}>
      <a
        className={`cursor-pointer ${childrenClassName} ${squareButtonStyle} ${headerMenuStyle}`}
        data-testid={testId}
      >
        {children}
      </a>
    </Link>
  );
};

export default memo(BaseLinkButton);
