import { memo, FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
};

const Label: FC<Props> = ({ children, htmlFor, className }) => {
  return (
    <label
      className={`block text-gray-700 text-sm font-bold ${className}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default memo(Label);
