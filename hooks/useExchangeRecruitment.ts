import { useState } from 'react';
import { useRouter } from 'next/router';
import { successToast, errorToast } from '@/lib/toast';

export const useExchangeRecruitment = (session, post, user) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const sendMail = async (data: { message: string }, e): Promise<boolean> => {
    setLoading(true);
    if (!session) return await router.push('/auth/signin');
    const body = {
      ...data,
      // 応募者情報
      appUser: user,
      // 募集者情報
      post,
    };
    try {
      await fetch('/api/exchange/sendMessage', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      e.target.reset();
      successToast('メッセージ送信完了😸');
      setLoading(false);
    } catch (error) {
      errorToast(error.message);
      setLoading(false);
    }
  };

  return { loading, sendMail };
};
