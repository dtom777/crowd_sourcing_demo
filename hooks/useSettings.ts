import { zodResolver } from '@hookform/resolvers/zod';
import { signOut } from 'next-auth/client';
import { useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch } from '@/stores/hooks';
import { loadingToggled } from '@/stores/loading-slice';

import { successToast } from '@/libs/toast';

import { convert, resolve } from '@/utils/helper';

type ErrorMessage = string | undefined;

const schema = z
  .object({
    email: z.string().min(1),
    password: z.string().min(8).max(12),
    confirmationPassword: z.string().min(8).max(12),
  })
  .refine((data) => data.email.includes('@'), {
    message: 'Please enter email',
    path: ['email'],
  })
  .refine((data) => data.password === data.confirmationPassword, {
    message: 'Password does not match',
    path: ['confirmationPassword'],
  });

type Inputs = z.infer<typeof schema>;

type ReqBody = Omit<Inputs, 'confirmationPassword'>;

export const useSettings = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const deleteUser: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      dispatch(loadingToggled());

      try {
        const body: ReqBody = {
          email: data.email,
          password: data.password,
        };

        const res = await fetch('/api/user/delete', {
          method: 'DELETE',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message);
        }

        successToast('We hope to see you again!');
        setTimeout(signOut, 2000);
      } catch (err) {
        console.error(err.message);
        setErrorMessage(err.message);
      } finally {
        dispatch(loadingToggled());
      }
    },
    [dispatch]
  );

  return {
    errorMessage,
    handleSubmit: originalHandleSubmit(deleteUser),
    fieldValues: {
      email: convert(register('email')),
      password: convert(register('password')),
      confirmationPassword: convert(register('confirmationPassword')),
    },
    errors: {
      email: resolve(errors.email),
      password: resolve(errors.password),
      confirmationPassword: resolve(errors.confirmationPassword),
    },
  };
};
