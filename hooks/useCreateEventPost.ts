import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

export const useCreateEventPost = () => {
  const router = useRouter();
  const [session] = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const submitData = async (data: {
    title: string;
    content: string;
  }): Promise<void> => {
    setLoading(true);
    const { title, content } = data;
    if (!title || !content) {
      return;
    }
    const body: {
      title: string;
      content: string;
      categoryId: number;
      reward?: number;
      rewardFree: boolean;
      tags: string | string[];
      userId: string;
    } = {
      title,
      content,
      categoryId: 11,
      reward: null,
      rewardFree: true,
      tags: router.query.title,
      userId: session.user.id,
    };
    try {
      const response = await fetch('/api/post/createPost', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      const content = await response.json();
      console.log('CONTENT', content);
      await router.push({
        pathname: '/mypage/posts',
        query: {
          published: true,
          draft: true,
          end: true,
        },
      });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { loading, submitData };
};
