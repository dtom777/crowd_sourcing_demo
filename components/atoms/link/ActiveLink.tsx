import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { Children, memo, FC } from 'react';

const ActiveLink: FC<any> = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const className = asPath === props.href ? activeClassName : childClassName;

  return (
    <Link href={''} {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default memo(ActiveLink);
