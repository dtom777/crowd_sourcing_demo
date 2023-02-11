import { CreatePost } from 'types/post.type';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { successToast, errorToast } from '@/lib/toast';

export const useCreatePost = (session) => {
  const router = useRouter();
  const [radio, setRadio] = useState<boolean>(false);
  const [submitValue, setSubmitValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleRadio = (arg: string): void => {
    if (arg === 'paid') {
      setRadio(true);
    } else {
      setRadio(false);
    }
  };

  const updateSubmitValue = (arg: string) => {
    setSubmitValue(arg);
  };

  const createPost = async (body, message: string): Promise<void> => {
    try {
      await fetch('/api/post/createPost', {
        method: 'POST',
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
      successToast(message);
      setLoading(false);
    } catch (error) {
      errorToast(error.message);
    }
  };

  const submitData = async (data: {
    title: string;
    content: string;
    categoryId: string;
    reward?: number;
    tags?: string;
  }): Promise<void> => {
    setLoading(true);
    const { title, content, categoryId, reward, tags } = data;
    if (!title || !content || !categoryId) {
      return;
    }

    switch (submitValue) {
      case 'publish':
        if (reward === null || reward === 0) {
          const body: Omit<CreatePost, 'published' | 'draft'> = {
            title,
            content,
            categoryId: Number(categoryId),
            reward,
            rewardFree: true,
            tags,
            userId: session.user.id,
          };
          createPost(body, '募集完了😼');
        } else {
          const body: Omit<CreatePost, 'published' | 'draft'> = {
            title,
            content,
            categoryId: Number(categoryId),
            reward: Number(reward),
            rewardFree: false,
            tags,
            userId: session.user.id,
          };
          createPost(body, '募集完了😼');
        }
        break;
      // 下書き保存
      case 'draft':
        if (reward === null || reward === 0) {
          const body: CreatePost = {
            title,
            content,
            categoryId: Number(categoryId),
            reward,
            rewardFree: true,
            tags,
            published: true,
            draft: true,
            userId: session.user.id,
          };
          createPost(body, '下書きを保存しました😼');
        } else {
          const body: CreatePost = {
            title,
            content,
            categoryId: Number(categoryId),
            reward: Number(reward),
            rewardFree: false,
            tags,
            published: true,
            draft: true,
            userId: session.user.id,
          };
          createPost(body, '下書きを保存しました😼');
        }
        break;
    }
  };

  useEffect((): void => {
    if (session && !session.user.email) {
      errorToast('募集するには、Emailの登録が必要です。');

      const redirect = (): void => {
        router.push('/mypage/setting');
      };
      setTimeout(redirect, 2000);
    }
  }, [router, session]);

  return { radio, loading, handleRadio, updateSubmitValue, submitData };
};
