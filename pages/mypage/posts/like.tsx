import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { PostWithUserAndLikeAndComment } from 'types/post.type';
import { getSession, GetSessionOptions } from 'next-auth/client';
import { useState, useEffect, useCallback } from 'react';
import { prisma } from '@/lib/prisma';
import Layout from '@/components/templates/Layout';
import PostsLikeList from '@/components/organisms/mypage/posts/PostsLikeList';
import Pagination from '@/components/molecules/pagination/Pagination';
import BaseHead from '@/components/atoms/head/BaseHead';
import Loading from '@/components/atoms/loading/Loading';
import Const from '@/components/atoms/const/Const';

type Props = {
  posts: Array<PostWithUserAndLikeAndComment>;
  session: Session;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetSessionOptions
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    };
  }

  const likePosts = await prisma.post.findMany({
    where: {
      Like: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      user: true,
      Like: true,
      comment: true,
    },
  });

  return {
    props: {
      posts: likePosts,
      session,
    },
  };
};

const LikePostsListPage: NextPage<Props> = ({ posts, session }) => {
  const [loading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [slice, setSlice] = useState<Array<PostWithUserAndLikeAndComment>>([]);
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
  }, [offset, perPage, posts, session]);

  return (
    <Layout>
      <BaseHead />
      <Loading loading={loading} />
      <div className='mb-10 max-w-screen-md mx-auto'>
        <div className='mt-4 py-2 pl-4 pr-2 bg-black text-white font-bold text-md'>
          いいねした募集
        </div>
        <div className='mx-4'>
          {posts.length === 0 || posts.length === undefined ? (
            <Const message='現在いいねした募集はありません' />
          ) : (
            <>
              <PostsLikeList posts={slice} session={session} />;
              <Pagination
                pageCount={pageCount}
                onPageChange={handlePageClick}
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LikePostsListPage;
