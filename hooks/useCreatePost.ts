import { CreatePost } from 'types/post.type';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { successToast, errorToast } from '@/lib/toast';

export const useUpsertPost = ({ session, type, post = undefined }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const upsertPost = async (data): Promise<void> => {
    setLoading((prev) => !prev);

    const reqConfig = {
      uri: '',
      method: '',
      body: { ...data, reward: Number(data.reward) },
    };

    if (type === 'CREATE') {
      reqConfig.uri = '/api/post/create';
      reqConfig.method = 'POST';
    } else if (type === 'UPDATE') {
      reqConfig.uri = '/api/post/update';
      reqConfig.method = 'PUT';
      reqConfig.body = { ...reqConfig.body, id: post.id };
    }

    try {
      const isValid = validate({ data: reqConfig.body, type });
      if (!isValid) throw new Error('Invalid Data');

      const { uri, method, body } = reqConfig;

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
      setLoading((prev) => !prev);
    }
  };

  const validate = ({ data, type }): boolean => {
    console.log(data, type);
    const { title, content, categorySlug, reward, id = undefined } = data;

    if (type === 'UPDATE') if (!id) return false;
    if (!title || !content || !categorySlug || !reward) return false;
    if (isNaN(Number(reward))) return false;
    // TODO　型判定はzod

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

  return { loading, upsertPost };
};
