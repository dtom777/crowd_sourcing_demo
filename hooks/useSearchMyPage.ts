import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSearchMyPage = () => {
  const router = useRouter();
  const { query, published, draft, end } = router.query;
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const searchPosts = async (data: {
    published: boolean;
    draft: boolean;
    end: boolean;
  }): Promise<void> => {
    const { published, draft, end } = data;
    if (published === false && draft === false && end === false) {
      return setErrorMessage(true);
    }
    router.push({
      pathname: '/mypage/posts',
      query: { ...data },
    });
    setErrorMessage(false);
  };

  return { query, published, draft, end, errorMessage, searchPosts };
};
