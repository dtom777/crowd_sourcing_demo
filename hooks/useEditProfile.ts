import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch } from '@/stores/hooks';
import { loadingToggled } from '@/stores/loading-slice';

import { successToast } from '@/libs/toast';

import { convert, resolve } from '@/utils/helper';

type ErrorMessage = string | undefined;

const schema = z.object({
  name: z.string().min(1),
  profile: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

export const useEditProfile = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const editProfile: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      dispatch(loadingToggled());

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
        setErrorMessage(err.message);
      } finally {
        dispatch(loadingToggled());
      }
    },
    [dispatch]
  );

  return {
    errorMessage,
    handleSubmit: originalHandleSubmit(editProfile),
    fieldValues: {
      name: convert(register('name')),
      profile: convert(register('profile')),
    },
    errors: {
      name: resolve(errors.name),
      profile: resolve(errors.profile),
    },
  };
};
