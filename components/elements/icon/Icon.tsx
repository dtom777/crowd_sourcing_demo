import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, FC } from 'react';

type Props = {
  icon: IconDefinition;
  className?: string;
};

const Icon: FC<Props> = ({ icon, className }) => {
  return <FontAwesomeIcon icon={icon} className={className} />;
};

export default memo(Icon);
