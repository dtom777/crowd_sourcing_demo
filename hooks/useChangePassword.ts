import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { successToast } from '@/libs/toast';

import { getAsString } from 'utils/getAsString';
import { convert } from 'utils/helper';

type ErrorMessage = string | undefined;

type Inputs = {
  password: string;
  confirmationPassword: string;
};

type ReqBody = {
  password: string;
  token: string;
};

export const useChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();
  const token = getAsString(router.query.token || '');
  // TODO validate token

  useEffect(() => {
    if (!token) setErrorMessage('This URL is invalid');
  }, [token]);

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const changePassword: SubmitHandler<Inputs> = async (data) => {
    setLoading((prev) => !prev);

    const { password, confirmationPassword } = data;

    try {
      const errMsg = validatePassword({ password, confirmationPassword });
      if (errMsg) throw new Error(errMsg);

      const body: ReqBody = { password, token };

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
  }: Inputs): ErrorMessage => {
    if (!password || !confirmationPassword) return 'Incomplete input';
    if (!password === !confirmationPassword) return 'Password does not match';

    return undefined;
  };

  return {
    loading,
    errorMessage,
    handleSubmit: originalHandleSubmit(changePassword),
    fieldValues: {
      password: convert(
        register('password', {
          required: true,
          minLength: 8,
          maxLength: 12,
        })
      ),
      confirmationPassword: convert(
        register('confirmationPassword', {
          required: true,
          minLength: 8,
          maxLength: 12,
        })
      ),
    },
    errors: {
      password: errors.password,
      confirmationPassword: errors.confirmationPassword,
    },
  };
};