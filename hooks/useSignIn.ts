import { signIn } from 'next-auth/client';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { convert } from 'utils/helper';

type ErrorMessage = string | undefined;

type Inputs = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const signInByCredentials: SubmitHandler<Inputs> = async (data) => {
    setLoading((prev) => !prev);

    const errMsg = validate(data);
    if (errMsg) {
      setErrorMessage(errMsg);

      return;
    }

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
        setLoading((prev) => !prev);
      });
  };

  const validate = (data: Inputs): ErrorMessage => {
    const { email, password } = data;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      return 'Invalid Data';
    }

    return undefined;
  };

  return {
    loading,
    errorMessage,
    handleSubmit: originalHandleSubmit(signInByCredentials),
    fieldValues: {
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
      email: errors.email,
      password: errors.password,
    },
  };
};
