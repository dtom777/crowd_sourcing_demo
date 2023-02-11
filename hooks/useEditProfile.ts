import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { successToast } from '@/lib/toast';

export const useEditProfile = (id, image) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [img, setImg] = useState<string>(image);

  const updateImg = (e: ChangeEvent<HTMLSelectElement>) =>
    setImg(e.target.value);

  const reload = () => {
    router.reload();
  };
  const submitData = async (data: {
    image: string;
    name: string;
    profile: string;
  }): Promise<void> => {
    setLoading(true);
    const { name } = data;
    if (!name) {
      return;
    }
    try {
      const body: {
        image: string;
        name: string;
        profile: string;
        id: string;
      } = { id, ...data };
      await fetch('/api/user/updateUser', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      successToast('変更完了😼');
      setTimeout(reload, 1000);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return { loading, img, updateImg, submitData };
};
