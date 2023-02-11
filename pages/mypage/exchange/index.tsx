import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState, useCallback } from 'react';
import { getSession, GetSessionOptions } from 'next-auth/client';
import { prisma } from '@/lib/prisma';
import Layout from '@/components/templates/Layout';
import Pagination from '@/components/molecules/pagination/Pagination';
import ExchangeForApplication from '@/components/organisms/mypage/exchange/ExchangeForApplication';
import ExchangeForRecruitment from '@/components/organisms/mypage/exchange/ExchangeForRecruitment';
import {
  CommentWithPostWithUser,
  CommentWithUserAndPost,
} from 'types/comment.type';

type Props = {
  recruitmentPosts: Array<CommentWithUserAndPost>;
  applicationPosts: Array<CommentWithPostWithUser>;
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

  // 募集
  const recruitmentPosts = await prisma.comment.findMany({
    // コメントがあるPostの中で、session.userが募集したもの
    where: {
      post: {
        userId: session.user.id,
      },
    },
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: { user: true, post: true }, // 誰が応募したか
  });

  //　応募
  const applicationPosts = await prisma.comment.findMany({
    // コメントのうち、session.userがしたもの
    where: {
      userId: session.user.id,
    },
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      // 誰の募集か
      post: {
        include: {
          // 誰が募集したか
          user: true,
        },
      },
    },
  });

  return {
    props: {
      recruitmentPosts,
      applicationPosts,
    },
  };
};

const Exchange: NextPage<Props> = ({ recruitmentPosts, applicationPosts }) => {
  const [appOffset, setAppOffset] = useState<number>(0);
  const [recOffset, setRecOffset] = useState<number>(0);
  const [appSlice, setAppSlice] = useState<Array<CommentWithPostWithUser>>([]);
  const [recSlice, setRecSlice] = useState<Array<CommentWithUserAndPost>>([]);
  const [appPerPage] = useState<number>(10);
  const [recPerPage] = useState<number>(10);
  const [appPageCount, setAppPageCount] = useState<number>(0);
  const [recPageCount, setRecPageCount] = useState<number>(0);

  const handleRecPageClick = useCallback(
    (e): void => {
      const selectedRecPage = e.selected;
      setRecOffset(selectedRecPage * recPerPage);
    },
    [recPerPage]
  );
  const handleAppPageClick = useCallback(
    (e): void => {
      const selectedAppPage = e.selected;
      setAppOffset(selectedAppPage * appPerPage);
    },
    [appPerPage]
  );

  useEffect(() => {
    const getApplicationData = async (): Promise<void> => {
      const appPostData = applicationPosts.slice(
        appOffset,
        appOffset + appPerPage
      );
      setAppSlice(appPostData);
      setAppPageCount(Math.ceil(applicationPosts.length / appPerPage));
    };
    getApplicationData();
  }, [appOffset, appPerPage, applicationPosts]);

  useEffect(() => {
    const getRecruitmentData = async (): Promise<void> => {
      const recPostData = recruitmentPosts.slice(
        recOffset,
        recOffset + recPerPage
      );
      setRecSlice(recPostData);
      setRecPageCount(Math.ceil(recruitmentPosts.length / recPerPage));
    };
    getRecruitmentData();
  }, [recOffset, recPerPage, recruitmentPosts]);

  return (
    <Layout>
      <div className='lg:pb-6 lg:px-4 mb-80'>
        <section className='mb-6'>
          <div className='flex justify-between lg:mt-20 py-2 lg:px-0 pl-4 pr-2 lg:bg-white bg-black lg:text-black text-white lg:font-extrabold font-bold lg:text-3xl text-sm'>
            <h2>やりとり</h2>
          </div>
          <div className='mb-6 mx-4 border-b'></div>

          <div className='lg:flex'>
            <div className='lg:block lg:w-1/2 mx-4 bg-gray-50'>
              <h3 className='text-lg font-bold p-4'>
                あなたの募集に対するメッセージ
              </h3>
              <ExchangeForApplication comments={appSlice} />
              <Pagination
                pageCount={recPageCount}
                onPageChange={handleRecPageClick}
              />
            </div>
            <div className='lg:w-1/2 mx-4 lg:mt-0 mt-4 bg-gray-50'>
              <h3 className='text-lg font-bold p-4'>
                あなたからの応募メッセージ
              </h3>
              <ExchangeForRecruitment comments={recSlice} />
              <Pagination
                pageCount={appPageCount}
                onPageChange={handleAppPageClick}
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Exchange;
