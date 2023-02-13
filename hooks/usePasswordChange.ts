import { useState } from 'react';
import { useRouter } from 'next/router';
import { successToast } from '@/lib/toast';
import { getAsString } from 'utils/getAsString';

export const usePasswordChange = () => {
  const router = useRouter();
  const passwordToken = getAsString(router.query.token);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const changePassword = async (data: {
    password: string;
    confirmationPassword: string;
  }): Promise<void> => {
    setLoading(true);
    const { password, confirmationPassword } = data;
    if (password !== confirmationPassword) {
      setLoading(false);

      return setErrorMessage('パスワードが一致していません');
    }

    try {
      const body = {
        password,
        passwordToken,
      };
      const response = await fetch('/api/password/change', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      const content = await response.json();
      console.log('CONTENT', content);
      if (
        content.message === 'このURLは有効期限切れです' ||
        content.message === 'URLが間違っています。'
      ) {
        setLoading(false);

        return setErrorMessage(content.message);
      } else {
        await router.push('/auth/signin');
        successToast('パスワードを再設定しました');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

      return setErrorMessage('入力内容に誤りがあります');
    }
  };

  return { loading, errorMessage, changePassword };
};
