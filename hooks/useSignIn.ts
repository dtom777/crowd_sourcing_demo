import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/client';
import { useState, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch } from '@/stores/hooks';
import { loadingToggled } from '@/stores/loading-slice';

import { convert, resolve } from '@/utils/helper';

type ErrorMessage = string | undefined;

const schema = z
  .object({
    email: z.string().min(1),
    password: z.string().min(8).max(12),
  })
  .refine((data) => data.email.includes('@'), {
    message: 'Please enter email',
    path: ['email'],
  });

type Inputs = z.infer<typeof schema>;

export const useSignIn = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const signInByCredentials: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      dispatch(loadingToggled());

      const { email, password } = data;

      Promise.resolve(
        signIn('credentials', {
          redirect: false,
          email,
          password,
        })
      )
        .then((res) => {
          if (res?.error) setErrorMessage(res.error);
        })
        .catch((res) => {
          console.error(res);
        })
        .finally(() => {
          dispatch(loadingToggled());
        });
    },
    [dispatch]
  );

  return {
    errorMessage,
    handleSubmit: originalHandleSubmit(signInByCredentials),
    fieldValues: {
      email: convert(register('email')),
      password: convert(register('password')),
    },
    errors: {
      email: resolve(errors.email),
      password: resolve(errors.password),
    },
  };
};
