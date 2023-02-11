import { useState } from 'react';
import { successToast } from '@/lib/toast';

export const usePasswordReset = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const resetPassword = async (data: { email: string }): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/resetPassword', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      const content = await response.json();
      if (content.message === 'このメールアドレスは登録されていません') {
        setLoading(false);

        return setErrorMessage(content.message);
      } else {
        successToast(
          'メールアドレスにパスワード再設定のメッセージを送信しました。'
        );
        setErrorMessage('');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { loading, errorMessage, resetPassword };
};
