import { useState } from 'react';
import { successToast } from '@/libs/toast';

type ErrorMessage = string | undefined;

type Inputs = {
  changingEmail: string;
  confirmationChangingEmail: string;
};

type ReqBody = {
  email: string;
  changingEmail: string;
};

export const useEmailSetting = (email) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

  const sendConfirmationEmail = async (data: Inputs): Promise<void> => {
    setLoading((prev) => !prev);

    const { changingEmail, confirmationChangingEmail } = data;

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
  }): ErrorMessage => {
    if (!changingEmail || !confirmationChangingEmail) return 'Incomplete input';
    if (!changingEmail === !confirmationChangingEmail)
      return 'Email does not match';

    return undefined;
  };

  return { loading, errorMessage, sendConfirmationEmail };
};
