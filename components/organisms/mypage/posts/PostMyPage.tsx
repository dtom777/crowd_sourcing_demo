import { PostWithComment } from 'types/post.type';
import {
  faLock,
  faLockOpen,
  faMoneyBillAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faComments,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { memo, VFC } from 'react';
import getRelativeTime from '@/lib/days';
import Loading from '@/components/atoms/loading/Loading';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import BaseIcon from '@/components/atoms/icon/BaseIcon';
import { usePostMyPage } from '@/hooks/usePostMyPage';

type Props = {
  posts: Array<PostWithComment>;
};

const PostMyPage: VFC<Props> = ({ posts }) => {
  const {
    loading,
    handlePrivatePost,
    handlePublishedPost,
    handleRePublishedPost,
    handleDeletePost,
  } = usePostMyPage();

  return (
    <>
      <Loading loading={loading} />
      <ul>
        {posts.map((post) => (
          <li key={post.id} className='py-2'>
            <BaseLinkButton
              href={`/posts/${post.id}`}
              className='block truncate py-1 font-bold text-gray-800 text-xl hover:opacity-50'
            >
              {post.title}
            </BaseLinkButton>
            <div className='flex items-center font-semibold'>
              <BaseIcon icon={faMoneyBillAlt} />
              {post.reward === null || post.reward == 0 ? (
                <p className='ml-1'>無料</p>
              ) : (
                <p className='ml-1'>{post.reward.toLocaleString()}円</p>
              )}
            </div>
            <div className='md:flex items-center md:justify-between text-sm md:mt-0 mt-2'>
              <div className='flex items-center md:justify-center text-gray-500'>
                <p className='mr-4'>{getRelativeTime(post)}</p>
                {post.comment.length !== 0 ? (
                  <BaseLinkButton href='#' className='hover:opacity-50'>
                    <p className='text-red-400'>
                      <BaseIcon icon={faComments} className='mr-1' />
                      {post.comment.length}件の応募があります!
                    </p>
                  </BaseLinkButton>
                ) : (
                  <p>まだ応募がありません</p>
                )}
              </div>
              <div className='flex items-center justify-end text-gray-500 mr-2 md:my-0 mt-2'>
                {/* 募集中 */}
                {post.published && !post.draft && (
                  <p className='px-2 py-1 mr-3 text-gray-800 text-xs bg-yellow-300 rounded-sm'>
                    募集中
                  </p>
                )}
                {/* 下書き */}
                {post.published && post.draft && (
                  <p className='px-2 py-1 mr-3 text-white text-xs bg-gray-500 rounded-sm'>
                    募集停止中
                  </p>
                )}
                {/* 終了 */}
                {!post.published && (
                  <p className='px-2 py-1 mr-3 text-white text-xs bg-red-500 rounded-sm'>
                    募集終了
                  </p>
                )}
                <BaseLinkButton
                  href={{
                    pathname: '/mypage/posts/edit',
                    query: { id: post.id },
                  }}
                  className='mr-2 text-blue-500 hover:opacity-50 focus:outline-none'
                >
                  <BaseIcon icon={faEdit} className='mr-1' />
                  編集
                </BaseLinkButton>
                {/* 公開中 */}
                {post.published === true && !post.draft && (
                  <button
                    className='px-2 py-1 mr-2 rounded-sm focus:outline-none hover:opacity-50'
                    onClick={() => handlePrivatePost(post.id)}
                  >
                    <BaseIcon icon={faLock} className='mr-1' />
                    募集停止
                  </button>
                )}
                {/* 下書き */}
                {post.published && post.draft && (
                  <button
                    className='px-2 py-1 mr-2 text-green-500 rounded-sm focus:outline-none hover:opacity-50'
                    onClick={() => handlePublishedPost(post.id)}
                  >
                    <BaseIcon icon={faLockOpen} className='mr-1' />
                    募集再開
                  </button>
                )}
                {!post.published && (
                  <button
                    className='px-2 py-1 mr-2 text-green-500 rounded-sm focus:outline-none hover:opacity-50'
                    onClick={() => handleRePublishedPost(post.id)}
                  >
                    <BaseIcon icon={faLockOpen} className='mr-1' />
                    募集再開
                  </button>
                )}
                <button
                  className='px-2 py-1 text-red-500 rounded-sm focus:outline-none hover:opacity-50'
                  onClick={() => handleDeletePost(post.id)}
                >
                  <BaseIcon icon={faTrashAlt} className='mr-1' />
                  削除
                </button>
              </div>
            </div>
            <hr className='mt-6' />
          </li>
        ))}
      </ul>
    </>
  );
};

export default memo(PostMyPage);
