import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/stores/hooks';
import { loadingToggled } from '@/stores/loading-slice';

import { successToast } from '@/libs/toast';

import { convert } from 'utils/helper';

type ErrorMessage = string | undefined;

type Inputs = {
  email: string;
};

export const useResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const resetPassword: SubmitHandler<Inputs> = async (data) => {
    dispatch(loadingToggled());

    const { email } = data;

    try {
      const errMsg = validateEmail(email);
      if (errMsg) throw new Error(errMsg);

      const res = await fetch('/api/password/reset', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
      successToast('A password reset message was sent to your email address.');
      setErrorMessage('');
    } catch (err) {
      console.error(err.message);
      setErrorMessage(err.message);
    } finally {
      dispatch(loadingToggled());
    }
  };

  const validateEmail = (email: Inputs['email']): ErrorMessage => {
    if (!email) return 'Please enter';
    if (!email.includes('@')) return 'Please enter email';

    return undefined;
  };

  return {
    errorMessage,
    handleSubmit: originalHandleSubmit(resetPassword),
    fieldValues: {
      email: convert(
        register('email', {
          required: true,
        })
      ),
    },
    errors: {
      email: errors.email,
    },
  };
};
