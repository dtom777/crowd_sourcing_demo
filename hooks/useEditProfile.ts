import { useState } from 'react';
import { errorToast, successToast } from '@/libs/toast';

type SubmitData = {
  name: string;
  profile?: string;
};

export const useEditProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateUser = async (data: SubmitData): Promise<void> => {
    setLoading((prev) => !prev);
    try {
      const isValid = validate(data);
      if (!isValid) throw new Error('Invalid Data');

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

  const validate = (data: SubmitData): boolean => {
    const { name } = data;
    if (!name) return false;
    // TODO　型判定はzod

    return true;
  };

  return { loading, updateUser };
};
