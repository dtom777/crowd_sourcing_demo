import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Session } from 'next-auth';
import { memo, useCallback, VFC } from 'react';

import { errorToast } from '@/libs/toast';

import { useFetch } from '@/hooks/useFetch';

import { PostWithUser } from 'types/post.type';

import Icon from '../icon/Icon';

type Props = {
  session?: Session;
  post: PostWithUser;
};

type SubmitData = {
  like: boolean;
  postId: string;
};

const LikeButton: VFC<Props> = ({ session, post }) => {
  // TODO useCustomHooks
  // getLike
  const { data, mutate } = useFetch(
    session ? `/api/like/get?postId=${post.id}` : null
  );

  // createLike
  const handleLike = useCallback(async (): Promise<void> => {
    const body: SubmitData = {
      like: !data.like,
      postId: post.id,
    };

    try {
      const res = await fetch('/api/like/toggle', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed');
      mutate();
    } catch (err) {
      console.error(err);
      errorToast('Failed');
    }
  }, [data, post.id, mutate]);

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
