import { ChangeEvent, useState } from 'react';
import { signIn } from 'next-auth/client';

export const useSignUp = () => {
  const [image, setImage] = useState<string>('/avatar-default.png');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const updateImage = (e: ChangeEvent<HTMLSelectElement>) =>
    setImage(e.target.value);

  const submitData = async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> => {
    setLoading(true);
    const { name, email, password } = data;
    if (!image || !name || !email || !password) {
      return;
    }
    try {
      const body = { image, name, email, password };
      const response = await fetch('/api/user/create', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      const content = await response.json();
      if (content.message) {
        setLoading(false);

        return setErrorMessage(content.message);
      } else {
        await signIn('credentials', {
          callbackUrl: '/',
          email,
          password,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { image, loading, errorMessage, updateImage, submitData };
};
