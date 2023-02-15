import { useState } from 'react';
import { useRouter } from 'next/router';
import { successToast } from '@/libs/toast';
import { getAsString } from 'utils/getAsString';

type ErrorMessage = string | undefined;

type Inputs = {
  password: string;
  confirmationPassword: string;
};

type ReqBody = {
  password: string;
  token: string;
};

export const usePasswordChange = () => {
  const router = useRouter();
  const token = getAsString(router.query.token);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const changePassword = async (data: Inputs): Promise<void> => {
    setLoading((prev) => !prev);

    const { password, confirmationPassword } = data;

    try {
      const errMsg = validatePassword({ password, confirmationPassword });
      if (errMsg) throw new Error(errMsg);

      const body = { password, token };

      const res = await fetch('/api/password/change', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
      await router.push('/auth/signin');
      successToast('Password reset');
      setErrorMessage('');
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

  return { loading, errorMessage, changePassword };
};
