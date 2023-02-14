import BaseIcon from '../icon/BaseIcon';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { memo, FC, ReactNode } from 'react';

type Props = {
  handler: () => Promise<void>;
  like: boolean;
};

const LikeButton: FC<Props> = ({ handler, like }) => {
  const activeLikeClassName = like
    ? 'text-red-500 border-red-500 hover:opacity-50'
    : 'text-gray-400 border-gray-400';
  const activeLikeIconClassName = like ? 'text-red-500' : '';

  return (
    <button
      className={`flex justify-center items-center p-2 mr-2 rounded-full hover:opacity-50 border focus:outline-none ${activeLikeClassName}`}
      onClick={handler}
    >
      <BaseIcon icon={faHeart} className={activeLikeIconClassName} />
    </button>
  );
};

export default memo(LikeButton);
