import { useState } from 'react';
import { useRouter } from 'next/router';
import { successToast } from '@/lib/toast';

export const usePostMyPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handlePrivatePost = async (id: string): Promise<void> => {
    setLoading(true);
    // 公開、非公開はdraftで制御
    const body: {
      id: string;
      draft: boolean;
    } = { id, draft: true };
    try {
      await fetch('/api/post/togglePost', {
        method: 'PUT',
        body: JSON.stringify(body),
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
      successToast('募集を停止しました🥺');
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handlePublishedPost = async (id: string): Promise<void> => {
    setLoading(true);
    const body: {
      id: string;
      draft: boolean;
    } = { id, draft: false };
    try {
      await fetch('/api/post/togglePost', {
        method: 'PUT',
        body: JSON.stringify(body),
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
      successToast('募集を再開しました😋');
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleRePublishedPost = async (id: string): Promise<void> => {
    setLoading(true);
    const body: {
      id: string;
      published: boolean;
      draft: boolean;
    } = { id, published: true, draft: false };
    try {
      await fetch('/api/post/togglePost', {
        method: 'PUT',
        body: JSON.stringify(body),
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
      successToast('募集を再開しました😋');
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      await fetch('/api/post/deletePost', {
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
    loading,
    handlePrivatePost,
    handlePublishedPost,
    handleRePublishedPost,
    handleDeletePost,
  };
};
