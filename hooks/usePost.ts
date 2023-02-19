import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { useEffect, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/stores/hooks';
import { loadingToggled } from '@/stores/loading-slice';

import { successToast, errorToast } from '@/libs/toast';

import { convert } from 'utils/helper';

type Props = {
  session: Session;
  type: 'CREATE' | 'UPDATE';
  post?: Post;
};

type Inputs = {
  title: string;
  content: string;
  categorySlug: string;
  reward: number;
};

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

        await router.push({
          pathname: '/mypage/posts',
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
    const { title, content, categorySlug, reward, id = undefined } = data;

    if (type === 'UPDATE') if (!id) return false;
    if (!title || !content || !categorySlug || !reward) return false;
    if (isNaN(Number(reward))) return false;
    // TODO　型判定はzodを追加

    return true;
  };

  useEffect(() => {
    if (!session) {
      errorToast('募集するには、会員登録が必要です');

      const redirect = () => {
        router.push('/mypage/settings');
      };
      setTimeout(redirect, 2000);
    }
  }, [router, session]);

  return {
    handleSubmit: originalHandleSubmit(upsertPost),
    fieldValues: {
      title: convert(register('title', { required: true })),
      content: convert(
        register('content', {
          required: true,
          minLength: 1,
          maxLength: 255,
        })
      ),
      categorySlug: convert(register('categorySlug', { required: true })),
      reward: convert(register('reward', { required: true })),
    },
    errors: {
      title: errors.title,
      content: errors.content,
      categorySlug: errors.categorySlug,
      reward: errors.reward,
    },
  };
};
