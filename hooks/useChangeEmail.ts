import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import { useState, useEffect, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch } from '@/stores/hooks';
import { loadingToggled } from '@/stores/loading-slice';

import { successToast } from '@/libs/toast';

import { getAsString, convert, resolve } from '@/utils/helper';

type ErrorMessage = string | undefined;

const schema = z
  .object({
    password: z.string().min(8).max(12),
    confirmationPassword: z.string().min(8).max(12),
  })
  .refine((data) => data.password === data.confirmationPassword, {
    message: 'Password does not match',
    path: ['confirmationPassword'],
  });

type Inputs = z.infer<typeof schema>;

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
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const changeEmail: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      dispatch(loadingToggled());

      const { password } = data;

      try {
        // TODO validate !encryptedEmail || !encryptedChangingEmail || !expires

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
    },
    [dispatch, encryptedChangingEmail, encryptedEmail, expires]
  );

  return {
    errorMessage,
    handleSubmit: originalHandleSubmit(changeEmail),
    fieldValues: {
      password: convert(register('password')),
      confirmationPassword: convert(register('confirmationPassword')),
    },
    errors: {
      password: resolve(errors.password),
      confirmationPassword: resolve(errors.confirmationPassword),
    },
  };
};
