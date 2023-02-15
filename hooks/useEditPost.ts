import { PostWithTags } from 'types/post.type';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { successToast, errorToast } from '@/libs/toast';

export const useEditPost = (session, rewardFree) => {
  const router = useRouter();
  const [radio, setRadio] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = router.query;

  const handleRadio = (arg: string): void => {
    if (arg === 'paid') {
      setRadio(true);
    } else {
      setRadio(false);
    }
  };

  useEffect((): void => {
    if (!session) {
      errorToast('ログインが必要です');
      router.push('/auth/signin');
    }
  }, [router, session]);

  useEffect(() => {
    if (rewardFree) {
      handleRadio('free');
    } else {
      handleRadio('paid');
    }
  }, [rewardFree]);

  const submitData = async (data: PostWithTags): Promise<void> => {
    setLoading(true);
    const { title, content, categoryId, reward, tags } = data;
    if (!title || !content || !categoryId) {
      return;
    }
    if (reward == null || reward == 0) {
      const body = {
        id,
        title,
        content,
        categoryId: Number(categoryId),
        reward,
        rewardFree: true,
        tags,
        userId: session.user.id,
      };
      try {
        await fetch('/api/post/update', {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
        await router.push({
          pathname: '/mypage/posts',
          query: { published: true, draft: true, end: true },
        });
        successToast('変更完了😼');
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const body = {
        id,
        title,
        content,
        categoryId: Number(categoryId),
        reward: Number(reward),
        rewardFree: false,
        tags,
        userId: session.user.id,
      };
      try {
        await fetch('/api/post/update', {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
        await router.push({
          pathname: '/mypage/posts',
          query: { published: true, draft: true, end: true },
        });
        successToast('変更完了😼');
        setLoading(false);
      } catch (error) {
        errorToast(error.message);
      }
    }
  };

  return { radio, loading, handleRadio, submitData };
};
