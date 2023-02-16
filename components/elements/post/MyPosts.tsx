import { useRouter } from 'next/router';
import { useEffect, useState, memo, useCallback, VFC } from 'react';

import Pagination from '@/components/elements/pagination/Pagination';
import MyPostList from '@/components/elements/post/MyList';

import { PostWithComment } from 'types/post.type';

type Props = {
  posts: Array<PostWithComment>;
};

const MyPosts: VFC<Props> = ({ posts }) => {
  const router = useRouter();
  const [offset, setOffset] = useState<number>(0);
  const [slice, setSlice] = useState<Array<PostWithComment>>([]);
  const [perPage] = useState<number>(10);
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
      const postsData = posts.slice(offset, offset + perPage);
      setSlice(postsData);
      setPageCount(Math.ceil(posts.length / perPage));
    };
    getData();
  }, [offset, perPage, posts, router.query]);

  return (
    <>
      <MyPostList posts={slice} />
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </>
  );
};

export default memo(MyPosts);
