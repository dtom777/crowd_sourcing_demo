import { useState } from 'react';
import { useRouter } from 'next/router';

type Query = {
  query?: string;
  categoryId?: string;
  rewardFree?: string;
};

export const useSearchPage = () => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  const toggleModal = (): void => {
    setShow(!show);
  };

  const { query, categoryId }: Pick<Query, 'query' | 'categoryId'> =
    router.query;
  let categoryName: string = '';
  switch (categoryId) {
    case '':
      categoryName = 'すべて';
      break;
    case '1':
      categoryName = '暮らし';
      break;
    case '2':
      categoryName = 'なまび';
      break;
    case '3':
      categoryName = 'ものづくり';
      break;
    case '4':
      categoryName = 'ランチ/雑談';
      break;
    case '5':
      categoryName = 'エンタメ';
      break;
    case '6':
      categoryName = 'こころ';
      break;
    case '7':
      categoryName = 'ビジネス';
      break;
    case '8':
      categoryName = 'キャリア';
      break;
    case '9':
      categoryName = '求人';
      break;
    case '10':
      categoryName = '求職';
      break;
  }

  return { show, query, categoryName, toggleModal };
};
