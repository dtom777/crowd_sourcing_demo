import { useRouter } from 'next/router';
import { useEffect, useState, memo, useCallback, VFC } from 'react';

import Pagination from '@/components/molecules/pagination/Pagination';
import PostMyPage from '@/components/organisms/mypage/posts/PostMyPage';

import { PostWithComment } from 'types/post.type';

type Props = {
  posts: Array<PostWithComment>;
};

const PostsListWithPaginationMyPage: VFC<Props> = ({ posts }) => {
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
      <PostMyPage posts={slice} />
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </>
  );
};

export default memo(PostsListWithPaginationMyPage);
