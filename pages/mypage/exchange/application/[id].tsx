import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/client';
import getRelativeTime from '@/lib/days';
import Layout from '@/components/templates/Layout';
import BaseHead from '@/components/atoms/head/BaseHead';
import CreatedAt from '@/components/atoms/time/CreatedAt';
import BaseAvatar from '@/components/atoms/avatar/BaseAvatar';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import { CommentWithUserAndPostWithCategoryAndUser } from 'types/comment.type';
import { getAsString } from '../../../../utils/getAsString';

type Props = {
  comment: CommentWithUserAndPostWithCategoryAndUser;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: Session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    };
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: getAsString(context.query.id),
    },
    include: {
      // 応募user = 自分
      user: true,
      post: {
        include: {
          Category: true,
          // 募集user = 相手
          user: true,
        },
      },
    },
  });
  console.log(comment);

  return {
    props: {
      comment,
    },
  };
};

const ExchangeApplicationPage: NextPage<Props> = ({ comment }) => {
  // post = 募集内容
  // user = 応募者
  const { post, user } = comment;

  return (
    <Layout>
      <BaseHead />
      <div className='max-w-screen-md mx-auto mb-10'>
        <div className='py-2 px-4 bg-black lg:text-lg text-sm text-white font-bold'>
          募集内容
        </div>
        <div
          className='md:p-10 p-4 bg-yellow-300 bg-bg-post'
          style={{ backgroundSize: '600px 920px' }}
        >
          <div className='flex justify-center lg:text-4xl text-2xl font-black break-all whitespace-pre-wrap '>
            <h1 className='max-w-md'>{post.title}</h1>
          </div>
          <div className='mt-6 lg:text-base text-sm font-bold leading-normal'>
            <pre className='break-all whitespace-pre-wrap'>{post.content}</pre>
            <div className='mt-6'>
              {post.reward ? <p>報酬:{post.reward}円</p> : ''}
            </div>
            <div className='mt-4'>
              <BaseLinkButton
                href={`/category/${post.Category.slug}`}
                className='py-1 px-2 bg-gray-200 rounded-md hover:opacity-70'
              >
                カテゴリ:{post.Category.name}
              </BaseLinkButton>
            </div>
          </div>
        </div>
        <div className='pl-4 py-2 bg-gray-100'>
          <CreatedAt title='募集開始日:' createdAt={post.createdAt} />
        </div>
        <div className='py-2 px-4 mt-8 text-gray-600 font-bold text-right'>
          応募したメッセージ
        </div>
        {/* {comment !== undefined && comment.length !== 0 && ( */}
        {comment && (
          <div className='my-4 mx-6 p-4 rounded-md'>
            <div className='flex justify-end'>
              <div className='mr-4'>
                <p className='text-gray-900 font-medium text-right'>あなた</p>
                <p className='text-gray-500'>{comment.content}</p>
                <p className='text-gray-500 text-sm'>
                  {getRelativeTime(comment)}
                </p>
              </div>
              <BaseAvatar src={user.image} size={90} />
            </div>
          </div>
        )}
        <div className='text-center'>
          募集者からのメッセージをお待ちください。
        </div>
      </div>
    </Layout>
  );
};

export default ExchangeApplicationPage;
