import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/stores/hooks';
import { loadingToggled } from '@/stores/loading-slice';

import { successToast } from '@/libs/toast';

import { convert } from 'utils/helper';

import { getAsString } from '../utils/helper';

type ErrorMessage = string | undefined;

type Inputs = {
  password: string;
  confirmationPassword: string;
};

type ReqBody = {
  encryptedEmail: string;
  encryptedChangingEmail: string;
  password: string;
  expires: string;
};

export const useChangeEmail = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

  const dispatch = useAppDispatch();

  const router = useRouter();
  const encryptedEmail = getAsString(router.query.email || '');
  const encryptedChangingEmail = getAsString(router.query.changingEmail || '');
  const expires = getAsString(router.query.expires || '');

  useEffect(() => {
    if (!encryptedEmail || !encryptedChangingEmail || !expires) {
      setErrorMessage('This page is invalid');
    }
  }, [encryptedChangingEmail, encryptedEmail, expires]);

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const changeEmail: SubmitHandler<Inputs> = async (data) => {
    dispatch(loadingToggled());

    const { password, confirmationPassword } = data;

    try {
      // TODO validate !encryptedEmail || !encryptedChangingEmail || !expires

      const errMsg = validatePassword({ password, confirmationPassword });
      if (errMsg) throw new Error(errMsg);

      const body: ReqBody = {
        encryptedEmail,
        encryptedChangingEmail,
        password,
        expires,
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
      dispatch(loadingToggled());
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
    errorMessage,
    handleSubmit: originalHandleSubmit(changeEmail),
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
