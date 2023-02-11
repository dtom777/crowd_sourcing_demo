import { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import { successToast } from '@/lib/toast';

export const useUpdateEmail = () => {
  const router = useRouter();

  // 暗号化されたEmail
  const encryptedEmail = router.query.email;
  const encryptedChangeEmail = router.query.changeEmail;
  const expiration = router.query.expires;

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const submitData = async (data: {
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
      const body: {
        encryptedEmail: string | string[];
        encryptedChangeEmail: string | string[];
        password: string;
        expiration: string | string[];
      } = {
        encryptedEmail,
        encryptedChangeEmail,
        password,
        expiration,
      };
      const response = await fetch('/api/user/changeEmail', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      const content = await response.json();
      console.log('CONTENT', content);
      if (content.message) {
        setLoading(false);

        return setErrorMessage(content.message);
      } else {
        successToast('メールアドレス変更完了!再度ログインしてください');
        const reSignIn = async () => {
          await signOut({ callbackUrl: '/auth/signin' });
        };
        setTimeout(reSignIn, 1500);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);

      return setErrorMessage('入力内容に誤りがあります');
    }
  };

  return { loading, errorMessage, submitData };
};
