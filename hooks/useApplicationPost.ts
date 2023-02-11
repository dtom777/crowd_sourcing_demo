import { useState } from 'react';
import { useRouter } from 'next/router';
import { errorToast, successToast } from '@/lib/toast';

type Message = {
  message: string;
  name: string;
  email: string;
  postId: string;
};

export const useApplicationPost = (user, post) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const sendMail = async (
    data: { message: string },
    e: { target: { reset: () => void } }
  ) => {
    setLoading(true);
    if (!user) {
      await router.push('/auth/signin');
    } else if (!user.email) {
      errorToast('Emailが設定されていません。マイページから設定してください');
      const redirect = async () => {
        await router.push('/mypage/setting');
      };
      setTimeout(redirect, 2000);
    } else {
      const body: Message = {
        ...data,
        name: user.name,
        email: user.email,
        postId: post.id,
      };
      try {
        await fetch('/api/exchange/sendApplication', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
        e.target.reset();
        await router.push('/mypage');
        successToast('応募完了😸');
        setLoading(false);
      } catch (error) {
        errorToast(error.message);
        setLoading(false);
      }
    }
  };

  return { loading, sendMail };
};
