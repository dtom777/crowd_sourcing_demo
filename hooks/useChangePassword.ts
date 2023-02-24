import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
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
  password: string;
  token: string;
};

export const useChangePassword = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();
  const dispatch = useAppDispatch();

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
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const changePassword: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      dispatch(loadingToggled());

      const { password } = data;

      try {
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
        dispatch(loadingToggled());
      }
    },
    [dispatch, router, token]
  );

  return {
    errorMessage,
    handleSubmit: originalHandleSubmit(changePassword),
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
