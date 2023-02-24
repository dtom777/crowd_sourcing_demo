import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/client';
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
    changingEmail: z.string().min(1),
    confirmationChangingEmail: z.string().min(1),
  })
  .refine(
    (data) =>
      data.changingEmail.includes('@') &&
      data.confirmationChangingEmail.includes('@'),
    {
      message: 'Please enter email',
      path: ['email'],
    }
  )
  .refine((data) => data.changingEmail === data.confirmationChangingEmail, {
    message: 'Email does not match',
    path: ['confirmationChangingEmail'],
  });

type Inputs = z.infer<typeof schema>;

type ReqBody = {
  email: string;
  changingEmail: string;
};

export const useSendEmail = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

  const dispatch = useAppDispatch();

  const [session] = useSession();
  const email = session?.user.email;

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const sendConfirmationEmail: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      dispatch(loadingToggled());

      const { changingEmail } = data;

      if (!email) {
        setErrorMessage('Email is required');

        return;
      }

      try {
        const body: ReqBody = { email, changingEmail };

        const res = await fetch('/api/email/change', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message);
        }
        successToast(
          'A confirmation message has been sent to your current email'
        );
      } catch (err) {
        console.error(err.message);
        setErrorMessage(err.message);
      } finally {
        dispatch(loadingToggled());
      }
    },
    [dispatch, email]
  );

  return {
    currentEmail: email,
    errorMessage,
    handleSubmit: originalHandleSubmit(sendConfirmationEmail),
    fieldValues: {
      changingEmail: convert(register('changingEmail')),
      confirmationChangingEmail: convert(register('confirmationChangingEmail')),
    },
    errors: {
      changingEmail: resolve(errors.changingEmail),
      confirmationChangingEmail: resolve(errors.confirmationChangingEmail),
    },
  };
};
