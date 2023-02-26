import { useRouter } from 'next/router';
import { useEffect, useState, memo, useCallback, VFC } from 'react';

import Cards from '@/components/elements/card/Cards';
import Pagination from '@/components/elements/pagination/Pagination';

import { PostWithUser } from 'types/post.type';

type Props = {
  posts: Array<PostWithUser>;
};

const Posts: VFC<Props> = ({ posts }) => {
  const router = useRouter();
  const { asPath } = useRouter();
  const [offset, setOffset] = useState<number>(0);
  const [slice, setSlice] = useState<Array<PostWithUser>>([]);
  const [perPage, setPerPage] = useState<number>(6);
  const [pageCount, setPageCount] = useState<number>(0);

  const handlePageClick = useCallback(
    (e): void => {
      const selectedPage = e.selected;
      setOffset(selectedPage * perPage);
    },
    [perPage]
  );

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const postData = posts?.slice(offset, offset + perPage);
      setSlice(postData);
      setPageCount(Math.ceil(posts.length / perPage));
    };
    getData();
  }, [offset, router.query, perPage, asPath, posts]);

  return (
    <>
      <Cards
        posts={slice}
        className='mr-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mr-0'
      />
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </>
  );
};

export default memo(Posts);
