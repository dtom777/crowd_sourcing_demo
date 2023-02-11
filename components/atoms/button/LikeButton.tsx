import BaseIcon from '../icon/BaseIcon';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { memo, FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  handler: () => Promise<void>;
  like: boolean;
};

const LikeButton: FC<Props> = ({ children, handler, like }) => {
  const activeLikeClassName = like
    ? 'text-red-500 border-red-500 hover:opacity-50'
    : 'text-gray-400 border-gray-400';
  const activeLikeIconClassName = like ? 'text-red-500 mr-2' : 'mr-2';

  return (
    <button
      className={`flex justify-center items-center px-3 py-1 md:mr-0 mr-2 rounded-2xl hover:opacity-50 border focus:outline-none ${activeLikeClassName}`}
      onClick={handler}
    >
      <BaseIcon icon={faHeart} className={activeLikeIconClassName} />
      {children}
    </button>
  );
};

export default memo(LikeButton);
