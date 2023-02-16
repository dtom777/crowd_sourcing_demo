import { signIn } from 'next-auth/client';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { convert } from 'utils/helper';

type ErrorMessage = string | undefined;

type Inputs = {
  image: string;
  name: string;
  email: string;
  password: string;
};

export const useSignUp = () => {
  const [image, setImage] = useState<string>('/avatar-default.png');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const updateImage = (e: ChangeEvent<HTMLSelectElement>) =>
    setImage(e.target.value);

  // TODO add validation
  const signUp = async (data: Inputs): Promise<void> => {
    setLoading(true);
    const { name, email, password } = data;
    if (!image || !name || !email || !password) {
      return;
    }
    try {
      const body = { image, name, email, password };
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
        email,
        password,
      });
    } catch (err) {
      console.error(err.message);
      setErrorMessage(err.message);
    } finally {
      setLoading((prev) => !prev);
    }
  };

  return {
    image,
    loading,
    errorMessage,
    updateImage,
    handleSubmit: originalHandleSubmit(signUp),
    fieldValues: {
      image: convert(
        register('image', {
          required: true,
        })
      ),
      name: convert(
        register('name', {
          required: true,
          minLength: 2,
          maxLength: 20,
        })
      ),
      email: convert(
        register('email', {
          required: true,
        })
      ),
      password: convert(
        register('password', {
          required: true,
          minLength: 8,
          maxLength: 12,
        })
      ),
    },
    errors: {
      image: errors.image,
      name: errors.name,
      email: errors.email,
      password: errors.password,
    },
  };
};
