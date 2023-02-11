import { GetServerSideProps, NextPage } from 'next';
import { getSession, GetSessionOptions } from 'next-auth/client';
import { Session } from 'next-auth';
import { faCog, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { prisma } from '@/lib/prisma';
import getRelativeTime from '@/lib/days';
import Layout from '@/components/templates/Layout';
import BaseHead from '@/components/atoms/head/BaseHead';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import CreatedAt from '@/components/atoms/time/CreatedAt';
import BaseIcon from '@/components/atoms/icon/BaseIcon';
import BaseAvatar from '@/components/atoms/avatar/BaseAvatar';
import styles from './index.module.css';
import { PostWithCommentAndLike } from 'types/post.type';
import { CommentWithUserAndPostWithCategoryAndUser } from 'types/comment.type';

type Props = {
  session: Session;
  post: Array<PostWithCommentAndLike>;
  comments: Array<CommentWithUserAndPostWithCategoryAndUser>;
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

  // 最近の募集
  const latestPost = await prisma.post.findMany({
    where: {
      AND: [
        { userId: session.user.id },
        {
          published: true,
        },
        {
          draft: false,
        },
      ],
    },
    take: 1,
    orderBy: {
      createdAt: 'desc',
    },
    include: { comment: true, Like: true },
  });

  //　応募したもの
  const latestComment = await prisma.comment.findMany({
    where: {
      userId: session.user.id,
    },
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      post: {
        include: {
          user: true,
        },
      },
    },
  });

  return {
    props: {
      session,
      post: latestPost,
      comments: latestComment,
    },
  };
};

const MyPage: NextPage<Props> = ({ session, post, comments }) => {
  return (
    <Layout>
      <BaseHead />
      <div className='md:flex justify-between md:px-4 px-2 md:mt-16 mt-8 md:mb-10 mb-6'>
        <div className='mr-2'>
          <div className='flex items-center'>
            {session && <BaseAvatar src={session.user.image} size={70} />}
            <div>
              <p className='text-gray-900 font-semibold md:text-3xl text-2xl ml-4'>
                {session ? session.user.name : ''}
              </p>
              <BaseLinkButton
                href='/mypage/profile'
                className={`text-gray-500 text-sm ml-4 hover:opacity-50 ${styles.shine}`}
              >
                プロフィール編集
              </BaseLinkButton>
            </div>
          </div>
        </div>
        <div className='flex md:justify-center justify-end items-center text-lg md:mt-0 mt-4'>
          <div className='mr-4 text-red-500'>
            <BaseLinkButton
              href={'/mypage/posts/like'}
              className={styles.shine}
            >
              <BaseIcon icon={faHeart} className='mr-1' />
              いいねした募集
            </BaseLinkButton>
          </div>
          <div className='text-gray-700'>
            <BaseLinkButton href='/mypage/setting' className={styles.shine}>
              <BaseIcon icon={faCog} className='mr-1' />
              設定
            </BaseLinkButton>
          </div>
        </div>
      </div>

      <div className='md:flex justify-between bg-gray-50 md:mb-20 mb-4 pb-4'>
        <div className='md:w-3/5 w-full py-4 lg:px-6 px-4'>
          <div className='flex justify-between items-baseline'>
            <h2 className='text-lg font-bold'>新着のやりとり</h2>
            <BaseLinkButton
              href='/mypage/exchange'
              className='hover:opacity-50'
            >
              <p className={`text-gray-400 text-sm ${styles.shine}`}>
                全てのやりとりをみる
              </p>
            </BaseLinkButton>
          </div>
          {comments !== undefined && comments.length !== 0 ? (
            // comp化できそう
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className='bg-white my-4 p-4'>
                  <BaseLinkButton
                    href={`/mypage/exchange/application/${comment.id}`}
                    className='flex justify-between hover:opacity-50'
                  >
                    <div className='flex'>
                      <BaseAvatar src={comment.post.user.image} size={70} />
                      <div className='ml-6'>
                        <p className='w-40 truncate text-gray-900 text-xl font-bold'>
                          {comment.post.title}
                        </p>
                        <p className='text-gray-700 font-medium'>
                          {comment.post.user.name}
                        </p>
                        <p className='text-gray-500 md:text-sm text-xs'>
                          この募集に応募しました。
                        </p>
                      </div>
                    </div>
                    <p className='text-gray-500 md:text-sm text-xs'>
                      {getRelativeTime(comment)}
                    </p>
                  </BaseLinkButton>
                </li>
              ))}
            </ul>
          ) : (
            <div className='flex justify-center items-center'>
              <p className='text-gray-500 my-10'>現在のやりとりはありません</p>
            </div>
          )}
        </div>
        <div className='md:w-2/5 w-full py-4 lg:px-6 px-4'>
          <div className='flex justify-between items-baseline'>
            <h2 className='text-lg font-bold'>あなたの最近の募集</h2>
            <BaseLinkButton
              href={{
                pathname: '/mypage/posts',
                query: { published: true, draft: true, end: true },
              }}
              className='hover:opacity-50'
            >
              <p className={`text-gray-400 text-sm ${styles.shine}`}>
                全ての募集をみる
              </p>
            </BaseLinkButton>
          </div>
          {post !== undefined && post.length !== 0 ? (
            <div className='mt-2 shadow-md'>
              <BaseLinkButton
                href={`/posts/${post[0].id}`}
                className={`flex flex-col ${styles.shine}`}
              >
                <div className='h-40 flex justify-center items-center px-4 bg-yellow-300 bg-bg-post text-lg font-bold rounded-t-md'>
                  <p className='text-center'>{post[0].title}</p>
                </div>
              </BaseLinkButton>
              <div className='bg-white rounded-b-md py-2 px-6'>
                <div className='flex justify-between'>
                  {post[0].comment.length !== 0 ? (
                    <BaseLinkButton
                      href={`/mypage/exchange/recruitment/${post[0].comment[0].id}`}
                      className='hover:opacity-50'
                    >
                      <p className='text-red-400'>
                        <BaseIcon icon={faComments} className='mr-1' />
                        {post[0].comment.length}件の応募があります!
                      </p>
                    </BaseLinkButton>
                  ) : (
                    <p>まだ応募がありません</p>
                  )}
                  <div className='flex items-center text-red-500'>
                    <BaseIcon icon={faHeart} className='mr-1' />
                    <p>{post[0].Like.length}</p>
                  </div>
                </div>
                <CreatedAt createdAt={post[0].createdAt} />
              </div>
            </div>
          ) : (
            <div className='flex justify-center items-center'>
              <p className='text-gray-500 my-10'>募集中の募集はありません</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;
