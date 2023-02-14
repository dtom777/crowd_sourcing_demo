import { useState } from 'react';
import { successToast } from '@/lib/toast';
import { response } from 'msw';

type ErrorMessage = string | undefined;

type Input = {
  email: string;
};

type ReqBody = {
  email: string;
};

export const usePasswordReset = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

  const resetPassword = async (data: Input): Promise<void> => {
    setLoading((prev) => !prev);

    const { email } = data;

    try {
      const errMsg = validateEmail(email);
      if (errMsg) throw new Error(errMsg);

      const res = await fetch('/api/password/reset', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
      successToast('A password reset message was sent to your email address.');
      setErrorMessage('');
    } catch (err) {
      console.error(err.message);
      setErrorMessage(err.message);
    } finally {
      setLoading((prev) => !prev);
    }
  };

  const validateEmail = (email): ErrorMessage => {
    if (!email) return 'Please enter';
    if (!email.includes('@')) return 'Please enter email';

    return undefined;
  };

  return { loading, errorMessage, resetPassword };
};
