import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/client';
import { ChangeEvent, useState, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch } from '@/stores/hooks';
import { loadingToggled } from '@/stores/loading-slice';

import { convert, resolve } from '@/utils/helper';

type ErrorMessage = string | undefined;

const schema = z
  .object({
    image: z.string().min(1),
    name: z.string().min(1),
    email: z.string().min(1),
    password: z.string().min(8).max(12),
  })
  .refine((data) => data.email.includes('@'), {
    message: 'Please enter email',
    path: ['email'],
  });

type Inputs = z.infer<typeof schema>;

export const useSignUp = () => {
  const [image, setImage] = useState<string>('/avatar-default.png');
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const updateImage = (e: ChangeEvent<HTMLSelectElement>) =>
    setImage(e.target.value);

  const signUp: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      dispatch(loadingToggled());

      try {
        const body = { ...data, image };
        const res = await fetch('/api/user/create', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message);
        }

        setErrorMessage('');
        await signIn('credentials', {
          callbackUrl: '/',
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        console.error(err.message);
        setErrorMessage(err.message);
      } finally {
        dispatch(loadingToggled());
      }
    },
    [dispatch, image]
  );

  return {
    image,
    errorMessage,
    updateImage,
    handleSubmit: originalHandleSubmit(signUp),
    fieldValues: {
      image: convert(register('image')),
      name: convert(register('name')),
      email: convert(register('email')),
      password: convert(register('password')),
    },
    errors: {
      image: resolve(errors.image),
      name: resolve(errors.name),
      email: resolve(errors.email),
      password: resolve(errors.password),
    },
  };
};
