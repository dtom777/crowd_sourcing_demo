import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const applyPost = async (data: { message: string }) => {
    setLoading((prev) => !prev);
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
      setLoading((prev) => !prev);
    }
  };

  return {
    loading,
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
