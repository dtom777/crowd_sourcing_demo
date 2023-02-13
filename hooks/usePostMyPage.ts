import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { successToast, errorToast } from '@/lib/toast';

export const usePostMyPage = (posts) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    setLocalData(posts);
  }, [posts]);

  const handleTogglePublished = async (id, published): Promise<void> => {
    const body: {
      id: string;
      published: boolean;
    } = { id, published: !published };
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

  const handleDeletePost = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      await fetch('/api/post/delete', {
        method: 'PUT',
        body: JSON.stringify(id),
        headers: { 'Content-Type': 'application/json' },
      });
      await router.push({
        pathname: '/mypage/posts',
        query: {
          published: true,
          draft: true,
          end: true,
        },
      });
      successToast('募集を削除しました🤦‍♂️');
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return {
    localData,
    loading,
    handleTogglePublished,
    handleDeletePost,
  };
};
