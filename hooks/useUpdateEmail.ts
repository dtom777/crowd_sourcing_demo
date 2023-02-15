import { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import { successToast } from '@/libs/toast';

type ErrorMessage = string | undefined;

type Inputs = {
  password: string;
  confirmationPassword: string;
};

export const useUpdateEmail = () => {
  const router = useRouter();

  // TODO router queryがない場合リダイレクト

  // 暗号化されたEmail
  const encryptedEmail = router.query.email;
  const encryptedChangeEmail = router.query.changeEmail;
  const expiration = router.query.expires;

  // TODO changeEmail → changingEmail
  // const { email, changingEmail, expires } = router.query;

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

  const changeEmail = async (data: Inputs): Promise<void> => {
    setLoading((prev) => !prev);

    const { password, confirmationPassword } = data;

    try {
      const errMsg = validatePassword({ password, confirmationPassword });
      if (errMsg) throw new Error(errMsg);

      const body = {
        encryptedEmail,
        encryptedChangeEmail,
        password,
        expiration,
      };
      const res = await fetch('/api/email/change', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      successToast('Email change complete! Please signin again');
      const reSignIn = async () => {
        await signOut({ callbackUrl: '/auth/signin' });
      };
      setTimeout(reSignIn, 1500);
    } catch (err) {
      console.error(err.message);
      setErrorMessage(err.message);
    } finally {
      setLoading((prev) => !prev);
    }
  };

  const validatePassword = ({
    password,
    confirmationPassword,
  }): ErrorMessage => {
    if (!password || !confirmationPassword) return 'Incomplete input';
    if (!password === !confirmationPassword) return 'Password does not match';

    return undefined;
  };

  return { loading, errorMessage, changeEmail };
};
