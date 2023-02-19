import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/stores/hooks';
import { loadingToggled } from '@/stores/loading-slice';

import { errorToast, successToast } from '@/libs/toast';

import { convert } from 'utils/helper';

type Inputs = {
  message: string;
};

type RequestBody = {
  message: string;
  postId: string;
};

export const useApplyPost = (post: { id: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const applyPost: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      dispatch(loadingToggled());
      const body: RequestBody = {
        ...data,
        postId: post.id,
      };

      try {
        await fetch('/api/post/apply', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
        await router.push('/mypage');
        successToast('Success!');
      } catch (err) {
        console.error(err);
        errorToast('Failed');
      } finally {
        dispatch(loadingToggled());
      }
    },
    [dispatch, post.id, router]
  );

  return {
    handleSubmit: originalHandleSubmit(applyPost),
    fieldValues: {
      message: convert(
        register('message', {
          required: true,
          maxLength: 1000,
        })
      ),
    },
    errors: {
      message: errors.message,
    },
  };
};
