import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch } from '@/stores/hooks';
import { loadingToggled } from '@/stores/loading-slice';

import { successToast } from '@/libs/toast';

import { convert, resolve } from '@/utils/helper';

type ErrorMessage = string | undefined;

const schema = z
  .object({
    email: z.string().min(1),
  })
  .refine((data) => data.email.includes('@'), {
    message: 'Please enter email',
    path: ['email'],
  });

type Inputs = z.infer<typeof schema>;

export const useResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const resetPassword: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      dispatch(loadingToggled());

      try {
        const res = await fetch('/api/password/reset', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message);
        }
        successToast(
          'A password reset message was sent to your email address.'
        );
        setErrorMessage('');
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
    handleSubmit: originalHandleSubmit(resetPassword),
    fieldValues: {
      email: convert(register('email')),
    },
    errors: {
      email: resolve(errors.email),
    },
  };
};
