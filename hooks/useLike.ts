import { useCallback } from 'react';

import { errorToast } from '@/libs/toast';

import { useFetch } from '@/hooks/useFetch';

import { PostWithUser } from 'types/post.type';

type ReqBody = {
  like: boolean;
  postId: string;
};

export const useLike = (post: PostWithUser) => {
  // getLike
  const { data, mutate } = useFetch(`/api/like/get?postId=${post.id}`);

  // createLike
  const handleLike = useCallback(async (): Promise<void> => {
    const body: ReqBody = {
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

  return { data, handleLike };
};
