import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { errorToast, successToast } from '@/libs/toast';

import { convert } from 'utils/helper';

type ErrorMessage = string | undefined;

type Inputs = {
  name: string;
  profile?: string;
};

export const useEditProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const editProfile: SubmitHandler<Inputs> = async (data) => {
    setLoading((prev) => !prev);

    const errMsg = validate(data);
    if (errMsg) {
      setErrorMessage(errMsg);

      return;
    }

    try {
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed');

      successToast('Success!');
    } catch (err) {
      console.error(err);
      errorToast('Failed');
    } finally {
      setLoading((prev) => !prev);
    }
  };

  const validate = (data: Inputs): ErrorMessage => {
    const { name } = data;
    if (!name) return 'Please enter';

    return undefined;
  };

  return {
    loading,
    errorMessage,
    handleSubmit: originalHandleSubmit(editProfile),
    fieldValues: {
      name: convert(
        register('name', {
          required: true,
          minLength: 2,
          maxLength: 20,
        })
      ),
      profile: convert(
        register('profile', {
          maxLength: 255,
        })
      ),
    },
    errors: {
      name: errors.name,
      profile: errors.profile,
    },
  };
};
