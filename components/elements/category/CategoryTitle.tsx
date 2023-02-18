import { useRouter } from 'next/router';
import { memo } from 'react';

import { categories } from 'constants/category';

const CategoryTitle = () => {
  const { asPath } = useRouter();
  const category = categories.find((l) => l.link === asPath).slug;

  return (
    <h1 className='pl-4 pt-10 text-2xl font-bold'>{category.toUpperCase()}</h1>
  );
};

export default memo(CategoryTitle);
