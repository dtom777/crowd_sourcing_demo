import { categories } from 'constants/category';
import { useRouter } from 'next/router';
import { memo } from 'react';

const CategoryLabel = () => {
  const { asPath } = useRouter();
  const category = categories.find((l) => l.link === asPath).slug;

  return (
    <h1 className='text-2xl font-bold pl-4 pt-10'>{category.toUpperCase()}</h1>
  );
};

export default memo(CategoryLabel);
