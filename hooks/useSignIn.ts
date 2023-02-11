import { signIn } from 'next-auth/client';
import { useEffect, useState } from 'react';

export const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const signInByEmailAndPassword = async (data: {
    email: string;
    password: string;
  }): Promise<void> => {
    setLoading(true);
    const { email, password } = data;
    Promise.resolve(
      signIn('credentials', {
        redirect: false,
        email,
        password,
      })
    )
      .then((res) => {
        setLoading(false);
        setErrorMessage(res.error);
      })
      .catch((res) => {
        setLoading(false);
        setErrorMessage(res.error);
      });
  };

  // error解決
  // Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return { loading, errorMessage, signInByEmailAndPassword };
};
