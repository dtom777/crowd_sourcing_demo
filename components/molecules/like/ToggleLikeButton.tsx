import { useState, useEffect, memo, useCallback, VFC } from 'react';
import { Session } from 'next-auth';
import LikeButton from '@/components/atoms/button/LikeButton';
import { useFetch } from '@/hooks/useFetch';
import { errorToast } from '@/lib/toast';
import { data } from 'cypress/types/jquery';
import { mutate } from 'swr';

type Props = {
  session: Session;
  id: string;
};

type SubmitData = {
  like: boolean;
  postId: string;
};

const ToggleLikeButton: VFC<Props> = ({ session, id }) => {
  // getLike
  const { data, mutate } = useFetch(
    session ? `/api/like/get?postId=${id}` : null
  );

  // createLike
  const handleLike = useCallback(async (): Promise<void> => {
    const body: SubmitData = {
      like: !data.like,
      postId: id,
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
  }, [data, id, mutate]);

  return (
    <>
      <LikeButton handler={handleLike} like={data?.like} />
    </>
  );
};

export default memo(ToggleLikeButton);
