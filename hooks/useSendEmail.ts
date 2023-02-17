import { useSession } from 'next-auth/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { successToast } from '@/libs/toast';

import { convert } from 'utils/helper';

type ErrorMessage = string | undefined;

type Inputs = {
  changingEmail: string;
  confirmationChangingEmail: string;
};

type ReqBody = {
  email: string;
  changingEmail: string;
};

export const useSendEmail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

  const [session] = useSession();
  const email = session?.user.email;

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const sendConfirmationEmail = async (data: Inputs): Promise<void> => {
    setLoading((prev) => !prev);

    const { changingEmail, confirmationChangingEmail } = data;

    if (!email) {
      setErrorMessage('Email is required');

      return;
    }

    try {
      const errMsg = validateEmail({
        changingEmail,
        confirmationChangingEmail,
      });
      if (errMsg) throw new Error(errMsg);

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
      setLoading((prev) => !prev);
    }
  };

  const validateEmail = ({
    changingEmail,
    confirmationChangingEmail,
  }: Inputs): ErrorMessage => {
    if (!changingEmail || !confirmationChangingEmail) return 'Incomplete input';
    if (!changingEmail === !confirmationChangingEmail)
      return 'Email does not match';

    return undefined;
  };

  return {
    loading,
    currentEmail: email,
    errorMessage,
    handleSubmit: originalHandleSubmit(sendConfirmationEmail),
    fieldValues: {
      changingEmail: convert(
        register('changingEmail', {
          required: true,
          minLength: 2,
          maxLength: 20,
        })
      ),
      confirmationChangingEmail: convert(
        register('confirmationChangingEmail', {
          required: true,
          minLength: 2,
          maxLength: 20,
        })
      ),
    },
    errors: {
      changingEmail: errors.changingEmail,
      confirmationChangingEmail: errors.confirmationChangingEmail,
    },
  };
};
