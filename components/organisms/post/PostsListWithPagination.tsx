import { useEffect, useState, memo, useCallback, VFC } from 'react';
import { useRouter } from 'next/router';
import PostsList from '@/components/organisms/post/PostsList';
import Pagination from '@/components/molecules/pagination/Pagination';
import { PostWithUser } from 'types/post.type';
import CardList from '@/components/elements/card/CardList';

type Props = {
  posts: Array<PostWithUser>;
};

const PostsListWithPagination: VFC<Props> = ({ posts }) => {
  const router = useRouter();
  const { asPath } = useRouter();
  const [offset, setOffset] = useState<number>(0);
  const [slice, setSlice] = useState<Array<PostWithUser>>([]);
  const [perPage, setPerPage] = useState<number>(8);
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
      <CardList posts={slice} />
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </>
  );
};

export default memo(PostsListWithPagination);
