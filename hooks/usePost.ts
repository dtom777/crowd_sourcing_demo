import { zodResolver } from '@hookform/resolvers/zod';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { useEffect, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch } from '@/stores/hooks';
import { loadingToggled } from '@/stores/loading-slice';

import { successToast, errorToast } from '@/libs/toast';

import { convert, resolve } from '@/utils/helper';

type Props = {
  session: Session;
  type: 'CREATE' | 'UPDATE';
  post?: Post;
};

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1).max(255),
  categorySlug: z.string().min(1, { message: 'Please select' }),
  reward: z.number().min(1),
});

type Inputs = z.infer<typeof schema>;

type ReqBody = Inputs & { id?: string };

type ReqConfig = {
  uri: string;
  method: 'POST' | 'PUT' | '';
  body: ReqBody;
};

export const usePost = ({ session, type, post = undefined }: Props) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post?.title,
      content: post?.content,
      categorySlug: post?.categorySlug,
      reward: post?.reward,
    },
  });

  const upsertPost: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      dispatch(loadingToggled());

      const config: ReqConfig = {
        uri: '',
        method: '',
        body: { ...data, reward: Number(data.reward) },
      };

      if (type === 'CREATE') {
        config.uri = '/api/post/create';
        config.method = 'POST';
      } else if (type === 'UPDATE') {
        config.uri = '/api/post/update';
        config.method = 'PUT';
        config.body = { ...config.body, id: post?.id };
      }

      try {
        const isValid = validate({ data: config.body, type });
        if (!isValid) throw new Error('Invalid Data');

        const { uri, method, body } = config;

        const res = await fetch(uri, {
          method,
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed');

        const post: Post = await res.json();

        await router.push({
          pathname: `/posts/${post.id}`,
        });
        successToast('Success!');
      } catch (err) {
        console.error(err);
        errorToast('Failed');
      } finally {
        dispatch(loadingToggled());
      }
    },
    [dispatch, post?.id, router, type]
  );

  const validate = ({
    data,
    type,
  }: {
    data: ReqBody;
    type: Props['type'];
  }): boolean => {
    const { id } = data;
    if (type === 'UPDATE') if (!id) return false;

    return true;
  };

  useEffect(() => {
    if (!session) {
      errorToast('Signin required');

      const redirect = () => {
        router.push('/auth/signin');
      };
      setTimeout(redirect, 2000);
    }
  }, [router, session]);

  return {
    handleSubmit: originalHandleSubmit(upsertPost),
    fieldValues: {
      title: convert(register('title')),
      content: convert(register('content')),
      categorySlug: convert(register('categorySlug')),
      reward: convert(register('reward', { valueAsNumber: true })),
    },
    errors: {
      title: resolve(errors.title),
      content: resolve(errors.content),
      categorySlug: resolve(errors.categorySlug),
      reward: resolve(errors.reward),
    },
  };
};
