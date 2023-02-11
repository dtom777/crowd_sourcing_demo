import { useState } from 'react';
import { successToast } from '@/lib/toast';

export const useEmailSetting = (id, name, email) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const submitData = async (data: {
    changeEmail: string;
    confirmationChangeEmail: string;
  }): Promise<void> => {
    setLoading(true);
    const { changeEmail, confirmationChangeEmail } = data;
    if (changeEmail !== confirmationChangeEmail) {
      setLoading(false);

      return setErrorMessage('メールアドレスが一致していません');
    }
    try {
      const body: {
        id: string;
        name: string;
        email: string;
        changeEmail: string;
      } = { id, name, email, changeEmail };
      await fetch('/api/user/changeEmail', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      successToast('現在のメールアドレスにメッセージを送信しました。');
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return { loading, errorMessage, submitData };
};
