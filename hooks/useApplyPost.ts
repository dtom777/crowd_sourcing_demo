import { useState } from 'react';
import { useRouter } from 'next/router';
import { errorToast, successToast } from '@/libs/toast';
import { Message } from 'react-hook-form';

type RequestBody = {
  message: string;
  postId: string;
};

export const useApplyPost = (post) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const applyPost = async (data: { message: string }) => {
    setLoading((prev) => !prev);
    const body: RequestBody = {
      ...data,
      postId: post.id,
    };

    try {
      await fetch('/api/post/apply', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      await router.push('/mypage');
      successToast('Success!');
    } catch (err) {
      console.error(err);
      errorToast('Failed');
    } finally {
      setLoading((prev) => !prev);
    }
  };

  return { loading, sendMail: applyPost };
};
