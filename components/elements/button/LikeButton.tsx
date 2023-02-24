import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Session } from 'next-auth';
import { memo, VFC } from 'react';

import { PostWithUser } from 'types/post.type';

import { useLike } from '../../../hooks/useLike';
import Icon from '../icon/Icon';

type Props = {
  session: Session | null;
  post: PostWithUser;
};

const LikeButton: VFC<Props> = ({ session, post }) => {
  const { data, handleLike } = useLike(post);

  const activeLikeClassName = data?.like
    ? 'text-red-500 border-red-500 hover:opacity-50'
    : 'text-gray-400 border-gray-400';
  const activeLikeIconClassName = data?.like ? 'text-red-500' : '';

  return (
    <>
      {session && (
        <div className='flex h-14 items-center justify-end'>
          <button
            className={`mr-2 flex items-center justify-center rounded-full border p-2 hover:opacity-50 focus:outline-none ${activeLikeClassName}`}
            onClick={handleLike}
          >
            <Icon icon={faHeart} className={activeLikeIconClassName} />
          </button>
        </div>
      )}
    </>
  );
};

export default memo(LikeButton);
