import { categoriesLinkList } from 'constants/categoriesList';
import { useRouter } from 'next/router';
import { memo } from 'react';

const CategoryLabel = () => {
  const { asPath } = useRouter();
  const categoryName = categoriesLinkList.find((l) => l.link === asPath).name;

  return (
    <h1 className='text-2xl font-bold pl-4 pt-4'>{categoryName}のお仕事</h1>
  );
};

export default memo(CategoryLabel);
