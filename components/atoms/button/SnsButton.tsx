import BaseLinkButton from './BaseLinkButton';
import BaseIcon from '../icon/BaseIcon';
import { FC, memo, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  buttonClassName?: string;
  iconClassName?: string;
  icon?: any;
  href?: string;
};

const SnsButton: FC<Props> = ({
  children,
  buttonClassName,
  iconClassName,
  icon,
  href,
}) => {
  return (
    <BaseLinkButton
      href={href}
      className={`flex justify-center items-center text-white hover:opacity-50 ${buttonClassName}`}
    >
      {icon && <BaseIcon icon={icon} className={iconClassName} />}
      {children}
    </BaseLinkButton>
  );
};

export default memo(SnsButton);
