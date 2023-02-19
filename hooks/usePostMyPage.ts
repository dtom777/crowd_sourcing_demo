import { useEffect, useState, useCallback } from 'react';

import { successToast, errorToast } from '@/libs/toast';

import { PostWithComments } from '@/types/post.type';

type ReqBody = {
  id: string;
  published: boolean;
};

type Posts = Array<PostWithComments>;

export const usePostMyPage = (posts: Posts) => {
  const [localData, setLocalData] = useState<Posts>([]);

  useEffect(() => {
    setLocalData(posts);
  }, [posts]);

  const handleTogglePublished = async (
    id: string,
    published: boolean
  ): Promise<void> => {
    const body: ReqBody = { id, published: !published };
    setLocalData((prev) =>
      prev.map((post) => {
        if (post.id === id) return { ...post, published: !published };
        else return post;
      })
    );
    try {
      await fetch('/api/post/toggle', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.log(error.message);
      errorToast('Failed');
    }
  };

  const handleDeletePost = useCallback(async (id: string): Promise<void> => {
    try {
      const res = await fetch('/api/post/delete', {
        method: 'PUT',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
      successToast('Delete post');
      setLocalData((prev) => prev?.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err.message);
      errorToast(err.message);
    }
  }, []);

  return {
    localData,
    handleTogglePublished,
    handleDeletePost,
  };
};
