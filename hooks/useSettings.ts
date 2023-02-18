import { signOut } from 'next-auth/client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from '@/stores/hooks';
import { loadingToggled } from '@/stores/loading-slice';

import { successToast } from '@/libs/toast';

import { convert } from 'utils/helper';

type ErrorMessage = string | undefined;

type Inputs = {
  email: string;
  password: string;
  confirmationPassword: string;
};

type ReqBody = Omit<Inputs, 'confirmationPassword'>;

export const useSettings = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const deleteUser: SubmitHandler<Inputs> = async (data) => {
    dispatch(loadingToggled());

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
      dispatch(loadingToggled());
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
    errorMessage,
    handleSubmit: originalHandleSubmit(deleteUser),
    fieldValues: {
      email: convert(register('email', { required: true })),
      password: convert(
        register('password', {
          required: true,
          minLength: 8,
          maxLength: 12,
        })
      ),
      confirmationPassword: convert(
        register('confirmationPassword', {
          required: true,
          minLength: 8,
          maxLength: 12,
        })
      ),
    },
    errors: {
      email: errors.email,
      password: errors.password,
      confirmationPassword: errors.confirmationPassword,
    },
  };
};
