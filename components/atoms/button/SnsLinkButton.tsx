import BaseIcon from '../icon/BaseIcon';
import { memo, VFC } from 'react';

type Props = {
  className?: string;
  iconClassName?: string;
  icon?: any;
  href?: string;
};

const SnsLinkButton: VFC<Props> = ({
  className,
  iconClassName,
  icon,
  href,
}) => {
  return (
    <a
      className={`focus:outline-none hover:opacity-50 ${className}`}
      href={href}
    >
      <BaseIcon icon={icon} className={iconClassName} />
    </a>
  );
};

export default memo(SnsLinkButton);
