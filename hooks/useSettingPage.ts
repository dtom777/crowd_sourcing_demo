import { signOut } from 'next-auth/client';
import { useState, useEffect, ChangeEvent } from 'react';
import { User } from '@prisma/client';
import { successToast } from '@/lib/toast';
import { Session } from 'next-auth';
import { data } from 'cypress/types/jquery';

type ErrorMessage = string | undefined;

type Inputs = {
  email: string;
  password: string;
  confirmationPassword: string;
};

type ReqBody = Omit<Inputs, 'confirmationPassword'>;

export const useSettingPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const deleteUser = async (data: Inputs) => {
    setLoading((prev) => !prev);

    try {
      const emailErrMsg = validateEmail(data.email);
      if (emailErrMsg) throw new Error(emailErrMsg);

      const passwordErrMsg = validatePassword({
        password: data.password,
        confirmationPassword: data.confirmationPassword,
      });
      if (passwordErrMsg) throw new Error(passwordErrMsg);

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
      setLoading((prev) => !prev);
    }
  };

  const validateEmail = (email: string): ErrorMessage => {
    if (!email || !email.includes('@')) return 'Invalid Data';

    return undefined;
  };

  const validatePassword = ({
    password,
    confirmationPassword,
  }: {
    password: string;
    confirmationPassword: string;
  }): ErrorMessage => {
    if (password !== confirmationPassword) return 'Password not matched';
    if (password.length < 8 || password.length > 12) return 'Password is short';
    if (confirmationPassword.length < 8 || confirmationPassword.length > 12)
      return 'ConfirmationPassword is short';

    return undefined;
  };

  return {
    loading,
    errorMessage,
    deleteUser,
  };
};
