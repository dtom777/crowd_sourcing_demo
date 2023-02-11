import { signOut } from 'next-auth/client';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import { successToast } from '@/lib/toast';
import { Session } from 'next-auth';

export const useSettingPage = (session: Session) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [twitter, setTwitter] = useState<string>('');
  const [facebook, setFacebook] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const updateTwitter = (e: ChangeEvent<HTMLInputElement>) =>
    setTwitter(e.target.value);

  const updateFacebook = (e: ChangeEvent<HTMLInputElement>) =>
    setFacebook(e.target.value);

  const submitEmailData = async (e: {
    preventDefault: () => void;
  }): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    if (!email || !email.includes('@')) {
      setErrorMessage('データが正しくありません。');

      return setLoading(false);
    }
    const body: Pick<User, 'id' | 'email'> = { id: session.user.id, email };
    try {
      await fetch('/api/user/snsRegister', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      successToast('Email登録完了😼');
      setLoading(false);
      const reload = () => {
        router.reload();
      };
      setTimeout(reload, 2000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const submitTwitterData = async (e: {
    preventDefault: () => void;
  }): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    if (!twitter) {
      return;
    }
    const body: Pick<User, 'id' | 'twitter'> = { id: session.user.id, twitter };
    try {
      const response = await fetch('/api/user/snsRegister', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      const content = await response.json();
      if (content.message) {
        setLoading(false);

        return setErrorMessage(content.message);
      } else {
        successToast('Twitter連携完了😼');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const submitFacebookData = async (e: {
    preventDefault: () => void;
  }): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    if (!facebook) {
      return;
    }
    const body: Pick<User, 'id' | 'facebook'> = {
      id: session.user.id,
      facebook,
    };
    try {
      await fetch('/api/user/snsRegister', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      successToast('Facebook連携完了😼');
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteUser = async (data: {
    email: string;
    password: string;
    confirmationPassword: string;
  }) => {
    setLoading(true);
    const { password, confirmationPassword } = data;
    if (password !== confirmationPassword) {
      setLoading(false);

      return setErrorMessage('パスワードが一致していません');
    }
    const body: Pick<User, 'email' | 'password'> = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await fetch('/api/user/deleteUser', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      const content = await response.json();
      if (content.message === 'true') {
        setLoading(false);
        successToast('またのご利用をお願いします🙇‍♂️');
        setTimeout(signOut, 2000);
      } else {
        setLoading(false);

        return setErrorMessage(content.message);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setErrorMessage('');
  }, [email]);

  return {
    loading,
    isOpen,
    errorMessage,
    openModal,
    closeModal,
    updateEmail,
    updateTwitter,
    updateFacebook,
    submitEmailData,
    submitTwitterData,
    submitFacebookData,
    deleteUser,
  };
};
